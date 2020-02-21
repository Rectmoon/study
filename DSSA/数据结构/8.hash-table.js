const LinkedList = require('./5.linkedlist')

function getHashCode(key) {
  let hash = 0
  for (const codePoint of key) {
    hash += codePoint.charCodeAt()
  }
  return hash % 37
}

// function getBetterHashCode(key) {
//   let hash = 5381
//   for (const codePoint of key) {
//     hash = hash * 33 + codePoint.charCodeAt()
//   }
//   return hash % 1013
// }

function getLimitHashCode(str, limit) {
  let hash = 0
  for (let index in str) {
    hash += str.charCodeAt(index)
  }
  return hash % limit
}

class HashTable {
  constructor(limit) {
    this.table = []
    this.limit = limit
  }

  put(key, value) {
    const position = getLimitHashCode(key, this.limit)
    const theValueInTable = this.table[position] || []
    let inserted = false
    for (let i = 0, len = theValueInTable.length; i < len; i++) {
      if (theValueInTable[i][0] === key) {
        theValueInTable[i][1] = value
        inserted = true
      }
    }
    !inserted && theValueInTable.push([key, value])
    this.table[position] = theValueInTable
  }

  remove(key) {
    const position = getLimitHashCode(key, this.limit)
    const theTableValue = this.table[position] || []
    let removed = false
    if (theTableValue.length === 1 && theTableValue[0][0] === key) {
      delete this.table[position]
      removed = true
    } else {
      for (let i = 0, len = theTableValue.length; i < len; i++) {
        if (theTableValue[i][0] === key) {
          delete theTableValue[i]
          removed = true
          break
        }
      }
    }
    return removed
  }

  get(key) {
    const position = getLimitHashCode(key, this.limit)
    const theValueInTable = this.table[position] || []
    if (!theValueInTable.length) return null
    for (let i = 0, len = theValueInTable.length; i < len; i++) {
      if (theValueInTable[i][0] === key) return theValueInTable[i][1]
    }
  }
}

class LinkAbleHashTable {
  constructor() {
    this.table = []
  }

  put(key, value) {
    const position = getHashCode(key)
    let theTableValue = this.table[position]
    if (!theTableValue) {
      theTableValue = new LinkedList()
      theTableValue.add({ key, value })
    } else {
      let currNode = theTableValue.getHead()
      let inserted = false
      while (currNode.next) {
        currNode = currNode.next
        if (currNode.element.key === key) {
          currNode.element.value = value
          inserted = true
          break
        }
      }
      !inserted && theTableValue.add({ key, value })
    }
    this.table[position] = theTableValue
  }

  get(key) {
    const position = getHashCode(key)
    const theTableValue = this.table[position]
    if (theTableValue === undefined) return null
    const getElementValue = node => {
      if (!node || !node.element) return null
      if (node.element.key === key) return node.element.value
      return getElementValue(node.next)
    }
    return getElementValue(theTableValue.head)
  }

  remove(key) {
    const position = getHashCode(key)
    const theTableValue = this.table[position]
    if (theTableValue === undefined) return false
    const findAndRemoveNode = node => {
      if (!node || !node.element) return false
      if (node.element.key === key) {
        theTableValue.remove(node.element)
        if (theTableValue.isEmpty()) delete this.table[position]
        return true
      }
      return findAndRemoveNode(node.next)
    }
    return findAndRemoveNode(theTableValue.head)
  }
}

module.exports = {
  HashTable,
  LinkAbleHashTable
}
