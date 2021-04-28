# 函数单一原则对单元测试而言的重要性

```javascript
function badFunction(params = {}) {
  if (params.a === 1) {
    console.log('do something0')
    if (params.b === 2) {
      console.log('do something0-0')
      if (params.c === 3) {
        console.log('do something0-0-0')
      } else {
        console.log('do something0-0-1')
      }
    } else {
      console.log('do something0-1')
    }
  } else {
    console.log('do something1')
  }
}
```

如果要覆盖上面这个函数中的所有语句，对应的单元测试为：

```javascript
it('测试 badFunction -> 是否所有情况都符合预期', () => {
  expect(badFunction({ a: 1 })).toBe('0-1')
  expect(badFunction({ a: 2 })).toBe('1')
  expect(badFunction({ a: 1, b: 2 })).toBe('0-0-1')
  expect(badFunction({ a: 1, b: 2, c: 3 })).toBe('0-0-0')
  expect(badFunction({ a: 1, b: 2, c: 4 })).toBe('0-0-1')
})
```

可以看到，需要在一个单元测试内覆盖所有情况，这种写法非常耗神，而且很容易写过就忘，重新阅读的成本非常高，并不友好。

而如果使用多个函数来优化这些 if-else，代码就会变成这样：

```javascript
function goodFunction (params) {
  let a
  if (params.a === 1) {
    a = handleFunction0(params)
  } else {
    a = handleFunction1()
  }
  return a
}

function handleFunction0(params) {
  let a = '0'
  if (params.b === 2) {
    a = handleFunction00(params)
  } else {
    a = handleFunction01(params)
  }
  return a
}

function handleFunction00(params) {
  let a = '0-0'
  if (params.c === 3) {
    a = handleFunction000(params)
  } else {
    a = handleFunction001(params)
  }
  return a
}

function handleFunction000() {
  let a = '0-0-0'
  return a
}

function handleFunction001() {
  let a = '0-0-1'
  return a
}

function handleFunction01() {
  let a = '0-1'
  return a
}

function handleFunction1() {
  let a = '1'
  return a
}

/**
测试代码
**/
it('测试 goodFunction', () => {
  expect(goodFunction({ a: 1 })).toBe('0-1')
  expect(goodFunction({ a: 2 })).toBe('1')
  expect(goodFunction({ a: 1, b: 2 })).toBe('0-0-1')
  expect(goodFunction({ a: 1, b: 2, c: 3 })).toBe('0-0-0')
  expect(goodFunction({ a: 1, b: 2, c: 4 })).toBe('0-0-1')
})
```

上面这段代码中的 goodFunction 用之前的单元测试来进行单测也是没有问题的，但我们明显有更清晰的写法。

```javascript
it('测试 goodFunction', () => {
    const mockHandleFunction0 = jest.spyOn(bjs, 'handleFunction0')
    const mockHandleFunction1 = jest.spyOn(bjs, 'handleFunction1')
    bjs.goodFunction({ a: 1 })
    expect(mockHandleFunction0).toBeCalled()
    expect(mockHandleFunction0).toBeCalledTimes(1)
    bjs.goodFunction({ a: 2 })
    expect(mockHandleFunction1).toBeCalled()
    expect(mockHandleFunction1).toBeCalledTimes(1)
  })
  it('测试 handleFunction0', () => {
    const mockHandleFunction00 = jest.spyOn(bjs, 'handleFunction00')
    const mockHandleFunction01 = jest.spyOn(bjs, 'handleFunction01')
    bjs.handleFunction0({ b: 2 })
    expect(mockHandleFunction00).toBeCalled()
    expect(mockHandleFunction00).toBeCalledTimes(1)
    bjs.handleFunction0({ b: 3 })
    expect(mockHandleFunction01).toBeCalled()
    expect(mockHandleFunction01).toBeCalledTimes(1)
  })
  it('测试 handleFunction00', () => {
    const mockHandleFunction000 = jest.spyOn(bjs, 'handleFunction000')
    const mockHandleFunction001 = jest.spyOn(bjs, 'handleFunction001')
    bjs.handleFunction00({ c: 3 })
    expect(mockHandleFunction000).toBeCalled()
    expect(mockHandleFunction000).toBeCalledTimes(1)
    bjs.handleFunction00({ c: 4 })
    expect(mockHandleFunction001).toBeCalled()
    expect(mockHandleFunction001).toBeCalledTimes(1)
  })
```

虽然测试的代码量多了，但是这种写法明显更清晰，而且每个单元测试只需要传入一个函数所关心的变量就足以覆盖到所有情况了。