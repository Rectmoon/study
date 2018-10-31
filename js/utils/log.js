const fs = require('fs')
const path = require('path')

// 获取字符串
function getLastCode(str) {
  return str.substr(str.length - 1, 1)
}

// 打印目录树,depth为递归的深度，可根据递归的深度输出 文件名称前面的格式,exts为要打印的具体文件的后缀名数组
function consoleDirTree(url, depth = 0, exts = []) {
  let fir_code = ''
  // 计算文件名称前面的字符，4个空格为1组
  for (let j = 0; j < depth; j++) fir_code += '    '
  depth && (fir_code += '|---')
  let stats = fs.statSync(url)
  if (stats.isFile()) {
    console.log(fir_code + url)
  } else if (stats.isDirectory()) {
    let files = fs.readdirSync(url)
    for (let i = 0, len = files.length; i < len; i++) {
      let item = files[i],
        itempath = getLastCode(url) == '/' ? url + item : url + '/' + item,
        st = fs.statSync(itempath)
      if (st.isDirectory()) {
        console.log(fir_code + item)
        consoleDirTree(itempath, depth + 1, exts)
      } else {
        if (!exts.length || exts.includes(path.extname(item))) {
          console.log(fir_code + item)
        }
      }
    }
  }
}
// consoleDirTree('../src', 0, ['.styl', '.html', '.js'])

// 删除路径下所有的文件和文件夹，包括path自己
function rmAll(url) {
  let stats = fs.statSync(url)
  if (stats.isFile()) {
    fs.unlinkSync(url)
    console.log('删除成功： ' + url)
  } else if (stats.isDirectory()) {
    // 若当前路径是文件夹，则获取路径下所有的信息，并循环
    let files = fs.readdirSync(url)
    for (let i = 0, len = files.length; i < len; i++) {
      let item = files[i],
        itempath = getLastCode(url) == '/' ? url + item : url + '/' + item,
        st = fs.statSync(itempath)
      if (st.isFile()) {
        fs.unlinkSync(itempath)
        console.log('删除成功： ' + itempath)
      } else if (st.isDirectory()) {
        rmAll(itempath)
      }
    }
    fs.rmdirSync(url)
    console.log('删除成功： ' + url)
  }
}
