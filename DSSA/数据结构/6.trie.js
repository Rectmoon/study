class Node {
  constructor() {
    this.dict = new Map()
    this.done = false
  }

  set end(flag = true) {
    this.done = flag
  }

  get end() {
    return this.done
  }
}

class Trie {
  constructor() {
    this.root = new Node()
  }

  add(input, node = this.root) {
    if (input.length === 0) {
      node.end = true
    } else {
      if (!node.dict.has(input[0])) node.dict.set(input[0], new Node())
      this.add(input.substr(1), node.dict.get(input[0]))
    }
  }

  isWord(word) {
    let node = this.root
    while (word.length > 1) {
      if (!node.dict.has(word[0])) return false
      node = node.dict.get(word[0])
      word = word.substr(1)
    }
    return node.dict.has(word) && node.dict.get(word).end
  }

  print() {
    let words = []
    function search(node, str) {
      if (node.dict.size !== 0) {
        for (const [letter, subNode] of node.dict.entries()) {
          search(subNode, str.concat(letter))
        }
        node.end && words.push(str)
      } else {
        str.length > 0 && words.push(str)
      }
    }
    search(this.root, '')
    return words.length ? words : null
  }
}

module.exports = Trie
