/*
***********************************
Export arrays of App's initialize configs
Used to centralize web/test initializations
***********************************
*/
import "@/assets/scss/style.scss";
import "@/services";
import "primeicons/primeicons.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// PrimeVue
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import Aura from '@primevue/themes/aura';
import { definePreset, palette } from "@primevue/themes";


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const primaryColor = palette('{red}');

const primeVueThemePreset = definePreset(Aura, {
  semantic: {
    primary: primaryColor,
    colorScheme: {
      dark: {
        formField: {
          background: '{zinc.0}',
          disabledBackground: '{zinc.200}',
          filledBackground: '{zinc.50}',
          filledFocusBackground: '{zinc.50}',
        },
      },
    },
  }
});

// Exposed plugins
export const plugins = [
  { value: pinia },
  {
    value: PrimeVue, config: {
      ripple: true,
      theme: {
        preset: primeVueThemePreset,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
          },
          darkModeSelector: '.my-app-dark',
        }
      },
    }
  }
];

// Exposed directives
export const directives = [
  {
    name: "ripple",
    value: Ripple,
  },
];

// Exposed Third Party Components
export const components = [];
