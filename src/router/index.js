import { createRouter, createWebHistory } from 'vue-router'
import BasePage from "../components/BasePage.vue";

const routes = [
  {
    component: BasePage,
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
        name: "user",
        path: "/user",
        component: () => import("../components/Page/MyAccountPage.vue")
      },
      {
        name: "details",
        path: "/car/:_id",
        component: () => import("../components/Page/CarsDetails.vue")
      },
      {
        path: "/:path(.*)*",
        redirect: "/"
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
