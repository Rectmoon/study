//如果浏览器不支持fetch，可以使用第三方的ployfill来实现：whatwg-fetch
function objToString(obj, arr = [], idx = 0) {
  for (let item in obj)
    arr[idx++] = [item, obj[item]]
  return new URLSearchParams(arr).toString()
  // let paramsArray = []
  // Object.keys(data).forEach(key => {
  //   paramsArray.push(key + '=' + data[key])
  // })
  // if (url.search(/\?/) === -1)
  //   url += '?' + paramsArray.join('&')
  // else url += '&' + paramsArray.join('&')
}

function checkStatus(response) {
  if (
    response.status >= 200 &&
    response.status < 300
  ) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

/*
For CORS requests, use credentials: 'include' to allow sending credentials to other domains:
To disable sending or receiving cookies for requests to any domain, including the current one, use the "omit" value:
The default value for credentials is "same-origin".
**/
function commonFetch(
  url,
  method = 'GET',
  data = {},
  withCredentials = false
) {
  let params
  if (method === 'GET') {
    const searchStr = objToString(data)
    url +=
      url.search(/\?/) === -1
        ? '?' + searchStr
        : searchStr
    params = {
      method,
      credentials: withCredentials
        ? 'include'
        : 'same-origin'
    }
  } else if (method === 'POST') {
    params = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type':
          'application/x-www-form-urlencoded'
      },
      credentials: withCredentials
        ? 'include'
        : 'same-origin',
      body: JSON.stringify(data)
    }
  }
  return new Promise((resolve, reject) => {
    fetch(url, params)
      .then(checkStatus)
      .then(res => res.json())
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject('request failed')
      })
  })
}

export function get(url, data) {
  return commonFetch(url, 'GET', data)
}

export function post(url, data) {
  commonFetch(url, 'POST', data)
}

//get('https://www.baidu.com/search/error.html', {a:1,b:2})
//post('https://www.baidu.com/search/error.html', {a:1,b:2})
