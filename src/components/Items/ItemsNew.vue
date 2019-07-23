<template>
  <form action="/" name="place" method="POST" @submit.prevent="addItem">
    <div class="form-group">
      <label for="item">
        <slot name="label">Название</slot>
      </label>
      <div class="input-group mb-3">
        <input 
          type="text"
          class="form-control"
          id="item"
          v-bind="$attrs"
          :class="{'is-invalid': invalid}"
          v-model.trim="compTitle"
        >
        <div class="input-group-append">
          <BaseBtn 
            class="btn-success"
            @click="addItem"
            :load="load"
          >
            <slot name="button">Добавить</slot>
          </BaseBtn>
        </div>
        <div 
          class="invalid-feedback"
          v-if="errorEmpty"
        >
          Введите название!
        </div>
        <div
          class="invalid-feedback"
          v-if="errorEqual"
        >
          Такое значение уже есть!
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: "ItemsNew",
    props: {
      title: {
        type: String,
        required: true
      },
      load: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        errorEmpty: false,
        errorEqual: false,
        invalid: false
      }
    },
    computed: {
      compTitle: {
        get() {
          return this.title
        },
        set(e) {
          this.$emit(`change-title`, e)
        }
      },
      validTitle() {
        return this.title.toLowerCase()
      }
    },
    methods: {
      addItem(e) {
        this.errorEmpty = false;
        this.errorEqual = false;
        this.invalid = false;

        if (!this.checkItem()) return false;

        this.$emit(`add-item`);
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
        return this.items.findIndex(item => item.title == this.validTitle) == -1;
      }
    }
  }
</script>