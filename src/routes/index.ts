import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@/guards/auth";

import LandingPage from "@/views/LandingPage.vue";
import Main from "@/views/Main.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        meta: { authRequired: false },
        component: LandingPage
    },
    {
        path: '/v1',
        name: 'Private',
        meta: { authRequired: true },
        component: Main,
        children: [
            {
                path: '',
                name: 'DashboardIndex',
                meta: { authRequired: true },
                component: Dashboard,
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                meta: { authRequired: true },
                component: Dashboard,
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(authGuard);

export default router;

