<template>
  <form action="/" name="product" method="POST" @submit.prevent="addProduct">
    <div class="form-row">
      <div class="form-group mb-2" :class="fullWidth ? 'col-12' : 'col-5'">
        <input 
          v-model.trim="modifiedObj.title"
          :class="validTitle"
          type="text"
          class="form-control"
          @click="$event.target.select()"
          id="title" placeholder="Название">
        <div 
          class="invalid-feedback"
          v-if="titleError"
        >
          Необходимо ввести название!
        </div>
      </div>
      <div class="form-group mb-2" :class="fullWidth ? 'col-12' : 'col-5'">
        <input 
          v-model.trim.number="modifiedObj.price"
          @click="$event.target.select()"
          type="number"
          class="form-control"
          id="price"
          placeholder="Цена"
        >
      </div>
      <div class="form-group col-2 mb-2" v-if="newProduct">
        <button 
          type="button"
          class="btn btn-primary btn-block dropdown-toggle"
          @click="additionalPopup = !additionalPopup"
          >
          <!-- <span class="visually-hidden">Дополнительные опции</span> -->
        </button>
      </div>
      <template v-if="additionalPopup">
        <template v-if="categoryIs">
          <div
            :class="fullWidth ? 'col-12' : 'col-6'" 
            class="form-group mb-2">
            <label for="category">Категория</label>
            <select class="form-control" id="category" v-model.trim="modifiedObj.category">
              <option 
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.title | capitalize }}</option>
            </select>
          </div>
          
          <div
            v-if="subCategoryIs"
            :class="fullWidth ? 'col-12' : 'col-6'"
            class="form-group mb-2">
            <label for="subcategory">Подкатегория</label>
            <select class="form-control" id="subcategory" v-model.trim="modifiedObj.subcategory">
              <option v-for="subcat in subCategories" :key="subcat.id" :value="subcat.id">{{ subcat.title | capitalize }}</option>
            </select>
          </div>
        </template>

        <div
          v-if="places"
          :class="subCategoryIs ? 'col-12' : 'col-6'"
          class="form-group mb-2">
          <label for="place">Место</label>
          <select class="form-control" id="place" v-model.trim="modifiedObj.place">
            <option v-for="place in places" :key="place.id" :value="place.id">{{ place.title | capitalize }}</option>
          </select>
        </div>
      </template>
      
      <div class="col-12">
        <BaseBtn 
          class="btn-success btn-block"
          @click="addProduct"
          :load="load"
        >
          <slot>Не назначено название</slot>
        </BaseBtn>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import { capitalize } from "@/filters/globalFilters";

  export default {
    name: "product",
    filters: {
      capitalize
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      obj: {
        type: Object,
        default() {
          return {
            title: ``,
            price: 0,
            category: null,
            subcategory: null,
            place: null
          }
        }
      },
      newProduct: {
        type: Boolean,
        default: true
      },
      fullWidth: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.additionalPopup = this.visible;

      if (this.categories && this.places && !this.obj.title) {
        this.modifiedObj = {
          title: ``,
          price: 0,
          category: this.categories[0].id,
          subcategory: null,
          place: this.places[0].id
        }
      } else {
        this.modifiedObj = this.obj;
      }
    },
    beforeDestroy() {
      this.clearLocalSubcategories();
    },
    data() {
      return {
        additionalPopup: false,
        modifiedObj: null,
        load: false,
        titleError: false
      }
    },
    computed: {
      ...mapGetters(`categories`, [`categories`, `subCategories`]),
      ...mapGetters(`places`, [`places`]),
      validTitle() {
        return {
          "is-invalid": this.titleError
        }
      },
      categoryIs() {
        return this.categories && this.categories.length
      },
      subCategoryIs() {
        return this.subCategories && this.subCategories.length
      }
    },
    methods: {
      ...mapMutations(`categories`, [`setSubcategories`, `clearLocalSubcategories`]),
      addProduct() {
        this.titleError = false;

        if (!this.modifiedObj.title) {
          this.titleError = true;
          return false;
        }

        this.$emit(`product-create`, {...this.modifiedObj});

        if (this.new) {
          this.modifiedObj.title = ``;
          this.modifiedObj.price = 0;
        }
      }
    },
    watch: {
      "modifiedObj.category"(val) {
        if (!val) return false;
        let cat = this.categories.find(category => category.id == val);

        this.setSubcategories(cat);

        if (this.subCategoryIs) {
          if (!this.modifiedObj.subcategory || cat.subcategories && !Object.keys(cat.subcategories).some(item => item == this.modifiedObj.subcategory)) {
            this.modifiedObj.subcategory = this.subCategories[0].id
          }
        } else {
          this.modifiedObj.subcategory = null;
        }
      },
      categories: {
        handler(val) {
          if (!val) return false;
          if (this.modifiedObj && !this.modifiedObj.category && val.length) this.modifiedObj.category = val[0].id;

          if (this.modifiedObj && this.modifiedObj.category) {
            let cat = val.find(category => category.id == this.modifiedObj.category);
            this.setSubcategories(cat);

            if (!this.modifiedObj.subcategory) this.modifiedObj.subcategory = this.subCategories[0].id;
          }
        },
        immediate: true
      },
      places: {
        handler(val) {
          if (!val) return false;
          if (this.modifiedObj && !this.modifiedObj.place && val.length) this.modifiedObj.place = val[0].id;
        },
        immediate: true
      }
    }
  }
</script>