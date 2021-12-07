import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CupomPromocional from "../views/CupomPromocional.vue";
import CadastroCupom from "../views/CadastroCupom.vue";
import AlterarCupom from "../views/CupomAlterar.vue";
import Pedidos from "../views/Pedidos.vue";
import PedidoDetalhes from "../views/PedidoDetalhes.vue";
import Dashboard from "../views/Dashboard.vue";
import CadastroOrquideas from "../views/CadastroOrquidea.vue";
import Orquideas from "../views/Orquideas.vue";
import OrquideaAlterar from "../views/OrquideaAlterar.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/home", name: "Home", component: Home },
  { path: "/cupom-promocional", component: CupomPromocional },
  { path: "/cadastro-cupom", component: CadastroCupom },
  { path: "/cadastro-orquidea", component: CadastroOrquideas },
  { path: "/alterar-cupom/:id", component: AlterarCupom, props: true },
  { path: "/pedidos", component: Pedidos },
  { path: "/pedidos/detalhes/:id", component: PedidoDetalhes, props: true },
  { path: "/dashboard", component: Dashboard },
  { path: "/orquideas", component: Orquideas },
  { path: "/alterar-orquidea/:id", component: OrquideaAlterar, props: true },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
