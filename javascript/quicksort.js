function quickSort (arr) {
    return (
        function f(arr, left, right) {
            if (left >= right) return arr
            let high = right
            let low = left
            let key = arr[left]
            while (left < right) {
                while (left < right && arr[right] >= key) {
                    right -= 1
                }
                arr[left] = arr[right]
                while (left < right && arr[left] <= key) {
                    left += 1
                }
                arr[right] = arr[left]
            }
            arr[right] = key
            f(arr, low, left - 1)
            f(arr, right + 1, high)
            return arr
        }
    )(arr, 0, arr.length - 1)
}

const a = [99,1,4,6,2,4,4,8]
console.log(quickSort(a))