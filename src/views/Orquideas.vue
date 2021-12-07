<template>
  <div>
    <app-nav></app-nav>
    <div class="container-fluid">
      <!-- Control the column width, and how they should appear on different devices -->
      <div class="row">
        <div class="col-sm-12">
          <form @submit.prevent="consultarOrquidea()" class="row">
            <div class="col-sm-2 mb-3">
              <i>status:</i>
              <select class="form-control" v-model="orchid.ativo">
                <option v-for="status in listas.status" :key="status">
                  {{ status }}
                </option>
              </select>
            </div>

            <div class="col-sm-2 mb-3">
              <i>nome:</i>
              <input
                class="form-control"
                type="text"
                placeholder="Cattleya"
                v-model="orchid.nome"
              />
            </div>

            <div class="col-sm-2 mb-3">
              <i>gênero:</i>
              <select class="form-control" v-model="orchid.genero">
                <option v-for="genero in listas.generos" :key="genero.genero">
                  {{ genero.genero }}
                </option>
              </select>
            </div>

            <div class="col-sm-2 mb-3">
              <i>tipo:</i>
              <select class="form-control" v-model="orchid.tipo">
                <option value="híbrido">Híbrido</option>
                <option value="espécie">Espécie</option>
              </select>
            </div>

            <div class="col-sm-2 mb-3">
              <i>cor:</i>
              <select class="form-control" v-model="orchid.cor">
                <option v-for="cor in listas.cores" :key="cor.cor">
                  {{ cor.cor }}
                </option>
              </select>
            </div>

            <div class="col-sm-1">
              <i class="text-white">branco</i>
              <button type="submit" class="btn btn-primary btn-block">
                <i class="fas fa-search"></i>
              </button>
            </div>

            <div class="col-sm-1">
              <i class="text-white">branco</i>
              <button
                v-on:click="limparPesquisa()"
                type="button"
                class="btn btn-danger btn-block"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- -->
      <div class="row mt-5">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <h1>Orquídeas</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Gênero</th>
                <th scope="col">Tipo</th>
                <th scope="col">Valor</th>
                <th scope="col">Cor</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orquidea in orquideas" :key="orquidea.id">
                <td>{{ orquidea.nome }}</td>
                <td>{{ orquidea.genero }}</td>
                <td>{{ orquidea.tipo }}</td>
                <td>{{ orquidea.valorVenda }}</td>
                <td>{{ orquidea.cor }}</td>
                <td>
                  <router-link
                    :to="{ path: '/alterar-orquidea/' + orquidea.id }"
                  >
                    <i class="fa fa-pencil-alt text-dark mt-2"></i>
                  </router-link>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn text-dark"
                    v-on:click="excluirOrquidea(orquidea.id)"
                  >
                    <i class="fa fa-trash"></i>
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
import Navbar from "../components/nav/Nav.vue";

export default {
  name: "Orquideas",

  components: {
    "app-nav": Navbar,
  },

  data() {
    return {
      listas: {
        generos: [],
        tamanhos: ["1", "2", "3", "pré-adulta", "adulta"],
        cores: [],
        status: ["ativo", "inativo"],
      },
      orchid: {
        ativo: null,
        nome: null,
        genero: null,
        tipo: null,
        cor: null,
      },
      orquideas: null,
    };
  },
  created() {
    this.carregarCores();
    this.carregarGeneros();
  },
  methods: {
    carregarCores() {
      const json = {
        ativo: 1,
      };

      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(json), // We send data in JSON format
      };

      fetch("http://localhost:8080/consultar-cor", postMethod)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].id != null) {
            this.listas.cores = data;
          } else {
            alert(data[0].mensagens);
          }
        });
    },
    carregarGeneros() {
      const json = {
        ativo: 1,
      };

      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(json), // We send data in JSON format
      };

      fetch("http://localhost:8080/consultar-genero", postMethod)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].id != null) {
            this.listas.generos = data;
          } else {
            alert(data[0].mensagens);
          }
        });
    },
    consultarOrquidea() {
      if (this.orchid.ativo != null) {
        if (this.orchid.ativo == "ativo") {
          this.orchid.ativo = 1;
        } else {
          this.orchid.ativo = 0;
        }
      }
      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(this.orchid), // We send data in JSON format
      };

      fetch("http://localhost:8080/consultar-orquidea", postMethod)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].id != null) {
            this.orquideas = data;
          } else {
            alert(data[0].mensagens);
          }
        });
    },
    limparPesquisa() {
      this.orchid.ativo = null;
      this.orchid.nome = null;
      this.orchid.genero = null;
      this.orchid.tipo = null;
      this.orchid.cor = null;
    },
    excluirOrquidea(id) {
      const resposta = confirm("Excluir orquidea?");

      if (resposta == true) {
        const json = {
          id: id,
        };

        const postMethod = {
          method: "POST", // Method itself
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
          body: JSON.stringify(json), // We send data in JSON format
        };

        fetch("http://localhost:8080/excluir-orquidea", postMethod)
          .then((response) => response.json())
          .then((data) => {
            alert(data.mensagens);
          });
      }
    },
  },
};
</script>
