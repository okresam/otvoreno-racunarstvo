import { createRouter, createWebHistory } from 'vue-router'
import Index from '/src/components/Index.vue'
import Datatable from '/src/components/Datatable.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/datatable',
        name: 'Datatable',
        component: Datatable
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
