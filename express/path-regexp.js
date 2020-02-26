module.exports = pathRegexp

function pathRegexp(path, paramNames = [], { end = false } = {}) {
  path = path
    .concat(end ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star) {
      slash = slash || ''
      paramNames.push(key)
      return (
        '' +
        (optional ? '' : slash) +
        '(?:' +
        (optional ? slash : '') +
        (format || '') +
        (capture || (format && '([^/.]+?)') || '([^/]+?)') +
        ')' +
        (optional || '') +
        (star ? '(/*)?' : '')
      )
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)')
  return new RegExp('^' + path + '$')
}
