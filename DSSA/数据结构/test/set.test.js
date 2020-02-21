const MySet = require('../2.set')

const s1 = new MySet()
const s2 = new MySet()

s1.add('-1')
s1.add('0')
s1.add('1')
s2.add('1')
s2.add('2')
s2.add('3')
s2.add('4')
s2.add('5')
s2.add('6')

console.log(s1.issubSetFrom(s2))
console.log(s1.union(s2).values())
console.log(s1.intersection(s2).values())
console.log(s1.difference(s2).values())
