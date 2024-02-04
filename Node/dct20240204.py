#!/usr/bin/env python3
def make_functions():
    flist = []

    for i in [1, 2, 3]:
        def print_i(i):
            print(i)
        flist.append((print_i, i))

    return flist

functions = make_functions()
for f,j in functions:
    f(j)