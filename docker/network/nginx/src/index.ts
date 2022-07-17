import { Docker } from 'node-docker-api'
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
    // await createAndStartNginx()
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
  // TODO:
  await docker.container.create({
    name: NGINX_CONTAINER_NAME,
    Image: 'nginx',
    HostConfig: {
      PortBindings: {
        '80/tcp': [{ 'HostPort': '80' }]
      }
    }
  })
}

async function clear() {
  await clearNetwork()
  // TODO: 清除 nginx
  // await clearNginx()
}

async function clearNginx() {
  // TODO: 清除 nginx
  const containerList = await docker.container.list()
  containerList.filter((container: fixContainer) => {
    console.log(container)
  })
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
