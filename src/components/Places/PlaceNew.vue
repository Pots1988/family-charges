<template>
  <ItemsNew 
    v-if="places"
    placeholder="Новое место покупки"
    :title="title"
    :load="load"
    :items="places"
    @add-item="addItem"
    @change-title="title = $event"
  >
    <template v-slot:label>Новое место</template>
  </ItemsNew>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import ItemsNew from "@/components/Items/ItemsNew";

  export default {
    name: "PlacesNew",
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
      ...mapGetters(`places`, [`places`])
    },
    methods: {
      ...mapActions(`places`, [`addPlace`]),
      ...mapMutations([`addMessage`]),
      addItem() {
        this.load = true;
        this.addPlace(this.title.toLowerCase())
          .then(() => {
            this.title = ``;
            this.load = false;
          })
          .catch((err) => {
            console.warn(err);
            this.load = false;

            this.addMessage({
              text: `Ошибка добавления места`,
              type: `danger`,
              id: Date.now()
            });
          });
      }
    }
  }
</script>