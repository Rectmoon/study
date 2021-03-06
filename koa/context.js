const context = {}
// 定义获取器
function defineGetter(key, property) {
  context.__defineGetter__(property, function() {
    return this[key][property]
  })
}
// 定义设置器
function defineSetter(key, property) {
  context.__defineSetter__(property, function(val) {
    this[key][property] = val
  })
}
// 代理 request
defineGetter('request', 'path')
defineGetter('request', 'url')
defineGetter('request', 'query')
// 代理 response
defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = context
