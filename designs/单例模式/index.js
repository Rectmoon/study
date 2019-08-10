const getSingleton = (function() {
  let instance
  return function(fn) {
    return instance || (instance = fn.apply(this, arguments))
  }
})()

const createDom = function() {
  const el = document.createElement('div')
  el.style.display = 'none'
  return el
}

const Alert = (function() {
  let instance
  let el

  function Alert(content) {
    instance = instance || (this instanceof Alert ? this : new Alert(content))
    instance.init(content)
    return instance
  }

  Alert.prototype.init = function(content) {
    el = getSingleton(createDom)
    el.innerHTML = content
    el.style.display = 'block'
    document.body.appendChild(el)
  }

  Alert.prototype.hide = function() {
    el && (el.style.display = 'none')
  }

  return Alert
})()

window.onload = function() {
  const a1 = new Alert(11)
  const a2 = new Alert(22)

  a1.hide()
  console.log(a1 == a2)
  Alert(444)
}
