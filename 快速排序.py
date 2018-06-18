import random

def Quick_sort_zb(a, low, height):
    key = a[low]
    while low < height:
        if low < height and a[height] >= key:
            height -= 1
        if low < height and a[height] < key:
            a[low] = a[height]
            low += 1
            a[height] = a[low]
    a[height] = key
    return height
    
def Quick_sort(a, low, height):
    if low < height:
        index = Quick_sort_zb(a, low, height)
        Quick_sort(a, low, index)
        Quick_sort(a, index+1, height)
    return a



if __name__=='__main__':
    a = []
    for i in range(10):
        a.append(random.randint(1,100))
    print(a)
    low = 0
    height = len(a)-1
    Quick_sort(a, low, height)
    print(a)