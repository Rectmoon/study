class Node {
  constructor(data, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

function searchTree(node, data) {
  if (data < node.data) {
    if (node.left !== null) return searchTree(node.left, data)
    node.left = new Node(data)
  } else if (data > node.data) {
    if (node.right !== null) return searchTree(node.right, data)
    node.right = new Node(data)
  }
}

function removeNode(node, data) {
  if (node === null) return null
  if (data === node.data) {
    if (node.left === null && node.right === null) return null
    if (node.left === null) return node.right
    if (node.right === null) return node.left
    let tmp = node.right
    while (tmp.left !== null) tmp = tmp.left
    node.data = tmp.data
    node.right = removeNode(node.right, tmp.data)
  } else if (data < node.data) {
    node.left = removeNode(node.left, data)
  } else {
    node.right = removeNode(node.right, data)
  }
  return node
}

class BST {
  constructor() {
    this.root = null
  }

  add(data) {
    const { root } = this
    if (root !== null) return searchTree(root, data)
    this.root = new Node(data)
  }

  findMin() {
    let current = this.root
    if (current) {
      while (current.left !== null) current = current.left
      return current.data
    }
  }

  findMax() {
    let current = this.root
    if (current) {
      while (current.right !== null) current = current.right
      return current.data
    }
  }

  find(data) {
    let current = this.root
    if (current) {
      while (current.data !== data) {
        current = data < current.data ? current.left : current.right
      }
    }
    return current
  }

  has(data) {
    let current = this.root
    while (current) {
      if (data === current.data) return true
      if (data < current.data) current = current.left
      else current = current.right
    }
    return false
  }

  remove(data) {
    this.root = removeNode(this.root, data)
  }

  findMinHeight(node = this.root) {
    if (node == null) return -1
    const theLeftNodeHeight = this.findMinHeight(node.left)
    const theRightNodeHeight = this.findMinHeight(node.right)
    return 1 + Math.min(theLeftNodeHeight, theRightNodeHeight)
  }

  findMaxHeight(node = this.root) {
    if (node == null) return -1
    const theLeftNodeHeight = this.findMinHeight(node.left)
    const theRightNodeHeight = this.findMinHeight(node.right)
    return 1 + Math.max(theLeftNodeHeight, theRightNodeHeight)
  }

  //  前序遍历：根结点 ---> 左子树 ---> 右子树
  preOrder() {
    if (this.root === null) return null
    const result = []
    function traversePreOrder(node) {
      result.push(node.data)
      node.left && traversePreOrder(node.left)
      node.right && traversePreOrder(node.right)
    }
    traversePreOrder(this.root)
    return result
  }
  //  中序遍历：左子树---> 根结点 ---> 右子树
  inOrder() {
    if (this.root === null) return null
    const result = []
    function traverseInOrder(node) {
      node.left && traverseInOrder(node.left)
      result.push(node.data)
      node.right && traverseInOrder(node.right)
    }
    traverseInOrder(this.root)
    return result
  }
  // 后序遍历：左子树 ---> 右子树 ---> 根结点
  postOrder() {
    if (this.root === null) return null
    const result = []
    function traversePostOrder(node) {
      node.left && traversePostOrder(node.left)
      node.right && traversePostOrder(node.right)
      result.push(node.data)
    }
    traversePostOrder(this.root)
    return result
  }
  // 层次遍历：仅仅需按层次遍历就可以
  levelOrder() {
    if (this.root === null) return null
    const result = []
    const queue = []
    queue.push(this.root)
    while (queue.length > 0) {
      const { left, right, data } = queue.shift()
      result.push(data)
      left && queue.push(left)
      right && queue.push(right)
    }
    return result
  }

  /**
    算出第一层的结点数，保存
    算出第二层的结点数，保存一二层中较大的结点数
    重复以上过程
   */
  getMaxWidth(node = this.root) {
    if (node === null) return 0
    let max = 1,
      deep = 1
    const queue = [node]
    while (queue.length) {
      while (deep--) {
        const { left, right } = queue.shift()
        left && queue.push(left)
        right && queue.push(right)
      }
      console.log(queue)
      deep = queue.length
      max = Math.max(deep, max)
    }
    return max
  }
}

module.exports = BST
