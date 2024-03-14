// koa-compose
// 参考文章：https://juejin.cn/post/7012031464237694983
function compose(
  middlewareFns: Array<
    (
      ctx: Record<string, unknown>,
      next: (...args: never[]) => unknown
    ) => Promise<unknown>
  >
) {
  return async (ctx: Record<string, unknown>, next = async () => undefined) => {
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

      await middleware(ctx, () => dispatch(i + 1));
    };

    return dispatch(0);
  };
}
