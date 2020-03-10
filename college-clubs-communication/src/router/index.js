import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      auth: true,
      navShow: true
    }
  },
  {
    path: "/club",
    name: "club",
    component: () => import('../views/Club.vue'),
    meta: {
      auth: true,
      navShow: true
    }
  },
  {
    path: "/activity",
    name: "activity",
    component: () => import('../views/Activity.vue'),
    meta: {
      auth: true,
      navShow: true
    }
  },
  {
    path: "/my",
    name: "my",
    component: () => import('../views/My.vue'),
    meta: {
      auth: true,
      navShow: true
    }
  },
  {
    path: "/clubdetail",
    name: "clubDetail",
    component: () => import('../views/ClubDetail.vue'),
    meta: {
      auth: true,
      navShow: false
    }
  },
  {
    path: "/activitydetail/:activityId",
    name: "activityDetail",
    component: () => import('../views/ActivityDetail.vue'),
    meta: {
      auth: true,
      navShow: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      navShow: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      navShow: false
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 注册全局守卫
// 在访问路由之前进行拦截
router.beforeEach((to, from, next) => {
  // 获取 token，登录的标识
  var token = sessionStorage.getItem("token")

  if (to.meta.auth) { // 判断是否需要权限
    if (token) { // 再次判断是否已经有权限了
      next()
    } else {
      next({ // 没有权限，导向登录页
        path: "/login",
        query: { redirect: to.fullPath } // 记录原本想访问的路由
      })
    }
  } else {
    next() // 想去哪就去哪
  }
})

export default router
