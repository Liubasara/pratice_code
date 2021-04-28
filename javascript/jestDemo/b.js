function badFunction(params = {}) {
  let a
  if (params.a === 1) {
    a = '0'
    if (params.b === 2) {
      a = '0-0'
      if (params.c === 3) {
        a = '0-0-0'
      } else {
        a = '0-0-1'
      }
    } else {
      a = '0-1'
    }
  } else {
    a = '1'
  }
  return a
}

const goodFunction = function goodFunction (params) {
  let a
  if (params.a === 1) {
    a = this.handleFunction0(params)
  } else {
    a = this.handleFunction1()
  }
  return a
}

const handleFunction0 = function handleFunction0(params) {
  let a = '0'
  if (params.b === 2) {
    a = this.handleFunction00(params)
  } else {
    a = this.handleFunction01(params)
  }
  return a
}

const handleFunction00 = function handleFunction00(params) {
  let a = '0-0'
  if (params.c === 3) {
    a = this.handleFunction000(params)
  } else {
    a = this.handleFunction001(params)
  }
  return a
}

const handleFunction000 = function handleFunction000() {
  let a = '0-0-0'
  return a
}

const handleFunction001 = function handleFunction001() {
  let a = '0-0-1'
  return a
}

const handleFunction01 = function handleFunction01() {
  let a = '0-1'
  return a
}

const handleFunction1 = function handleFunction1() {
  let a = '1'
  return a
}

module.exports = {
  badFunction,
  goodFunction,
  handleFunction0,
  handleFunction00,
  handleFunction000,
  handleFunction001,
  handleFunction01,
  handleFunction1
}
