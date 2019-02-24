function watchIt(container, el, args, zIndex, base64Url, cb) {
  const styleStr = `
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`

  el.setAttribute('style', styleStr)
  el.classList.add('__wm')

  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver
  if (MutationObserver) {
    let mo = new MutationObserver(function() {
      console.log(1)
      const __wm = document.querySelector('.__wm')
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
        mo.disconnect()
        mo = null
        cb(JSON.parse(JSON.stringify(args)))
      }
    })
    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true
    })
  }
}

function redefine(fn) {
  if (typeof module != 'undefined' && module.exports) {
    module.exports = fn
  } else if (typeof define == 'function' && define.amd) {
    define(function() {
      return fn
    })
  } else {
    window[fn.name] = fn
  }
}

;(function() {
  function __canvasWM({
    container = document.body,
    width = '300px',
    height = '200px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '20px Microsoft Yahei',
    fillStyle = 'rgba(184, 184, 184, 0.6)',
    content = '请勿外传',
    rotate = '30',
    zIndex = 1000
  } = {}) {
    const args = arguments[0]
    const canvas = document.createElement('canvas')

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    const ctx = canvas.getContext('2d')

    ctx.textAlign = textAlign
    ctx.textBaseline = textBaseline
    ctx.font = font
    ctx.fillStyle = fillStyle
    ctx.rotate((Math.PI / 180) * rotate)
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2)

    const base64Url = canvas.toDataURL()
    const __wm = document.querySelector('.__wm')
    const watermarkDiv = __wm || document.createElement('div')
    if (!__wm) {
      container.style.position = 'relative'
      container.insertBefore(watermarkDiv, container.firstChild)
    }
    watchIt(container, watermarkDiv, args, zIndex, base64Url, __canvasWM)
  }
  redefine(__canvasWM)
})()
;(function() {
  function __svgWM({
    container = document.body,
    content = '请勿外传',
    width = '300px',
    height = '200px',
    opacity = '0.2',
    fontSize = '20px',
    zIndex = 1000
  } = {}) {
    const args = arguments[0]
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}">
                    <text x="50%" y="50%" dy="12px"
                    text-anchor="middle"
                    stroke="#000000"
                    stroke-width="1"
                    stroke-opacity="${opacity}"
                    fill="none"
                    transform="rotate(-45, 120 120)"
                    style="font-size: ${fontSize};">
                    ${content}
                    </text>
                    </svg>`
    const base64Url = `data:image/svg+xml;base64,${window.btoa(
      unescape(encodeURIComponent(svgStr))
    )}`

    const __wm = document.querySelector('.__wm')
    const watermarkDiv = __wm || document.createElement('div')
    if (!__wm) {
      container.style.position = 'relative'
      container.insertBefore(watermarkDiv, container.firstChild)
    }
    watchIt(container, watermarkDiv, args, zIndex, base64Url, __svgWM)
  }
  redefine(__svgWM)
})()
;(function() {
  function __picWM({
    url = '',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '20px Microsoft Yahei',
    fillStyle = 'rgba(184, 184, 184, 0.8)',
    content = '请勿外传',
    cb = null,
    textX = 100,
    textY = 30
  } = {}) {
    const img = new Image()
    img.src = url
    img.crossOrigin = 'anonymous'
    img.onload = function() {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      ctx.textAlign = textAlign
      ctx.textBaseline = textBaseline
      ctx.font = font
      ctx.fillStyle = fillStyle
      ctx.fillText(content, img.width - textX, img.height - textY)
      const base64Url = canvas.toDataURL()
      cb && cb(base64Url)
    }
  }
  redefine(__picWM)
})()
