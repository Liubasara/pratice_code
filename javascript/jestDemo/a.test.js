const bjs = require('./b.js')

const { badFunction } = bjs

describe('test', () => {
  it('测试 badFunction', () => {
    expect(badFunction({ a: 1 })).toBe('0-1')
    expect(badFunction({ a: 2 })).toBe('1')
    expect(badFunction({ a: 1, b: 2 })).toBe('0-0-1')
    expect(badFunction({ a: 1, b: 2, c: 3 })).toBe('0-0-0')
    expect(badFunction({ a: 1, b: 2, c: 4 })).toBe('0-0-1')
  })
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
})
