import { createRouter, createWebHashHistory } from 'vue-router'

const routerInstance = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: () => import('@/views/home.vue') },
        { path: '/home', component: () => import('@/views/home.vue') },
        { path: '/files/upload', component: () => import('@/views/files/upload.vue') },
        { path: '/files/download', component: () => import('@/views/files/download.vue') },
        { path: '/assets/chequebock', component: () => import('@/views/assets/chequebock.vue') },
        { path: '/assets/stamps', component: () => import('@/views/assets/stamps.vue') },
        { path: '/setting/api', component: () => import('@/views/setting/api.vue') },
        { path: '/setting/node', component: () => import('@/views/setting/node.vue') },
      ]
})
function initRouter(app) {
    app.use(routerInstance)
}
export default initRouter
