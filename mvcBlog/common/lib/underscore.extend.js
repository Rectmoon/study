//继承相关逻辑
;(function() {
  var arr = [],
    slice = arr.slice
  _.inherit = function(origin) {
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
    if (!Target.prototype.initialize)
      Target.prototype.initialize = function() {}
    Target.prototype.constructor = Target
    return Target
  }
})()

//基础方法
;(function() {
  // //获取url参数
  // //这个方法还是有问题
  _.getUrlParam = function(url, key) {
    if (!url) url = window.location.href

    var searchReg = /([^&=?]+)=([^&]+)/g
    var urlReg = /\/+.*\?/
    var arrayReg = /(.+)\[\]$/
    var urlParams = {}
    var match, name, value, isArray

    while ((match = searchReg.exec(url))) {
      name = match[1]
      value = match[2]
      isArray = name.match(arrayReg)
      //处理参数为url这种情况
      if (urlReg.test(value)) {
        urlParams[name] = url.substr(url.indexOf(value))
        break
      } else {
        if (isArray) {
          name = isArray[1]
          urlParams[name] = urlParams[name] || []
          urlParams[name].push(value)
        } else {
          urlParams[name] = value
        }
      }
    }

    for (var k in urlParams) urlParams[k] = decodeURIComponent(urlParams[k])

    return key ? urlParams[key] : urlParams
  }

  _.isWeiXin = function() {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  }

  _.removeAllSpace = function(str) {
    if (str) str = str.toString()
    else return ''
    return str.replace(/\s+/g, '')
  }

  _.getMD5String = function(string) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }

    function AddUnsigned(lX, lY) {
      var lX4, lY4, lX8, lY8, lResult
      lX8 = lX & 0x80000000
      lY8 = lY & 0x80000000
      lX4 = lX & 0x40000000
      lY4 = lY & 0x40000000
      lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff)
      if (lX4 & lY4) {
        return lResult ^ 0x80000000 ^ lX8 ^ lY8
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return lResult ^ 0xc0000000 ^ lX8 ^ lY8
        } else {
          return lResult ^ 0x40000000 ^ lX8 ^ lY8
        }
      } else {
        return lResult ^ lX8 ^ lY8
      }
    }

    function F(x, y, z) {
      return (x & y) | (~x & z)
    }
    function G(x, y, z) {
      return (x & z) | (y & ~z)
    }
    function H(x, y, z) {
      return x ^ y ^ z
    }
    function I(x, y, z) {
      return y ^ (x | ~z)
    }

    function FF(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function GG(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function HH(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function II(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function ConvertToWordArray(string) {
      var lWordCount
      var lMessageLength = string.length
      var lNumberOfWords_temp1 = lMessageLength + 8
      var lNumberOfWords_temp2 =
        (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
      var lWordArray = Array(lNumberOfWords - 1)
      var lBytePosition = 0
      var lByteCount = 0
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] =
          lWordArray[lWordCount] |
          (string.charCodeAt(lByteCount) << lBytePosition)
        lByteCount++
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
      return lWordArray
    }

    function WordToHex(lValue) {
      var WordToHexValue = '',
        WordToHexValue_temp = '',
        lByte,
        lCount
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255
        WordToHexValue_temp = '0' + lByte.toString(16)
        WordToHexValue =
          WordToHexValue +
          WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2)
      }
      return WordToHexValue
    }

    function Utf8Encode(string) {
      string = string.replace(/\r\n/g, '\n')
      var utftext = ''

      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n)

        if (c < 128) {
          utftext += String.fromCharCode(c)
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192)
          utftext += String.fromCharCode((c & 63) | 128)
        } else {
          utftext += String.fromCharCode((c >> 12) | 224)
          utftext += String.fromCharCode(((c >> 6) & 63) | 128)
          utftext += String.fromCharCode((c & 63) | 128)
        }
      }

      return utftext
    }

    var x = Array()
    var k, AA, BB, CC, DD, a, b, c, d
    var S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22
    var S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20
    var S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23
    var S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21

    string = Utf8Encode(string)

    x = ConvertToWordArray(string)

    a = 0x67452301
    b = 0xefcdab89
    c = 0x98badcfe
    d = 0x10325476

    for (k = 0; k < x.length; k += 16) {
      AA = a
      BB = b
      CC = c
      DD = d
      a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478)
      d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756)
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070db)
      b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee)
      a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf)
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a)
      c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613)
      b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501)
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8)
      d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af)
      c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1)
      b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be)
      a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122)
      d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193)
      c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e)
      b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821)
      a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562)
      d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340)
      c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51)
      b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa)
      a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d)
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
      c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681)
      b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)
      a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6)
      d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6)
      c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87)
      b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed)
      a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905)
      d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)
      c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9)
      b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)
      a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942)
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681)
      c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122)
      b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c)
      a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44)
      d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)
      c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60)
      b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70)
      a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6)
      d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa)
      c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085)
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05)
      a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039)
      d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5)
      c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8)
      b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665)
      a = II(a, b, c, d, x[k + 0], S41, 0xf4292244)
      d = II(d, a, b, c, x[k + 7], S42, 0x432aff97)
      c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7)
      b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039)
      a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3)
      d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)
      c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d)
      b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1)
      a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f)
      d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)
      c = II(c, d, a, b, x[k + 6], S43, 0xa3014314)
      b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1)
      a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82)
      d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235)
      c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb)
      b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391)
      a = AddUnsigned(a, AA)
      b = AddUnsigned(b, BB)
      c = AddUnsigned(c, CC)
      d = AddUnsigned(d, DD)
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)

    return temp.toLowerCase()
  }
})()

