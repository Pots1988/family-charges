<template>
  <div>
    <ItemsList 
      v-if="subCategories && subCategories.length"
      :items="subCategories"
      @item-edit="itemUpdateEvent"
      @item-delete="itemDelete"
    />
    <p class="mt-4 text-center" v-else>У вас нет подкатегории</p>

    <BasePopup v-if="popup" @popup-close="popupClose">
      <form action="/" name="place" method="POST" @submit.prevent="itemUpdate">
        <div class="form-group">
          <label for="titleNew">Изменить подкатегорию</label>
          <input type="text" class="form-control mb-3" id="titleNew"
            v-model.trim="formatTitle"
            :class="validPlace"
          >
          <BaseBtn class="btn-success btn-block" @click="itemUpdate" :load="load">Обновить</BaseBtn>
          <div class="invalid-feedback" v-if="errorEmpty">
            Необходимо ввести название!
          </div>
          <div class="invalid-feedback" v-if="errorEqual">
            Такая подкатегория уже есть!
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
    props: {
      idCategory: {
        type: String,
        required: true
      }
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
      ...mapGetters(`categories`, [`subCategories`]),
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
      ...mapActions(`categories`, [`deleteSubCategory`, `addSubCategory`]),
      ...mapMutations([`addMessage`]),
      itemDelete(item) {
        this.deleteSubCategory({
          id: this.idCategory,
          subcatId: item.id
        })
        .catch(err => {
          console.warn(err);
          this.messages.push({
            text: `Ошибка удаления подкатегории`,
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

        if (!this.checkItem()) return false;

        this.load = true;
        this.addSubCategory({
            title: this.title.toLowerCase(),
            id: this.idCategory,
            subcatId: this.id,
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
              text: `Ошибка обновления подкатегории`,
              type: `danger`,
              id: Date.now()
            });
          });
      },
      checkItem() {
        if (!this.title) {
          this.errorEmpty = true;
          this.invalid = true;

          return false;
        }
        
        if (!this.checkAvailabilityItem()) {
          this.errorEqual = true;
          this.invalid = true;

          return false;
        }

        return true;
      },
      checkAvailabilityItem() {
        return this.subCategories.findIndex(item => item.title == this.title.toLowerCase()) == -1
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