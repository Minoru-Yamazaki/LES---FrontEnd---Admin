<template>
  <div>
    <div>
      <router-link
        class="text-secondary h4"
        to="/cadastro-orquidea"
        id="lnkCadastrar"
      >
        <p class="fas fa-leaf"></p>
        <i class="ml-2">cadastro orquídea</i>
      </router-link>
    </div>
    <div>
      <router-link class="text-secondary h4" to="/orquideas">
        <p class="fab fa-pagelines"></p>
        <i class="ml-2">orquídeas</i>
      </router-link>
    </div>
    <!-- 
    <div>
      <router-link class="text-secondary h4" to="">
        <p class="fas fa-user-plus"></p>
        <i class="ml-2">novo usuário</i>
      </router-link>
    </div>
    <div>
      <router-link class="text-secondary h4" to="">
        <p class="fas fa-users"></p>
        <i class="ml-2">usuários</i>
      </router-link>
    </div>
    -->
    <div>
      <router-link class="text-secondary h4" to="/dashboard" id="lnkDashBoard">
        <p class="fas fa-chart-line"></p>
        <i class="ml-2">dashboard</i>
      </router-link>
    </div>
    <div>
      <router-link class="text-secondary h4" to="/cupom-promocional">
        <p class="fa fa-ticket-alt"></p>
        <i class="ml-2">cupom promocional</i>
      </router-link>
    </div>
    <div>
      <router-link class="text-secondary h4" to="/pedidos">
        <p class="fa fa-box-open"></p>
        <i class="ml-2">pedidos</i>
      </router-link>
    </div>
    <!--
    <div>
      <router-link class="text-secondary h4" to="">
        <p class="fa fa-lock"></p>
        <i class="ml-2">alterar senha</i>
      </router-link>
    </div>
    <div>
      <button
        type="button"
        class="btn text-secondary"
        v-on:click="excluirCadastro()"
      >
        <p class="fa fa-user-times h4"></p>
        <i class="h4">excluir cadastro</i>
      </button>
    </div>
    -->
  </div>
</template>

<script>
export default {
  name: "MenuMinhaContaComponent",

  data() {
    return {};
  },

  created() {},

  methods: {
    excluirCadastro() {
      const resposta = confirm("Excluir cadastro?");

      if (resposta == true) {
        let cliente = JSON.parse(localStorage.getItem("cliente"));
        let id = cliente.id;

        let json = {
          id: id,
        };

        const postMethod = {
          method: "POST", // Method itself
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
          body: JSON.stringify(json), // We send data in JSON format
        };

        fetch("http://localhost:8080/excluir-cliente", postMethod)
          .then((response) => response.json())
          .then((data) => {
            alert(data.mensagens);
          })
          .then(() => {
            this.$router.push({ path: "/#/" });
            this.exluirCookies();
          });
      }
    },
    exluirCookies() {
      localStorage.removeItem("login");
      localStorage.removeItem("cliente");
      localStorage.removeItem("idEndereco");
      localStorage.removeItem("idCartao");
    },
  },
};
</script>
