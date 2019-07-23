<template>
  <div>
    <ItemsList 
      v-if="places && places.length"
      :items="places"
      @item-edit="itemUpdateEvent"
      @item-delete="itemDelete"
    />
    <p class="mt-4 text-center" v-else>У вас не добавлено ни одного места для покупок</p>

    <BasePopup v-if="popup" @popup-close="popupClose">
      <form action="/" name="place" method="POST" @submit.prevent="itemUpdate">
        <div class="form-group">
          <label for="titleNew">Изменить место</label>
          <input type="text" class="form-control mb-3" id="titleNew"
            v-model.trim="formatTitle"
            :class="validPlace"
          >
          <BaseBtn class="btn-success btn-block" @click="itemUpdate" :load="load">Обновить</BaseBtn>
          <div class="invalid-feedback" v-if="errorEmpty">
            Необходимо ввести название!
          </div>
          <div class="invalid-feedback" v-if="errorEqual">
            Такое место уже есть!
          </div>
        </div>
      </form>
    </BasePopup>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import ItemsList from "@/components/Items/ItemsList";

  export default {
    name: "PlacesList",
    components: {
      ItemsList
    },
    data() {
      return {
        id: ``,
        title: ``,
        invalid: false,
        load: false,
        errorEmpty: false,
        errorEqual: false,
        popup: false
      }
    },
    computed: {
      ...mapGetters(`places`, [`places`]),
      validPlace() {
        return {
          "is-invalid": this.invalid
        }
      },
      formatTitle: {
        get() {
          return this.title ? this.title[0].toUpperCase() + this.title.slice(1).toLowerCase() : ``;
        },
        set(title) {
          this.title = title;
        }
      }
    },
    methods: {
      ...mapActions(`places`, [`deletePlace`, `updatePlace`]),
      ...mapMutations(["addMessage"]),
      itemDelete(item) {
        this.deletePlace(item.id)
          .then(() => {})
          .catch(err => {
            console.warn(err);
            this.messages.push({
              text: `Ошибка удаления места`,
              type: `danger`,
              id: Date.now()
            });
          })
      },
      itemUpdateEvent(item) {
        this.title = item.title;
        this.id = item.id;
        this.popup = true;
      },
      itemUpdate() {
        this.errorEmpty = false;
        this.errorEqual = false;
        this.invalid = false;

        if (!this.checkPlace()) return false;

        this.load = true;
        this.updatePlace({
            title: this.title.toLowerCase(),
            id: this.id
          })
          .then(() => {
            this.popup = false;
            this.id = ``;
            this.title = ``;
            this.load = false;
          })
          .catch((err) => {
            console.warn(err);
            this.load = false;
            this.addMessage({
              text: `Ошибка обновления места`,
              type: `danger`,
              id: Date.now()
            });
          });
      },
      checkPlace() {
        if (!this.title) {
          this.errorEmpty = true;
          this.invalid = true;

          return false;
        }
        
        if (!this.checkAvailabilityPlace()) {
          this.errorEqual = true;
          this.invalid = true;

          return false;
        }

        return true;
      },
      checkAvailabilityPlace() {
        return this.places.findIndex(place => place.title == this.title.toLowerCase()) == -1
      },
      popupClose() {
        this.id = ``;
        this.title = ``;
        this.popup = false;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>