export default [
  {
    path: "/authorization",
    name: "authorization",
    component: () =>
      import(/* webpackChunkName: "authorization" */ "@/views/auth/Authorization.vue")
  },
  {
    path: "/registration",
    name: "registration",
    component: () =>
      import(/* webpackChunkName: "registration" */ "@/views/auth/Registration.vue")
  },
  {
    path: "/forgot",
    name: "forgot",
    component: () =>
      import(/* webpackChunkName: "forgot" */ "@/views/auth/Forgot.vue")
  }
]