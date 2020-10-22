import Vue from 'vue'
import App from './App.vue'
// 导入elementui的样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import '@/style/base.css'
Vue.config.productionTip = false
// 导入axios
import '@/utils/request'
// 导入element
import '@/plugins/element'
// 导入 router
import router from '@/router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
