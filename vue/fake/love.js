function Love(options) {
  let z = this
  this.data = options.data || {}
  this.methods = options.methods || {}
  Object.keys(this.data).forEach(function(k) {
    z.proxyKeys(k)
  })
  observe(this.data)
  new Compile(options.el, this)
  options.mounted.call(this)
}

Love.prototype = {
  proxyKeys: function(k) {
    let z = this
    Object.defineProperty(this, k, {
      enumberable: false,
      configurable: true,
      get: function() {
        return z.data[k]
      },
      set: function(newValue) {
        z.data[k] = newValue
      }
    })
  }
}
