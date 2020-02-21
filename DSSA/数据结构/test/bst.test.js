const BST = require('../4.bst')

const bst = new BST()

bst.add(4)
bst.add(2)
bst.add(6)
bst.add(1)
bst.add(7)
bst.add(3)
bst.add(5)

bst.add(8)
console.log(bst.findMin())
console.log(bst.findMax())
console.log(bst.find(1))
console.log(bst.has(1))
console.log(bst.has(111))
console.log(bst)

// bst.remove(1)
console.log(bst.has(1))

console.log(111, bst.levelOrder())
console.log(666, bst.postOrder())

console.log(bst.getMaxWidth())
