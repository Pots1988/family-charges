<template>
  <section class="statistic__filter">
    <div class="form-row mb-2">
      <template v-if="categoryIs">
        <div
          class="form-group mb-0"
          :class="subCategoryIs ? 'col-4' : 'col-6'"
        >
          <label for="category">Категория</label>
          <select class="form-control form-control-sm" id="category" v-model.trim="categoryFilter" @change="filterChanged">
            <option :value="null">{{ defaultOptionName | capitalize }}</option>
            <option 
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              >{{ category.title | capitalize }}</option>
          </select>
        </div>
        
        <div
          v-if="subCategoryIs"
          class="form-group col-4 mb-0">
          <label for="subcategory">Подкатегория</label>
          <select class="form-control form-control-sm" id="subcategory" v-model.trim="subcategoryFilter" @change="filterChanged">
            <option :value="null">{{ defaultOptionName | capitalize }}</option>
            <option v-for="subcat in subCategories" :key="subcat.id" :value="subcat.id">{{ subcat.title | capitalize }}</option>
          </select>
        </div>
      </template>

      <div
        v-if="places"
        class="form-group mb-0"
        :class="subCategoryIs ? 'col-4' : 'col-6'"
      >
        <label for="place">Место</label>
        <select class="form-control form-control-sm" id="place" v-model.trim="placeFilter" @change="filterChanged">
          <option :value="null">{{ defaultOptionName | capitalize }}</option>
          <option v-for="place in places" :key="place.id" :value="place.id">{{ place.title | capitalize }}</option>
        </select>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import { capitalize } from "@/filters/globalFilters";

  export default {
    name: `Statistic-filter`,
    filter: {
      capitalize
    },
    props: {
      filterReset: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        categoryFilter: null,
        subcategoryFilter: null,
        placeFilter: null,
        defaultOptionName: `Не выбрано`
      }
    },
    beforeDestroy() {
      this.clearLocalSubcategories();
    },
    computed: {
      ...mapGetters(`places`, [`places`]),
      ...mapGetters(`categories`, [`categories`, `subCategories`]),
      categoryIs() {
        return this.categories && this.categories.length
      },
      subCategoryIs() {
        return this.subCategories && this.subCategories.length
      }
    },
    methods: {
      ...mapMutations(`categories`, [`setSubcategories`, `clearLocalSubcategories`]),
      filterChanged() {
        this.$emit(`filter-change`, {
          category: this.categoryFilter,
          subcategory: this.subcategoryFilter,
          place: this.placeFilter,
        })
      }
    },
    watch: {
      categoryFilter(val) {
        if (!val) {
          this.subcategoryFilter = null;
          this.clearLocalSubcategories();
          return false;
        }
        
        let cat = this.categories.find(category => category.id == val);
        this.setSubcategories(cat);
      },
      filterReset(val) {
        if (val) {
          this.categoryFilter = null;
          this.subcategoryFilter = null;
          this.placeFilter = null;

          this.$emit(`filter-reset`, true);
          this.filterChanged();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>