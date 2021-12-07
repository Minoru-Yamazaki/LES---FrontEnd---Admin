<template>
  <div>
    <app-nav></app-nav>

    <div class="container-fluid">
      <!-- Control the column width, and how they should appear on different devices -->
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <h2 class="text-center mb-5">Cadastrar nova orquídea</h2>

          <form @submit.prevent="salvarOrquidea()">
            <div class="row">
              <div class="col-sm-6 mb-3">
                <i>Nome</i>
                <input
                  class="form-control"
                  type="text"
                  v-model="orquidea.nome"
                  required
                />
              </div>
              <div class="col-sm-6 mb-3">
                <i>Tipo</i>
                <select class="form-control" v-model="orquidea.tipo" required>
                  <option v-for="tipo in tipos" :key="tipo">
                    {{ tipo }}
                  </option>
                </select>
              </div>

              <!-- -->
              <div class="col-sm-3 mb-3" required>
                <i>Qtde.</i>
                <input
                  class="form-control"
                  type="number"
                  min="1"
                  v-model="orquidea.quantidade"
                  required
                />
              </div>
              <div class="col-sm-4 mb-3">
                <i>cor:</i>
                <select class="form-control" v-model="orquidea.cor" required>
                  <option v-for="cor in listas.cores" :key="cor.cor">
                    {{ cor.cor }}
                  </option>
                </select>
              </div>
              <div class="col-sm-5 mb-3">
                <i>gênero:</i>
                <select class="form-control" v-model="orquidea.genero" required>
                  <option v-for="genero in listas.generos" :key="genero.genero">
                    {{ genero.genero }}
                  </option>
                </select>
              </div>

              <!-- -->
              <div class="col-sm-3 mb-3">
                <i>Valor de custo</i>
                <input
                  class="form-control"
                  type="tel"
                  maxlength="15"
                  placeholder="12,34"
                  pattern="([0-9]{1,3}\.)?[0-9]{1,3},[0-9]{2}$"
                  v-model="orquidea.valorCusto"
                  required
                />
              </div>
              <div class="col-sm-3 mb-3">
                <i>Tamanho:</i>
                <select
                  class="form-control"
                  v-model="orquidea.tamanho"
                  required
                >
                  <option v-for="tamanho in listas.tamanhos" :key="tamanho">
                    {{ tamanho }}
                  </option>
                </select>
              </div>
              <div class="col-sm-3 mb-3">
                <i>Sombreamento:</i>
                <select class="form-control" v-model="orquidea.sombreamento">
                  <option
                    v-for="sombreamento in listas.sombreamentos"
                    :key="sombreamento"
                  >
                    {{ sombreamento }}
                  </option>
                </select>
              </div>
              <div class="col-sm-3 mb-3">
                <i>Clima:</i>
                <select class="form-control" v-model="orquidea.clima">
                  <option v-for="clima in listas.climas" :key="clima">
                    {{ clima }}
                  </option>
                </select>
              </div>
              <!-- -->
              <div class="col-sm-12 mb-3">
                <i>Tempo de Floração</i>
                <input
                  class="form-control"
                  type="text"
                  v-model="orquidea.tempoFloracao"
                />
              </div>
              <!-- -->
              <div class="col-sm-3 mb-3">
                <i>Umidade ambiente:</i>
                <select class="form-control" v-model="orquidea.umidadeAmbiente">
                  <option v-for="umidade in listas.umidades" :key="umidade">
                    {{ umidade }}
                  </option>
                </select>
              </div>
              <div class="col-sm-3 mb-3">
                <i>Precificação %:</i>
                <select
                  class="form-control"
                  v-model="orquidea.idPrecificacao"
                  required
                >
                  <option
                    v-for="precificacao in listas.precificacoes"
                    :key="precificacao.id"
                  >
                    {{ precificacao.porcentagem }}
                  </option>
                </select>
              </div>
              <div class="col-sm-6 mb-3">
                <i>Fornecedor</i>
                <input
                  class="form-control"
                  type="text"
                  v-model="orquidea.fornecedor"
                  required
                />
              </div>
              <!-- -->
              <div class="col-sm-12 mb-3">
                <i>Descrição:</i>
                <textarea
                  class="form-control"
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  v-model="orquidea.descricao"
                ></textarea>
              </div>
              <!-- -->
              <div class="col-sm-3 mb-3"></div>
              <div class="col-sm-2 mb-3">
                <label for="file" id="lblFile"><i class="fas fa-camera-retro h1"></i></label>
                <input
                  type="file"
                  v-on:change="paraBase64()"
                  id="file"
                  hidden
                  accept="image/*"
                />
              </div>
              <div class="col-sm-4 mb-3">
                <img :src="imagemBase64" width="100" class="image" />
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                <button type="submit" class="btn btn-primary btn-block mb-5">
                  enviar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/nav/Nav.vue";

