const EventUtil = {
  addHandler: function(el, type, handler) {
    if (el.addEventListener) el.addEventListener(type, handler, false)
    else if (el.attachEvent) el.attachEvent('on' + type, handler)
    else el['on' + type] = handler
  },

  getEvent: function(event) {
    return event || window.event
  },

  getTarget: function(event) {
    return event.target || event.srcElement
  },

  preventDefault: function(event) {
    if (event.preventDefault) event.preventDefault()
    else event.returnValue = false
  },

  stopPropagation: function(event) {
    if (event.stopPropagation) event.stopPropagation()
    else event.cancelBubble = true
  },

  removeHandler: function(el, type, handler) {
    if (el.removeEventListener) el.removeEventListener(type, handler, false)
    else if (el.detachEvent) el.detachEvent('on' + type, handler)
    else el['on' + type] = null
  }
}

export default EventUtil
