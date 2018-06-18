def roatearr(arr):
    for index,i in enumerate(arr):
        for j in range(index,len(i)):
            arr[index][j],arr[j][index] = arr[j][index],arr[index][j]
    return arr

a = [[1,2,3],[4,5,6],[7,8,9]]
b = roatearr(a)
for i in b:
    for j in i:
        print j,
    print '\n'