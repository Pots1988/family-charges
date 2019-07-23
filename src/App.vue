<template>
  <div id="app">
    <Header />
    <BaseMessage />
    <router-view />
    <Menu v-if="user" />
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import Header from "@/components/Header";
  import Menu from "@/components/Menu";

  let placeListener,
      catListener;

  export default {
    components: {
      Header,
      Menu
    },
    created() {
      this.createListen();
    },
    beforeDestroy() {
      placeListener();
      catListener();
    },
    computed: {
      ...mapGetters([`user`]),
      ...mapGetters(`places`, [`placeCollection`]),
      ...mapGetters(`categories`, [`categoriesCollection`])
    },
    methods: {
      ...mapMutations(`places`, [`setPlaces`]),
      ...mapMutations(`categories`, [`setCategories`]),
      ...mapMutations([`addMessage`]),
      createListen() {
        if (this.user && !placeListener && !catListener) {
          placeListener = this.placeCollection.onSnapshot(doc => this.setPlaces(doc));
          catListener = this.categoriesCollection.onSnapshot(doc => {
            this.setCategories(doc);
          });
        }
      }
    },
    watch: {
      user() {
        this.createListen();
      }
    }
  }
</script>


<style lang="scss">

</style>
