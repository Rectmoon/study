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

/**================================================浏览器类型和版本号=======================================================*/
/**================================================字符串工具类============================================================*/
namespace('moon.string')
;(function() {
  var string = moon.string
  extend(string, {
    /**
     * 字符串格式化
     *@param {string} str 字符串
     *@return {str}
     */
    strFormat: function(str) {
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      //return split('').reverse().join('').replace(/(\d{3})(?=[^$])/g,'$1,').split('').reverse().join('');
    },
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
    },
    /**
     * 查找有多少个双字节字符
     * @param {string} str 字符串
     * @return {int}
     */
    getDwordNum: function(str) {
      return string.getByteLength(str) - str.length
    },
    /**
     * 查找有多少个汉字字符
     * @param {string} str 字符串
     * @return {int}
     */
    getChineseNum: function(str) {
      return str.length - str.replace(/[\u4e00-\u9fa5]/g, '').length
    },
    /**
     * 去掉字符串左边的空字符
     * @param {string} str 字符串
     * @return {string}
     */
    trimLeft: function(str) {
      return str.replace(/^\s+/, '')
    },
    /**
     * 去掉字符串右边的空字符
     * @param {string} str 字符串
     * @return {string}
     */
    trimRight: function(str) {
      return str.replace(/\s+$/, '')
    },
    /**
     * 去掉字符串左右两边的非空字符
     * @param {string} str 字符串
     * @return {string}
     */
    trim: function(str) {
      return string.trimRight(string.trimLeft(str))
    },
    /**
    * 成对字符串替换
    * @param {string} str 字符串
    * @param {array} str 字符串<br/>
         array包含两个 [0] 查找内容，[1] 替换内容<br/>
       array可以出现多次<br/>
    * @return {string}
    */
    replacePairs: function() {
      var str = arguments[0]
      for (var i = 1; i < arguments.length; ++i) {
        var re = new RegExp(arguments[i][0], 'g')
        str = str.replace(re, arguments[i][1])
      }
      return str
    },
    /**
     * 字符串替换为HTML编码形式
     * @param {string} str 字符串
     * @return {string}
     */
    toHtml: function(str) {
      var CONVERT_ARRAY = [
        ['&', '&#38;'],
        [' ', '&#32;'],
        ["'", '&#39;'],
        ['"', '&#34;'],
        ['/', '&#47;'],
        ['<', '&#60;'],
        ['>', '&#62;'],
        ['\\\\', '&#92;'],
        ['\n', '<br />'],
        ['\r', '']
      ]
      return string.replacePairs.apply(this, [str].concat(CONVERT_ARRAY))
    },
    /**
     * 是否数字字符串
     * @param {string} str 字符串
     * @return {bool}
     */
    isNumberString: function(str) {
      return /^\d+$/.test(str)
    },
    /**
     * 校验邮箱地址
     * @param {string} str 字符串
     * @return {bool}
     */
    isMail: function(str) {
      return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(str)
    },
    /**
     * 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
     * @param {string} str 字符串
     * @return {bool}
     */
    isTel: function(str) {
      return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(str)
    },
    /**
     * 是否QQ号码
     * @param {int} qq qq号
     * @return {bool}
     */
    isQQ: function(qq) {
      return /^[1-9]{1}\d{4,11}$/.test(qq)
    },
    /**
     * 校验手机号码：必须以数字开头
     * @param {string} str 字符串
     * @return {bool}
     */
    isMobile: function(str) {
      return /^1[3456789]\d{9}$/.test(str)
    },
    /**
     * 校验邮政编码
     * @param {string} str 字符串
     * @return {bool}
     */
    isZipCode: function(str) {
      return /^(\d){6}$/.test(str)
    },
    /**
     * 是否身份证号码
     * @param {string} str 字符串
     * @return {bool}
     */
    isIDCard: function(str) {
      var C15ToC18 = function(c15) {
        var cId = c15.substring(0, 6) + '19' + c15.substring(6, 15)
        var strJiaoYan = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        var intQuan = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        var intTemp = 0
        for (i = 0; i < cId.length; i++)
          intTemp += cId.substring(i, i + 1) * intQuan[i]
        intTemp %= 11
        cId += strJiaoYan[intTemp]
        return cId
      }
      var Is18IDCard = function(IDNum) {
        var aCity = {
          11: '北京',
          12: '天津',
          13: '河北',
          14: '山西',
          15: '内蒙古',
          21: '辽宁',
          22: '吉林',
          23: '黑龙江',
          31: '上海',
          32: '江苏',
          33: '浙江',
          34: '安徽',
          35: '福建',
          36: '江西',
          37: '山东',
          41: '河南',
          42: '湖北',
          43: '湖南',
          44: '广东',
          45: '广西',
          46: '海南',
          50: '重庆',
          51: '四川',
          52: '贵州',
          53: '云南',
          54: '西藏',
          61: '陕西',
          62: '甘肃',
          63: '青海',
          64: '宁夏',
          65: '新疆',
          71: '台湾',
          81: '香港',
          82: '澳门',
          91: '国外'
        }

        var iSum = 0,
          info = '',
          sID = IDNum
        if (!/^\d{17}(\d|x)$/i.test(sID)) return false

        sID = sID.replace(/x$/i, 'a')

        if (aCity[parseInt(sID.substr(0, 2))] == null) return false

        var sBirthday =
          sID.substr(6, 4) +
          '-' +
          Number(sID.substr(10, 2)) +
          '-' +
          Number(sID.substr(12, 2))
        var d = new Date(sBirthday.replace(/-/g, '/'))

        if (
          sBirthday !=
          d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        )
          return false

        for (var i = 17; i >= 0; i--)
          iSum += (Math.pow(2, i) % 11) * parseInt(sID.charAt(17 - i), 11)

        if (iSum % 11 != 1) return false
        return true
      }

      return str.length == 15 ? Is18IDCard(C15ToC18(str)) : Is18IDCard(str)
    },
    /**
     * 是否全部是中文
     * @param {string} str 字符串
     * @return {bool}
     */
    isChinese: function(str) {
      if (str == '') return false
      return string.getChineseNum(str) === str.length
    },
    /**
     * 是否全部是英文
     * @param {string} str 字符串
     * @return {bool}
     */
    isEnglish: function(str) {
      return /^[A-Za-z]+$/.test(str)
    },
    /**
     * 是否链接地址
     * @param {string} str 字符串
     * @return {bool}
     */
    isURL: function(str) {
      return /^https?:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(
        str
      )
    }
  })
})()

