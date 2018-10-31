import dialog from './dialog'

const load_data_dialog =
  '<div id="load_data" class="load_data" ><img src="http://ossweb-img.qq.com/images/comm/load.gif"><span >正在初始化数据，请勿刷新页面...</span></div>'
//loading
const loading_dialog =
  '<div id="loading" class="load_data"><img src="http://ossweb-img.qq.com/images/comm/load.gif"><span >loading...</span></div>'
//提示
const tip_dialog =
  '<div class="my_pop" id="my_tip"><div class="pop_hd"><h3>提示</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd"><div class="icon_yes icon"></div><p class="txt_msg">操作成功</p><p class="txt_tip"></p></div><div class="pop_fd"><p class="t_btn"> <a href="javascript:closeDialog()" title="确定" class="g_btn_normal"><span>&nbsp;确&nbsp;&nbsp;定&nbsp;</span></a> </p></div></div>'

//错误提示
const warn_dialog =
  '<div class="my_pop" id="my_warn"><div class="pop_hd"><h3>提示</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd" ><div class="icon_warn icon"></div><p class="txt_msg">操作失败</p><p class="txt_tip"></p></div><div class="pop_fd"><p class="t_btn"> <a href="javascript:closeDialog()" title="确定" class="g_btn_normal"><span>&nbsp;确&nbsp;&nbsp;定&nbsp;</span></a> </p></div></div>'

//确认框
const confirm_dialog =
  '<div class="my_pop" id="my_confirm"><div class="pop_hd"><h3>确认框</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd" ><p class="txt_msg">确定要执行此操作吗？</p><p class="txt_tip"> </p></div><div class="pop_fd"><p class="t_btn"> <a href="javascript:closeDialog()" title="确定" class="g_btn_normal"><span>&nbsp;确&nbsp;&nbsp;定&nbsp;</span></a> <a href="javascript:closeDialog()" title="取消" class="g_btn_gray"><span>&nbsp;取&nbsp;&nbsp;消&nbsp;</span></a> </p></div></div>'
//绑定大区
const set_zone_dialog =
  '<div class="my_pop" id="set_zone_dialog"><div class="pop_hd"><h3>绑定大区</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd"><div class="my_input"><label>大区：</label><select class="my_select" name="servers" id="select_zone"><option selected="selected" value="0">请选择大区</option><option value="1">加载大区中</option></select></div><div class="zone_wrap"><div class="my_input" id="role_server"><label>角色：</label><select id="select_role" class="my_select"><option value="传说之殇" charac_no="">加载角色中</option></select></div><div class="txt_tip warn" id="select_tip">查询人数过多 </div></div></div><div class="pop_fd"><p class="t_btn"> <a href="javascript:void(0)" id="select_submit" title="确定" class="g_btn_normal"><span>&nbsp;确&nbsp;&nbsp;定&nbsp;</span></a> <a href="javascript:closeDialog()" title="取消" class="g_btn_gray"><span>&nbsp;取&nbsp;&nbsp;消&nbsp;</span></a> </p></div></div>'

//礼包记录
const present_log =
  '<div class="my_pop my_present" id="present_log"><div class="pop_hd"><h3>我的礼包记录</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd"><table cellpadding="0" cellspacing="0"><thead><tr><td class="tt">获取时间</td><td class="tt">礼包内容</td><td class="tt">备注</td></tr></thead><tbody class="lists"><tr class="item list_1 odd"><td colspan="6">暂无记录</td></tr></tbody></table><div class="page"> <a href="javascript:;" class="pre_page">上一页</a><span class="number">1/1</span><a href="javascript:;" class="next_page">下一页</a> </div><p class="txt_tip"> 提示：实物奖品，将在活动结束15个工作日之后发放</p></div><div class="pop_fd"><p class="t_btn"> <a href="javascript:closeDialog()" title="确定" class="g_btn_normal"><span>&nbsp;确&nbsp;&nbsp;定&nbsp;</span></a> </p></div></div>'

