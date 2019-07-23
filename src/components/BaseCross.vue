<template>
  <button type="button" class="cross" @click="$emit('click')">
    <span class="visually-hidden"><slot></slot></span>
    <BaseIcon :width="width" :height="height" :fill="fill" link="cross" />
  </button>
</template>

<script>
  export default {
    props: {
      width: {
        type: [Number, String],
        default: 16
      },
      height: {
        type: [Number, String],
        default: 16
      },
      fill: {
        type: String,
        default: `#333333`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/scss/variables.scss";

  .cross {
    border: 0;
    padding: 0;
    background: none;
    display: block;

    svg {
      display: block;
      transition: 0.3s;
    }

    &:hover,
    &:focus {
      svg {
        fill: $col;
      }
    }

    &:active {
      svg {
        opacity: 0.5;
        fill: $col;
      }
    }
  }
</style>