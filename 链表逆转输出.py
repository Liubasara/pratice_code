# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
     self.val = x
     self.next = None
class Solution:
    lastNode = ListNode(0)

    def TravelSel(self, pHead):
    #递归遍历链表，将后一个节点的next指向前一个，第一个节点没有处理
        if pHead.next:
            self.TravelSel(pHead.next)
            pHead.next.next = pHead
            #返回头节点
            return pHead
        else:
            self.lastNode = pHead
            #返回头节点
            return pHead
            
    def ReverseList(self, pHead):
        if not pHead:
            return None
        first = self.TravelSel(pHead)
        #将头结点的next指针指向None
        first.next = None
        return self.lastNode
        
if __name__ == "__main__":
    the_listnode = ListNode(0)
    tmp = the_listnode
    for i in range(1, 11):
        tmp.next = ListNode(i)
        tmp = tmp.next
    the_listnode = the_listnode.next
    
    a = Solution()
    b = a.ReverseList(the_listnode)
    
    for i in range(15):
        try:
            print b.val
            b = b.next
        except AttributeError,e:
            print u"后面木有了"