//礼包记录
const present_log_four =
  '<div class="my_pop my_present" id="present_log_four"><div class="pop_hd"><h3>我的礼包记录</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd"><table cellpadding="0" cellspacing="0"><thead><tr><td class="tt">获取时间</td><td class="tt">礼包内容</td><td class="tt">礼包内容1</td><td class="tt">备注</td></tr></thead><tbody class="lists"><tr class="item list_1 odd"><td colspan="6">暂无记录</td></tr></tbody></table><div class="page"> <a href="javascript:;" class="pre_page">上一页</a><span class="number">1/1</span><a href="javascript:;" class="next_page">下一页</a> </div><p class="txt_tip"> 提示：实物奖品，将在活动结束15个工作日之后发放</p></div><div class="pop_fd"><p class="t_btn"> <a href="javascript:closeDialog()" title="确定" class="g_btn_normal"><span>&nbsp;确&nbsp;&nbsp;定&nbsp;</span></a> </p></div></div>'

//用户信息
const user_info =
  '<div class="my_pop user_info" id="user_info"><div class="pop_hd"><h3>填写个人信息</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd"><p class="detail txt_msg txt_msg_mobile">恭喜您，获得&nbsp;<span class="present">xxx</span></p><ul><li id="info-name"><label class="name"><span class="litSpan">*</span>姓名:</label><input type="text" name="sName" id="sName" class="type1" ></li><li id="info-idNo"><label class="name"><span class="litSpan">*</span>身份证号码:</label><input type="text" name="sIdentity" id="sIdentity" class="type1" maxlength="18"></li><li id="info-phone"><label class="name"><span class="litSpan">*</span>联系电话:</label><input type="text" name="sMobile" id="sMobile" class="type1" ></li><li id="info-address"><label class="name"><span class="litSpan">*</span>详细地址:</label><input type="text" name="sAddress" id="sAddress" class="type2 typ2-mobile"  ></li><li id="info-postcode"><label class="name"><span class="litSpan">*</span>邮编:</label><input type="text" name="sPostCode" id="sPostCode" class="type1" maxlength="6"></li></ul><div class="message"></div><p class="txt_tip">提示：实物奖品，将在活动结束30个工作日之后发放</p></div> <div class="pop_fd"><p class="t_btn"> <a id="personSubmitBtn" href="javascript:void(0)" title="确定" class="g_btn_normal"><span>&nbsp;提&nbsp;&nbsp;交&nbsp;</span></a> </p></div></div>'

//多游戏
const set_zone_dialog_mult =
  '<div class="my_pop" id="set_zone_dialog_mult"><div class="pop_hd"><h3>绑定大区</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd"><div id="game_list"><div id="game_list_server"><label>游戏：</label><select class="my_select" id="select_game_list"><option selected="selected" value="0">请选择游戏</option><option value="1">加载游戏中</option></select></div></div><div id="pc_game" style="display: none;"><div id="pc_zone"><div id="pc_zone_server"><label>大区：</label><select class="my_select" name="pc_zone_servers" id="select_pc_zone"><option selected="selected" value="0">请选择大区</option><option value="1">加载大区中</option></select></div></div><div id="pc_server" style="display: none;margin-left:-14px;"><div id="pc_server_server"><label>服务器：</label><select class="my_select" name="pc_server_servers" id="select_pc_server"><option selected="selected" value="0">请选择服务器</option><option value="1">加载服务器中</option></select></div></div><div id="pc_role"><div id="pc_role_server"><label>角色：</label><select class="my_select" name="pc_role_servers" id="select_pc_role"><option value="1" charac_no="">加载角色中</option></select></div><div class="txt_tip warn" id="select_pc_tip">查询人数过多 </div></div></div><div id="mb_game" style="display: none;"><div id="mb_channel"><div id="mb_channel_server"><label>渠道：</label><select class="my_select" name="mb_channel_servers" id="select_mb_channel"><option selected="selected" value="0">请选择渠道</option><option value="1">加载渠道中</option></select></div></div><div id="mb_system" style="display: none;"><div id="mb_system_server"><label>系统：</label><select class="my_select" name="mb_system_servers" id="select_mb_system"><option value="1">加载系统中</option></select></div></div><div id="mb_zone" style="display: none;"><div id="mb_zone_server"><label>大区：</label><select class="my_select" name="mb_zone_servers" id="select_mb_zone"><option selected="selected" value="0">请选择大区</option><option value="1">加载大区中</option></select></div></div><div id="mb_role" style="display:none;"><div id="mb_role_server" style="display:none;"><label>角色：</label><select class="my_select" name="mb_role_servers" id="select_mb_role"><option value="1" charac_no="">加载角色中</option></select></div><div class="txt_tip warn" id="select_mb_tip" style="display:none;">查询人数过多 </div></div></div></div><div class="pop_fd"><p class="t_btn"><a href="javascript:void(0)" id="select_submit_mult" title="确定" class="g_btn_normal"><span>&nbsp;确&nbsp;&nbsp;定&nbsp;</span></a><a href="javascript:closeDialog()" title="取消" class="g_btn_gray"><span>&nbsp;取&nbsp;&nbsp;消&nbsp;</span></a></p></div></div>'

