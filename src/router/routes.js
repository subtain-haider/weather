/*
***********************************
Main router configuration
***********************************
*/
import { EnvironmentEnum, Routes } from "@/data";

const DashboardLayout = () => import("@/layouts/dashboard_layout.vue");

// Dashboard
const DashboardPage = () =>
  import("@/components/pages/Dashboard/DashboardPage.vue");

const baseRoute = import.meta.env[EnvironmentEnum.BaseRoute];

export const routes = [
  {
    path: "/",
    redirect: { name: Routes.DashboardModule },
  },
  {
    path: baseRoute ? baseRoute : "/",
    children: [
      {
        path: "",
        name: Routes.DashboardModule,
        component: DashboardLayout,
        redirect: { name: Routes.DashboardPage },
        children: [
          {
            path: "dashboard",
            name: Routes.DashboardPage,
            component: DashboardPage,
          },
        ],
      },
    ],
  },
];
