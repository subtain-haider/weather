/*
***********************************
Application's entry point, import 
plugins and libraries
***********************************
*/

import { components, directives, plugins } from "@/setup";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Plugins do not include router
plugins.forEach(({ value, config }) => {
  app.use(value, config);
});

app.use(router);

components.forEach(({ value, name }) => {
  app.component(name, value);
});

directives.forEach(({ value, name }) => {
  app.directive(name, value);
});

app.mount("#app");
