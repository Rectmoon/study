import _ from 'underscore'
import $ from 'jquery'

export default class AbstractView {
  constructor() {
    this.id = _.uniqueId('page-view-')
    this.$el = $('#main')
    this.events = {
      'click #main': 'clickDemoFn'
    }
  }

  show() {
    this.$el.show()
    this.bindEvents()
  }

  bindEvents() {
    var events = this.events
    if (!(events || (events = _.result(this, 'events')))) return this
    this.unBindEvents()
    var delegateEventSplitter = /^(\S+)\s*(.*)$/
    var k, method, match, eventName, selector
    for (k in events) {
      method = events[k]
      if (!_.isFunction(method)) method = this[events[k]]
      if (!method) continue
      match = k.match(delegateEventSplitter)
      ;(eventName = match[1]), (selector = match[2])
      method = _.bind(method, this)
      eventName += '.delegateUIEvents' + this.id
      if (selector == '') this.$el.on(eventName, method)
      else this.$el.on(eventName, selector, method)
    }
    return this
  }

  unBindEvents() {
    this.$el.off('.delegateUIEvents' + this.id)
    return this
  }

  clickDemoFn() {
    console.log(1)
  }
}
