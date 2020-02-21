class MyQueue {
  constructor() {
    this.collections = []
  }

  print() {
    console.log(this.collections)
  }

  size() {
    return this.collections.length
  }

  isEmpty() {
    return this.size() === 0
  }

  enqueue(el) {
    this.collections.push(el)
    return this.size()
  }

  dequeue() {
    return this.collections.shift()
  }

  first() {
    return this.collections[0]
  }
}

class PriorityQueue extends MyQueue {
  constructor() {
    super()
  }

  enqueue(el) {
    if (this.isEmpty()) {
      this.collections.push(el)
    } else {
      let done = false
      for (let i = 0, len = this.collections.length; i < len; i++) {
        if (el[1] > this.collections[i][1]) {
          this.collections.splice(i, 0, el)
          done = true
          break
        }
      }
      if (!done) this.collections.push(el)
    }
  }

  dequeue() {
    return this.collections.shift()[0]
  }

  first() {
    return this.collections[0][0]
  }
}

module.exports = MyQueue
