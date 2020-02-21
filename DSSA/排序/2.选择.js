/* 
思路
  每次循环选取一个最小的数字放到前面的有序序列中。

复杂度
  时间复杂度：O(n2)
  空间复杂度:O(1)

稳定性
  不稳定
*/
function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

function selectSort(arr, desc = false) {
  console.time('selectSort')
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      const shouldSwap = desc ? arr[j] > arr[i] : arr[j] < arr[i]
      shouldSwap && swap(arr, i, j)
    }
  }
  console.timeEnd('selectSort')
  return arr
}

console.log(selectSort([1, 3, 2, 0, 5]))
console.log(selectSort([1, 3, 2, 6, 5]))
console.log(selectSort([1, 3, 2, 6, 5], true))
