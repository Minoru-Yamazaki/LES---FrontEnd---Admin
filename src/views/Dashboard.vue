<template>
  <div>
    <app-nav></app-nav>

    <div class="container">
      <form @submit.prevent="consultarAnalise(analise)">
        <div class="row">
          <div class="col-sm-4 mb-3">
            <label>Data inicial</label>
            <input
              class="form-control"
              type="date"
              id="dataInicial"
              v-model="analise.dataInicial"
              timezone="[[timezone]]"
              required
            />
          </div>
          <div class="col-sm-4 mb-3">
            <label>Data final</label>
            <input
              class="form-control"
              type="date"
              id="dataFinal"
              v-model="analise.dataFinal"
              timezone="[[timezone]]"
              required
            />
          </div>
          <div class="col-sm-4">
            <label class="text-white">Texto em cor branca</label>
            <button type="submit" class="btn btn-primary btn-block">
              Pesquisar
            </button>
          </div>
        </div>
      </form>
      <highcharts :options="chartOptions" :callback="myCallback"></highcharts>
    </div>
  </div>
</template>

<script>
//import { GChart } from "vue-google-charts";
import { Chart } from "highcharts-vue";
import Navbar from "../components/nav/Nav.vue";

export default {
  name: "Dashboard",
  components: {
    "app-nav": Navbar,
    highcharts: Chart,
  },

  data() {
    return {
      //Usado para pesquisar dados para exibir no gráfico
      analise: {
        dataInicial: null,
        dataFinal: null,
      },

      chartOptions: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        legend: {
          layout: "",
          align: "",
          verticalAlign: "",
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "",
                  align: "",
                  verticalAlign: "",
                },
              },
            },
          ],
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        xAxis: {
          categories: [],
          title: {
            text: "",
          },
        },
      },
    };
  },
  created() {},
  methods: {
    consultarAnalise() {
      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(this.analise), // We send data in JSON format
      };

      fetch("http://localhost:8080/consultar-analise", postMethod)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.chartOptions = data;
        });
    },
  },
};
</script>
