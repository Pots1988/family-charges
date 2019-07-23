<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center mb-3">Информация</h1>

      <Card 
        v-if="lastDay"
        :day="lastDay"
      />
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import Card from "@/components/Card/Card";

  let daysListener;

  export default {
    components: {
      Card
    },
    computed: {
      ...mapGetters(`days`, [`daysCollection`, `lastDay`])
    },
    created() {
      daysListener = this.daysCollection.onSnapshot(doc => this.getLastDay());
    },
    beforeDestroy() {
      daysListener();
      this.clearLastDay();
    },
    methods: {
      ...mapActions(`days`, [
        `getLastDay`
      ]),
      ...mapMutations(`days`, [
        `clearLastDay`
      ]),
    }
  }
</script>

<style lang="scss" scoped>

</style>