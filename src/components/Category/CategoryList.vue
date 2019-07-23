<template>
  <div>
    <ItemsList 
      v-if="categories && categories.length"
      :items="categories"
      @item-edit="itemUpdateEvent"
      @item-delete="itemDelete"
    />
    <p class="mt-4 text-center" v-else>У вас не добавлено ни одной категории</p>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import ItemsList from "@/components/Items/ItemsList";

  export default {
    name: "CategoriesList",
    components: {
      ItemsList
    },
    computed: {
      ...mapGetters(`categories`, [`categories`])
    },
    methods: {
      ...mapActions(`categories`, [`deleteCategory`]),
      ...mapMutations(["addMessage"]),
      itemDelete(item) {
        this.deleteCategory(item.id)
          .then(() => {})
          .catch(err => {
            console.warn(err);
            this.messages.push({
              text: `Ошибка удаления категории`,
              type: `danger`,
              id: Date.now()
            });
          })
      },
      itemUpdateEvent(item) {
        this.$router.push({
          name: `categoryEdit`,
          params: {
            id: item.id
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>