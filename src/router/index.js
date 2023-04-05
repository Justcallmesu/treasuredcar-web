import { createRouter, createWebHistory } from 'vue-router'
import BasePage from "../components/BasePage.vue";

const routes = [
  {
    component: BasePage,
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
