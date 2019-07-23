<template>
  <header class="header bg-primary">
    <div class="container">
      <nav class="header__nav">
        <router-link :to="user ? { name: 'dashboard' } : { name: 'home' }" class="header__logo">FaCh</router-link>
        <HeaderMenu />
      </nav>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from "vuex";
  import HeaderMenu from "@/components/HeaderMenu";

  export default {
    components: {
      HeaderMenu
    },
    computed: {
      ...mapGetters([`user`]),
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 8px 0;
  }

  .header__logo {
    color: #fff;
    font-size: 20px;
  }

  .header__nav {
    display: flex;
    align-items: center;
  }
</style>
