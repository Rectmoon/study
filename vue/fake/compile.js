function Compile(el, vm) {
  this.vm = vm
  this.el = document.querySelector(el)
  this.fragment = null
  this.init()
}

Compile.prototype = {
  init: function() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    } else {
      console.log('el元素不存在')
    }
  },
  nodeToFragment: function(el) {
    let fragment = document.createDocumentFragment(),
      child = el.firstChild
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  },
  compileElement: function(el) {
    let childNodes = el.childNodes,
      z = this
    ;[].slice
      .call(childNodes)
      .forEach(function(node) {
        let reg = /\{\{(.*)\}\}/,
          text = node.textContent
        if (z.isElementNode(node)) z.compile(node)
        else if (
          z.isTextNode(node) &&
          reg.test(text)
        )
          z.compileText(node, reg.exec(text)[1])
        if (
          node.childNodes &&
          node.childNodes.length
        )
          z.compileElement(node)
      })
  },
  compile: function(node) {
    let attrs = node.attributes,
      z = this
    ;[].slice.call(attrs).forEach(function(attr) {
      let attrName = attr.name
      if (z.isDirective(attrName)) {
        let exp = attr.value,
          dir = attrName.substring(2)
        if (z.isEventDirective(dir))
          z.compileEvent(node, z.vm, exp, dir)
        else z.compileModel(node, z.vm, exp, dir)
        node.removeAttribute(attrName)
      }
    })
  },
  compileText: function(node, exp) {
    let z = this,
      text = this.vm[exp]
    this.updateText(node, text)
    new Watcher(this.vm, exp, function(value) {
      z.updateText(node, value)
    })
  },
  compileEvent: function(node, vm, exp, dir) {
    let eventType = dir.split(':')[1],
      cb = vm.methods && vm.methods[exp]
    if (eventType && cb)
      node.addEventListener(
        eventType,
        cb.bind(vm),
        false
      )
  },
  compileModel: function(node, vm, exp, dir) {
    let z = this,
      value = this.vm[exp]
    this.modelUpdate(node, value)
    new Watcher(this.vm, exp, function(value) {
      z.modelUpdate(node, value)
    })
    node.addEventListener('input', function(e) {
      let newValue = e.target.value
      if (newValue === value) return
      z.vm[exp] = newValue
    })
  },
  updateText: function(node, value) {
    node.textContent =
      typeof value == 'undefined' ? '' : value
  },
  modelUpdate: function(node, value) {
    node.value =
      typeof value == 'undefined' ? '' : value
  },
  isDirective: function(attr) {
    return attr.indexOf('v-') == 0
  },
  isEventDirective: function(attr) {
    return attr.indexOf('on:') == 0
  },
  isElementNode: function(node) {
    return node.nodeType == 1
  },
  isTextNode: function(node) {
    return node.nodeType == 3
  }
}
