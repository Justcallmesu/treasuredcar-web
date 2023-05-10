import { createRouter, createWebHistory } from 'vue-router'
import BaseMainPage from "../components/BasePage.vue";
import BaseAuthPage from "../components/BaseAuthPage.vue";
import BaseAccountPage from "../components/BaseAccountPage.vue";

// Store
import store from "../store/main.js";

const routes = [
  {
    path: "/user/",
    component: BaseAccountPage,
    meta: {
      isLoggedIn: true
    },
    children: [
      {
        name: "profile",
        path: "/user/me",
        component: () => import("../components/Page/user/MyProfile.vue")
      }
    ]
  },
  {
    path: "/auth/",
    component: BaseAuthPage,
    redirect: "/auth/login",
    meta: {
      isLoggedIn: false
    },
    children: [
      {
        name: "login",
        path: "/auth/login",
        component: () => import("../components/Page/auth/LoginPage.vue")
      },
      {
        name: "register",
        path: "/auth/register",
        component: () => import("../components/Page/auth/RegisterPage.vue")
      },
      {
        name: "OTP",
        path: "/auth/otp",
        component: () => import("../components/Page/auth/MyOTP.vue")
      },
      {
        name: "forgotPassword",
        path: "/auth/forgotPassword",
        component: () => import("../components/Page/auth/MyForgotPassword.vue")
      },
    ]
  },
  {
    component: BaseMainPage,
    path: "/cars",
    children: [
      {
        name: "cars",
        path: "/cars",
        component: () => import("../components/Page/cars/CarPage.vue")
      },
      {
        name: "details",
        path: "/cars/:_id",
        component: () => import("../components/Page/cars/CarsDetails.vue")
      }
    ]
  },
  {
    component: BaseMainPage,
    path: "/",
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("../components/Page/MyHomePage.vue")
      },
      {
        name: "search",
        path: "/search",
        component: () => import("../components/Page/MySearchPage.vue")
      },
      {
        name: "about",
        path: "/about",
        component: () => import("../components/Page/AboutPage.vue")
      },
      {
        name: "user",
        path: "/user",
        component: () => import("../components/Page/MyAccountPage.vue")
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  const { meta, query } = to;


  if (!("isLoggedIn" in meta)) return next();

  // Is User Logged In
  if (meta.isLoggedIn && !store.getters["user/isLoggedIn"]) return next({ name: "login" });

  if (meta.isSeller && !store.getters["seller/isSellers"]) return next({ name: "login" }, { query: { type: "seller" } });

  if ((!meta.isLoggedIn && store.getters["user/isLoggedIn"]) && !meta.isSeller && store.getters["seller/isSellers"]) return next("/");

  return next();
})

export default router
