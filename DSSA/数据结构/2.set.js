class MySet {
  constructor() {
    this.collections = []
  }

  has(el) {
    return this.collections.indexOf(el) !== -1
  }

  values() {
    return this.collections
  }

  add(el) {
    if (!this.has(el)) {
      this.collections.push(el)
      return true
    }
    return false
  }

  remove(el) {
    if (this.has(el)) {
      const index = this.collections.indexOf(el)
      this.collections.splice(index, 1)
      return true
    }
    return false
  }

  size() {
    return this.collections.length
  }

  // 并集
  union(otherSet) {
    const unionSet = new MySet()
    const firstSet = this.values()
    const secondSet = otherSet.values()
    firstSet.forEach(el => unionSet.add(el))
    secondSet.forEach(el => unionSet.add(el))
    return unionSet
  }

  // 交集
  intersection(otherSet) {
    const intersectSet = new MySet()
    const firstSet = this.values()
    firstSet.forEach(el => otherSet.has(el) && intersectSet.add(el))
    return intersectSet
  }

  difference(otherSet) {
    const differenceSet = new MySet()
    const firstSet = this.values()
    firstSet.forEach(el => !otherSet.has(el) && differenceSet.add(el))
    return differenceSet
  }

  issubSetFrom(otherSet) {
    const firstSet = this.values()
    return firstSet.every(el => otherSet.has(el))
  }
}

module.exports = MySet
