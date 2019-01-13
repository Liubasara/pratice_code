# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution(object):
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        list1 = self.readListNode(l1)
        list1.reverse()
        list2 = self.readListNode(l2)
        list2.reverse()
        l1Num = int(''.join(str(x) for x in list1))
        l2Num = int(''.join(str(x) for x in list2))
        targetNum = l1Num + l2Num
        targetList = list(str(targetNum))
        targetList.reverse()
        finallyList = [int(x) for x in targetList]
        return finallyList

        
    def readListNode(self, nodeList):
        nodeArray = []
        tmp = nodeList
        if tmp.val or tmp.val == 0:
            nodeArray.append(tmp.val)
        if tmp.next:
            tmp2 = tmp.next
            nodeArray.extend(self.readListNode(tmp2))
            return nodeArray
        return nodeArray
        
            
if __name__ == "__main__":
    a = Solution()
    b = ListNode(0)
    # b.next = ListNode(2)
    # tmpB = b.next
    # tmpB.next = ListNode(3)
    c = ListNode(0)
    # c.next = ListNode(5)
    # tmpC = c.next
    # tmpC.next = ListNode(6)
    print(a.addTwoNumbers(b, c))