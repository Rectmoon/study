/* 
思路
  将左侧序列看成一个有序序列，每次将一个数字插入该有序序列。
  插入时，从有序序列最右侧开始比较，若比较的数较大，后移一位。

复杂度
  时间复杂度：O(n2)
  空间复杂度:O(1)

稳定性
  稳定
*/

function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

function insertSort(arr, desc = false) {
  console.time('insertSort')
  for (let i = 1, len = arr.length; i < len; i++) {
    let targetIndex = i
    for (let j = i - 1; j >= 0; j--) {
      const shouldSwap = desc ? arr[targetIndex] > arr[j] : arr[targetIndex] < arr[j]
      if (shouldSwap) {
        swap(arr, targetIndex, j)
        targetIndex = j
      } else break
    }
  }
  console.timeEnd('insertSort')
  return arr
}

console.log(insertSort([1, 3, 2, 0, 5]))
console.log(insertSort([1, 3, 2, 6, 5]))
console.log(insertSort([1, 3, 2, 6, 5], true))