/**======================================================number工具类=============================================================*/
namespace('moon.number')
;(function() {
  var number = moon.number
  extend(number, {
    /**
     * 是否某一范围的整数
     * @param {int} n 数值
     * @param {int} min 范围低值
     * @param {int} max 范围高值
     * @return {bool}
     */
    isInt: function(n, iMin, iMax) {
      if (!isFinite(n)) return false
      if (!/^[+-]?\d+$/.test(n)) return false
      if (iMin !== undefined && parseInt(n) < parseInt(iMin)) return false
      if (iMax !== undefined && parseInt(n) > parseInt(iMax)) return false
      return true
    },
    /**
     * 是否某一范围浮点数
     * @param {float} n 数值
     * @param {float} fMin 范围低值
     * @param {float} fMax 范围高值
     * @return {bool}
     */
    isFloat: function(n, fMin, fMax) {
      if (!isFinite(n)) return false
      if (fMin !== undefined && parseFloat(n) < parseFloat(fMin)) return false
      if (fMax !== undefined && parseFloat(n) > parseFloat(fMax)) return false
      if (n % 1 !== 0) return true
    },
    /**
     * 是否是质数
     *@param {number}
     *@return {bool}
     */
    isPrime: function(num) {
      return !/^1?$|^(11+)\1+$/.test(Array(num + 1).join('1'))
    },
    /**
     * 0-n的随机数
     */
    randomInt: function(n) {
      return Math.floor(Math.random() * n)
    }
  })
})()

