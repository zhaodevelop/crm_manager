import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EmployeeManager from "../views/EmployeeManager";
import Index from "../views/Index"
import DeptManager from "../views/DeptManager";
import RoleManager from "../views/RoleManager";
import Login from "../views/Login"
import CustomerManager from "../views/CustomerManager";
import InterviewManager from "../views/InterviewManager";
import TaskManager from "../views/TaskManager";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/EmployeeManager',
        name: '员工管理',
        component: Index,
        show: true,
        redirect: "EmployeeManager",
        icon: 'el-icon-user-solid',
        children: [
            {
                icon: "el-icon-menu",
                path: '/EmployeeManager',
                name: '员工信息',
                component: EmployeeManager,
            }
        ],
    },

    {
        path: '/deptManager',
        icon: 'el-icon-s-cooperation',
        component: Index,
        name: '部门管理',
        show: true,
        children: [
            {
                icon: "el-icon-menu",
                path: '/deptManager',
                name: '部门信息',
                component: DeptManager
            },
        ],
    },

    {
        path: '/roleManager',
        name: '角色管理',
        component: Index,
        show: true,
        icon: 'el-icon-s-custom',
        children: [
            {
                icon: "el-icon-menu",
                path: '/roleManager',
                name: '角色信息',
                component: RoleManager
            },
        ],
    },
    {
        path: "/Login",
        component: Login
    },
    {
        path: '/CustomerManager',
        icon: 'el-icon-user',
        component: Index,
        name: '客户管理',
        show: true,
        children: [
            {
                icon: "el-icon-menu",
                path: '/CustomerManager',
                name: '客户信息',
                component: CustomerManager
            },
        ]
    },
    {
        path: '/InterviewManager',
        icon: 'el-icon-video-camera',
        component: Index,
        name: '访谈管理',
        show: true,
        children: [
            {
                icon: "el-icon-menu",
                path: '/InterviewManager',
                name: '访谈信息',
                component: InterviewManager
            },
        ],
    },
    {
        path: '/TaskManager',
        icon: 'el-icon-s-order',
        component: Index,
        name: '任务管理',
        show: true,
        children: [
            {
                icon: "el-icon-menu",
                path: '/TaskManager',
                name: '任务信息',
                component: TaskManager
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
//对每次访问之前都要先看是否已经登录
router.beforeEach((to,from,next)=>{
    if(to.path.startsWith('/Login')){
        window.sessionStorage.removeItem('access-token');
        next();
    }else{
        let token = window.sessionStorage.getItem('access-token');
        if(!token){
            //未登录  跳回主页面
            next({path:'/Login'});
        }else{
            next();
        }
    }

});
export default router
