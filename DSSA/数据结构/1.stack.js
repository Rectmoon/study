class MyStack {
  constructor() {
    this.count = 0
    this.storage = {}
  }

  push(value) {
    this.storage[this.count++] = value
    return this.count
  }

  pop() {
    if (this.count === 0) return
    const result = this.storage[--this.count]
    delete this.storage[this.count]
    return result
  }

  size() {
    return this.count
  }

  peek() {
    return this.storage[this.count - 1]
  }
}

module.exports = MyStack
