import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

//import HighchartsVue from 'highcharts-vue'

//Vue.use(HighchartsVue)

createApp(App).use(router).mount("#app");
