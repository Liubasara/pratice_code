const http = require('http')


const server = new http.Server()

server.on('request', (req, res) => {
  res.writeHead(200)
  res.write('node2')
  res.end()
})

server.listen(80, () => {
  console.log('listen in 80 port')
})