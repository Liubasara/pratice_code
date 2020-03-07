function beginCancel () {
  let domList = document.querySelectorAll('a[action-type="cancel_follow_single"]')
  let i = 0
  let errorIndex = 0

  setInterval(() => {
    item = domList[i]
    item.click()
    i++
  }, 2000)

  setInterval(() => {
    try {
      document.querySelector('a[action-type="ok"]').click()
    } catch (e) {
      console.log(`第${++errorIndex}次错误`)
    }
  }, 1000)
}

/**
version 2.0
**/
function beginCancel2 () {
  setInterval(() => {
  if (document.querySelector('div[node-type="navTools"]').style.display !== 'none') {
    document.querySelector('a[action-type="batselect"]').click()
    }
  }, 500)

  setInterval(() => {
    document.querySelectorAll('.mod_pic')
    document.querySelectorAll('.mod_pic').forEach(item => item.click())
    document.querySelector('a[action-type="cancel_follow_all"]').click()
  }, 2000)

  setInterval(() => {
    try {
      document.querySelector('a[action-type="ok"]').click()
    } catch (e) {}
  }, 1000) 
}

