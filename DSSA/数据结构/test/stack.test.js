const MyStack = require('../1.stack')

const s = new MyStack()
s.push(1111)
console.log(999, s.push(222))
console.log(999, s.push(333))
console.log(s)
console.log(s.size())
console.log(s.peek())
s.push('lzx')
s.push('zly')
s.pop()
console.log(s)
console.log(s.size())
console.log(s.peek())
