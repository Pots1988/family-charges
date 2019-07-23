<template>
  <table class="table table-bordered table-sm statistic__table">
    <thead class="statistic__table-head">
      <tr>
        <td class="statistic__table-name">Название</td>
        <td class="statistic__table-place">Место</td>
        <template v-if="!mobile">
          <td class="statistic__table-category">Категория</td>
          <td class="statistic__table-subcategory">Подкатегория</td>
        </template>
        <td class="statistic__table-price">Цена</td>
      </tr>
    </thead>
    <tbody>
      <StatisticListItem v-for="date in days" :date="date" :mobile="mobile" :key="date.date" />
    </tbody>
  </table>
</template>

<script>
  import StatisticListItem from "@/components/Statistic/StatisticListItem"  

  export default {
    name: `Statistic-list`,
    components: {
      StatisticListItem
    },
    data() {
      return {
        mobile: true
      }
    },
    created() {
      const vm = this;
      window.addEventListener(`resize`, vm.getWindowWidth);
      this.getWindowWidth();
    },
    beforeDestroy() {
      const vm = this;
      window.removeEventListener(`resize`, vm.getWindowWidth);
    },
    props: {
      days: {
        type: Array,
        required: true
      }
    },
    methods: {
      getWindowWidth() {
        this.mobile = window.innerWidth < 768 ? true : false;
      }
    }
  }
</script>

<style lang="scss">
  .statistic__table {
    table-layout: fixed;
    margin: 0;
    font-size: 12px;
  }

  .statistic__table-head {
    font-weight: 700;
    text-align: center;
  }

  .statistic__table-wrap {
    margin: -1px;
  }
  
  .statistic__table-name {
    width: 100px;
  }

  .statistic__table-place {
    width: 100%;
  }

  .statistic__table-price {
    width: 70px;
  }

  @media (min-width: 768px) {
    .statistic__table-name {
      width: 100px;
    }

    .statistic__table-category {
      width: 120px;
    }

    .statistic__table-subcategory {
      width: 180px;
    }
  }
</style>