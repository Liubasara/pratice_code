def Solution(cate, string):
    # 判断输入的是美元还是人民币
    # 当输入是美元时
    if cate == "EUR" or cate == "$":
        num = ['0','1','2','3','4','5','6','7','8','9',',']
        res = [] #创建一个新数组，用于存放数字
        for i in string:
            if i in num:
                res.append(i)
        # 对美元中的小数点进行操作
        if ',' in res:
            index = res.index(',')
            res[index] = '.' #将结果中的,统一换成.
            #对小数点后的0进行忽略或保留操作
            for i in reversed(res[index+1:]):
                if i == '0':
                    res.pop()
                else:
                    break
            #当小数点后面没有数字时，将小数点忽略
            if res[-1] == '.':
                res.pop()
        res = ''.join(res)
        try:
        #当数字可以变成整型时，将其变为整形
            result = int(res)
        except:
        #若数字不能变成整形，则变成浮点型
            result = float(res)
        return result
    
    #当输入是人民币时
    if cate == "￥" or cate == "CNY":
        num = ['0','1','2','3','4','5','6','7','8','9','.'] #和美元不一样的地方在于,和.这两个符号 
        res = [] #创建一个新数组，用于存放数字
        for i in string:
            if i in num:
                res.append(i)

        # 对小数点后的0进行忽略或保留操作
        if '.' in res:
            index = res.index('.')
            for i in reversed(res[index+1:]):
                if i == '0':
                    res.pop()
                else:
                    break
            #当小数点后面没有数字时，将小数点忽略
            if res[-1] == '.':
                res.pop()
        res = ''.join(res)
        try:
            result = int(res)
        except:
            result = float(res)
        return result

if __name__ == "__main__":
    inp = input().split(' ')
    cate = inp[0]
    string = inp[1]
    a = Solution(cate, string)
    print(a)