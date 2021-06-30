import { createRouter, createWebHistory } from "vue-router"

const home = () => import("../views/rain/rain.vue");
const room = () => import("../views/room/room.vue");
const earth = () => import("../views/earth/earth.vue")

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/room",
    name: "room",
    component: room
  },
  {
    path: "/earth",
    name: "earth",
    component: earth
  }
]

 const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
