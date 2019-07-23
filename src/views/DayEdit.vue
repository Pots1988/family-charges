<template>
  <section class="sect new-day">
    <div class="container new-day__inner" v-if="date">
      <div class="new-day__header mb-2">
        <h1 class="h4 m-0">Редактир. дня</h1>
        <DatePicker 
          class="new-day__datepicker"
          @date-change="dateChange"
          :date="formatedDate"
        />
      </div>
      <Product class="mb-3" @product-create="productAdd">Добавить продукт</Product>
      
      <ProductsList 
        class="new-day__list"
        :products="products"
        @product-change="productChange"
        @product-remove="productRemove"
      />
    </div>
  </section>
</template>

<script>
  import DatePicker from "@/components/DatePicker"
  import Product from "@/components/Products/Product"
  import ProductsList from "@/components/Products/ProductList"
  import { mapGetters, mapActions, mapMutations } from "vuex";

  let editDateListener;

  export default {
    name: "dayEdit",
    components: {
      DatePicker,
      Product,
      ProductsList
    },
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    created() {
      editDateListener = this.editDateDoc.doc(`${this.id}`).onSnapshot(doc => {
        this.setDate(doc);
      });
    },
    beforeDestroy() {
      editDateListener();
    },
    beforeRouteUpdate(to, from, next) {
      editDateListener();
      editDateListener = this.editDateDoc.doc(`${to.params.id}`).onSnapshot(doc => {
        this.setDate(doc);
        next();
      });
    },
    computed: {
      ...mapGetters(`dayEdit`, [`editDateDoc`, `date`]),
      formatedDate() {
        return this.date ? new Date(+this.date.date) : null;
      },
      products() {
        return this.date ? this.date.products : [];
      }
    },
    methods: {
      ...mapMutations(`dayEdit`, [
        `setDate`,
        `removeDate`
      ]),
      ...mapMutations(["addMessage"]),
      ...mapActions(`dayEdit`, [
        `editProduct`,
        `removeProduct`,
        `addProduct`,
        `editDate`
      ]),
      ...mapActions(`days`, [
        `removeDate`
      ]),
      dateChange(date) {
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        this.editDate(newDate)
          .then(data => {
            this.removeDate(this.date)
              .then(() => {
                this.$router.push({name: `dayEdit`, params: { id: +newDate }})
              })
              .catch((err) => {
                console.warn(err);
                this.loadData = false;
                this.addMessage({
                  text: `Ошибка удаления дня`,
                  type: `danger`,
                  id: Date.now()
                });
              });
          })
          .catch((err) => {
            console.warn(err);

            this.addMessage({
              text: err,
              type: `danger`,
              id: Date.now()
            });
          });
      },
      productAdd(e) {
        e.id = +new Date();

        this.addProduct(e)
          .catch((err) => {
            console.warn(err);
            this.addMessage({
              text: `Ошибка добавления товара`,
              type: `danger`,
              id: Date.now()
            });
          });
      },
      productChange(e) {
        this.editProduct(e)
          .catch((err) => {
            console.warn(err);
            this.addMessage({
              text: `Ошибка изменения товара`,
              type: `danger`,
              id: Date.now()
            });
          });
      },
      productRemove(e) {
        this.removeProduct(e)
          .catch((err) => {
            console.warn(err);
            this.addMessage({
              text: `Ошибка удаления товара`,
              type: `danger`,
              id: Date.now()
            });
          });
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