<template>
  <div>
    <nav class="navbar bg-dark navbar-dark justify-content-between mb-3">
      <router-link class="mx-3 text-white" to="/home">
        <p class="fa fa-home fa-2x"></p>
      </router-link>

      <div class="mt-3 text-white">
        <i class="text-white"> {{ getPrimeiroNome() }} </i>
        <router-link class="mx-3 text-white" to="/">
          <i class="fa fa-user fa-2x"></i>
        </router-link>
        <button type="button" @click="click()" class="btn text-white">
          sair
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      usuario: JSON.parse(localStorage.getItem("cliente")),
      nome: "",
      cliente: null,
    };
  },
  methods: {
    click() {
      this.exluirCookies();
      this.$router.push({ path: "/" });
    },
    getPrimeiroNome() {
      try {
        let usuario = JSON.parse(localStorage.getItem("admin"));
        return usuario.nome.split(" ")[0];
      } catch (error) {
        this.exluirCookies();
        this.$router.push({ path: "/login" });
      }
    },

    exluirCookies() {
      localStorage.removeItem("login");
      localStorage.removeItem("admin");
      localStorage.removeItem("idCupom");
    },
  },
};
</script>
