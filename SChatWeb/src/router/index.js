import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/Chat/Chat.vue'

Vue.use(VueRouter)
// 消除路由重复
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    // 重定向去chat聊天页
    path: '/',
    redirect: '/chat'
  },
  {
    path: '/person',
    name: 'Person',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */'../views/Person/Person.vue')
  },
  {
    path: '/addressbook',
    name: 'AddressBook',
    component: () => import('../views/AddressBook/AddressBook.vue')
  },
  {
    path: '/chatdetail',
    name: 'ChatDetail',
    component: () => import('../views/ChatDetail/ChatDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
