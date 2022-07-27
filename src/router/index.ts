// 1.导入
import { createRouter, createWebHashHistory } from 'vue-router'
import { Base64 } from 'js-base64'
import axios from 'axios'
import { verifyToken } from '../axios/apis'
import { ElMessage } from 'element-plus'


const routes = [
    { path: '/', redirect: '/blog' },
    {
        path: '/index', name: 'index', component: () => import('../view/blog/index.vue'), children: [
            { path: '/sort', name: 'sort', component: () => import('../view/blog/Sort.vue') },
            { path: '/music', name: 'music', component: () => import('../view/blog/music.vue') },
        ]
    },
    { path: '/blog', name: 'blog', component: () => import('../view/blog/blog.vue') },
    { path: '/blog/blogdetail/:id', name: 'blogdetail', component: () => import('../view/blog//blogdetail.vue') },
    { path: '/login', name: 'login', component: () => import('../view/admin/login.vue') },
    {
        path: '/admin', name: 'admin', redirect: '/admin/addblog', component: () => import('../view/admin/adminIndex.vue'), children: [
            { path: '/admin/addblog', name: 'addblog', component: () => import('../view/admin/adminblog/addblog.vue') },
            { path: '/admin/blogManager', name: 'blogManager', component: () => import('../view/admin/adminblog/blogmanager.vue') },
            { path: '/admin/labelManager', name: 'labelManager', component: () => import('../view/admin/adminblog/labelmanager.vue') },
            { path: '/admin/sortManager', name: 'sortManager', component: () => import('../view/admin/adminblog/sortmanager.vue') },
            { path: '/admin/userinfoManager', name: 'userinfoManager', component: () => import('../view/admin/adminuser/userinfomanager.vue') },
            { path: '/admin/userPowerManager', name: 'userPowerManager', component: () => import('../view/admin/adminuser/userpowermanager.vue') },

        ]
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes
})

// 用户判断登陆状态
router.beforeEach(async (to, from, next) => {
    if (to.fullPath.includes('/admin')) {
        const res = await verifyToken()
        if (res.data.token) {
            next()
        } else {
            ElMessage.error('token无效，请重新登录')
            return router.push({ path: '/login' })
        }
    } else {
        next()

    }
})


// 导出路由
export default router
