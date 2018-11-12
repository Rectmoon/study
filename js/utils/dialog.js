import browser from './browser'

let fixIECenter,
  oOverLay,
  popType = '',
  fMsgClose = null,
  fixOverlay = null,
  dialogElement = null,
  lastFocus = null,
  focusHandle = null,
  escCloseHandle = null,
  bOverlay = false,
  isLongPopBox = false,
  dialogOpen = false,
  isIE = browser.msie,
  bVsn = browser.version,
  isIE6 = isIE && bVsn == '6.0',
  isIE9 = isIE && bVsn == '9.0',
  isSafari = browser.safari,
  oWin = window,
  oDoc = document,
  oBody = oDoc.body,
  oDel = oDoc.documentElement,
  IFRAME_ID = '_PopupIframe_',
  MESSAGE_ID = '_PopupMsg_',
  OVERLAY_ID = '_overlay_'

export default {
  show(p) {
    let _p = typeof p === 'object' ? p : {},
      _sAuto = 'auto'
    this.id = _p.id || null
    this.bgcolor = _p.bgcolor || '#111'
    this.opacity = _p.opacity || 70
    this.src = _p.src || null
    this.fixed = _p.fixed || false
    this.iTop = _p.iTop || _sAuto
    this.iWidth = _p.iWidth || _sAuto
    this.iHeight = _p.iHeight || _sAuto
    this.sMsg = _p.sMsg || null
    this.sClass = _p.sClass || null
    this.sStyles = _p.sStyle || 'padding:10px;border:4px solid #dedede;background-color:#fff'
    this.sTime = _p.sTime || null
    this.delayPop = _p.delayPop || false
    this.sPzIndex = _p.PopzIndex || 9999
    this.isNoAccessible = _p.isNoAccessible || false
    if (this.sPzIndex < 9) this.sPzIndex = 9
    this.onPopupCallback = _p.onPopupCallback || null
    this.onCloseCallback = _p.onCloseCallback || null
    this.hasFrame = _p.bFrame || false
    if (typeof p == 'string' && p != null && p != '') this.id = p
    if (arguments.length == 4) {
      this.src = arguments[0]
      this.iWidth = arguments[1]
      this.iHeight = arguments[2]
    }
    if (this.id == null && this.src == null && this.sMsg == null) return
    if (dialogOpen) this.hide({ isNoCloseOverLay: true })
    if (this.src != null) {
      this.id = IFRAME_ID
      popType = 'iframe'
      return this.popupInit()
    }
    if (this.sMsg != null) {
      this.id = MESSAGE_ID
      popType = 'message'
      return this.popupInit()
    }
    if (this.id != null) {
      dialogElement = $('#' + this.id)[0]
      popType = 'dialog'
      return this.popupInit()
    }
  },
  popupInit() {
    let _callBack = this.onPopupCallback,
      _zIndex = this.sPzIndex,
      _oIfrWrap,
      _oIframe,
      _oMsg,
      _class,
      _msgCloseTime
    if (typeof _callBack === 'function') _callBack()
    if (oOverLay === undefined) oOverLay = $('#' + OVERLAY_ID)[0]
    if (!bOverlay) {
      if (oOverLay) {
        $(oOverLay).css({
          backgroundColor: this.bgcolor,
          zIndex: _zIndex - 1,
          display: 'block'
        })
      } else {
        this.overlay()
      }
    }
    if (popType === 'iframe') {
      if (!$('#' + IFRAME_ID)) {
        _oIfrWrap = oDoc.createElement('div')
        oOverLay.parentNode.insertBefore(_oIfrWrap, oOverLay)
      } else _oIfrWrap = $('#' + IFRAME_ID)[0].parentNode
      _oIfrWrap.style.display = 'none'
      _oIframe = oDoc.createElement('iframe')
      _oIframe.setAttribute('allowtransparency', 'true')
      _oIframe.setAttribute('scrolling', 'no')
      _oIframe.setAttribute('frameborder', '0')
      _oIframe.setAttribute('height', this.iHeight)
      _oIframe.setAttribute('width', this.iWidth)
      _oIframe.setAttribute('id', IFRAME_ID)
      _oIframe.src = this.src
      if (_oIframe.attachEvent) {
        _oIframe.attachEvent('onload', () => {
          this.ifrAutoHeight(_oIframe)
        })
      } else {
        _oIframe.onload = () => {
          this.ifrAutoHeight(_oIframe)
        }
      }
      if (!this.delayPop) _oIfrWrap.style.display = 'block'
      _oIfrWrap.innerHTML = ''
      _oIfrWrap.appendChild(_oIframe)
      dialogElement = _oIfrWrap
    }
    if (popType === 'message') {
      if (!$('#' + MESSAGE_ID)) {
        _oMsg = oDoc.createElement('div')
        _oMsg.setAttribute('id', MESSAGE_ID)
        oOverLay.parentNode.insertBefore(_oMsg, oOverLay)
      } else _oMsg = $('#' + MESSAGE_ID)[0]
      _oMsg.style.cssText = this.sStyles
      if (this.sClass != null) {
        _class = isIE ? 'className' : 'class'
        _oMsg.setAttribute(_class, this.sClass)
      }
      _oMsg.style.display = 'none'
      _oMsg.innerHTML = this.sMsg
      if (!this.delayPop) _oMsg.style.display = 'block'
      if (this.sTime != null) {
        if (!dialogOpen) clearTimeout(_msgCloseTime)
        _msgCloseTime = setTimeout(() => {
          this.hide()
        }, this.sTime)
      } else {
        fMsgClose = e => {
          let targ
          e = e || oWin.event
          targ = e.target || e.srcElement
          if (targ.id === OVERLAY_ID) {
            e.stopPropagation()
            this.hide()
          }
        }
        $(oOverLay).on('click', fMsgClose)
      }
      dialogElement = _oMsg
    }
    if (this.delayPop) dialogElement.style.display = 'none'
    else dialogElement.style.display = 'block'
    $(dialogElement).css({
      visibility: 'visible',
      position: 'absolute',
      zIndex: _zIndex,
      left: '50%',
      top: '50%'
    })
    dialogElement.setAttribute('role', 'dialog')
    dialogElement.tabIndex = -1
    if (!this.isNoAccessible) {
      focusHandle = e => {
        let targ
        e = e || oWin.event
        targ = e.target || e.srcElement
        if (dialogOpen && !dialogElement.contains(targ)) {
          e.stopPropagation()
          $(dialogElement).css({
            display: 'block',
            visibility: 'visible'
          })
          setTimeout(() => {
            try {
              if (dialogElement && dialogElement.offsetHeight > 0) {
                dialogElement.focus()
              }
            } catch (e) {console.error(e)}
          }, 250)
        }
      }
      lastFocus = oDoc.activeElement
      oDoc.onfocus = focusHandle
      if (oDoc.addEventListener) oDoc.addEventListener('focus', focusHandle, true)
      else oDoc.onfocusin = focusHandle
      escCloseHandle = e => {
        let code
        e = e || oWin.event
        code = e.keyCode || e.which
        if (dialogOpen && code == 27 && !this.isNoAccessible) this.hide()
      }
      $(oDoc).on('keyup', escCloseHandle)
    }
    if (!this.delayPop) this.adjust()
  },
  //对话框样式调整
  adjust() {
    let _h = browser.getWinHeight(),
      _imh = browser.getMaxH(),
      _rt = null,
      _st = null,
      _obj = dialogElement,
      _iw,
      _ih,
      _iTop,
      _iPh
    if (oOverLay === undefined) oOverLay = $('#' + OVERLAY_ID)[0]
    if (_obj) {
      _iw = _obj.offsetWidth
      _ih = _obj.offsetHeight
      if (this.fixed) {
        if ($.isNumeric(this.iTop)) {
          $(_obj).css({
            top: this.iTop + 'px',
            marginTop: 0
          })
        } else {
          _obj.style.marginTop = '-' + _ih / 2 + 'px'
        }
        $(_obj).css({
          position: 'absolute',
          marginLeft: '-' + _iw / 2 + 'px'
        })
      } else {
        if (_ih >= _h) {
          isLongPopBox = true
          if ($.isNumeric(this.iTop)) _iTop = this.iTop
          else {
            _iTop = oBody.scrollTop || oDel.scrollTop || 0
            _iTop = _iTop + 50
          }
          $(_obj).css({
            position: 'absolute',
            top: _iTop + 'px',
            marginLeft: '-' + _iw / 2 + 'px',
            marginTop: 0
          })
          _iPh = _ih + _iTop
          oOverLay.style.height = Math.max(_iPh, _imh) + 'px'
        } else {
          isLongPopBox = false
          isIE6 || oDoc.documentMode < 7
            ? (_obj.style.position = 'absolute')
            : (_obj.style.position = 'fixed')
          $(_obj).css({
            marginTop: '-' + _ih / 2 + 'px',
            marginLeft: '-' + _iw / 2 + 'px'
          })
        }
      }
      fixOverlay = () => {
        if (_rt) clearTimeout(_rt)
        _rt = setTimeout(() => {
          this.fix_Overlay()
        }, 250)
      }
      $(oWin).on('resize', fixOverlay)
      if (isIE || isSafari) {
        this.fix_Overlay()
        if (isIE6) {
          this.fixIE6_Center()
          fixIECenter = () => {
            if (_st) clearTimeout(_st)
            _st = setTimeout(() => {
              this.fixIE6_Center()
            }, 250)
          }
          $(oWin).on('scroll', fixIECenter)
        }
      }
    }
    dialogOpen = true
  },
  fix_Overlay() {
    let _w = browser.getMaxW(),
      _h = browser.getMaxH(),
      _wh = browser.getWinHeight(),
      _obj = dialogElement,
      _ih,
      _iTop
    if (oOverLay === undefined) $('#' + OVERLAY_ID)[0]
    if (isIE9 && (!oDoc.documentMode || oDoc.documentMode > 8)) _w = _w - 17 < 0 ? 0 : _w - 3
    _h = _h - 3 < 0 ? 0 : _h - 3
    try {
      _ih = _obj.offsetHeight
    } catch (e) {
      _ih = this.iHeight
      _obj = $('#' + IFRAME_ID)[0]
    }
    if (_ih >= _wh) {
      isLongPopBox = true
      if ($.isNumeric(this.iTop)) _iTop = this.iTop
      else {
        _iTop = oBody.scrollTop || oDel.scrollTop
        _iTop = _iTop + 50
      }
      $(_obj).css({
        position: 'absolute',
        top: _iTop + 'px',
        marginTop: '0'
      })
    } else {
      isLongPopBox = false
    }
    if (isIE) oOverLay.style.width = _w + 'px'
    oOverLay.style.height = _h + 'px'
  },
  // ie6下的滚动
  fixIE6_Center() {
    let _iScrollTop,
      _obj = dialogElement
    if (!isLongPopBox) {
      if (!this.fixed) {
        _iScrollTop = oBody.scrollTop || oDel.scrollTop
        dialogElement.style.marginTop = parseInt(_iScrollTop - _obj.offsetHeight / 2, 10) + 'px'
      }
    }
  },
  // iframe自适应高度
  ifrAutoHeight() {
    let _bh, _dh, _win, _h
    if (this.iHeight != 'auto') return
    _win = dialogElement
    try {
      _bh = _win.contentWindow.document.body.scrollHeight
      _dh = _win.contentWindow.document.documentElement.scrollHeight
      _h = Math.max(_bh, _dh)
      this.iHeight = _win.height = _h
    } catch (e) {console.error(e)}
    $(_win).css({
      marginTop: '-' + _win.offsetHeight / 2 + 'px',
      marginLeft: '-' + _win.offsetWidth / 2 + 'px',
      outline: 'none'
    })
    this.fix_Overlay()
  },
  //对话框关闭
  hide(p) {
    let _p = typeof p === 'object' ? p : {},
      _callBack = this.onCloseCallback,
      _cancleCallback = _p.cancleCallback || false,
      _isNoCloseOverLay = _p.isNoCloseOverLay || false
    if (oOverLay === undefined) oOverLay = $('#' + OVERLAY_ID)[0]
    if (fixOverlay !== null) $(oWin).off('resize', fixOverlay)
    if (isIE6 && fixIECenter != null) $(oWin).off('scroll', fixIECenter)
    if (fMsgClose !== null) $(oOverLay).off('click', fMsgClose)
    if (escCloseHandle !== null) $(oDoc).off('keyup', escCloseHandle)
    if (typeof _callBack === 'function' && !_cancleCallback) _callBack()
    dialogOpen = false
    if (!this.isNoAccessible) {
      if (focusHandle !== null) {
        if (oDoc.removeEventListener) oDoc.removeEventListener('focus', focusHandle, false)
        else oDoc.onfocus = null
        if ((oDoc.onfocus = focusHandle)) oDoc.onfocus = null
      }
      if (lastFocus && lastFocus.offsetHeight > 0) lastFocus.focus()
    }
    if (dialogElement === null) {
      switch (popType) {
        case 'message':
          dialogElement = $('#' + MESSAGE_ID)[0]
          break
        case 'iframe':
          dialogElement = $('#' + IFRAME_ID)[0]
          break
        case 'dialog':
          dialogElement = $('#' + this.id)[0]
          break
        default:
          break
      }
    }
    dialogElement.style.display = 'none'
    if (!_isNoCloseOverLay) oOverLay.style.display = 'none'
    bOverlay = false
  },
  overlay() {
    let _h = browser.getMaxH(),
      _zIndex = this.sPzIndex - 1,
      _op = this.opacity,
      _it,
      _ib,
      _w
    if (isIE) {
      _it = parseInt($(oBody).css('marginTop'), 10)
      _ib = parseInt($(oBody).css('marginBottom'), 10)
      _h = _h + _it + _ib
    }
    oOverLay = oDoc.createElement('div')
    oOverLay.setAttribute('id', OVERLAY_ID)
    $(oOverLay).css({
      backgroundColor: this.bgcolor,
      borderTop: '1px solid ' + this.bgcolor,
      position: 'absolute',
      height: _h + 'px',
      zIndex: _zIndex,
      width: '100%',
      left: '0',
      top: '0'
    })
    if (isIE6 || this.hasFrame) {
      _w = browser.getMaxW()
      oOverLay.style.width = _w + 'px'
      oOverLay.innerHTML =
        '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;filter:alpha(opacity=0);z-index:9" src="javascript:void(0)"></iframe>'
    }
    if (isIE && (!oDoc.documentMode || oDoc.documentMode < 9))
      oOverLay.style.filter = 'Alpha(opacity=' + _op + ')'
    else oOverLay.style.opacity = _op / 100
    bOverlay = true
    return oBody.appendChild(oOverLay)
  }
}
