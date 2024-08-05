/*
https://www.typescriptlang.org/play/?ssl=2&ssc=3&pln=2&pc=45#code/C4TwDgpgBA0hIGcDyAzJwAWEBOAeAKlBAB7AQB2AJglAN4BQUUA2gNbxQCW5UCw23AOZQAPlHIBXALYAjHKN4hZAewA2AXQBcUCeVbllAd3L0AvgBooAVQB8UALx1GTFgAUuPdiGUprWt+pEpBTULF4+UPiBAPziEABu8tr4zK7qANzOppn0KLoAxsCcyjxSOIIQSDIAVhCFCARBZFQ0AEp1ytiUuHwC5IKWuvpG5DaWVk0hNHCIqOhYePjjNjYAFMo1AIzJlhvVAEzaVgCUyVAAZNZOTNgQwBLYPLRQAHRve5uWby97+1CmUAAhjRCJcrJlTPR6PkSnwgYCHFAytgKlVavVVs9AdpNv9LM8ZNo-qZjlCAPQAKgpjApUBh5DhgOx11pLiB2kkshwmSgtIBlwYvLZUEJ4mkcmwPL5NLJ0NhaggL1UykEqyZpPolOpQvw4GgAHJORL9VwaAZgECEAhOIJyICZKpoMBlFBQJAoIaEjh9S9VvsAMz7fak7hgCTAF7ABDEP37SwAFn9p0iWCCkEKEEorr1dOUZRoKGweagYCLkGwoA9gJNhgwnHyGFNUEodVUgNuWYW0BK2fd+pmyDQmBwuCxHPF3LxdBF465kvZYrn6X+Nn1MrlDItMhkiORqJqdSjmIXuIs09FcYXAf+xyAA
**/

type KeysOfOther<T extends {
  [key in string | number | symbol]: unknown
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