#coding:utf-8
  
def Before(request,kargs):
    print 'before'
      
def After(request,kargs):
    print 'after'
  
  
def Filter(before_func,after_func):
    
    def outer(main_func):
        def wrapper(request,kargs):
              
            before_result = before_func(request,kargs)
            if(before_result != None):
                return before_result;
              
            main_result = main_func(request,kargs)
            if(main_result != None):
                return main_result;
              
            after_result = after_func(request,kargs)
            if(after_result != None):
                return after_result;
              
        return wrapper
    #print u'你好'
    return outer
      
@Filter(Before, After)
def Index(request,kargs):
    print 'index'
    
if __name__ == "__main__":
    a = Index(1,2)