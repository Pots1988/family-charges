<template>
  <section class="sect statistic-outer">
    <div class="container statistic">
      <div class="statistic__header mb-2">
        <h1 class="h2 text-center mb-0 mr-3">
          Статистика 
          <small class="statistic__header-date text-danger">({{ startMonth | formatDate }} - {{ endMonth | formatDate }})</small>
        </h1>

        <DatePicker 
          class="statistic__datepicker"
          @date-change="dateChange"
          :date="date"
          :monthOnly="true"
        />
      </div>
      <template v-if="days">
        <Statistic :days="days" :loadMonth="loadMonth" />
      </template>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import Statistic from "@/components/Statistic/Statistic";
  import DatePicker from "@/components/DatePicker"
  import { formatDate } from "@/filters/globalFilters"

  let daysListener;

  export default {
    name: "Statistic-view",
    components: {
      Statistic,
      DatePicker
    },
    filters: {
      formatDate
    },
    data() {
      return {
        date: new Date(new Date().getFullYear(), new Date().getMonth()),
        loadMonth: false
      }
    },
    created() {
      daysListener = this.daysCollection.onSnapshot(doc => this.getMonthDays(this.date));
    },
    beforeDestroy() {
      daysListener();
      this.clearDays();
    },
    computed: {
      ...mapGetters(`days`, [`daysCollection`, `days`]),
      startMonth() {
        return this.date
      },
      endMonth() {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
      }
    },
    methods: {
      ...mapActions(`days`, [
        `getMonthDays`
      ]),
      ...mapMutations(`days`, [
        `clearDays`
      ]),
      ...mapMutations([`addMessage`]),
      dateChange(date) {
        this.date = new Date(date.getFullYear(), date.getMonth());
        this.loadMonth = true;
        this.getMonthDays(this.date)
          .then(() => this.loadMonth = false)
          .catch(err => {
            this.loadMonth = false;
            this.addMessage({
              text: err,
              type: `danger`,
              id: Date.now()
            });
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .statistic-outer {
    height: calc(100vh - 92px);
    display: flex;
    overflow: hidden;
  }

  .statistic {
    display: flex;
    flex-direction: column;
  }

  .statistic__datepicker {
    font-size: 14px;
  }

  .statistic__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    flex-shrink: 0;
  }

  .statistic__header-date {
    font-size: 12px;
    font-weight: 700;
    display: block;
    text-align: left;
  }
</style>
