import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: "hash",
  linkActiveClass: "active",
});

export * from "./routes";
export default router;
