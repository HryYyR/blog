// 1.导入
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { verifyToken } from '../axios/apis'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import blog from '../view/blog/blog.vue'
let store = useStore()

const routes = [
    { path: '/', redirect: '/blog' },
    { path: '/index', name: 'index', component: () => import('../view/blog/index.vue'), children: [] },
    { path: '/blog', name: 'blog', component: blog },
    { path: '/sort', name: 'sort', component: () => import('../view/blog/Sort.vue') },
    { path: '/interaction', name: 'interaction', component: () => import('../view/blog/interaction.vue') },
    { path: '/friendLink', name: 'friendLink', component: () => import('../view/blog/friend-link.vue') },
    { path: '/record', name: 'record', component: () => import('../view/blog/record.vue') },
    { path: '/about', name: 'about', component: () => import('../view/blog/about.vue') },

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
    history: createWebHistory(),  //history
    // history: createWebHashHistory(), // hash
    routes,
})

// 用户判断登陆状态
router.beforeEach(async (to, from, next) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;


    if (to.fullPath.includes('/admin')) {
        const res = await verifyToken()
        if (res.data.token) {
            next()
        } else {
            ElMessage.error('token无效，请重新登录')
            localStorage.clear()
            store.state.userid = '-1'
            store.state.username = ''
            store.state.token = ''
            return router.push({ path: '/login' })
        }
    } else {
        next()

    }
})


// 导出路由
export default router
