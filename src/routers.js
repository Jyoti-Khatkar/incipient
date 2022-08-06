import { createRouter, createWebHistory } from "vue-router";
import Edit from "./components/Edit.vue";
import UsersList from "./components/UsersList.vue";

const routes = [
  {
    name: "Edit-Component",
    component: Edit,
    path: "/edit/:id",
  },
  {
    name: "UsersList",
    component: UsersList,
    path: "/",
  },
  {
    redirect: "/",
    path: "/:NotFound(.*)*",
  },
];
const router = new createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
