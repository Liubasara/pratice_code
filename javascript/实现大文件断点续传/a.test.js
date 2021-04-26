// npm run test a.test.js
const common = require('./b.js')

console.log(common)
jest.mock('./b.js', () => ({ haha: 123 }))

describe('test', () => {
  it('1', () => {
    expect(common).toMatchObject({ haha: 123 })
  })
})
