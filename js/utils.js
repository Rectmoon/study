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
    extend: function() {
      var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false
      // 如果第一个参数为布尔,判定是否深拷贝
      if (typeof target === 'boolean') {
        deep = target
        target = arguments[1] || {}
        i++
      }
      // 确保接受方为一个复杂的数据类型
      if (typeof target !== 'object' && !isFunction(obj)) {
        target = {}
      }
      if (i === length) {
        target = this
        i--
      }
      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            src = target[name]
            copy = options[name]
            if (target === copy) continue
            if (
              deep &&
              copy &&
              (isPlaneObject(copy) || (copyIsArray = isArray(copy)))
            ) {
              if (copyIsArray) {
                copyIsArray = false
                clone = src && isArray(src) ? src : []
              } else {
                clone = src && isPlaneObject(src) ? src : {}
              }
              target[name] = zly.extend(deep, clone, copy)
            } else if (copy !== undefined) {
              target[name] = copy
            }
          }
        }
      }
      return target
    },
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
    },
    dateFormat: function(date, fmt) {
      if (typeof date === 'number' || typeof date === 'string')
        date = new Date(date)
      var valid = date instanceof Date && !isNaN(date.getFullYear())
      if (!valid) return false
      var _date_format = /(Y{2,4})|(M{1,2})|(D{1,2})|(h{1,2})|(m{1,2})|(s{1,2})/g
      return fmt.replace(_date_format, function(self, Y, M, D, h, m, s) {
        var str
        switch (true) {
          case !!Y:
            str = date.getFullYear().toString()
            return str.substr(str.length - Y.length)
          case !!M:
            str = '0' + (date.getMonth() + 1)
            return str.substr(str.length - M.length)
          case !!D:
            str = '0' + date.getDate()
            return str.substr(str.length - D.length)
          case !!h:
            str = '0' + date.getHours()
            return str.substr(str.length - h.length)
          case !!m:
            str = '0' + date.getMinutes()
            return str.substr(str.length - m.length)
          case !!s:
            str = '0' + date.getSeconds()
            return str.substr(str.length - s.length)
          default:
            return ''
        }
      })
    },
    /**
     * 周一开始,取某年第几周
     * @param {date} String or Number
     */
    getWeekOfYear: function(date) {
      var time,
        checkDate = new Date(date)
      // Find Thursday of this week starting on Monday
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7))
      time = checkDate.getTime()
      checkDate.setMonth(0)
      checkDate.setDate(1)
      return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
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
