import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CupomPromocional from "../views/CupomPromocional.vue";
import CadastroCupom from "../views/CadastroCupom.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/home", name: "Home", component: Home },
  { path: "/cupom-promocional", component: CupomPromocional },
  { path: "/cadastro-cupom", component: CadastroCupom },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
