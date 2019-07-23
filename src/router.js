import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import profileRoutes from "./routes/profileRoutes";
import authRoutes from "./routes/authRoutes";
import { firebaseAuth } from "@/firebase/init";

Vue.use(Router);

export const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "home",
            component: Home,
            beforeEnter(to, from, next) {
                firebaseAuth.currentUser ? next({ name: `dashboard`}) : next();
            }
        },
        {
            path: "/dashboard",
            name: "dashboard",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import ( /* webpackChunkName: "dashboard" */ "./views/Dashboard.vue")
        },
        {
            path: "/statistic",
            name: "statistic",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import ( /* webpackChunkName: "statistic" */ "./views/Statistic.vue")
        },
        {
            path: "/days",
            name: "days",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import ( /* webpackChunkName: "days" */ "./views/Days.vue")
        },
        {
            path: "/newDay",
            name: "newDay",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import ( /* webpackChunkName: "newday" */ "./views/NewDay.vue")
        },
        {
            path: "/dayEdit/:id",
            name: "dayEdit",
            props: true,
            meta: {
                requiresAuth: true
            },
            component: () =>
                import ( /* webpackChunkName: "dayEdit" */ "./views/DayEdit.vue")
        },
        ...profileRoutes,
        ...authRoutes
    ]
});

// Route guard
router.beforeEach((to, from, next) => {
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        let user = firebaseAuth.currentUser;

        user ?  next() : next({ name: "home" });
    } else {
        next();
    }
});