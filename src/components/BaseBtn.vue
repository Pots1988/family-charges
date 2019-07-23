<template>
  <button type="button" class="btn" @click="$emit('click')">
    <span class="spinner-text" :data-active="load"><slot></slot></span>
    <div class="spinner-border-wrapper" :data-active="load">
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </button>
</template>

<script>
  export default {
    props: {
      load: {
        type: [Boolean, String],
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .spinner-text {
    transition: 0.1s;

    &[data-active] {
      opacity: 0;
    }
  }

  .spinner-border-wrapper {
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.1s;

    &[data-active] {
      opacity: 1;
    }
  }
</style>