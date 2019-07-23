<template>
  <tr>
    <td class="statistic__table-name">{{ product.title | capitalize }}</td>
    <td class="statistic__table-place">{{ placeName | capitalize }}</td>
    <template v-if="!mobile">
      <td class="statistic__table-category">{{ categoryName | capitalize }}</td>
      <td class="statistic__table-subcategory">{{ subcategoryName | capitalize }}</td>
    </template>
    <td class="statistic__table-price">{{ product.price }}</td>
  </tr>
</template>

<script>
  import { capitalize } from "@/filters/globalFilters";
  import { mapGetters } from "vuex";

  export default {
    name: `Statistic-list-product`,
    props: {
      product: {
        type: Object,
        required: true
      },
      mobile: {
        type: Boolean,
        default: true
      }
    },
    filters: {
      capitalize
    },
    computed: {
      ...mapGetters(`places`, [`places`]),
      ...mapGetters(`categories`, [`categories`]),
      placeName() {
        if (this.product.place && this.places) {
          const index = this.places.findIndex(place => place.id == this.product.place);

          if (index != -1) return this.places[index].title;
        }
        
        return "Не определено"
      },
      categoryName() {
        if (this.product.category && this.categories) {
          const index = this.categories.findIndex(category => category.id == this.product.category);

          if (index != -1) return this.categories[index].title;
        }
        
        return "Не определено"
      },
      subcategoryName() {
        if (this.product.category && this.product.subcategory && this.categories) {
          const category = this.categories.find(category => category.id == this.product.category);

          if (category) {
            const subcategory = category.subcategories[this.product.subcategory];

            if (subcategory) return subcategory.title;
          }
        }

        return ""
      }
    }
  }
</script>