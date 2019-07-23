import { db } from "@/firebase/init";

export default {
  state: {
    userSettings: null
  },
  getters: {
    userSettings(state) {
      return state.userSettings;
    },
    userSettingsDB(state, getters) {
      return getters.user ? db.collection(`users`).doc(getters.user.uid) : null;
    }
  },
  mutations: {
    setUserSettings(state, payload) {
      state.userSettings = payload;
    },
    removeUserSettings(state) {
      state.userSettings = null;
    }
  },
  actions: {
    addUser({ commit, getters }, payload) {
      const userSettings = {
        uid: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: null,
        monthStartFrom: 1,
        daysCount: 0
      };

      return getters.userSettingsDB.set(userSettings).then(response => {
        commit(`setUserSettings`, userSettings);
        return response;
      });
    },
    changeMonth({ getters }, payload) {
      return getters.userSettingsDB
        .update({ monthStartFrom: payload })
        .then(docRef => docRef);
    },
    changeName({ getters }, payload) {
      return getters.userSettingsDB
        .update({ name: payload })
        .then(docRef => docRef);
    }
  }
}