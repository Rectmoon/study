const { HashTable } = require('../8.hash-table')

const ht = new HashTable(15)

ht.put('Tyrion', 'tyrion@email.com')
// ht.put('Tyrion123', '123456')
// ht.put('Aaron', 'aaronOemail.com')
ht.put('Aaron', 'aaronOemail.com123')
ht.put('Aaron', 'aaronOemail.666')
ht.put('Aaron', 'aaronOemail.999')
ht.put('Aaron1', 'aaronOemail.888')
ht.put('Aaron12', 'aaronOemail.888222')

ht.remove('Aaron')

console.log(ht.table)
console.log(ht.get('Tyrion'))
console.log(ht.get('Aaron'))
console.log(ht.get('Aaron1'))
console.log(ht.get('Aaron12'))
// ht.put('Aaron', 'aaronOemail.000')

// console.log(ht.table)
// console.log(ht.get('Aaron'))
// console.log(ht.table)
// console.log(ht.table[16])
// console.log(ht.table[16].head.next)

// ht.remove('Aaron')

// console.log(ht.get('Aaron'))
