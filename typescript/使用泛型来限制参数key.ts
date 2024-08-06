/*
https://www.typescriptlang.org/play/?#code/C4TwDgpgBA0hIGcDyAzJwAWEBOAeAUFFACpQQAewEAdgCYJQDehRUA2gNbxQCW1UCYNj4BzKAB8o1AK4BbAEY4JAkAoD2AGwC6ALijTqHamoDu1ANwsAvgBoWAVTsA+KAF4mLNgAVe-LiDUUKHtddi8tMkoaenZ-QJIIgH4pCAA3JT17by1LK0t8FAMAY2AeNX5ZHBEIJHkAKwgShFxSCio6BgAlRrVsWlxBYWoRG31DYzMnUftI9pi4RFR0LDxiaacnAAo1eoBGPTWoHbqAJkyASgOoADJgjyJsCGBpbH5GKAA6L+Pd0a+P44nKBWKAAQwYpFu9ly+HwRXKgjBoLcUEq2GqtQaTU271Bel2wNG73keiBVnOsIA9AAqamEalQeHURGgvH3BmsMF6GQKHCWKAMkG3ZgCzlQElSOSKbD8wX0ylwhGaCAfDRqESbVkU-A0umi4jgaAAch50qNvAYxmAYIQCB4ImooPkGmgwDUUFAkCgJrSOCNH02JwAzCcThS+GBpMAPsAEORAydRgAWIOXEhYSKQEoQWgew2MtSVBgobCFqBgUuQbCgb2g80mDA8IoYC1QWiNDSgx65lbQcp5r1GhbINCYHC4XHcqV8wlMcVT3kyrmSxfmYFOI3yxXM63yeQotEY+qNWM45cE2xziWJ5fB4HnIA
**/

type KeysOfOther<
  T extends {
    [key in string | number | symbol]: unknown;
  },
  U,
> = {
  [P in keyof U]: [P] extends [keyof T] ? never : U[P];
};

function mergeObjects<T extends Record<string, unknown>, U extends KeysOfOther<T, U>>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 } as T & U;
}

const aa = mergeObjects({ a: 1 }, { b: 2 })

/**
 * const aa: {
 *     a: number;
 * } & {
 *     b: number;
 * }
 */
console.log(aa)

/**
 * Type 'number' is not assignable to type 'never'.(2322)
input.tsx(22, 43): The expected type comes from property 'a' which is declared here on type 'KeysOfOther<{ a: number; }, { b: number; a: number; }>'
 */
const bb = mergeObjects({ a: 1 }, { b: 2, a: 23 })
