import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children:[
        {
          path:"product-list",
          name:"productList",
          component:()=> import("../views/ProductList.vue"),
        },
        {
          path:"product-detail/:productId",
          name:"productDetail",
          component:() => import("../views/productDetail.vue"),
          props:true,
        },
        {
          path:"carts",
          name:"cartsList",
          component:()=> import("../views/carts.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/Login.vue"),
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue"),
        },
        {
          path:"dashboardProduct-detail/:dashboardProductId",
          name:"dashboardProduct-detail",
          component:() => import("../views/DashboardProduct-Detail.vue"),
          props:true,
        },
      ]
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/Login.vue"),
    // },
    // 404頁面
    {
      path:'/:pathMacth(.*)*',
      component: () => import ('../views/NotFount.vue')
    },
  ],
});

export default router;
