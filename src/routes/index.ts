import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@/guards/auth";

import LandingPage from "@/views/LandingPage.vue";
import Main from "@/views/Main.vue";

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
                name: 'Dashboard',
                meta: { authRequired: true },
                component: import("@/views/Dashboard.vue"),
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                meta: { authRequired: true },
                component: import("@/views/Dashboard.vue"),
            },
            {
                path: 'transaction',
                name: 'Transaction',
                meta: { authRequired: true},
                component: import("@/views/Transaction.vue"),
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

