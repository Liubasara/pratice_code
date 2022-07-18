import { Docker } from 'node-docker-api'
import { template } from 'lodash'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { c as createTar } from 'tar'
import type { Network } from 'node-docker-api/lib/network'
import type { Container } from 'node-docker-api/lib/container'

type fixNetwork = Network & {
  data: Record<string, any>
}

type fixContainer = Container & {
  data: Record<string, any>
}

const localDockerEngine = process.platform === 'win32' ? '//./pipe/docker_engine' : '/var/run/docker.sock'

const docker = new Docker({ socketPath: localDockerEngine })

const NETWORK_NAME = 'isolated-nginx'
const NGINX_CONTAINER_NAME = 'isolated-nginx-c'

!(async () => {
  try {
    await clear()
    // TODO: 创建 nginx
    const nginxC = await createAndStartNginx()
    const isoLoatedNetwork = await docker.network.create({
      Name: NETWORK_NAME,
      Driver: 'bridge'
    })
    const containerList = await docker.container.list()
    await Promise.all(containerList.map(i => i.data).map(async (cData: Record<string, any>) => {
      return isoLoatedNetwork.connect({
        Container: cData.Id
      })
    }))
    await reloadNginx(nginxC)
  } catch (e) {
    console.error(e)
  }
})()

async function reloadNginx(nginxC: fixContainer) {
  // https://docs.docker.com/engine/api/v1.24/#exec-create
  const reloadExec = await nginxC.exec.create({
    // AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Cmd: ['nginx', '-s', 'reload'],
    // DetachKeys: "ctrl-p,ctrl-q",
    // Privileged: true,
    // Tty: true,
    // User: "root"
  })
  await reloadExec.start({
    Detach: false,
    Tty: false
  })
}

async function createAndStartNginx() {
  const nginxConf = await readFile(resolve(__dirname, '..', 'config', 'template.conf.example'), { encoding: 'utf-8' })
  const indexHtml = await readFile(resolve(__dirname, '..', 'config', 'index.html.example'), { encoding: 'utf-8' })
  const containerList = await docker.container.list()
  let allLocations = `\
    location / {\n\
      root /etc/nginx/template;\n\
    }\n\
  `
  let allProxy = ''
  containerList.forEach((container: fixContainer) => {
    const proxyName = container.data.Names[0].match(/\/(\w*)/)[1]
    allLocations += `\
      location /${proxyName} {\n\
        proxy_pass http:/${container.data.Names[0]}/;\n\
      }\n\
    `
    allProxy += `\
      <a href="/${proxyName}">${proxyName}</a>\n\
    `
  })
  const compiledLocationsStr = template(nginxConf.toString())(
    {
      allLocations
    }
  )
  const compiledHtmlStr = template(indexHtml.toString())(
    {
      allProxy
    }
  )
  await writeFile(resolve(__dirname, '..', 'config', 'default.conf'), compiledLocationsStr)
  await writeFile(resolve(__dirname, '..', 'config', 'index.html'), compiledHtmlStr)
  const nginxContainer = await docker.container.create({
    name: NGINX_CONTAINER_NAME,
    Image: 'nginx',
    HostConfig: {
      PortBindings: {
        '80/tcp': [{ 'HostPort': '80' }]
      }
    }
  })
  await nginxContainer.start()
  await Promise.all([
    (async () => {
      const readStream = createTar(
        {
          cwd: resolve(__dirname, '..', 'config'),
          gzip: true,
          prefix: '/etc/nginx/conf.d'
        },
        ['default.conf']
      )
      await nginxContainer.fs.put(readStream as any, {
        path: '/'
      })
    })(),
    (async () => {
      const readStream = createTar(
        {
          cwd: resolve(__dirname, '..', 'config'),
          gzip: true,
          prefix: '/etc/nginx/template'
        },
        ['index.html']
      )
      await nginxContainer.fs.put(readStream as any, {
        path: '/'
      })
    })()
  ])

  return nginxContainer
}

async function clear() {
  // 清除公共 network
  await clearNetwork()
  // 清除 nginx
  await clearNginx()
}

async function clearNginx() {
  // 清除 nginx container
  const containerList = await docker.container.list({
    all: true
  })
  const matchContainers = containerList.filter((container: fixContainer) => {
    return container.data.Names.some((name: string) => new RegExp(NGINX_CONTAINER_NAME).test(name))
  })
  await Promise.all(matchContainers.map(async (container: fixContainer) => {
    container.data.State === 'running' && await container.stop()
    await container.delete()
  }))
}

async function clearNetwork() {
  const allNetworks = await docker.network.list()
  await Promise.all(allNetworks.filter((network: fixNetwork & {
    data: Record<string, any>
  }) => network?.data?.Name === NETWORK_NAME).map(async (oldNetwork: fixNetwork) => {
    const networkStatus = (await oldNetwork.status() as fixNetwork)
    await Promise.all(Object.keys(networkStatus.data.Containers).map(async (cID) => {
      await oldNetwork.disconnect({
        Container: cID
      })
    }))
    await oldNetwork.remove()
  }))
}
