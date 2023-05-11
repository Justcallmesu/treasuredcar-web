import { createRouter, createWebHistory } from 'vue-router'
import BaseMainPage from "../components/BasePage.vue";
import BaseAuthPage from "../components/BaseAuthPage.vue";
import BaseAccountPage from "../components/BaseAccountPage.vue";

// Store
import store from "../store/main.js";

const routes = [
  {
    path: "/seller/",
    component: BaseMainPage,
    redirect: "/",
    children: [
      {
        name: "myStore",
        path: "/seller/me",
        component: () => import("../components/Page/seller/MySellerPage.vue"),
        meta: {
          isSeller: true
        }
      }
    ]
  },
  {
    path: "/account/",
    component: BaseAccountPage,
    redirect: "/account/user/me",
    meta: {
      isLoggedIn: true
    },
    children: [
      // User
      {
        name: "userProfile",
        path: "/account/user/me",
        component: () => import("../components/Page/user/MyUserProfile.vue")
      },
      {
        name: "userTransactions",
        path: "/account/user/transactions",
        component: () => import("../components/Page/transactions/MyTransactionsList.vue")
      },
      {
        name: "userBookings",
        path: "/account/user/bookings",
        component: () => import("../components/Page/bookings/MyBookingsList.vue")
      },
      // Seller
      {
        name: "sellerBookings",
        path: "/account/seller/bookings",
        component: () => import("../components/Page/bookings/MyBookingsList.vue")
      },
      {
        name: "sellerTransactions",
        path: "/account/seller/transactions",
        component: () => import("../components/Page/transactions/MyTransactionsList.vue")
      },
      {
        name: "sellerProfile",
        path: "/account/seller/me",
        component: () => import("../components/Page/seller/MySellerProfile.vue")
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
      },
      {
        name: "sellCars",
        path: "/cars/sell",
        component: () => import("../components/Page/cars/MySellCars.vue"),
        meta: {
          isSeller: true
        }
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

  const { meta, query } = to;



  if (!("isLoggedIn" in meta) && !("isSeller" in meta)) return next();

  // Is User Logged In
  if (meta.isSeller && !store.getters["seller/isSellers"]) return next({ name: "login" }, { query: { type: "seller" } });
  if (meta.isLoggedIn && !store.getters["user/isLoggedIn"]) return next({ name: "login" });

  if ((!meta.isLoggedIn && store.getters["user/isLoggedIn"]) && !meta.isSeller && store.getters["seller/isSellers"]) return next("/");

  return next();
})

export default router
