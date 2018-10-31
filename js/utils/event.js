export default class Event {
  constructor() {
    this.listeners = {}
  }

  on(type, callback) {
    let cbs = this.listeners[type] || []
    cbs.push(callback)
    this.listeners[type] = cbs
    return this
  }

  off(type, callback) {
    let cbs = this.listeners[type] || []
    this.listeners[type] = cbs.filter(fn => fn !== callback)
    return this
  }

  once(type, callback) {
    let f = (...args) => {
      callback.apply(this, args)
      this.off(type, f)
    }
    this.on(type, f)
    return this
  }

  emit(type, ...params) {
    let cbs = this.listeners[type] || []
    cbs.forEach(cb => {
      cb.apply(this, params)
    })
    return this
  }
}

// test
// const e = new Event()

// function a() {
//   console.log(arguments)
//   console.log('a')
// }

// function b() {
//   console.log(arguments)
//   console.log('b')
// }

// function c() {
//   console.log(arguments)
//   console.log('c')
// }

// e.on('a', a)
//   .on('b', b)
//   .once('c', c)

// e.emit('a', 123)
//   .emit('b', 456)
//   .emit('c', 789)

// e.emit('a', 123)
//   .emit('b', 456)
//   .emit('c', 789)
