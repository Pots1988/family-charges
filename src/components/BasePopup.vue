<template>
  <section class="popup" @click="popupClose">
    <div class="popup__inner">
      <div class="popup__wrap">
        <BaseCross
          class="popup__close"
          @click="$emit('popup-close')"
        >
          Закрыть окно
        </BaseCross>
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        escFunc: (e) => {
          if (e.keyCode === 27) this.$emit(`popup-close`);
        }
      }
    },
    methods: {
      popupClose(e) {
        if (!e.target.closest(`.popup__wrap`)) {
          this.$emit(`popup-close`);
        }
      }
    },
    mounted() {
      document.addEventListener(`keyup`, this.escFunc);
    },
    beforeDestroy() {
      document.removeEventListener(`keyup`, this.escFunc);
    }
  }
</script>

<style lang="scss" scoped>
  .popup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100000;
    display: block;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .popup__inner {
    height: 100%;
    overflow: auto;
    padding: 1rem;
    display: flex;
  }

  .popup__wrap {
    max-width: 500px;
    width: 100%;
    margin: auto;
    position: relative;
    border: 1px solid #ababab;
    background: #fff;
    padding: 30px;
  }

  .popup__close {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .popup__img {
    margin: 30px;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
</style>
