/**
 * Created by Rectmoon on 2018/06/13.
 */

// 打印 vue 数据
window.vconsole = {
  print: function(method, args) {
    console[method].apply(
      console,
      [].slice.call(args).map(function(arg) {
        return typeof arg === 'object' ? JSON.parse(JSON.stringify(arg)) : arg
      })
    )
  }
}
;['log', 'info', 'warn', 'error'].forEach(function(method) {
  window.vconsole[method] = function() {
    this.print(method, arguments)
  }
})

/**
 * 以组的形式打印对象属性
 * create by Rectmoon on 2018/06/13
 * @param  {String} title             组的标题
 * @param  {Object} object            要打印的对象
 * @param  {Boolean} collapsed        输出时关闭组（默认值：false）
 * @param  {String} title_style       标题样式（默认值：'')
 * @param  {String} extra_title       附加标题（默认值：''）
 * @param  {String} extra_title_style 附加标题样式（默认值：'font-weight:normal;'）
 */
window.$group_log = function(
  title,
  object,
  collapsed,
  title_style,
  extra_title,
  extra_title_style
) {
  console[collapsed ? 'groupCollapsed' : 'group'](
    '%c' + title + ' %c' + (extra_title || ''),
    title_style || '',
    extra_title_style || 'font-weight:normal;'
  )
  for (var key in object) {
    vconsole.log('%c' + key + ':\t', 'font-weight:bold;', object[key])
  }
  console.groupEnd()
}

// Element-ui
var ElementUI = require('common/element-ui')
window.$loading = {
  instance: null,
  show: function(text) {
    this.hide()
    this.instance = ElementUI.Loading.service({
      fullscreen: true,
      lock: true,
      text: text
    })
  },
  hide: function() {
    if (this.instance) {
      this.instance.close()
      this.instance = null
    }
  }
}
window.$msgbox = function() {
  ElementUI.MessageBox.apply(ElementUI, arguments)
}
window.$alert = function() {
  ElementUI.MessageBox.alert.apply(ElementUI.MessageBox, arguments)
}
window.$confirm = function() {
  ElementUI.MessageBox.confirm.apply(ElementUI.MessageBox, arguments)
}
window.$prompt = function() {
  ElementUI.MessageBox.prompt.apply(ElementUI.MessageBox, arguments)
}
// 常用 $alert 类型的简单封装
window.$info = function(msg) {
  $alert(msg, '消息', { type: 'info' })
}
window.$success = function(msg) {
  $alert(msg, '成功', { type: 'success' })
}
window.$warning = function(msg) {
  $alert(msg, '警告', { type: 'warning' })
}
window.$error = function(msg) {
  $alert(msg, '错误', { type: 'error' })
}

window.$ajax = function(setting) {
  return new Promise(function(resolve, reject) {
    $.ajax(setting).then(resolve, reject)
  })
}

window.$clone = function(a) {
  var res = a instanceof Array ? [] : {}
  return $.extend.apply($, [true, res].concat([].slice.call(arguments)))
}

// 获取对象属性值
window.$get_prop = function(target, path, autofix) {
  // target 不是对象 || path 无效
  if (!$is.object(target) || !path) return target
  // path 为字符串，则按 “.” 分割为数组
  if ($is.string(path)) path = path.split('.')
  // path 不是数组
  if (!$is.array(path)) return target
  var value = target
  path.forEach(function(p) {
    if ($is.valid_string(p)) {
      if ($is.object(value)) {
        if (!$is.object(value[p]) && autofix) value[p] = {}
        value = value[p]
      } else {
        value = void 0
      }
    }
  })
  return value
}

window.$tools = {
  open_url: function(url) {
    if (url) window.open(url)
  }
}

window.$status = {
  is_dev: location.search.indexOf('dev=1') > -1
}
