const gulp = require('gulp')
const spritesmith = require('gulp.spritesmith')

gulp.task('sprite', () => {
  gulp
    .src('images/*.png')
    .pipe(
      spritesmith({
        imgName: 'images/sprite.png', //合并后大图的名称
        cssName: 'css/sprite.css',
        padding: 4, // 每个图片之间的间距，默认为0px
        cssTemplate: data => {
          // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
          let arr = [],
            width = data.spritesheet.px.width,
            height = data.spritesheet.px.height,
            url = data.spritesheet.image
          data.sprites.forEach(sprite => {
            arr.push(
              '.icon-' +
                sprite.name +
                '{' +
                "background: url('" +
                url +
                "') " +
                'no-repeat ' +
                sprite.px.offset_x +
                ' ' +
                sprite.px.offset_y +
                ';' +
                'background-size: ' +
                width +
                ' ' +
                height +
                ';' +
                'width: ' +
                sprite.px.width +
                ';' +
                'height: ' +
                sprite.px.height +
                ';' +
                '}\n'
            )
          })
          return arr.join('')
        }
      })
    )
    .pipe(gulp.dest('dist/'))
})
