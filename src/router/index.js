import { createRouter, createWebHistory } from 'vue-router'
import BaseMainPage from "../components/BasePage.vue";
import BaseAuthPage from "../components/BaseAuthPage.vue";
import BaseUserPage from "../components/BaseUserPage.vue";

// Store
import store from "../store/main.js";

const routes = [
  {
    path: "/user/",
    component: BaseUserPage,
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
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  const { meta } = to;

  if (!("isLoggedIn" in meta)) return next();

  if (meta.isLoggedIn && !store.getters["user/isLoggedIn"]) return next({ name: "login" });

  if (!meta.isLoggedIn && store.getters["user/isLoggedIn"]) return next("/");

  return next();
})

export default router
