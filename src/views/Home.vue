<template>
  <div>
    <app-nav></app-nav>

    <div class="container-fluid">
      <!-- Control the column width, and how they should appear on different devices -->
      <div class="row">
        <div class="col-sm-4 ml-4 mt-4">
          <app-menu></app-menu>
        </div>
        <div class="col-sm-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/nav/Nav.vue";
import Menu from "../components/menu/Menu.vue";

export default {
  name: "Home",
  components: {
    "app-nav": Navbar,
    "app-menu": Menu,
  },
};
</script>
