<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center mb-3 days">
        Дни

        <BaseBtn 
          class="btn-success btn-block days-btn"
          @click="addDays"
          :load="loadDays"
          v-if="showBtnMore"
        >
          <slot>+5 дней</slot>
        </BaseBtn>
      </h1>
      <template v-if="days">
        <Card v-for="day in days" :day="day" :key="day.date" class="mb-3" />
      </template>
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
    data() {
      return {
        daysCount: 5,
        loadDays: false
      }
    },
    created() {
      daysListener = this.daysCollection.onSnapshot(doc => this.getCountDays(this.daysCount));
    },
    beforeDestroy() {
      daysListener();
      this.clearDays();
    },
    computed: {
      ...mapGetters(`days`, [`daysCollection`, `days`]),
      ...mapGetters([`userSettings`]),
      showBtnMore() {
        if (!this.userSettings || !this.days) return false;

        return this.userSettings.daysCount > this.days.length;
      }
    },
    methods: {
      ...mapActions(`days`, [
        `getCountDays`
      ]),
      ...mapMutations(`days`, [
        `clearDays`
      ]),
      ...mapMutations([`addMessage`]),
      addDays() {
        this.daysCount += 5;
        this.loadDays = true;

        this.getCountDays(this.daysCount)
          .then(() => {
            this.loadDays = false;
          })
          .catch(err => {
            console.warn(err);
            this.loadDays = false;
            this.addMessage({
              text: `Ошибка загрузки дней`,
              type: `error`,
              id: Date.now()
            });
          })
      }
    }
  }
</script>

<style type="scss" scoped>
  .days {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .days-btn {
    width: auto;
    margin-left: auto;
  }
</style>
