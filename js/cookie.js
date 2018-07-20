function namespace() {
  var a = arguments,
    o = null,
    i,
    j,
    d;
  for (i = 0; i < a.length; i++) {
    d = a[i].split(".");
    o = window;
    for (j = 0; j < d.length; j++) {
      o[d[j]] = o[d[j]] || {};
      o = o[d[j]];
    }
  }
  return o;
}

namespace("moon.cookie");

(function() {
  var cookie = moon.cookie;
  $.extend(cookie, {
    set: function(name, value) {
      var expdate = new Date();
      var expires = arguments[2] || null;
      var path = arguments[3] || "/";
      var domain = arguments[4] || null;
      var secure = arguments[5] || false;
      if (expires) {
        expdate.setMinutes(expdate.getMinutes() + parseInt(expires));
      }
      var cookietemp =
        escape(name) +
        "=" +
        escape(value) +
        (expires ? "; expires=" + expdate.toGMTString() : "") +
        "; path=" +
        path +
        (domain ? "; domain=" + domain : "") +
        (secure ? "; secure" : "");
      document.cookie = cookietemp;
    },
    get: function(name) {
      var a;
      return cookie.filterXSS(
        (a = document.cookie.match(
          RegExp("(^|;\\s*)" + name + "=([^;]*)(;|$)")
        ))
          ? unescape(a[2])
          : null
      );
    },
    del: function(name, domain, path) {
      var d = new Date();
      cookie.setCookie(name, "", -d.getTime() / 1000, domain, path);
    },
    filterXSS: function(e) {
      if (!e) return e;
      for (; e != unescape(e); ) {
        e = unescape(e);
      }
      var r = [
        "<",
        ">",
        "'",
        '"',
        "%3c",
        "%3e",
        "%27",
        "%22",
        "%253c",
        "%253e",
        "%2527",
        "%2522"
      ];
      var n = [
        "&#x3c;",
        "&#x3e;",
        "&#x27;",
        "&#x22;",
        "%26%23x3c%3B",
        "%26%23x3e%3B",
        "%26%23x27%3B",
        "%26%23x22%3B",
        "%2526%2523x3c%253B",
        "%2526%2523x3e%253B",
        "%2526%2523x27%253B",
        "%2526%2523x22%253B"
      ];
      for (var a = 0; a < r.length; a++) {
        e = e.replace(new RegExp(r[a], "gi"), n[a]);
      }
      return e;
    }
  });
})();
