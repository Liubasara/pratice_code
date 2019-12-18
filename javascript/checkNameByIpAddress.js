const data = [
  { name: 'localhost', address: '127.0.0.1'},
]

let currentHost = {name: null, address: null}

const interfaces = require('os').networkInterfaces()

/** ES6 **/
for (let index in interfaces) {
  let value = interfaces[index]
  let addressList = value.map(item => item.address)
  data.find(item => addressList.includes(item.address)) &&
    ( currentHost = data.find(item => addressList.includes(item.address)) )
}

/** ES7 **/
// Object.values(interfaces).forEach(value => {
  // let addressList = value.map(item => item.address)
  // data.find(item => addressList.includes(item.address)) &&
    // ( currentHost = data.find(item => addressList.includes(item.address)) )
// })

console.log(currentHost.name)
