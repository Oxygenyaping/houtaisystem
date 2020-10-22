// 导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login.vue'
import Layout from '@/views/layout/Layout.vue'
const router = new VueRouter({
  routes: [
    {path:'/',redirect:'/Login'},
    {path:'/Login',component:Login},
    {path:'/Layout',component:Layout}
  ] 
})
Vue.use(VueRouter)
export default router