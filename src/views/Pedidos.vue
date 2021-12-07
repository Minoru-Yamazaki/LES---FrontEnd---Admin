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
              <button type="submit" class="btn btn-primary btn-block" id="pesquisarCompra">
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
                <th scope="col">Alterar para</th>
                <th scope="col">Data</th>
                <th scope="col">Valor</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pedido in pedidos" :key="pedido.id">
                <td>{{ pedido.status }}</td>
                <td>
                  <select
                    class="form-control"
                    v-model="statusTemporario[pedidos.indexOf(pedido)]"
                    v-if="getStatus(pedido.status)"
                  >
                    <option
                      v-for="status in getStatus(pedido.status)"
                      :key="status"
                    >
                      {{ status }}
                    </option>
                  </select>
                </td>
                <td>{{ pedido.data }}</td>
                <td>R$ {{ pedido.valor + pedido.frete }}</td>
                <td>
                  <router-link :to="{ path: '/pedidos/detalhes/' + pedido.id }">
                    ver compra
                  </router-link>
                </td>

                <td>
                  <button
                    v-if="verificaStatus(pedido.status)"
                    class="btn btn-primary"
                    v-on:click="alterarStatusCompra(pedidos.indexOf(pedido))"
                  >
                    Alterar
                  </button>
                  <button
                    v-if="pedido.status == 'Troca autorizada'"
                    class="btn btn-primary"
                    v-on:click="modal(pedido, pedidos.indexOf(pedido))"
                  >
                    Alterar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="container">
      <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="row mt-5">
          <div class="col-sm-3 ml-4 mt-4"></div>
          <div class="col-sm-5">
            <div class="modal-content">
              <span class="close text-right" v-on:click="fechar()"
                >&times;</span
              >
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Qtde.</th>
                    <th scope="col">Retornar ao estoque?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="troca in pedido.trocas" :key="troca.id">
                    <td>{{ getNomeProduto(troca.proId) }}</td>
                    <td>{{ troca.quantidade }}</td>
                    <td>
                      <input
                        class="ml-2"
                        type="radio"
                        value="true"
                        v-model="troca.retornarEstoque"
                      />
                      <label class="ml-2 mr-2" for="celular">sim</label>
                      <input
                        class="ml-2"
                        type="radio"
                        value="false"
                        v-model="troca.retornarEstoque"
                      />
                      <label class="ml-2" for="celular">não</label>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <div class="col-sm-8"></div>
                <div class="col-sm-4">
                  <button
                    class="btn btn-success form-control"
                    v-on:click="alterarCompra(pedido, statusTroca)"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
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
        "Entregue",
        "Troca solicitada",
        "Troca autorizada",
        "Troca rejeitada", //"Troca aceita",
        "Troca efetuada",
        "Cancelamento solicitado",
        "Cancelamento rejeitado",
        "Cancelamento aceito",
        "Cancelamento efetuado",
      ],
      pedidos: [{ status: "" }],
      statusTemporario: [],
      statusTroca: null, //Usado no modal
      vetor: [],
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
      pedido: { trocas: [] },
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
      } else {
        if (compra.valor != null) {
          this.formatarDinheiro();
        }
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
            console.log(data);
            this.pedidos = data;
            this.preencheVetor();
          } else {
            alert(data[0].mensagens);
          }
        });
    },
    preencheVetor() {
      for (const pedido of this.pedidos) {
        this.statusTemporario.push(pedido.status);
      }
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
      const resposta = confirm("Recusar troca?");

      if (resposta) {
        if (pedido.status == "Cancelamento solicitado") {
          pedido.status = "Cancelamento rejeitado";
        }
        if (pedido.status == "Troca solicitada") {
          pedido.status = "Troca rejeitada";
        }
      }
    },

    alterarStatusCompra(index) {
      const statusDiferente =
        this.pedidos[index].status != this.statusTemporario[index]
          ? true
          : false;

      if (statusDiferente && this.statusTemporario[index]) {
        const resposta = confirm(
          "Alterar de: '" +
            this.pedidos[index].status +
            "'\npara: '" +
            this.statusTemporario[index] +
            "' ?"
        );

        if (resposta) {
          this.pedidos[index].status = this.statusTemporario[index];

          const postMethod = {
            method: "POST", // Method itself
            headers: {
              "Content-type": "application/json; charset=UTF-8", // Indicates the content
            },
            body: JSON.stringify(this.pedidos[index]), // We send data in JSON format
          };

          fetch("http://localhost:8080/alterar-compra", postMethod)
            .then((response) => response.json())
            .then((data) => {
              alert(data.mensagens[0]);
            });
        }
      }
    },
    alterarCompra(compra, status) {
      this.fechar();

      const resposta = confirm(
        "Alterar de: '" + compra.status + "'\npara: '" + status + "' ?"
      );
      if (resposta) {
        compra.status = status;

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
      }
    },
    getCompra(id) {
      for (const pedido of this.pedidos) {
        if (pedido.id == id) {
          return pedido;
        }
      }
    },
    verificaStatus(status) {
      if (
        status == "Entregue" ||
        status == "Troca autorizada" ||
        status == "Troca efetuada" ||
        status == "Troca rejeitada"
      ) {
        return false;
      }
      return true;
    },
    getStatus(status) {
      if (
        status == "Separando pedido" ||
        status == "Enviado p/ transportadora" ||
        status == "Em trânsito" ||
        status == "Aprovada"
      ) {
        return [
          "Aprovada",
          "Separando pedido",
          "Enviado p/ transportadora",
          "Em trânsito",
          "Entregue",
        ];
      }
      if (
        status == "Entregue" ||
        status == "Troca efetuada" ||
        status == "Troca rejeitada"
      ) {
        return 0;
      }
      if (status == "Troca solicitada") {
        return ["Troca solicitada", "Troca autorizada", "Troca rejeitada"];
      }
      if (status == "Troca autorizada") {
        return ["Troca efetuada"];
      }
      return [
        "Cancelamento solicitado",
        "Cancelamento rejeitado",
        "Cancelamento aceito",
        "Cancelamento efetuado",
      ];
    },

    //Modal
    modal(compra, index) {
      this.pedido = compra;
      this.statusTroca = this.statusTemporario[index];

      if (compra.status != this.statusTroca) {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
      }
    },
    fechar() {
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
    },
    getNomeProduto(id) {
      for (const produto of this.pedido.produtos) {
        if (produto.idProduto == id) {
          return produto.nome;
        }
      }
    },
  },
};
</script>

<style>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
