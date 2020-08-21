module.exports = {
  parseQueryString: function parseQueryString (url) {
    let str = url.split("?")[1], items = (str ? str.split("&") : [])
    let result = {}
    let arr
    for (let i = 0; i < items.length; i++) {
      arr = items[i].split("=")
      result[arr[0]] = arr[1]
    }
    return result
  },
  parseCookieString: function parseCookieString (cookies) {
    let items = cookies.split("; ")
    let result = {}
    let arr
    for (let i = 0; i < items.length; i++) {
      arr = items[i].split("=")
      result[arr[0]] = arr[1]
    }
    return result
  }
}