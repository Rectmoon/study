var i18nLanguage = "zh_CN";
var webLanguage = ["zh_CN", "zh_HK", "en_US"];

//获取浏览器语言类型
function getNavLanguage() {
  if (navigator.appName == "Netscape") {
    var navLanguage = navigator.language;
    return navLanguage.substr(0, 2);
  }
  return false;
}

function execI18n() {
  var optionEle = $("#i18n_pagename");
  if (!optionEle.length) {
    console.log(
      '未找到页面名称元素，请在页面写入\n <meta id="i18n_pagename" content="页面名(对应语言包的语言文件名)">'
    );
    return false;
  }
  var sourceName = optionEle.attr("content");
  sourceName = sourceName.split("-");

  if (moon.cookie.get("userLanguage")) {
    i18nLanguage = moon.cookie.get("userLanguage");
  } else {
    // 获取浏览器语言
    var navLanguage = getNavLanguage();
    if (navLanguage) {
      // 判断是否在网站支持语言数组里
      var charSize = $.inArray(navLanguage, webLanguage);
      if (charSize > -1) {
        i18nLanguage = navLanguage;
        // 存到缓存中
        moon.cookie.set("userLanguage", navLanguage);
      }
    } else {
      console.log("not navigator");
      return false;
    }
  }

  /* 需要引入 i18n 文件*/
  if ($.i18n == undefined) {
    console.log("请引入i18n js 文件");
    return false;
  }

  $.i18n.properties({
    name: sourceName, //资源文件名称
    path: "i18n/" + i18nLanguage + "/", //资源文件路径
    mode: "map", //用Map的方式使用资源文件中的值
    language: i18nLanguage,
    callback: function() {
      //加载成功后设置显示内容
      var insertEle = $(".i18n");
      console.log(".i18n 写入中...");
      insertEle.each(function() {
        // 根据i18n元素的 name 获取内容写入
        $(this).html($.i18n.prop($(this).attr("name")));
      });
      console.log("写入完毕");

      console.log(".i18n-input 写入中...");
      var insertInputEle = $(".i18n-input");
      insertInputEle.each(function() {
        var selectAttr = $(this).attr("selectattr");
        if (!selectAttr) {
          selectAttr = "value";
        }
        $(this).attr(selectAttr, $.i18n.prop($(this).attr("selectname")));
      });
      console.log("写入完毕");
    }
  });
}

/*页面执行加载执行*/
$(function() {
  /*执行I18n翻译*/
  execI18n();

  /*将语言选择默认选中缓存中的值*/
  $("#language option[value=" + i18nLanguage + "]").attr("selected", true);

  /* 选择语言 */
  $("#language").on("change", function() {
    var language = $(this)
      .children("option:selected")
      .val();
    console.log(language);
    moon.cookie.set("userLanguage", language, {
      expires: 30,
      path: "/"
    });
    location.reload();
  });
});
