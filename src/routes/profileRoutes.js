export default [
  {
    path: "/settings",
    name: "settings",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/profile/Settings.vue")
  },
  {
    path: "/settings/categories",
    name: "categories",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "categories" */ "@/views/profile/Categories.vue")
  },
  {
    path: "/settings/categories/:id",
    name: "categoryEdit",
    props: true,
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "categoryEdit" */ "@/views/profile/CategoryEdit.vue")
  },
  {
    path: "/settings/places",
    name: "places",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "places" */ "@/views/profile/Places.vue")
  },
  {
    path: "/settings/month",
    name: "settingMonth",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "settingMonth" */ "@/views/profile/Month.vue")
  }
]