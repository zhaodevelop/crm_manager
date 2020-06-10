import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import qs from 'qs';

Vue.prototype.$qs = qs

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requireLogin)) {  // 判断该路由是否需要登录权限
//         if (sessionStorage.getItem('employee')) {  // 判断当前用户的登录信息loginInfo是否存在
//             next();
//         } else {
//             next(
//             )
//         }
//     }
// })
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {   //如果需要跳转 ，往下走（1）
//         if (true) {   //判断是否登录过，如果有登陆过，说明有token,或者token未过期，可以跳过登录（2）
//             if (to.path === '/login') { //判断下一个路由是否为要验证的路由（3）
//                 console.log("asdasdadas")
//                 next('/EmployeeManager');   // 如果是直接跳到首页，
//             } else {    //如果该路由不需要验证，那么直接往后走
//                 next();
//             }
//         } else {
//             console.log('没有');  //如果没有登陆过，或者token 过期， 那么跳转到登录页
//             next('/Login');
//         }
//     } else {       //不需要跳转，直接往下走
//         next();
//     }
