# -*- coding:utf-8 -*-
import multiprocessing
import hashlib
def thread_func():
    while True:
        pass
if __name__ == "__main__":
    """
    好热热
    """
    cpus = 5
    t = []
    for i in range(0,cpus):
        thread = multiprocessing.Process(target = thread_func)
        thread.start()
        print i
        t.append(thread)
    for i in range(0,cpus):
        t[i].join()