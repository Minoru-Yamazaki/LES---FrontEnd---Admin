<template>
  <div>
    <nav class="navbar bg-dark navbar-dark mb-3">
      <i class="text-white h2 font">Orquidário</i>
      <img
        src="../assets/logo_oiv.jpg"
        alt="..."
        class="rounded-circle"
        width="50"
        height="50"
      />
    </nav>

    <div class="container-fluid">
      <!-- Control the column width, and how they should appear on different devices -->
      <form @submit.prevent="consultarLogin()">
        <div class="row mt-5">
          <div class="col-sm-4"></div>
          <div class="col-sm-4">
            <h2 class="text-center m-3">Login</h2>
            <div class="mb-5">
              <label>Email</label>
              <input
                class="form-control"
                type="email"
                id="txtEmail"
                placeholder="minoru@gmail.com"
                required
                v-model="login.email"
              />
            </div>
            <div class="mb-5">
              <label>Senha</label>
              <input
                class="form-control"
                type="password"
                id="txtPwd"
                required
                v-model="login.senha"
              />
            </div>

            <button type="submit" class="btn btn-primary btn-block mb-5" id="btnContinuar">
              <!-- v-on:click="teste()" -->
              Continuar
            </button>
          </div>
          <div class="col-sm-4"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
//import clienteService from "../../_services/clienteServices.js";

export default {
  name: "Login",
  data() {
    return {
      login: {
        email: null,
        senha: null,
      },
    };
  },

  methods: {
    consultarLogin() {
      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(this.login), // We send data in JSON format
      };

      fetch("http://localhost:8080/consultar-admlogin", postMethod)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].id != null) {
            localStorage.setItem("login", JSON.stringify(data[0]));
            this.consultarAdmin().then(() => {
              this.$router.push({ path: "/home" });
            });
          } else {
            alert(data[0].mensagens);
          }
        });
    },

    consultarAdmin() {
      const login = JSON.parse(localStorage.getItem("login"));
      const someData = {
        id: login.id,
      };
      const postMethod = {
        method: "POST", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(someData), // We send data in JSON format
      };

      return fetch("http://localhost:8080/consultar-administrador", postMethod)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].id != null) {
            localStorage.setItem("admin", JSON.stringify(data[0]));
          } else {
            alert(data[0].mensagens);
          }
        });
    },
  },
};
</script>

<style scoped>
.font {
  font-family: Brush Script MT;
}
</style>
