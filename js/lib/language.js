var i18nLanguage = $cookie.get("language") || 'zh_CN';
var ROOT = 'https://www.abc.com/frames/lang/';

function execI18n() {
    var imgEls = $('.i18n-img'),
        imgURL = i18nLanguage === 'zh_HK' ?
        'https://www.abc.com/frames/images/zh_HK' :
        'https://www.abc.com/frames/images/zh_CN'

    imgEls.each(function() {
        var _src = $(this).attr('data-src')
        $(this).attr('src', _src.replace('http://wegame.gtgres.com/frames/images', imgURL))
    })

    var cssURL = i18nLanguage === 'zh_HK' ?
        'https://www.abc.com/frames/css/zh_HK-wegame-guide.css' :
        'https://www.abc.com/frames/css/zh_CN-wegame-guide.css'
    $('#i18n-css') && $('#i18n-css').attr('href', cssURL)

    var optionEle = $("#i18n_pagename");
    if (!optionEle.length) {
        console.log(
            '未找到页面名称元素，请在页面写入\n <meta id="i18n_pagename" content="页面名(对应语言包的语言文件名)">'
        );
        return false;
    }
    var sourceName = optionEle.attr("content");
    sourceName = sourceName.split("-");

    /* 需要引入 i18n 文件*/
    if ($.i18n == undefined) {
        console.log("请引入i18n js 文件");
        return false;
    }

    $.i18n.properties({
        name: sourceName, //资源文件名称
        async: true,
        path: ROOT + i18nLanguage + "/", //资源文件路径
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
            console.log(".i18n写入完毕");

            console.log(".i18n-input 写入中...");
            var insertInputEle = $(".i18n-input");
            insertInputEle.each(function() {
                var selectAttr = $(this).attr("selectattr");
                if (!selectAttr) selectAttr = "value";
                $(this).attr(selectAttr, $.i18n.prop($(this).attr("selectname")));
            });
            console.log(".i18n-input写入完毕");

            console.log(".i18n-title 写入中...");
            var titleEls = $(".i18n-title");
            titleEls.each(function() {
                var hoverAttr = $(this).attr("hoverattr");
                $(this).attr(hoverAttr, $.i18n.prop($(this).attr("hovername")));
            });
            console.log(".i18n-title 写入完毕");
        }
    });
}

/*页面执行加载执行*/
$(function() {
    /*执行I18n翻译*/
    execI18n();
});