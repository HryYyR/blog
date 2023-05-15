// 1.导入
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { verifyToken } from '../axios/apis'
import { ElMessage } from 'element-plus'
import blog from '../view/blog/blog-index/blog.vue'


const routes = [
    { path: '/', redirect: '/blog' },
    { path: '/index', name: 'index', component: () => import('../view/blog/index/index.vue'), children: [] },
    { path: '/blog', name: 'blog', meta: { isBlogHeader: true }, component: blog },
    { path: '/sort', name: 'sort', meta: { isBlogHeader: true }, component: () => import('../view/blog/sort/Sort.vue') },
    { path: '/interaction', name: 'interaction', meta: { isBlogHeader: true }, component: () => import('../view/blog/interaction/interaction.vue') },
    { path: '/friendLink', name: 'friendLink', meta: { isBlogHeader: true }, component: () => import('../view/blog/friend-link/friend-link.vue') },
    { path: '/record', name: 'record', meta: { isBlogHeader: true }, component: () => import('../view/blog/record/record.vue') },
    { path: '/about', name: 'about', meta: { isBlogHeader: true }, component: () => import('../view/blog/about/about.vue') },
    { path: '/object', name: 'object', meta: { isBlogHeader: true }, component: () => import('../view/blog/object/object.vue') },
    { path: '/tools', name: 'tools', meta: { isBlogHeader: true }, component: () => import('../view/blog/tools/tools.vue') },
    { path: '/socket', name: 'socket', meta: { isBlogHeader: true }, component: () => import('../view/blog/socket/socket.vue') },
    { path: '/blog/blogdetail/:id', name: 'blogdetail', component: () => import('../view/blog/blogdetail/blogdetail.vue') },

    { path: '/checkQQlogin', name: 'checkQQlogin', component: () => import('../view/blog/checkQQlogin/checkQQlogin.vue') },
    { path: '/login', name: 'login', component: () => import('../view/admin/login/login.vue') },
    { path: '/prison', name: 'prison', component: () => import('../view/blog/prison/prison.vue') },
    {
        path: '/admin', name: 'admin', redirect: '/admin/addblog', component: () => import('../view/admin/admin-index/adminIndex.vue'), children: [
            { path: '/admin/addblog', name: 'addblog', component: () => import('../view/admin/adminblog/addblog.vue') },
            { path: '/admin/blogManager', name: 'blogManager', component: () => import('../view/admin/adminblog/blogmanager.vue') },
            { path: '/admin/labelManager', name: 'labelManager', component: () => import('../view/admin/adminblog/labelmanager.vue') },
            { path: '/admin/sortManager', name: 'sortManager', component: () => import('../view/admin/adminblog/sortmanager.vue') },
            { path: '/admin/commentManager', name: 'commentManager', component: () => import('../view/admin/adminblog/commentmanager.vue') },
            { path: '/admin/laudManager', name: 'laudManager', component: () => import('../view/admin/adminblog/laudmanager.vue') },
            { path: '/admin/userinfoManager', name: 'userinfoManager', component: () => import('../view/admin/adminuser/userinfomanager.vue') },
            { path: '/admin/userPowerManager', name: 'userPowerManager', component: () => import('../view/admin/adminuser/userpowermanager.vue') },
            { path: '/admin/recordManager', name: 'recordManager', component: () => import('../view/admin/adminrecord/recordmanager.vue') },
            { path: '/admin/friendLinkManager', name: 'friendLinkManager', component: () => import('../view/admin/adminfriendlink/friendlinkmanager.vue') }

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
        // console.log(res.data);
        if (res.data.token && res.data.grade == 1) {
            return next()
        } else {

            if (!res.data.token) {
                ElMessage.error('token无效,请重新登录')
                localStorage.clear()
                return next("/login")
            }
            if (res.data.grade != 1) {
                ElMessage.error('权限不够！')
                return next("/blog")
            }
        }
    }
    next()
})


// 导出路由
export default router
