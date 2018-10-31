const oproto = Object.prototype

export function getType(o) {
  return oproto.toString
    .call(o)
    .slice(8, -1)
    .toLowerCase()
}

export const isNull = o => getType(o) === 'null'
export const isUndefined = o => getType(o) === 'undefined'
export const isBoolean = o => getType(o) === 'boolean'
export const isFunction = o => getType(o) === 'function'
export const isArray = o => getType(o) === 'array'
export const isString = o => getType(o) === 'string'
export const isNumber = o => getType(o) === 'number'
export const isObject = o => getType(o) === 'object'
export function isPlaneObject(o) {
  return getType(o) === 'object' && Object.getPrototypeOf(o) === oproto
}

export function inherit(origin) {
  if (arguments.length === 0 || arguments.length > 2) throw '参数错误'
  var parent = null
  var properties = slice.call(arguments)
  if (typeof properties[0] === 'function') parent = properties.shift()
  properties = properties[0]
  function Target() {
    if (_.isFunction(this.initialize)) {
      this.initialize.apply(this, arguments)
    }
  }
  Target.superclass = parent
  if (parent) {
    var subclass = function() {}
    subclass.prototype = parent.prototype
    Target.prototype = new subclass()
  }
  var ancestor = Target.superclass && Target.superclass.prototype
  for (var k in properties) {
    var value = properties[k]
    if (ancestor && typeof value == 'function') {
      var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i
        .exec(value.toString())[1]
        .replace(/\s/g, '')
        .split(',')
      //只有在第一个参数为$super情况下才需要处理（是否具有重复方法需要用户自己决定）
      if (argslist[0] === '$super' && ancestor[k]) {
        value = (function(methodName, fn) {
          return function() {
            var z = this,
              args = [
                function() {
                  return ancestor[methodName].apply(z, arguments)
                }
              ]
            return fn.apply(this, args.concat(slice.call(arguments)))
          }
        })(k, value)
      }
    }
    if (
      _.isObject(Target.prototype[k]) &&
      _.isObject(value) &&
      (typeof Target.prototype[k] != 'function' && typeof value != 'fuction')
    ) {
      var temp = {}
      _.extend(temp, Target.prototype[k])
      _.extend(temp, value)
      Target.prototype[k] = temp
    } else {
      Target.prototype[k] = value
    }
  }
  for (var key in parent) {
    if (
      parent.hasOwnProperty(key) &&
      key !== 'prototype' &&
      key !== 'superclass'
    )
      Target[key] = parent[key]
  }
  if (!Target.prototype.initialize) Target.prototype.initialize = function() {}
  Target.prototype.constructor = Target
  return Target
}
