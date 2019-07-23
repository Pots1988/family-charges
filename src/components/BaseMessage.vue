<template>
  <ul class="messages">
    <li v-for="message in messages" :key="message.id">
      <div class="alert alert-dismissible" :class="'alert-' + message.type" role="alert">
        <small>{{ message.text }}</small>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="deleteMessage(message.id)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapGetters(["messages"])
    },
    methods: {
      ...mapMutations(["deleteMessage"])
    }
  }
</script>

<style lang="scss" scoped>
  .messages {
    margin: 0;
    padding: 0;
    list-style: none;
    position: fixed;
    bottom: 46px;
    left: 15px;
    right: 15px;
    z-index: 100;
    overflow: auto;
    max-height: 200px;
  }
</style>