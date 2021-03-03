const header = {
  template: '<h1 class="header">Header头部区域</h1>'
}

const leftBox = {
  template: '<h1 class="left">Left侧边栏区域</h1>'
}

const mainBox = {
  template: '<h1 class="main">mainBox主体区域</h1>'
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: header,
        left: leftBox,
        main: mainBox
      }
    },

    {
      path: '/profile',
      // meta: { showContainer: false },
      components: {
        default: {
          render: () => null
        },
        left: leftBox,
        main: mainBox
      }
    },

    { path: '/left', component: leftBox },

    { path: '/main', component: mainBox }
  ]
})

new Vue({
  el: '#app',
  router
})
