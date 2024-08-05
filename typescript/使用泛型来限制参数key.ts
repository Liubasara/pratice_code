/*
https://www.typescriptlang.org/play/?#code/C4TwDgpgBA0hIGcDyAzJwAWEBOAeAKlBAB7AQB2AJglAN4BQUUA2gNbxQCW5U7IA9iigBDciAC6ALigBXcq3L8A7uXoBfADRQAqgD4oAXjqMmLAApcefQTqnnxRUhWotrQ-A4D8UchABuOFDS+Mxm4gDcJmqR9ChyAMbAnPw8ALY4AOYQSABGAFYQiQgEjmRUNABKhfzYlLgIwNjcGVpyCsrkulrapc40cIio6Fh4+N26ugAU-PkAjMFaM3kATNLaAJTBUABkOsZM2BDAMtg8tFAAdFdLs1pXF0vLUGoiNIS72pFq9PTxKQ0iYSGKDpbBZXIFIqTc7CaSzZ5ac45aRPNTrH4AegAVFjGFioH9yADhLD9vjTCJpOQZKkcjhIlB8S9dgxGRSoMifDS6dgGUy8Rjfv9+AAbCAXEX8DKTEno+jY3Fs-DgaAAcmptJwqq4NEUwFeCE4GXIwhyYqgwH4FpVUHV-i1F0mywAzMtlujuGAZMALsAEMQncstAAWZ2bKD4LCOSCJCCUa2QAn8dI0FDYZNQMDpyDYUC24TapQYTjxDA6qCUQoi4SHeMjaApBNqgbINCYHC4GFU7n0hF0DndzW8ylcofhZ66VUCoVE-U5HLA0Hg-KFP3QkfwzT9zlBkcu57rIA
**/

type KeysOfOther<T extends {
  [key in keyof any]: unknown
}, U> = {
    [P in keyof U]: [P] extends [keyof T] ? never : T[P];
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