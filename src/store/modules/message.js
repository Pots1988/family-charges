export default {
  state: {
    messages: []
  },
  getters: {
    messages(state) {
      return state.messages;
    }
  },
  mutations: {
    addMessage(state, payload) {
      state.messages.push(payload);
    },
    deleteMessage(state, messageId) {
      const position = state.messages.findIndex(message => message.id == messageId);

      if (position == -1) return false;
      state.messages.splice(position, 1);
    }
  },
  actions: {}
}