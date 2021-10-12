<template>
  <div>
    <app-nav></app-nav>
    <div class="container-fluid">
      <!-- Control the column width, and how they should appear on different devices -->
      <div class="row">
        <div class="col-sm-12">
          <form @submit.prevent="consultar()">
            <div class="row">
              <div class="col-sm-2">
                <button
                  class="btn btn-success btn-block"
                  @click="$router.push('/cadastro-cupom')"
                >
                  <i class="fas fa-plus"></i>
                  adicionar cupom
                </button>
              </div>
              <div class="col-sm-2 mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="nome"
                  v-model="cupom.nome"
                />
              </div>
              <div class="col-sm-2 mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="código"
                  v-model="cupom.codigo"
                />
              </div>
              <div class="col-sm-2 mb-3">
                <select class="form-control" v-model="cupom.tipo">
                  <option v-for="tipo in tipos" :key="tipo">
                    {{ tipo }}
                  </option>
                </select>
              </div>
              <div class="col-sm-2 mb-3">
                <button type="submit" class="btn btn-primary btn-block">
                  <i class="fas fa-search"></i>
                  Pesquisar
                </button>
              </div>
              <div class="col-sm-2 mb-3">
                <button type="submit" class="btn btn-danger btn-block">
                  <i class="fas fa-times"></i>
                  limpar pesquisa
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <h1>Cupons</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Cupom</th>
                <th scope="col">Descricao</th>
                <th scope="col">Tipo</th>
                <th scope="col">Valor</th>
                <th scope="col">Validade</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cupom in cupons" :key="cupom.id">
                <td>{{ cupom.nome }}</td>
                <td>{{ cupom.descricao }}</td>
                <td>{{ cupom.tipoCupom }}</td>
                <td>{{ cupom.valor }}</td>
                <td>{{ cupom.validade }}</td>
                <td><i class="fa fa-pencil-alt"></i></td>
                <td><i class="fa fa-trash"></i></td>
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
  name: "Cupom",
  components: {
    "app-nav": Navbar,
  },

  data() {
    return {
      tipos: ["promocional"],
      cupons: null,
      cupom: {
        nome: null,
        codigo: null,
        tipoCupom: null,
      },
    };
  },
  created() {
    this.consultarCupom();
  },
  methods: {
    consultarCupom() {
      const json = {
        admId: 1,
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
            this.cupons = data;
          } else {
            alert(data[0].mensagens);
          }
        });
    },
  },
};
</script>
