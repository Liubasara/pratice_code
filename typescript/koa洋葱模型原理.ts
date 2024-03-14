// koa-compose
// 参考文章：https://juejin.cn/post/7012031464237694983
function compose(
    middlewareFns: Array<
        (
            ctx: Record<string, unknown>,
            next: (...args: never[]) => unknown
        ) => unknown | Promise<unknown>
    >
) {
    return async (ctx?: Record<string, unknown>, next = async () => undefined) => {
        let index = -1;

        const dispatch = async (i: number): Promise<void> => {
            if (i <= index) {
                throw new Error("next() called multiple times");
            }

            index = i;

            const middleware = middlewareFns[i];

            if (i === middlewareFns.length) {
                return next();
            }

            await middleware(ctx ?? {}, () => dispatch(i + 1));
        };

        return dispatch(0);
    };
}

// example
const middleware: Array<(ctx: unknown, next: () => unknown | Promise<unknown>) => unknown> = []
let mw1 = async function (ctx: unknown, next: Function) {
    console.log("next前，第一个中间件")
    await next()
    console.log("next后，第一个中间件")
}
let mw2 = async function (ctx: unknown, next: Function) {
    console.log("next前，第二个中间件")
    await next()
    console.log("next后，第二个中间件")
}
let mw3 = async function (ctx: unknown, next: Function) {
    console.log("第三个中间件，没有next了")
}

function use(mw: (ctx: unknown, next: () => unknown | Promise<unknown>) => unknown) {
    middleware.push(mw);
}

use(mw1);
use(mw2);
use(mw3);

const fn = compose(middleware);

fn();

/*
输出：
[LOG]: "next前，第一个中间件" 
[LOG]: "next前，第二个中间件" 
[LOG]: "第三个中间件，没有next了" 
[LOG]: "next后，第二个中间件" 
[LOG]: "next后，第一个中间件" 
*/
