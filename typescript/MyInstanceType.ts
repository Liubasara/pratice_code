type MyInstanceType<T extends abstract new (...args: never[]) => unknown> = T extends abstract new (...args: never[]) => infer R ? R : never;
