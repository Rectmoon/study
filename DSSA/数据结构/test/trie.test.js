const Trie = require('../6.trie')

const t1 = new Trie()

t1.add('bal')
t1.add('ball')
t1.add('bat')
t1.add('fat')
t1.add('fantasy')

console.log(t1.isWord('ball'))
console.log(t1.isWord('bal'))

console.log(t1.print())
