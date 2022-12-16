import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import "vuetify/styles";
import { mdi } from "vuetify/lib/iconsets/mdi";
// make sure to also import the coresponding css
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    sets: {
      mdi,
    },
  },
});
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(vuetify);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
