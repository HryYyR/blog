// 1.导入
import { createRouter, createWebHashHistory } from 'vue-router'
import { verifyToken } from '../axios/apis'
import { ElMessage } from 'element-plus'

import blog from '../view/blog/blog.vue'


const routes = [
    { path: '/', redirect: '/blog' },
    {
        path: '/index', name: 'index', component: () => import('../view/blog/index.vue'), children: [
            { path: '/record', name: 'record', component: () => import('../view/blog/record.vue') },

        ]
    },
    { path: '/blog', name: 'blog', component: blog },
    { path: '/interaction', name: 'interaction', component: () => import('../view/blog/interaction.vue') },
    { path: '/record', name: 'record', component: () => import('../view/blog/record.vue') },
    { path: '/sort', name: 'sort', component: () => import('../view/blog/Sort.vue') },

    { path: '/blog/blogdetail/:id', name: 'blogdetail', component: () => import('../view/blog//blogdetail.vue') },
    { path: '/login', name: 'login', component: () => import('../view/admin/login.vue') },
    {
        path: '/admin', name: 'admin', redirect: '/admin/addblog', component: () => import('../view/admin/adminIndex.vue'), children: [
            { path: '/admin/addblog', name: 'addblog', component: () => import('../view/admin/adminblog/addblog.vue') },
            { path: '/admin/blogManager', name: 'blogManager', component: () => import('../view/admin/adminblog/blogmanager.vue') },
            { path: '/admin/labelManager', name: 'labelManager', component: () => import('../view/admin/adminblog/labelmanager.vue') },
            { path: '/admin/sortManager', name: 'sortManager', component: () => import('../view/admin/adminblog/sortmanager.vue') },
            { path: '/admin/commentManager', name: 'commentManager', component: () => import('../view/admin/adminblog/commentmanager.vue') },
            { path: '/admin/laudManager', name: 'laudManager', component: () => import('../view/admin/adminblog/laudmanager.vue') },
            { path: '/admin/userinfoManager', name: 'userinfoManager', component: () => import('../view/admin/adminuser/userinfomanager.vue') },
            { path: '/admin/userPowerManager', name: 'userPowerManager', component: () => import('../view/admin/adminuser/userpowermanager.vue') },
            { path: '/admin/recordManager', name: 'recordManager', component: () => import('../view/admin/adminrecord/recordmanager.vue') },

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
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('id')
            return router.push({ path: '/login' })
        }
    } else {
        next()

    }
})


// 导出路由
export default router