export default {
  name: "CadastroOrquidea",

  components: {
    "app-nav": Navbar,
  },

  data() {
    return {
      imagemBase64: null,
      orquidea: {
        ativo: 1,
        categoriaAtivacao: "em estoque",
        codigoBarras: null,
        quantidade: null,
        cor: null,
        valorCusto: null,
        valorVenda: null,
        descricao: null,
        nome: null,
        genero: null,
        tipo: null,
        tamanho: null,
        clima: null,
        sombreamento: null,
        tempoFloracao: null,
        umidadeAmbiente: null,
        fornecedor: null,
        idAdm: null,
        idPrecificacao: null,
        imagens: [{ foto: null }],
      },
      tipos: ["Espécie", "Híbrido"],
      //usuário que adminstra o sistema
      usuario: null,
      //listas do BD
      listas: {
        cores: null,
        generos: null,
        tamanhos: ["1", "2", "3", "pré-adulta", "adulta"],
        sombreamentos: [
          "10%",
          "20%",
          "30%",
          "35%",
          "40%",
          "45%",
          "50%",
          "55%",
          "60%",
          "65%",
          "70%",
          "75%",
          "80%",
          "85%",
          "90%",
          "95%",
          "100%",
        ],
        climas: [
          null,
          "Temperado",
          "Equatorial",
          "Tropical",
          "Subtropical",
          "Frio",
          "Semiárido",
        ],
        umidades: ["baixa", "média", "alta"],
        precificacoes: [
          { id: 1, porcentagem: 10 },
          { id: 2, porcentagem: 15 },
          { id: 3, porcentagem: 20 },
          { id: 4, porcentagem: 25 },
          { id: 5, porcentagem: 30 },
          { id: 6, porcentagem: 35 },
          { id: 7, porcentagem: 40 },
          { id: 8, porcentagem: 45 },
          { id: 9, porcentagem: 50 },
          { id: 10, porcentagem: 55 },
          { id: 11, porcentagem: 60 },
          { id: 12, porcentagem: 65 },
          { id: 13, porcentagem: 70 },
          { id: 14, porcentagem: 75 },
          { id: 15, porcentagem: 80 },
          { id: 16, porcentagem: 85 },
          { id: 17, porcentagem: 90 },
          { id: 18, porcentagem: 95 },
          { id: 19, porcentagem: 100 },
        ],
      },
    };
  },
  created() {
    this.carregaInfos();
  },
  methods: {
    carregaInfos() {
      this.usuario = JSON.parse(localStorage.getItem("admin"));
      this.orquidea.idAdm = this.usuario.id;
      this.carregarCores();
      this.carregarGeneros();
    },
    paraBase64() {
      var file = document.querySelector("input[type=file]").files[0];
      let type = file.type.split("/")[0];

      if (type == "image") {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.imagemBase64 = reader.result;
        };
      }
    },
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
    salvarOrquidea() {
      this.formatarDinheiro();
      let porcentagem = this.orquidea.idPrecificacao; //está trazendo a porcentagem do formulário
      this.orquidea.idPrecificacao = this.formataIdOrquidea(porcentagem);
      this.orquidea.imagens[0].foto = this.imagemBase64;

      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(this.orquidea), // We send data in JSON format
      };

      fetch("http://localhost:8080/salvar-orquidea", postMethod)
        .then((response) => response.json())
        .then((data) => {
          alert(data.mensagens);
          //if (data.mensagens[0] == "Cupom salvo com sucesso") {
          //this.$router.push({ path: "/cupom-promocional" });
          //}
        });
    },
    formatarDinheiro() {
      let valor = this.orquidea.valorCusto;
      this.orquidea.valorCusto = valor.replace(",", ".");
    },
    formataIdOrquidea(porcentagem) {
      for (const precificacao of this.listas.precificacoes) {
        if (porcentagem == precificacao.porcentagem) {
          return precificacao.id;
        }
      }
    },
  },
};
</script>
