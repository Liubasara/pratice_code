export const getSingle = function <
  T extends Record<string, any>,
  U extends unknown[]
>(fn: (...args: U) => T) {
  let result: T
  return function <V extends string>(
    this: unknown,
    ...args: V extends 'init' ? U : Partial<U>
  ) {
    return result || (result = fn.apply(this, args as U))
  }
}

function MyTestObj () {
  return {}
}

const getSingleTestObj = getSingle(MyTestObj)

console.log(getSingleTestObj() === getSingleTestObj())

console.log(MyTestObj() === MyTestObj())
