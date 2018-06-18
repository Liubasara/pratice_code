gcount = 0

def global_test():
    print (gcount)
    
def global_counter():
    global gcount
    gcount +=1
    return gcount
    
def global_counter_test():
    print(global_counter())
    print(global_counter())
    print(global_counter())
    
def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
        exce
    return counter
    
def make_counter_test():
  mc = make_counter()
  print(mc())
  print(mc())
  print(mc())
    
if __name__ == "__main__":
    global_test()
    global_counter_test()
    print("---------------------------------\n")
    make_counter_test()