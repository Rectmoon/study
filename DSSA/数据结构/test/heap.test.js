const MaxHeap = require('../7.heap')

const mh = new MaxHeap()

mh.insert(2)
mh.insert(5)
mh.insert(3)
mh.insert(1)
mh.insert(10)
mh.insert(4)

// console.log(mh.sort())

console.log(mh)

mh.remove()
console.log(mh)
