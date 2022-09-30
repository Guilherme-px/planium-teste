import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/views/Home.vue"),
    },
    {
        path: "/resumo",
        name: "Resume",
        component: () => import("../components/views/Resume.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
