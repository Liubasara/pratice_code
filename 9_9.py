for i in range(1,10):
    for j in range(1,i+1):
        print('%d*%d=%s' %(j,i,i*j), end=' ')
    print('')
    
print('\n'.join([' '.join(['%d*%d=%s' %(y,x,x*y) for y in range(1,x+1)])for x in range(1,10)]))