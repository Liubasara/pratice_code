inp = input().split()
start = int(inp[0])
end = int(inp[1])
number = int(inp[2])
count = 0
for i in range(start, end+1):
    if i%number == 0:
        count += 1
print(count)