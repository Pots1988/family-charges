<template>
  <tr>
    <td colspan="5" style="padding:0;">
      <div class="statistic__table-wrap">
        <div class="statistic__table-subheader bg-info text-white">
          <span>{{ date.date | formatDate }}</span>
          <span>{{ total | fixedNumber }} грн.</span>
        </div>
        <table class="table table-bordered table-sm statistic__table table-striped">
          <tbody>
            <StatisticListProduct v-for="product in date.products" :product="product" :mobile="mobile" :key="product.id" />
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</template>

<script>
  import { fixedNumber, formatDate } from "@/filters/globalFilters";
  import StatisticListProduct from "@/components/Statistic/StatisticListProduct";

  export default {
    name: `Statistic-list-item`,
    filters: {
      fixedNumber,
      formatDate
    },
    components: {
      StatisticListProduct
    },
    props: {
      date: {
        type: Object,
        required: true
      },
      mobile: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      total() {
        return this.date.products.reduce((sum, current) => {
          return +sum + +current.price
        }, 0);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .statistic__table-subheader {
    padding: 0.5rem 1rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
    position: relative;
    z-index: 10;
  }
</style>
