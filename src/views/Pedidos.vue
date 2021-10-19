<template>
  <div>
    <app-nav></app-nav>
    <div class="container-fluid">
      <!-- Control the column width, and how they should appear on different devices -->
      <div class="row">
        <div class="col-sm-12">
          <form @submit.prevent="consultarCompra(compra)" class="row">
            <div class="col-sm-2 mb-3">
              <label>CEP</label>
              <input
                class="form-control"
                type="text"
                minlength="8"
                maxlength="8"
                pattern="\d{8}"
                v-model="compra.cep"
              />
            </div>

            <div class="col-sm-2 mb-3">
              <label>Logradouro</label>
              <input
                class="form-control"
                type="text"
                v-model="compra.logradouro"
              />
            </div>
            <div class="col-sm-2 mb-3">
              <label>Bairro</label>
              <input class="form-control" type="text" v-model="compra.bairro" />
            </div>

            <div class="col-sm-2 mb-3">
              <label>Cidade</label>
              <input class="form-control" type="text" v-model="compra.cidade" />
            </div>
            <div class="col-sm-2 mb-3">
              <label>Estado</label>
              <select class="form-control" v-model="compra.estado">
                <option v-for="estado in estados" :key="estado">
                  {{ estado }}
                </option>
              </select>
            </div>
            <div class="col-sm-2 mb-3">
              <label>País</label>
              <input class="form-control" type="text" v-model="compra.pais" />
            </div>
            <div class="col-sm-2">
              <label>Status</label>
              <select class="form-control" v-model="compra.status">
                <option v-for="state in status" :key="state">
                  {{ state }}
                </option>
              </select>
            </div>
            <div class="col-sm-2 mb-3">
              <label>Valor da Compra</label>
              <input
                class="form-control"
                type="tel"
                maxlength="15"
                placeholder="12,34"
                pattern="([0-9]{1,3}\.)?[0-9]{1,3},[0-9]{2}$"
                v-model="compra.valor"
              />
            </div>
            <div class="col-sm-2 mb-3">
              <label>ID da compra</label>
              <input class="form-control" type="number" v-model="compra.id" />
            </div>
            <div class="col-sm-2 mb-3">
              <label>ID do cliente</label>
              <input
                class="form-control"
                type="number"
                v-model="compra.cliId"
              />
            </div>
            <div class="col-sm-2 mb-3">
              <label class="text-white">texto cor branca</label>
              <button type="submit" class="btn btn-primary btn-block">
                <i class="fas fa-search"></i>
                Pesquisar
              </button>
            </div>
            <div class="col-sm-2 mb-3">
              <label class="text-white">texto cor branca</label>
              <button
                class="btn btn-danger btn-block"
                v-on:click="limparPesquisa()"
                type="button"
              >
                <i class="fas fa-times"></i>
                limpar pesquisa
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <h1>Pedidos</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Data</th>
                <th scope="col">Valor</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pedido in pedidos" :key="pedido.id">
                <td>{{ pedido.status }}</td>
                <td>{{ pedido.data }}</td>
                <td>R$ {{ pedido.valor }}</td>
                <td>
                  <router-link :to="{ path: '/pedidos/detalhes/' + pedido.id }">
                    ver compra
                  </router-link>
                </td>

                <td>
                  <button
                    v-if="verificaStatus(pedido.status, 'aceitar')"
                    type="button"
                    class="btn btn-success"
                  >
                    aceitar
                  </button>
                  <button
                    v-if="verificaStatus(pedido.status, 'recusar')"
                    type="button"
                    class="btn btn-danger ml-3"
                    v-on:click="alterarStatus(pedido)"
                  >
                    recusar
                  </button>
                  <button
                    v-if="verificaStatus(pedido.status, 'alterar')"
                    type="button"
                    class="btn btn-warning"
                    v-on:click="alterarStatus(pedido)"
                  >
                    alterar status
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/nav/Nav.vue";

export default {
  name: "Pedidos",

  components: {
    "app-nav": Navbar,
  },

  data() {
    return {
      compra: {
        id: null,
        status: null,
        cidade: null,
        estado: null,
        pais: null,
        bairro: null,
        logradouro: null,
        valor: null,
        cep: null,
        cliId: null,
      },
      status: [
        "Aprovada",
        "Separando pedido",
        "Enviado p/ transportadora",
        "Em trânsito",
        "entregue",
        "troca solicitada",
        "troca autorizada",
        "troca rejeitada",
        "troca aceita",
        "troca efetuada",
        "cancelamento solicitado",
        "cancelamento rejeitado",
        "cancelamento aceito",
        "cancelamento efetuado",
      ],
      pedidos: null,

      estados: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ],
    };
  },
  created() {
    this.consultarCompra();
  },
  methods: {
    consultarCompra(compra) {
      if (!compra) {
        compra = {
          ativo: 1,
        };
      }
      if (compra.valor != null) {
        this.formatarDinheiro();
      }
      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(compra), // We send data in JSON format
      };

      fetch("http://localhost:8080/consultar-compra", postMethod)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].id != null) {
            this.pedidos = data;
          } else {
            alert(data[0].mensagens);
          }
        });
    },
    limparPesquisa() {
      this.compra.id = null;
      this.compra.status = null;
      this.compra.cidade = null;
      this.compra.estado = null;
      this.compra.pais = null;
      this.compra.bairro = null;
      this.compra.logradouro = null;
      this.compra.valor = null;
      this.compra.cep = null;
      this.compra.cliId = null;
      this.consultarCompra();
    },
    formatarDinheiro() {
      let valor = this.compra.valor;
      this.compra.valor = valor.replace(",", ".");
    },
    alterarStatus(pedido) {
      if (pedido.status == "Em trânsito") {
        pedido.status = "Entregue";
      }
      if (pedido.status == "Enviado p/ transportadora") {
        pedido.status = "Em trânsito";
      }
      if (pedido.status == "Separando pedido") {
        pedido.status = "Enviado p/ transportadora";
      }
      if (
        pedido.status == "Aprovada" ||
        pedido.status == "Cancelamento rejeitado" ||
        pedido.status == "Troca rejeitada"
      ) {
        pedido.status = "Separando pedido";
      }
      if (pedido.status == "Cancelamento solicitado") {
        pedido.status = "Cancelamento rejeitado";
      }
      if (pedido.status == "Troca solicitada") {
        pedido.status = "Troca rejeitada";
      }

      this.alterarCompra(pedido);
    },

    alterarCompra(compra) {
      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(compra), // We send data in JSON format
      };

      fetch("http://localhost:8080/alterar-compra", postMethod)
        .then((response) => response.json())
        .then((data) => {
          alert(data.mensagens[0]);
        });
    },

    verificaStatus(status, acao) {
      if (
        (acao == "aceitar" || acao == "recusar") &&
        (status == "Troca solicitada" || status == "Cancelamento solicitado")
      ) {
        return 1;
      }

      if (
        acao == "alterar" &&
        (status == "Separando pedido" ||
          status == "Enviado p/ transportadora" ||
          status == "Em trânsito" ||
          status == "Aprovada" ||
          status == "Cancelamento rejeitado" ||
          status == "Troca rejeitada" )
      ) {
        return 1;
      }
      return 0;
    },
  },
};
</script>
