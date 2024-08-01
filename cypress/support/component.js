/*
***********************************
@author Mohanned Hassan, Umair
@create_date 24th Nov 2023

***********************************
*/
// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { mount } from "cypress/vue";
import "./commands";

import { routes } from "@/router";
import { components, directives, plugins } from "@/setup";
import { createMemoryHistory, createRouter } from "vue-router";

Cypress.Commands.add("mount", (component, options = {}) => {
  // Setup options object
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];
  options.global.components = options.global.components || [];
  options.global.directives = options.global.directives || [];

  if (!options.router) {
    options.router = createRouter({
      history: createMemoryHistory(),
      routes,
      linkActiveClass: "active",
    });
  }

  // Register global components
  components.forEach(({ value, name }) => {
    options.global.components[name] = value;
  });

  // Register global directives
  directives.forEach(({ value, name }) => {
    options.global.directives[name] = value;
  });

  options.global.plugins.push({
    install(app) {
      // Add common plugins
      plugins.forEach(({ value, config }) => {
        app.use(value, config);
      });

      // Add router plugin
      app.use(options.router);
    },
  });

  return mount(component, options);
});

// Example use:
// cy.mount(MyComponent)
