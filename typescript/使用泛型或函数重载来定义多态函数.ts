/**
 * 分别用两种方式来实现一个函数类型推导：根据 type 参数来决定返回类型
 * 
 * 若传入 string，返回 string，若传入 number，则返回 number
 */

type DefaultHelperType = 'string' | 'number' | undefined

type func1ReturnHelper<T extends DefaultHelperType = 'string'> =
  T extends 'string' ? string : T extends 'number' ? number : never

export function func1<T extends 'string' | 'number' | undefined = 'string'>(
  size: number | string,
  {
    type = 'string'
  }: {
    type?: T
  } = {}
): func1ReturnHelper<T> {
  const num =
    typeof size === 'number'
      ? size
      : +(size || 0)
  const target = num
  // 需要用 as 强制定义返回类型
  return (
    type === 'string' ? `${target}` : target
  ) as func1ReturnHelper<T>
}

const func1Test1 = func1(10)
const func1Test2 = func1(10, { type: 'number' })
console.log(func1Test1, func1Test2)


/**
 * 第二种方法，使用函数重载
 */

export function func2(
  size: number | string,
  opt: {
    type: 'number'
  }
): number
export function func2(
  size: number | string,
  opt?: {
    type?: 'string'
  }
): string
export function func2(
  size: number | string,
  { type = 'string' }: { type?: 'number' | 'string' } = {}
) {
  const num =
    typeof size === 'number'
      ? size
      : +(size || 0)
  const target = num
  return (
    type === 'string' ? `${target}` : target
  )
}

const func2Test1 = func2(10)
const func2Test2 = func2(10, { type: 'number' })
console.log(func2Test1, func2Test2)

