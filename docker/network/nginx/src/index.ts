import { Docker } from 'node-docker-api'
import { template } from 'lodash'
import { readFile, writeFile } from 'fs/promises'
import { createReadStream } from 'fs'
import { resolve } from 'path'
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

const NETWORK_NAME = 'isolated_nginx'
const NGINX_CONTAINER_NAME = 'isolated_nginx_c'

!(async () => {
  try {
    await clear()
    // TODO: 创建 nginx
    await createAndStartNginx()
    const isoLoatedNetwork = await docker.network.create({
      Name: NETWORK_NAME,
      Driver: 'bridge'
    })
    const containerList = await docker.container.list()
    containerList.map(i => i.data).forEach(async (cData: Record<string, any>) => {
      isoLoatedNetwork.connect({
        Container: cData.Id
      })
    })
  } catch (e) {
    console.error(e)
  }
})()

async function createAndStartNginx() {
  const nginxConf = await readFile(resolve(__dirname, '..', 'config', 'template.conf.example'), { encoding: 'utf-8' })
  const compiledStr = template(nginxConf.toString())({
    allLocations: `\n\
      location /node1 {\n\
        proxy_pass http://node1-network-test/;\n\
      }\n\
      location /node2 {\n\
        proxy_pass http://node2-network-test/;\n\
      }\n\
  `})
  await writeFile(resolve(__dirname, '..', 'config', 'template.conf'), compiledStr)
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
  const readStream = createReadStream(Buffer.from(compiledStr), {
    
  })
  await nginxContainer.fs.put(readStream, {
    path: '/etc/nginx/conf.d/default.conf'
  })
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
    await container.stop()
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
