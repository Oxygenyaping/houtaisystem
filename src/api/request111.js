import axios from 'axios'
import Vue from 'vue'
// 设置基准路径
axios.defaults.baseURL='ttp://127.0.0.1/heimamm/public'
// 把axios实例挂载到vue原型上
Vue.prototype.$http=axios

