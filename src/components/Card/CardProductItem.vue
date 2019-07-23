<template>
  <tr>
    <td class="card-product-name">{{ product.title | capitalize }}</td>
    <td class="card-product-place">{{ placeName | capitalize }}</td>
    <td class="card-product-price">{{ product.price }}</td>
  </tr>
</template>

<script>
  import { mapGetters } from "vuex";
  import { capitalize } from "@/filters/globalFilters";

  export default {
    name: `CardProductItem`,
    filters: {
      capitalize
    },
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters(`places`, [`places`]),
      placeName() {
        if (this.product.place) {
          const index = this.places.findIndex(place => place.id == this.product.place);

          if (index != -1) return this.places[index].title;
        }
        
        return "Не определено"
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>