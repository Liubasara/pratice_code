# -*- coding:utf-8 -*-
class Node:
    def __init__(self, x, next=None):
        self.value = x
        self.next = next

def Creatlist(n):  
    if n<=0:  
        return False  
    if n==1:  
        return Node(1)    # 只有一个节点  
    else:  
        root=Node(1)  
        tmp=root  
        for i in range(2,n+1):       #  一个一个的增加节点  
            tmp.next=Node(i)
            tmp=tmp.next
    print root.next
    return root            # 返回根节点  
    
    
def printlist(head):       # 打印链表  
    p=head
    while p!=None:  
        print p.value
        p=p.next
        
if __name__ == "__main__":
    head = Creatlist(7)
    printlist(head)
        