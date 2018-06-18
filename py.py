import requests
import re
import os


def getHTMLText():
    i = input("请输入av号(数字)：")
    num = int(input("爬取多少页呢?\n")) + 1
    for n in range(1, num):
        url = "https://api.bilibili.com/x/v2/reply?jsonp=jsonp&pn=" + str(n) + "&type=1&oid=" + str(
            i) + "&sort=0&_=1496477384198"

        #https://api.bilibili.com/x/v2/reply?jsonp=jsonp&pn=3&type=1&oid=14157017&sort=0&_=1496477384198
        r = requests.get(url)
        text = r.text
        printTXT(i, text)
        print("正在打印第" + str(n) + "页评论！")


def printTXT(i, text):
    filename = "av" + str(i) + ".txt"
    content = re.findall('"uname":"(.*?)","sex":.*?"content":{"message":"(.*?)","plat"', text)
    for t in content:
        with open(filename, "a", encoding='utf-8') as txt:
            txt.write(t[0] + " " + t[1] + '\n\n')


if __name__ == "__main__":
    getHTMLText()
