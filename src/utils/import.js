import { defineAsyncComponent } from "vue";

export function registerGlobalComponent(app) {
  app.component(
    "person-layout",
    defineAsyncComponent(() => import("@/layouts/person-layout.vue"))
  );
}
