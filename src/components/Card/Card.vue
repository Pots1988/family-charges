<template>
  <div class="card">
    <div class="card-header text-center card-header-flex">
      <span class="card-date">{{ day.date | formatDate }}</span>
      <strong class="card-price">{{ total | fixedNumber }} грн</strong>
      <div class="card-btns">
        <router-link :to="{name: 'dayEdit', params: {id: day.date}}" class="btn btn-info btn-edit card-btn">
          <BaseIcon link="edit" width="20" height="20" />
        </router-link>
        <button type="button" class="btn btn-danger btn-edit card-btn" @click="popup = true">
          <BaseIcon link="remove" width="20" height="20" />
        </button>
      </div>
    </div>

    <div class="card-body">
      <div class="card-table-wrap">
        <table class="table table-bordered table-sm card-table">
          <thead>
            <tr class="text-center">
              <th>Название</th>
              <th>Место</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            <CardProductItem v-for="product in products" :key="product.id" :product="product" />
          </tbody>
        </table>
      </div>
    </div>
    <BasePopup v-if="popup" @popup-close="popup = !popup">
      <h2 class="text-center h3 mb-4">Вы хотите удалить день?</h2>
      <BaseBtn class="btn-block btn-danger" @click="itemDelete">Удалить день</BaseBtn>
    </BasePopup>
  </div>
</template>

<script>
  import CardProductItem from "./CardProductItem";
  import { mapActions, mapMutations } from "vuex";
  import { fixedNumber, formatDate } from "@/filters/globalFilters";

  export default {
    name: `Card`,
    components: {
      CardProductItem
    },
    filters: {
      fixedNumber,
      formatDate
    },
    props: {
      day: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        popup: false
      }
    },
    computed: {
      total() {
        return this.day.products.reduce((sum, current) => {
          return +sum + +current.price
        }, 0);
      },
      products() {
        return this.day.products
      }
    },
    methods: {
      ...mapActions(`days`, [
        `removeDate`
      ]),
      ...mapMutations([`addMessage`]),
      itemDelete() {
        this.popup = false;
        this.removeDate(this.day)
          .catch(err => {
            console.warn(err);
            this.addMessage({
              text: `Ошибка удаления дня ${this.day.date}`,
              type: `error`,
              id: Date.now()
            });
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-header,
  .card-footer {
    padding: 0.5rem;
  }

  .card-body {
    padding: 0 !important;
  }

  .card-header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-price {
    font-weight: 700;
    font-size: 1.2em;
  }

  .card-date {
    
  }

  .card-btns {
    margin: 0 -0.25em;

    .btn {
      margin: 0 0.25em;
    }
  }

  .card-table-wrap {
    margin: -1px;
  }

  .card-table {
    margin: 0;
    // text-align: center;
  }

  .card-product-name {
    text-align: left;
  }
</style>