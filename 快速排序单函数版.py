def quick_sort(lists, left, right):
    # 快速排序
    if left >= right:
        return lists
    key = lists[left]
    low = left
    high = right
    while left < right:
        while left < right and lists[right] >= key:
            right -= 1
        lists[left] = lists[right]
        print('lists[left] = lists[right]:',lists)
        while left < right and lists[left] <= key:
            left += 1
        lists[right] = lists[left]
        print('lists[right] = lists[left]:',lists)
    lists[right] = key
    print('结束一次循环:{}right:{}\n'.format(lists, right))
    quick_sort(lists, low, left - 1)
    quick_sort(lists, left + 1, high)
    return lists

a = [3,0,1,4,4,8,7,99,567,2,68657]
print(quick_sort(a, 0, len(a)-1))