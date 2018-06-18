#! -*- coding:utf-8 -*-

"""
Author:Lz1y

2017.6.6
"""
import re
import requests
from bs4 import BeautifulSoup as bs


def getAv():
    try:
        av = input("请输入Av号:")
        url = "http://www.bilibili.com/video/av" + str(av) + "/"
        getHTMLText(url, av)
    except:
        print("输入错误.")


def getHTMLText(url, av):
    headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)", }
    u = requests.get(url=url, headers=headers)
    html = u.text
    cid = re.findall(r'cid=(.*?)&aid=', html)[0]
    getDanmu(cid, av)


def getDanmu(cid, av):
    dmurl = "http://comment.bilibili.com/" + str(cid) + ".xml"
    dmhtml = requests.get(dmurl).text
    soup = bs(dmhtml, 'xml')
    dmlist = soup.find_all('d')
    printDanmu(dmlist, av)


def printDanmu(dmlist, av):
    filename = "av" + str(av) + ".txt"
    with open(filename, 'w', encoding='utf-8') as t:
        for dm in dmlist:
            t.write(str(dm.string) + '\n')
            print("Loading...\n")


if __name__ == "__main__":
    getAv()
