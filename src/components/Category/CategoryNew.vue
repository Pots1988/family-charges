<template>
  <div>
    <ItemsNew
      v-if="categories" 
      placeholder="Новая категория"
      :title="title"
      :load="load"
      :items="categories"
      @add-item="addItem"
      @change-title="title = $event"
    >
      <template v-slot:label>Новая категория</template>
    </ItemsNew>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import ItemsNew from "@/components/Items/ItemsNew";

  export default {
    name: "CategoryNew",
    components: {
      ItemsNew
    },
    data() {
      return {
        load: false,
        title: ``
      }
    },
    computed: {
      ...mapGetters(`categories`, [`categories`])
    },
    methods: {
      ...mapActions(`categories`, [`addCategory`]),
      ...mapMutations([`addMessage`]),
      addItem() {
        this.load = true;
        this.addCategory(this.title.toLowerCase())
          .then(() => {
            this.title = ``;
            this.load = false;
          })
          .catch((err) => {
            console.warn(err);
            this.load = false;

            this.addMessage({
              text: `Ошибка добавления категории`,
              type: `danger`,
              id: Date.now()
            });
          });
      }
    }
  }
</script>