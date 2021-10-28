import { createApp } from "vue";
import Button from "@/components/Button/Button.vue";
import App from "./App.vue";

import {} from "./index";
const app = createApp(App);

app.component("ap-button", Button);

app.mount("#app");
