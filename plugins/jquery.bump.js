;(function($) {
  $.fn.bump = function(options) {
    var defaults = {
      bounceHeight: '1.3em',
      bounceUpDuration: 500,
      bounceDownDuration: 600
    }
    var opts = $.extend(defaults, options)
    return this.each(function() {
      var $this = $(this)
      if ($this.text() !== $this.html()) return
      var text = $this.text()
      var newMark = ''
      for (var i = 0; i <= text.length; i++) {
        var character = text.slice(i, i + 1)
        newMark += $.trim(character)
          ? '<span class="bumpy-char">' + character + '</span>'
          : character
      }
      $this.html(newMark)
      $this.find('span.bumpy-char').each(function() {
        $(this).mouseover(function() {
          $(this).animate(
            {
              bottom: opts.bounceHeight
            },
            {
              queue: false,
              duration: opts.bounceUpDuration,
              easing: 'easeOutCubic',
              complete: function() {
                $(this).animate(
                  { bottom: 0 },
                  {
                    queue: false,
                    duration: opts.bounceDownDuration,
                    easing: 'easeOutBounce'
                  }
                )
              }
            }
          )
        })
      })
    })
  }
})(jQuery)
