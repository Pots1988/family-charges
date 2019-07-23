<template>
  <div class="product-list mb-3">
    <template v-if="products.length">
      <div class="card mb-2" v-for="place in placesProducts" :key="place.place">
        <div class="card-header p-1 text-center">
          {{ getPlaceName(place.place) | capitalize }} - <small class="text-muted font-weight-bold">{{ place.total | fixedNumber }} грн</small>
        </div>
        <div class="card-body p-0">
          <div class="product-list__table-wrap">
            <table class="product-list__table table table-bordered table-sm mb-0">
              <tbody>
                <tr v-for="product in place.list" :key="product.id">
                  <td class="product-list__name">{{ product.title }}</td>
                  <td class="product-list__price">{{ product.price }}</td>
                  <td class="product-list__action">
                    <button type="button" class="btn btn-info btn-edit" @click="editProduct(product)">
                      <BaseIcon link="edit" width="20" height="20" />
                    </button>
                    <button type="button" class="btn btn-danger btn-edit" @click="productDeleteId = product.id; popupDelete = true;">
                      <BaseIcon link="remove" width="20" height="20" />
                    </button>
                    <button type="button" class="btn btn-primary btn-edit">
                      <BaseIcon link="more" width="20" height="20" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p class="product-list__spent m-0">Всего потрачено: {{ totalSpent | fixedNumber }} грн</p>

      <BasePopup v-if="popupItem" @popup-close="popupItemClose">
        <Product 
          @product-create="productChange"
          :obj="editableProduct"
          :visible="true"
          :newProduct="false"
          :fullWidth="true"
        >Изменить продукт</Product> 
      </BasePopup>

      <BasePopup v-if="popupDelete" @popup-close="popupDelete = !popupDelete">
        <h2 class="text-center h3 mb-4">Вы хотите удалить товар?</h2>
        <BaseBtn class="btn-block btn-danger" @click="removeProduct(productDeleteId)">Удалить товар</BaseBtn>
      </BasePopup>
    </template>
    <p class="m-0" v-else>Вы ничего не потратили</p>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import Product from "@/components/Products/Product";
  import { capitalize, fixedNumber } from "@/filters/globalFilters";

  export default {
    name: "productsList",
    filters: {
      capitalize,
      fixedNumber
    },
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    components: {
      Product
    },
    data() {
      return {
        popupItem: false,
        popupDelete: false,
        productDeleteId: null,
        editableProduct: null
      }
    },
    computed: {
      ...mapGetters(`places`, [`places`]),
      placesProducts() {
        const sortedObj = {};

        this.products.forEach(product => {
          if (product.place.length) {
            if (sortedObj[product.place]) {
              sortedObj[product.place].list.push(product);
              sortedObj[product.place].total += product.price;
            } else {
              const objLink = {};

              sortedObj[product.place] = objLink;
              objLink.place = product.place;
              objLink.list = [product];
              objLink.total = product.price;
            }
          } else {
            if (sortedObj[`не известно`]) {
              sortedObj[`не известно`].list.push(product);
              sortedObj[`не известно`].total += product.price;
            } else {
              const objLink = {};

              sortedObj[`не известно`] = objLink;
              objLink.place = `не известно`;
              objLink.list = [product];
              objLink.total = product.price;
            }
          }
        });

        return sortedObj;
      },
      totalSpent() {
        return this.products.reduce((prevVal, curItem) => {
          return prevVal + curItem.price
        }, 0)
      }
    },
    methods: {
      editProduct(product) {
        this.editableProduct = {...product};
        this.popupItem = true;
      },
      productChange(editableProduct) {
        this.$emit(`product-change`, editableProduct);
        this.popupItem = false;
        this.editableProduct = null;
      },
      removeProduct(id) {
        this.popupDelete = false;
        this.productDeleteId = null;
        this.$emit(`product-remove`, id);
      },
      popupItemClose() {
        this.popupItem = false;
      },
      getPlaceName(id) {
        let place = this.places.find(item => item.id == id);

        if (place) return place.title;
        
        return `Не найдено место`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-list__table-wrap {
    margin: -1px;
  }

  .product-list__table {
    td {
      vertical-align: middle;
    }
  }

  .product-list__spent {
    font-weight: 700;
  }
  
  .product-list__name {
    width: 100%;
  }

  .product-list__action {
    white-space: nowrap;

    .btn {
      margin: 0 2px;
    }
  }
</style>