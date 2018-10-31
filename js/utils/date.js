import { getType } from './base'

const TODAY = new Date()

export function isDate(o) {
  return getType(o) === 'date'
}

export function floorMod(x, n) {
  return x - n * Math.floor(x / n)
}

export function pickOpts(obj, keys) {
  return keys.reduce((res, k) => {
    res[k] = obj[k]
    return res
  }, {})
}

export function toDateString(o, l = '-') {
  let a = [],
    d = isDate(o) ? o : TODAY,
    m = d.getMonth() + 1,
    da = d.getDate()
  a.push(d.getFullYear())
  a.push(m.toString().length < 2 ? '0' + m : m)
  a.push(da.toString().length < 2 ? '0' + da : da)
  return a.join(l)
}

export function toDateTimeString(o) {
  let a = [],
    d = isDate(o) ? o : TODAY,
    h = d.getHours(),
    i = d.getMinutes(),
    s = d.getSeconds()
  a.push(h.toString().length < 2 ? '0' + h : h)
  a.push(i.toString().length < 2 ? '0' + i : i)
  a.push(s.toString().length < 2 ? '0' + s : s)
  return toDateString.apply(null, arguments) + ' ' + a.join(':')
}

export function isLeapYear(year) {
  return 0 == year % 4 && (year % 100 != 0 || year % 400 == 0)
}

export function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365
}

export function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1,
    modYear = year + (month - modMonth) / 12
  if (modMonth === 2) return isLeapYear(modYear) ? 29 : 28
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1]
}

export function weeksInWeekYear(weekYear) {
  /*
    公元元年（也就是第一年）的第一天是星期1，以后的每一年与元年的差值取模7就可以算出该年的第一天是星期几。
    四年一闰，百年不闰，四百年再闰，所以4年的个数减去100年的个数在加上400年的个数就是其中闰年的个数了；
    c=[365*(year-1)+其中闰年的个数（闰年多一天）]%7+1;
    因为365=364+1；364%7=0；且后面的1可以加到去模公式前面去；所以可以化简成
    c=(year+(year-1)/4-(year-1)/100+(year-1)/400)%7 。
  */
  const p1 =
      (weekYear +
        Math.floor(weekYear / 4) -
        Math.floor(weekYear / 100) +
        Math.floor(weekYear / 400)) %
      7,
    last = weekYear - 1,
    p2 =
      (last +
        Math.floor(last / 4) -
        Math.floor(last / 100) +
        Math.floor(last / 400)) %
      7
  console.log(p1)
  return p1 === 4 || p2 === 3 ? 53 : 52
}

export function getSeverDateTime() {
  let xhr = window.ActiveXObject
    ? new ActiveXObject('Microsoft.XMLHTTP')
    : new XMLHttpRequest()
  xhr.open('HEAD', window.location.href, false)
  xhr.send(null)
  let d = new Date(xhr.getResponseHeader('Date')),
    nowyear = d.getFullYear(),
    locateyear = new Date().getFullYear()
  if (nowyear < locateyear) d = new Date()
  return d
}

export function getWeekOfYear(date, fromMonday = false) {
  let time,
    checkDate = date ? new Date(date) : new Date(),
    d = fromMonday
      ? checkDate.getDate() + 4 - (checkDate.getDay() || 7)
      : checkDate.getDate() + 3 - checkDate.getDay()
  checkDate.setDate(d)
  time = checkDate.getTime()
  checkDate.setMonth(0)
  checkDate.setDate(1)
  return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
}

export function formatDate(date = TODAY, fmt = 'yyyy-mm-dd hh:ii:ss') {
  const o = {
    'y+': date.getFullYear(), //年
    'm+': date.getMonth() + 1, //月
    'd+': date.getDate(), //日
    'h+': date.getHours(), //时
    'i+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季
    'l+': date.getMilliseconds() //毫
  }
  for (let k in o) {
    if (new RegExp(`(${k})`, 'i').test(fmt)) {
      if (k == 'y+')
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      else if (k == 'l+') {
        let lens = RegExp.$1.length
        lens = lens == 1 ? 3 : lens
        fmt = fmt.replace(
          RegExp.$1,
          ('00' + o[k]).substr(('' + o[k]).length - 1, lens)
        )
      } else {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
  }
  return fmt
}

export function getTimeDetail(timeStr) {
  let _now = +TODAY,
    se = _now - timeStr,
    res = ''
  const DATE_LEVEL = {
    month: 2592000000,
    day: 86400000,
    hour: 3600000,
    minter: 60000
  }
  const handleFn = [
    {
      t: DATE_LEVEL.month,
      fn: timeStr =>
        new Date(timeStr).getMonth() +
        1 +
        '月' +
        new Date(timeStr).getDate() +
        '日'
    },
    {
      t: DATE_LEVEL.day,
      fn: timeStr => Math.floor(se / DATE_LEVEL.day) + '天前'
    },
    {
      t: DATE_LEVEL.hour,
      fn: timeStr => Math.floor(se / DATE_LEVEL.hour) + '小时前'
    },
    {
      t: DATE_LEVEL.minter,
      fn: timeStr => Math.ceil(se / DATE_LEVEL.minter) + '分钟前'
    }
  ]
  //求上一年最后一秒的时间戳
  const lastYearTime =
    new Date(new Date().getFullYear() + '-01-01 00:00:00') - 1
  //把时间差（当前时间戳与上一年最后一秒的时间戳的差）和操作函数添加进去,
  //如果时间差（se）超过这个值，则代表了这个时间是上一年的时间。
  handleFn.unshift({
    t: _now - lastYearTime,
    fn: timeStr => {
      if (se > DATE_LEVEL.month) {
        return (
          new Date(timeStr).getFullYear() +
          '年' +
          (new Date(timeStr).getMonth() + 1) +
          '月' +
          new Date(timeStr).getDate() +
          '日'
        )
      }
    }
  })

  for (let i = 0, len = handleFn.length; i < len; i++) {
    let item = handleFn[i]
    if (se >= item.t) {
      item.fn(timeStr) && (res = item.fn(timeStr))
      if (res) return res
    }
  }
  return '1分钟前'
}
