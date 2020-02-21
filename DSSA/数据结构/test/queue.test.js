const MyQueue = require('../3.queue')

const q = new MyQueue()

q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
q.dequeue()

console.log(q)
console.log(q.size())
console.log(q.isEmpty())

const pq = new PriorityQueue()
pq.enqueue(['a', 1])
pq.enqueue(['b', 3])
pq.enqueue(['c', 2])
pq.print()
console.log(pq.first())
console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())

pq.print()
