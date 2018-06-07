/**@author Rectmoon
 * @version 1.0.0
 * @date 2018-06-07
 * @class moon.base
 */

/**
 * 处理命名空间
 * @param {string} 空间名称，可多个
 * @return {object} 对象
 */

function namespace() {
  var a = arguments,
    o = null,
    i,
    j,
    d
  for (i = 0; i < a.length; i++) {
    d = a[i].split('.')
    o = window
    for (j = 0; j < d.length; j++) {
      o[d[j]] = o[d[j]] || {}
      o = o[d[j]]
    }
  }
  return o
}

namespace('moon.base')
;(function() {
  var oproto = Object.prototype
  /**
   * 获取对象类型
   * @private
   * @param {object} object 对象
   * @return {string} 类型
   * 可判断类型：Boolean Number String Function Array Date RegExp Object
   */

  function getParamType(o) {
    return o === null
      ? String(o)
      : Object.prototype.toString
          .call(o)
          .replace(/\[object\s+(\w+)\]/i, '$1')
          .toLowerCase()
  }

  function isArray(o) {
    return getParamType(o) === 'array'
  }
  function isFunction(o) {
    return getParamType(o) === 'function'
  }
  function isPlaneObject(o) {
    return getParamType(o) === 'object' && Object.getPrototypeOf(o) === oproto
  }
  function isNumber(o) {
    return getParamType(o) === 'number'
  }
  function isObject(o) {
    return getParamType(o) === 'object'
  }
  function isString(o) {
    return getParamType(o) === 'string'
  }
  function isBoolean(o) {
    return getParamType(o) === 'boolean'
  }
  function isDate(o) {
    return getParamType(o) === 'date'
  }
  moon.base.extend = function() {
    var options,
      name,
      src,
      copy,
      copyisArray,
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
    if (typeof target !== 'object' && !isFunction(target)) {
      target = {}
    }
    if (i === length) {
      target = this
      i--
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) !== null) {
        for (name in options) {
          src = target[name]
          copy = options[name]
          if (target === copy) continue
          if (
            deep &&
            copy &&
            (isPlaneObject(copy) || (copyIsArray = isArray(copy)))
          ) {
            if (copyisArray) {
              copyisArray = false
              clone = src && isArray(src) ? src : []
            } else {
              clone = src && isPlaneObject(src) ? src : {}
            }
            target[name] = extend(deep, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  }

  moon.base.extend({
    getParamType: getParamType,
    isArray: isArray,
    isFunction: isFunction,
    isPlaneObject: isPlaneObject,
    isNumber: isNumber,
    isObject: isObject,
    isString: isString,
    isBoolean: isBoolean,
    isDate: isDate,
    isDom: function(o) {
      try {
        return (
          typeof o === 'object' &&
          o.nodeType == 1 &&
          typeof o.nodeName == 'string'
        )
      } catch (e) {
        return false
      }
    },
    /**
     * 获取dom对象
     * @param {string|dom} dom的id,class,tagname
     * @return {dom}
     */
    m: function(o) {
      return typeof o === 'object' ? o : document.getElementById(o)
    },
    q: function(selector, ctx) {
      if (!isDom(ctx) || !isString(selector)) return false
      var CLASS_SELECTOR = /^\.([\w-]+)$/,
        ID_SELECTOR = /^\.([\w-]+)$/,
        TAG_SELECTOR = /^[\w-]+$/
      // var elements
    }
  })
})()
// !!!
moon.base.extend(window, moon.base)

namespace('moon.string')
;(function() {
  var string = moon.string
  extend(string, {
    /**
     * 查找字符串的字节长度<br/>
     * 中文算2 英文算1<br/>
     * @param {string} str 字符串
     * @return {int}
     */
    getByteLength: function(str) {
      var bytes = 0,
        i = 0
      for (; i < str.length; ++i, ++bytes) {
        if (str.charCodeAt(i) > 255) {
          ++bytes
        }
      }
      return bytes
    }
  })
})()
moon.base.extend(moon.string)
