<template>
  <router-view />
  <navbarVue />
</template>

<script>
import navbarVue from "./components/navbar.vue";

export default {
  name: "App",
  components: {
    navbarVue,
  },
};
</script>
