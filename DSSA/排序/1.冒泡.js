/**
思路
  循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。
  这样一次循环之后最后一个数就是本数组最大的数。
  下一次循环继续上面的操作，不循环已经排序好的数。
  优化：当一次循环没有发生冒泡，说明已经排序完成，停止循环。

复杂度
  时间复杂度：O(n2)
  空间复杂度: O(1)

稳定性
  稳定 
*/

function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

function bubbleSort(arr, desc = false) {
  // 方向一
  /* 
    for (let i = 0, len = arr.length; i < len - 1; i++) {
      let done = true
      for (let j = 0; j < len - 1 - i; j++) {
        const shouldSwap = desc ? arr[j + 1] > arr[j] : arr[j + 1] < arr[j]
        if (shouldSwap) {
          swap(arr, j + 1, j)
          done = false
        }
      }
      if (done) break
    }
 */
  // 方向二
  console.time('bubbleSort')
  for (let i = arr.length - 1; i > 0; i--) {
    let done = true
    for (let j = 0; j < i; j++) {
      const shouldSwap = desc ? arr[j + 1] > arr[j] : arr[j + 1] < arr[j]
      if (shouldSwap) {
        swap(arr, j + 1, j)
        done = false
      }
    }
    if (done) break
  }
  console.timeEnd('bubbleSort')
  return arr
}

console.log(bubbleSort([1, 3, 2, 0, 5]))
console.log(bubbleSort([1, 3, 2, 6, 5]))
console.log(bubbleSort([1, 3, 2, 6, 5], false))
console.log(bubbleSort([1, -1, 0, 6, 5], true))
console.log(bubbleSort([1, 2, 3, 4, 5, 6]))
console.log(bubbleSort([1, 2, 3, 4, 5, 6], true))