//日期操作类
;(function() {
  /**
   * @description 静态日期操作类，封装系列日期操作方法
   * @description 输入时候月份自动减一，输出时候自动加一
   * @return {object} 返回操作方法
   */
  _.dateUtil = {
    //根据一个日期获取所有信息
    getDetail: function(date) {
      if (!date) date = new Date()
      var d,
        now = new Date(),
        dateInfo = {},
        _diff
      var weekDayArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

      if (_.isNumber(date)) {
        d = new Date()
        d.setTime(date)
        date = d
      }

      //充值date对象，让其成为一天的起点时间
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      now = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      _diff = date.getTime() - now.getTime()

      if (_diff == 0) {
        dateInfo.day1 = '今天'
      } else if (_diff == 86400000) {
        dateInfo.day1 = '明天'
      } else if (_diff == 172800000) {
        dateInfo.day1 = '后天'
      }

      dateInfo.weekday = weekDayArr[date.getDay()]

      dateInfo.year = date.getFullYear()
      dateInfo.month = date.getMonth() + 1
      dateInfo.day = date.getDate()

      return dateInfo
    },

    /**
     * @description 数字操作，
     * @return {string} 返回处理后的数字
     */
    formatNum: function(n) {
      if (n < 10) return '0' + n
      return n
    },
    /**
     * @description 将字符串转换为日期，支持格式y-m-d ymd (y m r)以及标准的
     * @return {Date} 返回日期对象
     */
    parse: function(dateStr, formatStr) {
      if (typeof dateStr === 'undefined') return null
      if (typeof formatStr === 'string') {
        var _d = new Date(formatStr)
        //首先取得顺序相关字符串
        var arrStr = formatStr.replace(/[^ymd]/g, '').split('')
        if (!arrStr && arrStr.length != 3) return null

        var formatStr = formatStr.replace(/y|m|d/g, function(k) {
          switch (k) {
            case 'y':
              return '(\\d{4})'
            case 'm':
            case 'd':
              return '(\\d{1,2})'
          }
        })

        var reg = new RegExp(formatStr, 'g')
        var arr = reg.exec(dateStr)

        var dateObj = {}
        for (var i = 0, len = arrStr.length; i < len; i++) {
          dateObj[arrStr[i]] = arr[i + 1]
        }
        return new Date(dateObj['y'], dateObj['m'] - 1, dateObj['d'])
      }
      return null
    },
    /**
     * @description将日期格式化为字符串
     * @return {string} 常用格式化字符串
     */
    format: function(date, format) {
      if (arguments.length < 2 && !date.getTime) {
        format = date
        date = new Date()
      }
      typeof format != 'string' && (format = 'Y年M月D日 H时F分S秒')
      return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function(a) {
        switch (a) {
          case 'y':
            return (date.getFullYear() + '').slice(2)
          case 'Y':
            return date.getFullYear()
          case 'm':
            return date.getMonth() + 1
          case 'M':
            return _.dateUtil.formatNum(date.getMonth() + 1)
          case 'd':
            return date.getDate()
          case 'D':
            return _.dateUtil.formatNum(date.getDate())
          case 'h':
            return date.getHours()
          case 'H':
            return _.dateUtil.formatNum(date.getHours())
          case 'f':
            return date.getMinutes()
          case 'F':
            return _.dateUtil.formatNum(date.getMinutes())
          case 's':
            return date.getSeconds()
          case 'S':
            return _.dateUtil.formatNum(date.getSeconds())
        }
      })
    },
    // @description 是否为为日期对象，该方法可能有坑，使用需要慎重
    // @param year {num} 日期对象
    // @return {boolean} 返回值
    isDate: function(d) {
      if (typeof d == 'object' && d instanceof Date) return true
      return false
    },
    // @description 是否为闰年
    // @param year {num} 可能是年份或者为一个date时间
    // @return {boolean} 返回值
    isLeapYear: function(year) {
      //传入为时间格式需要处理
      if (_.dateUtil.isDate(year)) year = year.getFullYear()
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) return true
      return false
    },

    // @description 获取一个月份的天数
    // @param year {num} 可能是年份或者为一个date时间
    // @param year {num} 月份
    // @return {num} 返回天数
    getDaysOfMonth: function(year, month) {
      //自动减一以便操作
      month--
      if (_.dateUtil.isDate(year)) {
        month = year.getMonth() //注意此处月份要加1，所以我们要减一
        year = year.getFullYear()
      }
      return [
        31,
        _.dateUtil.isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ][month]
    },

    // @description 获取一个月份1号是星期几，注意此时的月份传入时需要自主减一
    // @param year {num} 可能是年份或者为一个date时间
    // @param year {num} 月份
    // @return {num} 当月一号为星期几0-6
    getBeginDayOfMouth: function(year, month) {
      //自动减一以便操作
      month--
      if (typeof year == 'object' && year instanceof Date) {
        month = year.getMonth()
        year = year.getFullYear()
      }
      var d = new Date(year, month, 1)
      return d.getDay()
    },

    //不同时区皆返回北京时间
    getBeijingDate: function(d) {
      var tmp, localTime, localOffset, beijiTime, utc
      if (!_.isDate(d)) {
        tmp = d
        d = new Date()
        d.setTime(tmp)
      }

      //通过调用Data()对象的getTime()方法，即可显示1970年1月1日后到此时时间之间的毫秒数。
      localTime = d.getTime()
      //当地时间偏移
      localOffset = d.getTimezoneOffset() * 60000
      //标准时间
      utc = localTime + localOffset

      //加上北京偏移量便是北京时区
      beijiTime = utc + 28800000

      d.setTime(beijiTime)
      return d
    },

    setBeijingDate: function(d) {
      var tmp, localTime, localOffset, beijiTime, utc
      if (!_.isDate(d)) {
        tmp = d
        d = new Date()
        d.setTime(tmp)
      }

      //通过调用Data()对象的getTime()方法，即可显示1970年1月1日后到此时时间之间的毫秒数。
      localTime = d.getTime()
      //当地时间偏移
      localOffset = d.getTimezoneOffset() * 60000
      //标准时间
      utc = localTime - localOffset

      //加上北京偏移量便是北京时区
      beijiTime = utc - 28800000

      d.setTime(beijiTime)
      return d
    }
  }
})()

