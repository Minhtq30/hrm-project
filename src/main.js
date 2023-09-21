import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerGlobalComponent } from "./utils/import";
import vClickOutside from "click-outside-vue3";
import ContextMenu from "@/components/contextmenu/ContextMenu.vue";
import ModalView from "@/components/modal/ModalView.vue";
import ModalDelete from "@/components/modal/ModalDelete.vue";
import PaginationView from "@/components/pagination/PaginationView.vue";
import VCalendar from "v-calendar";
import Toast, { POSITION } from "vue-toastification";
import vSelect from "vue-select";
// import Loading from "vue-loading-overlay";
import CKEditor from "@ckeditor/ckeditor5-vue";
import LoadingOverlayVue from "@/components/loader/LoadingOverlay.vue";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import Ripple from "primevue/ripple";
import DialogService from "primevue/dialogservice";
// import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
// import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import StyleClass from "primevue/styleclass";

//require("@/utils/bootstrap");
import "@/utils/bootstrap";

// CSS
import "vue-toastification/dist/index.css";
import "v-calendar/dist/style.css";
import "vue-select/dist/vue-select.css";
import "./assets/styles/taiwind.css";
import "@/assets/plugins/fontawesome/css/all.css";
import "./assets/styles/global.css";
import "primevue/resources/primevue.min.css";
import "./assets/plugins/tailwind-light/theme.css";

const pinia = createPinia();
const app = createApp(App);

registerGlobalComponent(app);
app.use(pinia);
app.use(store);
app.use(router);
app.use(vClickOutside);
app.use(CKEditor);

app.use(PrimeVue, { ripple: true });
// app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);

app.directive("tooltip", Tooltip);
app.directive("badge", BadgeDirective);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);

//app.component("Badge", Badge);
app.component("modal-view", ModalView);
app.component("modal-delete", ModalDelete);
app.component("context-menu", ContextMenu);
app.component("loading-overlay", LoadingOverlayVue);

app.use(VCalendar, {
  datePicker: { popover: { visibility: "focus" } },
});
app.use(Toast, {
  // Setting the global default position
  position: POSITION.TOP_CENTER,
  with: "auto",
  maxToasts: 5,
  timeout: 1500,
});
app.component("v-select", vSelect);
// app.component("loading-page", Loading);
app.component("pagination-view", PaginationView);
app.mount("#app");
