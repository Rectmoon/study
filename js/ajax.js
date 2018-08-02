function ajax() {
  var ajaxOptions = {
    type: arguments[0].type || 'GET',
    url: arguments[0].url || '',
    async: arguments[0].async || 'true',
    data: arguments[0].data || null,
    dataType: arguments[0].dataType || 'text',
    contentType: arguments[0].contentType || 'application/x-www-form-urlencoded',
    beforeSend: arguments[0].beforeSend || function() {},
    success: arguments[0].success || function() {},
    error: arguments[0].error || function() {}
  }
  ajaxOptions.beforeSend()
  var xhr = createxmlHttpRequest()
  xhr.responseType = ajaxOptions.dataType
  xhr.open(ajaxOptions.type, ajaxOptions.url, ajaxOptions.async)
  xhr.setRequestHeader('Content-Type', ajaxOptions.contentType)
  xhr.send(convertData(ajaxOptions.data))
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        ajaxOptions.success(xhr.response)
      } else {
        ajaxOptions.error()
      }
    }
  }
}

function createxmlHttpRequest() {
  if (window.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP')
  return new XMLHttpRequest()
}
function convertData(data) {
  if (typeof data === 'object') {
    var convertResult = ''
    for (var c in data) convertResult += c + '=' + data[c] + '&'
    convertResult = convertResult.substring(0, convertResult.length - 1)
    return convertResult
  } else {
    return data
  }
}

// ajax({
//   type: 'POST',
//   url: 'ajax.php',
//   dataType: 'json',
//   data: { val1: 'abc', val2: 123, val3: '456' },
//   beforeSend: function() {
//     //some js code
//   },
//   success: function(msg) {
//     console.log(msg)
//   },
//   error: function() {
//     console.log('error')
//   }
// })
