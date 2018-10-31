export default {
  set(name, value) {
    let expdate = new Date(),
      expires = arguments[2] || null,
      path = arguments[3] || '/',
      domain = arguments[4] || null,
      secure = arguments[5] || false
    if (expires) expdate.setMinutes(expdate.getMinutes() + parseInt(expires))
    let cookietemp =
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
  get(name) {
    let a
    return this.filterXSS(
      (a = document.cookie.match(RegExp('(^|;\\s*)' + name + '=([^;]*)(;|$)')))
        ? unescape(a[2])
        : null
    )
  },
  clear(name, domain, path) {
    let d = new Date()
    this.set(name, '', -d.getTime() / 1000, domain, path)
  },
  filterXSS(e) {
    if (!e) return e
    for (; e != unescape(e); ) {
      e = unescape(e)
    }
    const r = ['<', '>', "'", '"', '%3c', '%3e', '%27', '%22', '%253c', '%253e', '%2527', '%2522']
    const n = [
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
    for (let a = 0; a < r.length; a++) {
      e = e.replace(new RegExp(r[a], 'gi'), n[a])
    }
    return e
  }
}
