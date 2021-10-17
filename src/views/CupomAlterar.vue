<template>
  <div>
    <app-nav></app-nav>
    <div class="container-fluid mt-4">
      <!-- Control the column width, and how they should appear on different devices -->
      <div class="row">
        <div class="col-sm-4">
          <router-link class="mx-3" to="/cupom-promocional">
            <i class="fa fa-arrow-left"></i>
          </router-link>
        </div>

        <div class="col-sm-4">
          <h2 class="text-center mb-3">Alterar Cupom</h2>
          <form @submit.prevent="alterarCupom()">
            <div class="mb-3">
              <label>Nome</label>
              <input
                class="form-control"
                type="text"
                maxlength="30"
                v-model="cupom.nome"
                required
              />
            </div>
            <div class="mb-3">
              <label>Tipo</label>
              <select class="form-control" v-model="cupom.tipoCupom" required>
                <option v-for="tipo in tipos" :key="tipo">
                  {{ tipo }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label>Valor R$</label>
              <input
                class="form-control"
                type="tel"
                maxlength="15"
                placeholder="12,34"
                v-model="cupom.valor"
                pattern="([0-9]{1,3}\.)?[0-9]{1,3},[0-9]{2}$"
                required
              />
            </div>
            <div class="mb-3">
              <label>Validade</label>
              <input
                class="form-control"
                type="date"
                v-model="cupom.validade"
                required
              />
            </div>
            <div class="mb-3">
              <label>Descrição</label>
              <textarea
                class="form-control"
                cols="30"
                rows="5"
                maxlength="50"
                v-model="cupom.descricao"
              ></textarea>
            </div>
            <div class="text-center mt-3 mb-5">
              <button type="submit" class="btn btn-primary btn-block">
                Alterar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/nav/Nav.vue";

export default {
  name: "CadastroCupom",
  props: ["id"],

  components: {
    "app-nav": Navbar,
  },
  data() {
    return {
      tipos: ["promocional"],
      cupom: {
        nome: null,
        descricao: null,
        tipoCupom: null,
        valor: null,
        validade: null,
        admId: 1,
      },
    };
  },
  created() {
    this.consultarCupom();
  },
  methods: {
    consultarCupom() {
      const json = {
        id: this.$route.params.id, //JSON.parse(localStorage.getItem("idOrquidea"))
      };

      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(json), // We send data in JSON format
      };

      fetch("http://localhost:8080/consultar-admcupom", postMethod)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].id != null) {
            this.cupom = data[0];
          } else {
            alert(data[0].mensagens);
          }
        });
    },
    alterarCupom() {
      this.formatarDinheiro();

      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(this.cupom), // We send data in JSON format
      };

      fetch("http://localhost:8080/alterar-admcupom", postMethod)
        .then((response) => response.json())
        .then((data) => {
          alert(data.mensagens);
          if (data.mensagens[0] == "Alterado com sucesso") {
            this.$router.push({ path: "/cupom-promocional" });
          }
        });
    },
    formatarDinheiro() {
      let valor = this.cupom.valor;
      this.cupom.valor = valor.replace(",", ".");
    },
  },
};
</script>
