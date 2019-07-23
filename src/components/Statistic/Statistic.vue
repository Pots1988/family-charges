<template>
  <section class="statistic__section">
    <template v-if="days.length">
      <header class="statistic__header mb-2">
        <b class="statistic__total">{{ total | fixedNumber }} грн.</b>
        <BaseBtn
          class="btn-danger btn-sm statistic__filter-btn-reset" 
          v-if="resetBtnIsVisible"
          @click="resetFilter"
        >
          Сбросить все 
          <BaseIcon link="remove" fill="#fff" width="16" height="16" />
        </BaseBtn>
        <BaseBtn 
          class="btn-success btn-sm"
          @click="showFilter"
        >
          Сортировка 
          <BaseIcon link="filter" fill="#fff" width="16" height="16" />
        </BaseBtn>
      </header>
      <StatisticFilter 
        v-if="filterIsVisible"
        @filter-change="filterChange"
        @filter-reset="filterReset = false"
        :filterReset="filterReset"
      />
      <div class="statistic__spinner" v-if="loadMonth">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      
      <div class="statistic__inner">
        <StatisticList :days="filteredDays" />
      </div>
    </template>
    <p v-else>На текущий месяц нет покупок</p>
  </section>
</template>

<script>
  import StatisticList from "@/components/Statistic/StatisticList";
  import StatisticFilter from "@/components/Statistic/StatisticFilter";
  import { fixedNumber } from "@/filters/globalFilters";

  export default {
    name: "Statistic",
    components: {
      StatisticList,
      StatisticFilter
    },
    filters: {
      fixedNumber
    },
    props: {
      days: {
        type: Array,
        required: true
      },
      loadMonth: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        filterIsVisible: false,
        filter: {
          category: null,
          subcategory: null,
          place: null
        },
        filterReset: false
      }
    },
    computed: {
      total() {
        return this.filteredDays.reduce((monthSum, day) => {
          return +monthSum + day.products.reduce((daySum, product) => {
            return +daySum + +product.price
          }, 0);
        }, 0);
      },
      filteredDays() {
        let startDaysArr = this.days;

        for (let key in this.filter) {
          startDaysArr = this.filterGlobal(startDaysArr, key);
        }

        return startDaysArr;
      },
      resetBtnIsVisible() {
        for (let key in this.filter) {
          if (this.filter[key] != null) return true
        }

        return false;
      }
    },
    methods: {
      showFilter() {
        this.filterIsVisible = !this.filterIsVisible;
      },
      filterChange(obj) {
        this.filter = obj;
      },
      filterGlobal(arr, type) {
        if (this.filter[type]) {
          const filteredProduct = [];

          for (let i = 0; i < arr.length; i++) {
            let products = [];
            arr[i].products.forEach(product => product[type] == this.filter[type] ? products.push(product) : null);

            if (products.length) {
              let newDay = Object.assign({}, arr[i]);
              newDay.products = products;

              filteredProduct.push(newDay);
            }
          }

          return filteredProduct;
        } else {
          return arr;
        }
      },
      resetFilter() {
        this.filterReset = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .statistic__section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    margin: 0 -15px;
    padding: 5px 15px 0;
  }

  .statistic__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .statistic__total {
    font-weight: 700;
    font-size: 16px;
  }

  .statistic__filter-btn-reset {
    margin-left: auto;
    margin-right: 5px;
  }

  .statistic__inner {
    overflow: auto;
    flex-grow: 1;
  }

  .statistic__spinner {
    position: absolute;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.3);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>