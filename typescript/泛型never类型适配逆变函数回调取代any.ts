const theCallBack = (...args: string[]) => {
    console.log(...args)
}

const theCallBack2 = (...args: number[]) => {
    console.log(...args)
}

const useCallback = <T extends (...args: never[]) => unknown>(fn: T, args: Parameters<T>) => {
    console.log('useCallback before!')
    fn(...args)
    console.log('useCallback after!')
}
// const useCallback = <T extends (...args: any[]) => unknown>(fn: T, args: Parameters<T>) => {
//     console.log('useCallback before!')
//     fn(...args)
//     console.log('useCallback after!')
// }

useCallback(theCallBack, ['sss', 'wowwo'])

useCallback(theCallBack2, [123, 345])
