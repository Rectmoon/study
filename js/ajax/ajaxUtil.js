export default {
  defalutOptions: {
    data: {},
    dataType: 'json',
    beforeSend() {},
    success() {},
    error() {}
  },

  getXhr() {
    if (window.XMLHttpRequest) return new XMLHttpRequest()
    const versions = [
      'MSXML2.XmlHttp.6.0',
      'MSXML2.XmlHttp.5.0',
      'MSXML2.XmlHttp.4.0',
      'MSXML2.XmlHttp.3.0',
      'MSXML2.XmlHttp.2.0',
      'Microsoft.XmlHttp'
    ]
    let xhr
    for (let i = 0; i < versions.length; i++) {
      try {
        xhr = new ActiveXObject(versions[i])
        break
      } catch (e) {}
    }
    return xhr
  },

  send(url, method, request, async) {
    const req = Object.assign({}, this.defalutOptions, request)
    req.beforeSend()
    const handleResult = xhr => {
      const { success, error } = req
      if (xhr.status == 200) {
        let responseText = xhr.responseText
        if (request.dataType && request.dataType === 'json')
          responseText = JSON.parse(responseText)
        success({
          data: responseText,
          status: xhr.status,
          statusText: xhr.statusText,
          upload: xhr.upload
        })
      } else {
        error({
          status: xhr.status,
          statusText: xhr.statusText
        })
      }
    }
    const xhr = this.getXhr()
    xhr.open(method, url, async)
    xhr.withCredentials = true
    if (request.withCredentials !== undefined)
      xhr.withCredentials = !!request.withCredentials
    xhr.ontimeout = () => console.error('请求: ' + url + ' 超时。')
    xhr.onerror = () => console.error(xhr.statusText)
    if (async)
      xhr.onreadystatechange = () => xhr.readyState == 4 && handleResult(xhr)
    else handleResult(xhr)
    if (method == 'POST' && request.contentType)
      xhr.setRequestHeader('Content-Type', request.contentType)
    xhr.send(request.data)
  },

  get(url, request, async = true) {
    const query = this.convertData(request.data)
    this.send(
      url + (query.length ? '?' + query.join('&') : ''),
      'GET',
      request,
      async
    )
  },

  post(url, request, async = true) {
    if (request.contentType === false)
      return this.send(url, 'POST', request, async)
    if (request.contentType && request.contentType.match(/json/g)) {
      try {
        request.data = JSON.stringify(request.data)
      } catch (e) {
        throw new Error(e)
      }
    } else {
      const query = this.convertData(request.data)
      request.contentType =
        request.contentType ||
        'application/x-www-form-urlencoded; charset=UTF-8'
      request.data = query.join('&')
    }
    this.send(url, 'POST', request, async)
  },

  convertData(params) {
    const query = []
    Object.keys(params).forEach(k => {
      const v = params[k]
      query.push(encodeURIComponent(k) + '=' + encodeURIComponent(v))
    })
    return query
  }
}
