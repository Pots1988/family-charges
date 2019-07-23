<template>
  <section class="sect new-day" :style="availablePageHeight">
    <div class="container new-day__inner">
      <div class="new-day__header mb-2">
        <h1 class="h4 m-0">Новый день</h1>
        <DatePicker 
          class="new-day__datepicker"
          @date-change="dateChange"
          :date="date"
        />
      </div>
      <Product class="mb-3" @product-create="productCreate">Добавить продукт</Product> 
      <ProductsList 
        class="new-day__list"
        :products="products"
        @product-change="productChange"
        @product-remove="productRemove"
      />
      <BaseBtn
        v-if="products.length" 
        class="btn-success btn-block"
        @click="addDay"
        :load="loadAddDay"
      >
        <slot>Сохранить</slot>
      </BaseBtn>
    </div>
  </section>
</template>

<script>
  import DatePicker from "@/components/DatePicker"
  import Product from "@/components/Products/Product"
  import ProductsList from "@/components/Products/ProductList"
  import { mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: "newDay",
    components: {
      DatePicker,
      Product,
      ProductsList
    },
    data() {
      return {
        date: null,
        loadAddDay: false,
        screenHeight: 0
      }
    },
    created() {
      this.date = this.localDate ? this.localDate.date : new Date();
      const vm = this;
      window.addEventListener(`resize`, this.getScreenHeight.bind(vm));
      this.getScreenHeight();
    },
    computed: {
      ...mapGetters(`newDay`, {
        localDate: `date`
      }),
      products() {
        return this.localDate ? this.localDate.products : [];
      },
      dateWithoutSeconds() {
        return new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()) 
      },
      availablePageHeight() {
        const headerHeight = document.querySelector(`.header`).offsetHeight,
              menuHeight = document.querySelector(`.menu`).offsetHeight;

        return {
          height: `${this.screenHeight - headerHeight - menuHeight}px`
        }
      }
    },
    methods: {
      ...mapMutations(`newDay`, [
        `setDate`,
        `removeDate`,
        `addProduct`,
        `removeProduct`,
        `editProduct`,
        `changeDate`
      ]),
      ...mapMutations([`addMessage`]),
      ...mapActions(`newDay`, [
        `addDateToFirebase`
      ]),
      productCreate(e) {
        const newProduct = e;
        newProduct.id = Date.now();

        if (this.localDate) {
          this.addProduct(newProduct);
        } else {
          this.setDate({
            date: this.dateWithoutSeconds,
            products: [newProduct]
          });
        }
      },
      productChange(editableProduct) {
        this.editProduct(editableProduct);
      },
      productRemove(id) {
        this.removeProduct(id);
      },
      dateChange(date) {
        this.date = date;
        if (this.localDate) this.changeDate(date);
      },
      addDay() {
        this.loadAddDay = true;
        this.addDateToFirebase(this.localDate)
          .then(() => {
            this.removeDate();
            this.loadAddDay = false;
            this.addMessage({
              text: `День сохранен`,
              type: `success`,
              id: Date.now()
            });
          })
          .catch(err => {
            this.loadAddDay = false;
            this.addMessage({
              text: err,
              type: `danger`,
              id: Date.now()
            });
          })
      },
      getScreenHeight() {
        this.screenHeight = window.innerHeight;
      }
    }
  }
</script>

<style type="scss" scoped>
  .new-day {
    display: flex;
    height: calc(100vh - 92px);
  }

  .new-day__inner {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .new-day__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .new-day__datepicker {
    width: 120px;
    margin-left: 10px;
  }

  .new-day__list {
    flex-grow: 1;
    overflow: auto;
  }
</style>