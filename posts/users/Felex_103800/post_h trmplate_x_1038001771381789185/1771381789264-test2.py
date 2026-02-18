##Binary search!!

  
def bin_search(target, arr):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        print("mid man:", mid)
        if arr[mid] == target:
            return arr[mid]
        elif target > arr[mid]:
            low = mid + 1      # move right
            print("low:", arr[low:high])
        else:
            high = mid - 1     # move left
            print("high:", arr[low:high])

    return False
arr = []
for i in range(1000):
    arr.append(i)
    
print(bin_search(499, arr))
    