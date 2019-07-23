<template>
  <div class="spinner-border text-primary" role="status" :style="[compSize, {borderWidth: borderWidth}]">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
  export default {
    name: `base-loader`,
    props: {
      size: {
        type: Number
      },
      borderWidth: {
        type: String,
        default: `0.15em`
      }
    },
    computed: {
      compSize() {
        if (!this.size) return false;

        return {
          width: `${this.size}px`,
          height: `${this.size}px`
        }
      }
    }
  }
</script>