//Hybrid基本逻辑
;(function() {
  window.Hybrid = window.Hybrid || {}

  var bridgePostMsg = function(url) {
    if ($.os.ios) {
      window.location = url
    } else {
      var ifr = $('<iframe style="display: none;" src="' + url + '"/>')
      $('body').append(ifr)
      setTimeout(function() {
        ifr.remove()
      }, 1000)
    }
  }

  var _getHybridUrl = function(params) {
    var k,
      paramStr = '',
      url = 'baidubus://'
    url += params.tagname + '?t=' + new Date().getTime() //时间戳，防止url不起效

    if (params.callback) {
      url += '&callback=' + params.callback
      delete params.callback
    }

    if (params.param) {
      paramStr =
        typeof params.param == 'object'
          ? JSON.stringify(params.param)
          : params.param
      url += '&param=' + encodeURIComponent(paramStr)
    }

    return url
  }

  var requestHybrid = function(params) {
    //生成唯一执行函数，执行后销毁
    var tt = new Date().getTime()
    var t = 'hybrid_' + tt
    var tmpFn

    //处理有回调的情况
    if (params.callback) {
      tmpFn = params.callback
      params.callback = t
      window.Hybrid[t] = function(data) {
        tmpFn(data)
        delete window.Hybrid[t]
      }
    }

    bridgePostMsg(_getHybridUrl(params))
  }

  var getHybridInfo = function() {
    var platform_version = {}
    var na = navigator.userAgent
    var info = na.match(/baidu_bus\/\d\.\d\.\d/)

    if (info && info[0]) {
      info = info[0].split('/')
      if (info && info.length == 2) {
        platform_version.platform = info[0]
        platform_version.version = info[1]
      }
    } else if (na.indexOf('baiduboxapp') != -1) {
      //手机百度容器
      platform_version.platform = 'baidubox'
      platform_version.version = ''
    } else if (na.indexOf('baidumap') != -1) {
      //手机百度容器
      platform_version.platform = 'baidumap'
      platform_version.version = ''
    }

    //*debug* 调试模拟环境
    if (_.getUrlParam().__platform) {
      platform_version.platform = _.getUrlParam().__platform
      platform_version.version = _.getUrlParam().__version
    }

    return platform_version
  }

  var getVer = function() {
    var ver = getHybridInfo().version.replace(/\./g, '')
    if (ver) return parseInt(ver)
    return 0
  }

  //版本在多少
  var versionAt = function(ver) {
    if (ver == getVer()) return true
    return false
  }

  var versionBefore = function(ver) {
    if (getVer() < ver) return true
    return false
  }

  var versionAfter = function(ver) {
    if (getVer() > ver) return true
    return false
  }

  var hybridCallback = function(opts) {
    //undefined, baidu_bus,
    var platform = _.getHybridInfo().platform || 'web'
    var mapping = {
      web: '',
      baidu_bus: 'bdbus_'
    }

    var callback = opts[mapping[platform] + 'callback']
    if (typeof callback == 'function') callback()
  }

  var registerHeaderCallback = function(ns, name, callback) {
    if (!window.Hybrid[ns]) window.Hybrid[ns] = {}
    window.Hybrid[ns][name] = callback
  }

  var unRegisterHeaderCallback = function(ns) {
    if (!window.Hybrid[ns]) return
    delete window.Hybrid[ns]
  }

  _.registerHeaderCallback = registerHeaderCallback
  _.unRegisterHeaderCallback = unRegisterHeaderCallback

  _.getHybridInfo = getHybridInfo
  _.requestHybrid = requestHybrid
  _.hybridCallback = hybridCallback

  _.versionAt = versionAt
  _.versionBefore = versionBefore
  _.versionAfter = versionAfter
})()
