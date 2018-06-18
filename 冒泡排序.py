#coding:utf-8
def bubbling(lists):
    # 冒泡排序
    count = len(lists)
    for i in range(0, count):
        for j in range(i + 1, count):
            if lists[i] > lists[j]:
                lists[i], lists[j] = lists[j], lists[i]
    return lists

if __name__ == "__main__":
    array = [99,88,96,8,4,2,9,6]
    print bubbling(array)