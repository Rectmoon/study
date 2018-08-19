function Observer(data) {
  this.data = data
  this.init(data)
}

Observer.prototype = {
  init: function(data) {
    let z = this
    Object.keys(data).forEach(function(k) {
      z.defineReactive(data, k, data[k])
    })
  },
  defineReactive: function(data, key, value) {
    const dep = new Dep()
    observe(value)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        if (Dep.target) dep.addSub(Dep.target)
        return value
      },
      set: function(newValue) {
        if (newValue === value) return
        value = newValue
        console.log(
          '属性' +
            key +
            '已经被监听了，现在值为：“' +
            newValue.toString() +
            '”'
        )
        dep.notify()
      }
    })
  }
}

function observe(obj) {
  if (!obj || typeof obj !== 'object') return
  return new Observer(obj)
}

function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub)
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}

Dep.target = null