//微信登录
const weixin_login_dialog =
  '<div class="my_pop" id="weixin_login_dialog"><div class="pop_hd"><h3>微信登录</h3><a class="t_close" href="javascript:closeDialog()" title="关闭"> × </a> </div><div class="pop_bd"><p class="txt_msg">操作成功</p><p class="txt_tip"></p></div><div class="pop_fd"><p class="t_btn"> <a href="javascript:closeDialog()" title="确定" class="g_btn_normal"><span>&nbsp;确&nbsp;&nbsp;定&nbsp;</span></a> </p></div></div>'

window.closeDialog = function() {
  dialog.hide()
}

export default {
  defaultErrorTip: '来的不是时候,请稍后重试!',
  hasInit: {},
  init() {
    this.initHtml()
  },
  initHtml() {
    const dialogComponents = {
      load_data_dialog,
      loading_dialog,
      tip_dialog,
      warn_dialog,
      confirm_dialog,
      set_zone_dialog,
      set_zone_dialog_mult,
      present_log,
      user_info,
      weixin_login_dialog,
      present_log_four
    }

    const dialogToId = {
      load_data_dialog: 'load_data',
      loading_dialog: 'loading',
      tip_dialog: 'my_tip',
      warn_dialog: 'my_warn',
      confirm_dialog: 'my_warn',
      set_zone_dialog: 'set_zone_dialog',
      present_log: 'present_log',
      user_info: 'user_info',
      set_zone_dialog_mult: 'set_zone_dialog_mult',
      weixin_login_dialog: 'weixin_login_dialog',
      present_log_four: 'present_log_four'
    }

    for (const key in dialogComponents) {
      this.hasInit[key] = true
      if (!!document.getElementById(dialogToId[key])) continue
      let d = document.createElement('div')
      d.innerHTML = dialogComponents[key]
      document.body.appendChild(d)
    }
  },
  open(id, p = {}) {
    dialog.show({
      id,
      bgcolor: p.bgcolor || '#000',
      opacity: p.opacity || 50
    })
  },
  tip({ id, msg, tip = '', cb, cancleCb = null }) {
    const tipIds = ['my_tip', 'my_warn', 'my_warn']
    if (!tipIds.includes(id)) {
      console.error('id shoud be oneOf ' + JSON.stringify(tipIds))
      return
    }
    $('#' + id)
      .find('.txt_msg')
      .html(msg)
      .end()
      .find('.txt_tip')
      .html(tip)
    let d = $('#' + id + ' .g_btn_normal'),
      _d = $('#' + id + ' .g_btn_gray')
    if (typeof cb === 'function') d.unbind('click').click(cb)
    else d.unbind('click')
    if (typeof cancleCb == 'function') _d.unbind('click').click(cancleCb)
    else _d.unbind('click')
    this.open(id)
  },
  errorTipsConf: {
    '0': '哎呀，出错啦，请刷新后再试吧！',
    '-1': '抱歉，该账户操作太快了，歇息几秒再重试',
    '-2': '抱歉，请重试',
    '-3': '抱歉，抢礼包的人太多了，您没挤进去，请重试',
    '-4': '抱歉，您来晚了，今天礼包被人抢光了',
    '-5': '抱歉，您来晚了，礼包被人抢光了<br>欢迎继续关注WeGame的其他活动',
    '-6': '抱歉，活动还未开始',
    '-7': '抱歉，本活动已经结束<br>欢迎继续关注WeGame的其他活动',
    '-8': '抱歉，操作失败，请重试'
  },
  extendErrorTips(config = {}) {
    $.extend(this.errorTipsConf, config)
  },
  errorTip(errorId) {
    let t = '',
      p = '',
      cb = null,
      _tips = this.errorTipsConf[errorId]
    if (!_tips) t = this.defaultErrorTip
    else if ($.type(_tips) === 'string') t = _tips
    else ({ t, p, cb } = _tips)
    this.tip({
      id: 'my_warn',
      msg: t,
      tip: p
    })
  }
}
