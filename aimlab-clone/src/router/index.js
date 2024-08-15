import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/homepage/index.vue'
import ClassicAim from '../views/classic-aim-lab/index.vue'
import TraceTask from '../views/trace-task/index.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/classic',
        name: 'classicAim',
        component: ClassicAim
    },
    {
        path: '/trace',
        name: 'TraceTask',
        component: TraceTask
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router