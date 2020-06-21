import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import qs from 'qs';

Vue.prototype.$qs = qs
Vue.config.productionTip = false
axios.defaults.withCredentials = true

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


// router.beforeEach((to, from, next) => {
//     var _this = this;
//     if (to.meta.requireAuth) {
//         if (JSON.parse(localStorage.getItem("login")) == null) {
//             console.log('没有登录')
//             _this.$router.push({path: '/Login', query: {redirect: to.fullPath}})
//             next()
//         } else {
//             _this.requireAuthNum++;
//             _this.$router.push({path: to.fullPath})
//             next()
//         }
//     }
// })
router.beforeEach((to, from, next) => {
    //console.log(to, from, next) //
    if(to.name=='/Login'){ //本身就是登录页，就不用验证登录session了
        next()
        return
    }
    if(!sessionStorage.getItem('employee')){ //没有登录/登录过期
        next({path:'/Login', query:{redirect:to.path}})
    }else{
        next()
    }
})