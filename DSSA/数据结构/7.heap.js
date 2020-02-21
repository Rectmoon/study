//--------------------------------------------------------------------------
// 特点: 1. 完全二叉树  2. parent > child
// 假设当前元素下标为 i
// 则parent下标为  Math.floor( (i - 1) / 2 )
// left   :   2 * i + 1
// right  :   2 * i + 2
//--------------------------------------------------------------------------

function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

class MaxHeap {
  constructor() {
    this.collections = []
  }

  insert(value) {
    const { collections } = this
    collections.push(value)
    if (collections.length > 1) {
      let lastIndex = collections.length - 1
      let parentIndex = Math.floor((lastIndex - 1) / 2)
      for (let i = parentIndex; i >= 0; i--) {
        this._heapify(collections, collections.length, i)
      }
    }
  }

  remove() {
    const { collections } = this
    const lastIndex = collections.length - 1
    swap(collections, lastIndex, 0)
    this._heapify(collections, lastIndex, 0)
    return collections.pop()
  }

  // 堆排序是排序算法中的一种，算法时间复杂度是O(n log(n))
  sort() {
    const arr = this.collections.slice()
    for (let i = arr.length - 1; i >= 0; i--) {
      swap(arr, i, 0)
      this._heapify(arr, i, 0)
    }
    return arr
  }

  _heapify(arr, n, i) {
    let c1 = 2 * i + 1
    let c2 = 2 * i + 2
    let max = i
    if (c1 < n && arr[c1] > arr[max]) max = c1
    if (c2 < n && arr[c2] > arr[max]) max = c2
    if (max !== i) swap(arr, max, i)
  }
}

module.exports = MaxHeap
