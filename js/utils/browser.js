const userAgent = navigator.userAgent.toLowerCase()

const browser = {
  /**
   * 获取版本号
   */
  version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
  /**
   * 是否webkit浏览器
   */
  webkit: /webkit/.test(userAgent),
  /**
   * 是否opera浏览器
   */
  opera: /opera/.test(userAgent),
  /**
   * 是否IE浏览器
   */
  msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
  /**
   * 是否mozilla浏览器
   */
  mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
  /**
   * 是否TT浏览器
   */
  tt: /tencenttraveler/.test(userAgent),
  /**
   * 是否chrome浏览器
   */
  chrome: /chrome/.test(userAgent),
  /**
   * 是否firefox浏览器
   */
  firefox: /firefox/.test(userAgent),
  /**
   * 是否safari浏览器
   */
  safari: /safari/.test(userAgent),
  /**
   * 是否gecko浏览器
   */
  gecko: /gecko/.test(userAgent),

  weixin: userAgent.indexOf('micromessenger') !== -1,
  /**
   * 是否IE6
   */
  ie6: () => this.msie && this.version.substr(0, 1) == '6',
  //判断DOM对象是否存在样式类名称
  hasClass(element, className) {
    let elementClassName = element.className
    return (
      elementClassName.length > 0 &&
      (elementClassName == className || new RegExp('(^|\\s)' + className + '(\\s|$)').test(elementClassName))
    )
  },
  //为DOM对象增加样式类名称
  addClass(element, className) {
    if (!this.hasClass(element, className)) element.className += (element.className ? ' ' : '') + className
    return element
  },
  removeClass(element, className) {
    element.className = element.className.replace(new RegExp('(^|\\s+)' + className + '(\\s+|$)'), '')
    return element
  },

  toggleClass(element, className) {
    if (!element || !className) return
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
      classString += '' + className
    } else {
      classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
    }
    element.className = classString
  },

  // 获取页面最大高度
  getMaxH() {
    return this.getPageHeight() > this.getWinHeight() ? this.getPageHeight() : this.getWinHeight()
  },
  //获取页面最大宽度
  getMaxW() {
    return this.getPageWidth() > this.getWinWidth() ? this.getPageWidth() : this.getWinWidth()
  },
  //网页内容高度
  getPageHeight() {
    let h =
      window.innerHeight && window.scrollMaxY
        ? window.innerHeight + window.scrollMaxY
        : document.body.scrollHeight > document.body.offsetHeight
        ? document.body.scrollHeight
        : document.body.offsetHeight
    return h > document.documentElement.scrollHeight ? h : document.documentElement.scrollHeight
  },
  //网页内容宽度
  getPageWidth() {
    return window.innerWidth && window.scrollMaxX
      ? window.innerWidth + window.scrollMaxX
      : document.body.scrollWidth > document.body.offsetWidth
      ? document.body.scrollWidth
      : document.body.offsetWidth
  },
  //浏览器可视区域高度
  getWinHeight() {
    return window.innerHeight
      ? window.innerHeight
      : document.documentElement && document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : document.body.offsetHeight
  },
  //浏览器可视区域宽度
  getWinWidth() {
    return window.innerWidth
      ? window.innerWidth
      : document.documentElement && document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : document.body.offsetWidth
  },
  //设置dom透明度
  setOpacity(ele, level) {
    if (this.browser.msie && (!document.documentMode || document.documentMode < 9)) {
      ele.style.filter = 'Alpha(opacity=' + level + ')'
    } else {
      ele.style.opacity = level / 100
    }
  },
  // 获取页面中对象的绝对X位置
  getX(e) {
    let t = e.offsetLeft
    while ((e = e.offsetParent)) t += e.offsetLeft
    return t
  },
  //获取页面中对象的绝对Y位置
  getY(e) {
    let t = e.offsetTop
    while ((e = e.offsetParent)) t += e.offsetTop
    return t
  }
}

export default browser
