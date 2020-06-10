// 参考链接：https://www.cnblogs.com/wayou/p/typescript_infer.html

// 个人理解：infer 经常与 extends 判断配合使用，多用于判断某个泛型中的参数，从而反射并扩大目标的类型范围
type PromiseType<T> = (args: any[]) => Promise<T>
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never

async function stringPromise () {
  return 'string promise'
}

async function numberPromise() {
  return 1;
}
  
  
interface Person {
  name: string;
  age: number;
}


async function personPromise() {
  return { name: "Wayou", age: 999 } as Person;
}

type extractStringPromise = typeof stringPromise extends PromiseType<infer U> ? U : never // string

type extractNumberPromise = UnPromisify<typeof numberPromise>; // number

type extractPersonPromise = UnPromisify<typeof personPromise>; // Person
