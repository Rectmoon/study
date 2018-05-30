import Vue from 'vue'
import VueRouter from 'vue-router'
import Slot1 from 'components/demo1/slot1'
import Slot2 from 'components/demo2/slot2'
import Slot3 from 'components/demo3/slot3'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/slot1',
      component: Slot1
    },
    {
      path: '/slot2',
      component: Slot2
    },
    {
      path: '/slot3',
      component: Slot3
    }
  ]
})
