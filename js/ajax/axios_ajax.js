import axios from 'axios'
import qs from 'qs'

import { Message } from 'element-ui'
import router from './router'

const Axios = axios.create({
  baseURL: '/', // 本地反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    /*
    application/x-javascript text/xml->xml数据 application/x-javascript->json对象 application/x-www-form-urlencoded->表单数据 application/json;charset=utf-8 -> json数据
    **/
  }
})

Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
      // 序列化
      config.data = qs.stringify(config.data)
      // 如果后台能接受json格式,可以不用 qs 来序列化的
      // 若是有做鉴权token , 就给头部带上token
      // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
      if (localStorage.token) {
        config.headers.Authorization = localStorage.token
      }
      return config
    }
  },
  error => {
    Message({
      showClose: true,
      message: error,
      type: 'error'
    })
  }
)

Axios.interceptors.response.use(
  res => {
    if (res.data && !res.data.success) {
      Message({
        showClose: true,
        message: res.data.error.message || '发生什么事了',
        type: 'error'
      })
      return Promise.reject(res.data.error.message)
    }
    return res.data
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem('uin')) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      router.push({
        path: '/login'
      })
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间返回去登录页重新登录
      let lifeTime = JSON.parse(window.localStorage.getItem('uin')).lifeTime * 1000
      let nowTime = new Date().getTime() // 当前时间的时间戳
      if (nowTime > lifeTime) {
        Message({
          showClose: true,
          message: '登录状态信息过期,请重新登录',
          type: 'error'
        })
        router.push({
          path: '/login'
        })
      } else {
        if (error.response.status === 403) {
          router.push({
            path: '/error/403'
          })
        }
        if (error.response.status === 500) {
          router.push({
            path: '/error/500'
          })
        }
        if (error.response.status === 502) {
          router.push({
            path: '/error/502'
          })
        }
        if (error.response.status === 404) {
          router.push({
            path: '/error/404'
          })
        }
      }
    }
    // 返回 response 里的错误信息
    let errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(errorInfo)
  }
)

//对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, '$ajax', { value: Axios })
  }
}

/*
路由钩子的调整(router:index.js)
import Vue from "vue";
import Router from "vue-router";
import layout from "@/components/layout/layout";
// 版块有点多,版块独立路由管理,里面都是懒加载引入
import customerManage from "./customerManage"; // 客户管理
import account from "./account"; //登录
import adManage from "./adManage"; // 广告管理
import dataStat from "./dataStat"; // 数据统计
import logger from "./logger"; // 日志
import manager from "./manager"; // 管理者
import putonManage from "./putonManage"; // 投放管理
import error from "./error"; // 服务端错误
import { Message } from "element-ui";

Vue.use(Router);

const router = new Router({
  hashbang: false,
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: layout,
      children: [
        ...customerManage,
        ...adManage,
        ...dataStat,
        ...putonManage,
        ...manager,
        ...logger
      ]
    },
    ...account,
    ...error
  ]
});

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (window.localStorage.getItem("uin")) {
      // 判断是否登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("uin")).lifeTime *
        1000;
      let nowTime = (new Date()).getTime(); // 当前时间的时间戳
      if (nowTime < lifeTime) {
        next();
      } else {
        Message({
          showClose: true,
          message: "登录状态信息过期,请重新登录",
          type: "error"
        });
        next({
          path: "/login"
        });
      }
    } else {
      // 没登录则跳转到登录界面
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

export default router;

**/