/**======================================================array工具类=============================================================*/
namespace('moon.array')
;(function() {
  var array = moon.array
  extend(array, {
    /**
     * 判断数组中是否存在这个值
     * @param {array} arr 数组对象
     * @param {object} value 对象
     * @return {bool} 是/否
     */
    hasValue: function(arr, value) {
      var find = false
      if (isArray(arr) || isObject(arr))
        for (var key in arr) {
          if (arr[key] == value) find = true
        }
      return find
    },
    /**
     * 根据值获得数组中的key
     * @param {array} arr 数组对象
     * @param {object} value 对象
     * @return {string} key
     */
    getArrayKey: function(arr, value) {
      var findKey = -1
      if (isArray(arr) || isObject(arr))
        for (var key in arr) {
          if (arr[key] == value) findKey = key
        }
      return findKey
    },
    /**
     * 返回a1数组有a2没有的值
     * @param {array} a1 数组对象
     * @param {array} a2 数组对象
     * @return {array} key
     */
    filterA1has: function(a1, a2) {
      var res = []
      for (var i = 0; i < a1.length; i++) {
        if (!array.hasValue(a2, a1[i])) res.push(a1[i])
      }
      return res
    },
    /**
     * 两个数组的值的交集
     * @param {array} arr 数组
     * @param {array} arr 数组
     * @return {array} key
     */
    bothHas: function(a1, a2) {
      var all = array.unique(a1.concat(a2))
      var bothLose = array.filterA1has(a1, a2).concat(array.filterA1has(a2, a1))
      return array.filterA1has(all, bothLose)
    },
    unique: function(arr) {
      var res = []
      var obj = {}
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
          obj[arr[i]] = 1
          res.push(arr[i])
        }
      }
      return res
    },
    bubble: function(arr) {
      var s
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j] > arr[j + 1]) {
            s = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = s
          }
        }
      }
      return arr
    }
  })
})()

/**======================================================cookie工具类=============================================================*/
namespace('moon.cookie')
;(function() {
  var cookie = moon.cookie
  extend(cookie, {
    setCookie: function(name, value, expiresd, path, domain, secure) {
      var expdate = new Date()
      var expires = arguments[2] || null
      var path = arguments[3] || '/'
      var domain = arguments[4] || null
      var secure = arguments[5] || false
      if (expires) {
        expdate.setMinutes(expdate.getMinutes() + parseInt(expires))
      }
      var cookietemp =
        escape(name) +
        '=' +
        escape(value) +
        (expires ? '; expires=' + expdate.toGMTString() : '') +
        '; path=' +
        path +
        (domain ? '; domain=' + domain : '') +
        (secure ? '; secure' : '')
      document.cookie = cookietemp
    },
    getCookie: function(name) {
      var a
      return cookie.filterXSS(
        (a = document.cookie.match(
          RegExp('(^|;\\s*)' + name + '=([^;]*)(;|$)')
        ))
          ? unescape(a[2])
          : null
      )
    },
    delCookie: function(name, domain, path) {
      var d = new Date()
      cookie.setCookie(name, '', -d.getTime() / 1000, domain, path)
    },
    filterXSS: function(e) {
      if (!e) return e
      for (; e != unescape(e); ) {
        e = unescape(e)
      }
      var r = [
        '<',
        '>',
        "'",
        '"',
        '%3c',
        '%3e',
        '%27',
        '%22',
        '%253c',
        '%253e',
        '%2527',
        '%2522'
      ]
      var n = [
        '&#x3c;',
        '&#x3e;',
        '&#x27;',
        '&#x22;',
        '%26%23x3c%3B',
        '%26%23x3e%3B',
        '%26%23x27%3B',
        '%26%23x22%3B',
        '%2526%2523x3c%253B',
        '%2526%2523x3e%253B',
        '%2526%2523x27%253B',
        '%2526%2523x22%253B'
      ]
      for (var a = 0; a < r.length; a++) {
        e = e.replace(new RegExp(r[a], 'gi'), n[a])
      }
      return e
    }
  })
})()

