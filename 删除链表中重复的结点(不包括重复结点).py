# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
        
class Solution:
    def deleteDuplication(self, pHead):
        # write code here
        if pHead == None or pHead.next == None:
            return pHead
        new_pHead = ListNode('-1')
        new_pHead.next = pHead
        pre = new_pHead
        p = pHead
        p_next = None
        while p != None and p.next != None:
            p_next = p.next
            if p.val == p_next.val:
                while p_next != None and p.val == p_next.val:
                    p_next = p_next.next
                pre.next = p_next
                p = p_next
            else:
                pre = p
                p = p.next
        return new_pHead.next
        
            
        
lian_biao_first = ListNode('1')

lian_biao_first.next = ListNode('2')
lian_biao_second = lian_biao_first.next

lian_biao_second.next = ListNode('2')
lian_biao_third = lian_biao_second.next

lian_biao_third.next = ListNode('4')
lian_biao_fourth = lian_biao_third.next

lian_biao_fourth.next = ListNode('5')
lian_biao_fifth = lian_biao_fourth.next

lian_biao_fifth.next = ListNode('5')
lian_biao_sixth = lian_biao_fifth.next

lian_biao_sixth.next = ListNode('5')
lian_biao_seventh = lian_biao_sixth.next

lian_biao_seventh.next = ListNode('6')
lian_biao_eigth = lian_biao_seventh.next

 
tmp = lian_biao_first
while tmp:
    print tmp.val
    tmp = tmp.next
print '-----------------------\n'

new_pHead = ListNode('-1')
new_pHead.next = lian_biao_first

tmp_new = new_pHead
tmp = lian_biao_first
while tmp != None and tmp.next != None:
    tmp_next = tmp.next
    if tmp.val == tmp_next.val:
        while tmp_next != None and tmp.val == tmp_next.val:
            tmp_next = tmp_next.next
        tmp_new.next = tmp_next
        tmp = tmp_next
    else:
        tmp_new = tmp
        tmp = tmp.next
        
test_tmp = new_pHead.next
while test_tmp:
    print test_tmp.val
    test_tmp = test_tmp.next
    
    
    
    
    
    


