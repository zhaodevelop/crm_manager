import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeeManager from "../views/EmployeeManager";
import Index from "../views/Index"
import DeptManager from "../views/DeptManager";
import RoleManager from "../views/RoleManager";
import Login from "../views/Login"
import CustomerManager from "../views/CustomerManager";
import InterviewManager from "../views/InterviewManager";
import TaskManager from "../views/TaskManager";
import LoginLogManager from "../views/LoginLogManager";
import ActionLogManager from "../views/ActionLogManager";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: '员工管理',
        redirect: "EmployeeManager",
        component: Index,
        meta:{requireAuth:true},
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
        path: '/EmployeeManager',
        name: '员工管理',
        component: Index,
        show: true,
        redirect: "EmployeeManager",
        icon: 'el-icon-user-solid',
        meta:{requireAuth:true},
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
        meta:{requireAuth:true},
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
        meta:{requireAuth:true},
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
        path: '/CustomerManager',
        icon: 'el-icon-user',
        meta:{requireAuth:true},
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
        meta:{requireAuth:true},
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
        meta:{requireAuth:true},
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
    {
        path: '/LoginLogManager',
        icon: 'el-icon-s-claim',
        meta:{requireAuth:true},
        component: Index,
        name: '日志管理',
        show: true,
        children: [
            {
                icon: "el-icon-menu",
                path: '/LoginLogManager',
                name: '登录日志',
                component: LoginLogManager
            },
            {
                icon: "el-icon-menu",
                path: '/ActionLogManager',
                name: '操作日志',
                component: ActionLogManager
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router
