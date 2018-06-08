/**
 * 二进制或运算符（|）逐位比较两个运算子，两个二进制位之中只要有一个为1，就返回1，否则返回0。
 * 二进制与运算符（&）的规则是逐位比较两个运算子，两个二进制位之中只要有一个位为0，就返回0，否则返回1。
 *
 *
 *
 */
;(function(global, factory) {
  'use strict'
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document
      ? factory(global, true)
      : function(w) {
          if (!w.document) {
            throw new Error('zly requires a window with a document')
          }
          return factory(w)
        }
  } else {
    factory(global)
  }
  // Pass this if window is not defined yet
})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
  if (!String.prototype.repeat) {
    String.prototype.repeat = function(n) {
      return new Array(n + 1).join(this)
    }
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(targetLength, padString) {
      targetLength = targetLength >> 0 //truncate if number or convert non-number to 0;
      padString = String(typeof padString !== 'undefined' ? padString : '')
      if (this.length > targetLength) return String(this)
      else {
        targetLength = targetLength - this.length
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length)
        }
        return padString.slice(0, targetLength) + String(this)
      }
    }
  }

  var oproto = Object.prototype
  var aproto = Array.prototype
  var to_string = oproto.toString

  var isFunction = function(fn) {
    return to_string.call(fn) === '[object Function]'
  }

  var isArray =
    Array.isArray ||
    /* istanbul ignore next */ function(arr) {
      return to_string.call(arr) === '[object Array]'
    }

  var isPlaneObject = function(obj) {
    return (
      to_string.call(obj) === '[object Object]' &&
      Object.getPrototypeOf(obj) === oproto
    )
  }

  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window
  }

  function isArrayLike(obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = toType(obj)
    if (isFunction(obj) || isWindow(obj)) return false
    return (
      type === 'array' ||
      length === 0 ||
      (typeof length === 'number' && length > 0 && length - 1 in obj)
    )
  }

  function toType(obj) {
    if (obj === null) return obj + ''
    return typeof obj === 'object' || typeof obj === 'function'
      ? to_string.call(obj) || 'object'
      : typeof obj
  }

  var i = 0

  var zly = {
    uid: function() {
      return ++i
    },
    bind: function(fn, context) {
      return function() {
        return fn.apply(context, arguments)
      }
    },
    nextTick: function(fn, context) {
      setTimeout(zly.bind(fn, context), 0)
    },
    toArray: function(arr, s, e) {
      if (s === undefined) s = 0
      if (e === undefined) e = arr.length
      return aproto.slice.call(arr, s, e)
    },
    isFunction: isFunction,
    isArray: isArray,
    isPlaneObject: isPlaneObject,
    isWindow: isWindow,
    toType: toType,
    each: function(arr, cb, context) {
      var length,
        i = 0
      if (isArrayLike(arr)) {
        length = arr.length
        for (; i < length; i++) {
          if (cb.call(context, arr[i], i, arr) === false) break
        }
      } else {
        for (i in arr) {
          if (cb.call(context, arr[i], i, arr) === false) break
        }
      }
    }
  }

  if (typeof define === 'function' && define.amd) {
    define('zly', [], function() {
      return zly
    })
  }
  if (!noGlobal) {
    window.zly = window._ = zly
  }
  return zly
})
