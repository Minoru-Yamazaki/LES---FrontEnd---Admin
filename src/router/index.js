import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CupomPromocional from "../views/CupomPromocional.vue";
import CadastroCupom from "../views/CadastroCupom.vue";
import AlterarCupom from "../views/CupomAlterar.vue";
import Pedidos from "../views/Pedidos.vue";
import PedidoDetalhes from "../views/PedidoDetalhes.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/home", name: "Home", component: Home },
  { path: "/cupom-promocional", component: CupomPromocional },
  { path: "/cadastro-cupom", component: CadastroCupom },
  { path: "/alterar-cupom/:id", component: AlterarCupom, props: true },
  { path: "/pedidos", component: Pedidos },
  { path: "/pedidos/detalhes/:id", component: PedidoDetalhes, props: true },
  { path: "/dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
