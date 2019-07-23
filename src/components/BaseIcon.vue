<template>
  <svg :width="width" :height="height" :fill="fill" class="icon">
    <use :xlink:href="'#icon-' + link" />
  </svg>
</template>

<script>
  export default {
    props: {
      width: {
        type: [Number, String],
        default: 30
      },
      height: {
        type: [Number, String],
        default: 30
      },
      fill: {
        type: String,
        default: "#333333"
      },
      link: {
        required: true,
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>