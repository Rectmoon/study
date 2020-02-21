const { LinkAbleHashTable } = require('../8.hash-table')

const ht = new LinkAbleHashTable(15)

ht.put('Tyrion', 'tyrion@email.com')
// ht.put('Tyrion123', '123456')
// ht.put('Aaron', 'aaronOemail.com')
ht.put('Aaron', 'aaronOemail.com123')
ht.put('Aaron', 'aaronOemail.666')
ht.put('Aaron', 'aaronOemail.999')
// ht.put('Aaron', 'aaronOemail.000')

// console.log(ht.table)
// console.log(ht.get('Aaron'))
// console.log(ht.table)
console.log(ht.table[16])
console.log(ht.table[16].head.next)

// ht.remove('Aaron')

console.log(ht.get('Aaron'))