/**======================================================date工具类=============================================================*/
namespace('moon.date')
;(function() {
  var date = moon.date
  var _d = new Date()
  extend(date, {
    /**
     * 获取日期
     * @param {string} sep 分隔符 默认为-
     * @return {string} yyyy-mm-dd
     */
    toDateString: function(o) {
      var a = [],
        d = isDate(o) ? o : _d,
        m = d.getMonth() + 1,
        da = d.getDate(),
        l = arguments[1]
          ? arguments[1]
          : isString(arguments[0])
            ? arguments[0]
            : '-'
      a.push(d.getFullYear())
      a.push(m.toString().length < 2 ? '0' + m : m)
      a.push(da.toString().length < 2 ? '0' + da : da)
      return a.join(l)
    },
    /**
     * 获取日期和时间
     * @param {string} sep 分隔符 默认为-
     * @return {string} yyyy-mm-dd hh:ii:ss
     */
    toDateTimeString: function(o) {
      var a = [],
        d = isDate(o) ? o : _d,
        h = d.getHours(),
        i = d.getMinutes(),
        s = d.getSeconds()
      a.push(h.toString().length < 2 ? '0' + h : h)
      a.push(i.toString().length < 2 ? '0' + i : i)
      a.push(s.toString().length < 2 ? '0' + s : s)
      return date.toDateString.apply(this, arguments) + ' ' + a.join(':')
    },
    /**
     * 是否润年
     * @param {int} year 年份
     * @return {bool} 是/否
     */
    isLeapYear: function(year) {
      return 0 == year % 4 && (year % 100 != 0 || year % 400 == 0)
    },
    /**
     * 获取服务器时间
     * @return {date} Date
     */
    getSeverDateTime: function() {
      var xhr = window.ActiveXObject
        ? new ActiveXObject('Microsoft.XMLHTTP')
        : new XMLHttpRequest()
      xhr.open('HEAD', window.location.href, false)
      xhr.send(null)
      var d = new Date(xhr.getResponseHeader('Date'))
      var nowyear = d.getFullYear(),
        locateyear = new Date().getFullYear()
      if (nowyear < locateyear) d = new Date()
      return d
    },
    /**
     * 周一开始,取某年第几周
     * @param {date} String or tampStr
     * @param {fromMonday} bool 是否从周一开始计算
     * @return {number}
     */
    getWeekOfYear: function(date, fromMonday) {
      fromMonday = fromMonday || false
      var time,
        checkDate = date ? new Date(date) : new Date(),
        d = fromMonday
          ? checkDate.getDate() + 4 - (checkDate.getDay() || 7)
          : checkDate.getDate() + 3 - checkDate.getDay()
      checkDate.setDate(d)
      time = checkDate.getTime()
      checkDate.setMonth(0)
      checkDate.setDate(1)
      return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
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
    }
  })
})()

/**============================================event工具类===============================================*/
namespace('moon.event')
;(function() {
  var event = moon.event
  extend(event, {
    addHandler: function(element, type, handler) {
      if (element.addEventListener)
        element.addEventListener(type, handler, false)
      else if (element.attachEvent) element.attachEvent('on' + type, handler)
      else element['on' + type] = handler
    },
    removeHandler: function(element, type, handler) {
      if (element.removeEventListener)
        element.removeEventListener(type, handler, false)
      else if (element.detachEvent) element.detachEvent('on' + type, handler)
      else element['on' + type] = null
    },
    isReady: false,
    readyFn: [],
    /**
     * dom ready事件
     * @param {dom} element dom对象
     * @param {string} type 事件名称
     * @param {function} type 事件方法
     * @return {undefined}
     */
    ready: function(fn) {
      bindReadyEvent()
    }
  })

  function bindReadyEvent() {
    if (document.readyState === 'complete') {
      return ready()
    }
    if (document.addEventListener) {
      document.addEventListener(
        'DOMContentLoaded',
        function() {
          document.removeEventListener(
            'DOMContentLoaded',
            arguments.callee,
            false
          )
          ready()
        },
        false
      )
      window.addEventListener('load', ready, false)
    }
  }

  // function ready() {
  //   if (!moon.isReady) {
  //     if (!document.body) return setTimeout(ready, 15)
  //     moon.isReady = true

  //   }
  // }
})()

moon.base.extend(moon, moon.string)
moon.base.extend(moon, moon.number)
moon.base.extend(moon, moon.array)
moon.base.extend(moon, moon.cookie)
moon.base.extend(moon, moon.date)
moon.base.extend(moon, moon.event)
