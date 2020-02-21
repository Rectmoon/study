function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

function heapify(arr, n, i, desc = false) {
  let c1 = 2 * i + 1
  let c2 = 2 * i + 2
  let targetIndex = i
  if (c1 < n) {
    const shouldSwapC1 = !desc ? arr[c1] > arr[targetIndex] : arr[c1] < arr[targetIndex]
    shouldSwapC1 && (targetIndex = c1)
  }
  if (c2 < n) {
    const shouldSwapC2 = !desc ? arr[c2] > arr[targetIndex] : arr[c2] < arr[targetIndex]
    shouldSwapC2 && (targetIndex = c2)
  }
  if (targetIndex !== i) swap(arr, targetIndex, i)
}

function buildHeap(arr, n, isMinHeap) {
  const lastIndex = n - 1
  const parentIndex = Math.floor((lastIndex - 1) / 2)
  for (let i = parentIndex; i >= 0; i--) {
    heapify(arr, n, i, isMinHeap)
  }
}

function heapSort(arr, desc = false) {
  console.time('heapSort')
  buildHeap(arr, arr.length, desc)
  for (let i = arr.length - 1; i >= 0; i--) {
    swap(arr, i, 0)
    heapify(arr, i, 0, desc)
  }
  console.timeEnd('heapSort')
  return arr
}

console.log(heapSort([1, 3, 2, 0, 5]))
console.log(heapSort([1, 3, 2, 6, 5]))
console.log(heapSort([1, 3, 2, 6, 5], true))
