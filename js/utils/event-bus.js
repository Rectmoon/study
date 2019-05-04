function EventBus() {
  this.handlers = {}
}

EventBus.prototype = {
  constructor: EventBus,

  on: function(type, fn) {
    var a = this.handlers[type] || []
    a.push(fn)
    this.handlers[type] = a
    return this
  },

  off: function(type, fn) {
    if (!fn) {
      this.handlers[type] = []
    } else {
      if (fn instanceof Array) {
        for (var i = 0, len = fn.length; i < len; i++) this.off(type, fn[i])
      } else {
        var a = this.handlers[type] || []
        for (var i = 0, len = a.length; i < len; i++) if (a[i] === fn) break
        a.splice(i, 1)
      }
    }
    return this
  },

  once: function(type, fn) {
    var z = this
    var f = function() {
      fn.apply(z, arguments)
      z.off(type, f)
    }
    this.on(type, f)
    return this
  },

  emit: function(type) {
    var a = this.handlers[type] || []
    var args = Array.prototype.slice.call(arguments, 1)
    for (var i = 0, len = a.length; i < len; i++)
      typeof a[i] === 'function' && a[i].apply(this, args)
    return this
  },

  fire: function(event) {
    if (!event.target) event.target = this
    var a = this.handlers[event.type] || []
    for (var i = 0, len = a.length; i < len; i++) {
      typeof a[i] === 'function' && a[i](event)
    }
  }
}

export default EventBus
