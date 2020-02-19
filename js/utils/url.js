export function getUrlParam(key = '', specialUrl = window.location.href) {
  const url = specialUrl.replace(/#+.*$/, '')
  const search = url.substring(url.lastIndexOf('?') + 1)
  const result = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    result[name] = val
    return rs
  })
  return key ? result[key] : result
}

export function encodeSearchParams(data) {
  const params = []
  Object.keys(data).forEach(key => {
    let value = data[key]
    if (!value) value = ''
    params.push([key, encodeURIComponent(value)].join('='))
  })
  return params.join('&')
}

export function downloadFile(content, name, suffix) {
  const url = window.URL.createObjectURL(new Blob([content]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = parseTime(new Date()) + '-' + name + '.' + suffix
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
