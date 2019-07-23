import { firebaseAuth } from "@/firebase/init";

export default {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = {
        email: payload.email,
        uid: payload.uid
      };
    },
    logoutUser(state) {
      state.user = null;
    }
  },
  actions: {
    signUp({ commit }, payload) {
      return firebaseAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit(`setUser`, response.user);
          return response.user;
        })
        .catch(err => console.log(err));
    },
    signIn({ commit }, payload) {
      return firebaseAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => commit(`setUser`, response.user));
    },
    logoutUser({ commit }) {
      return firebaseAuth.signOut().then(() => commit(`logoutUser`));
    },
    resetPassword({ commit }, payload) {
      return firebaseAuth.sendPasswordResetEmail(payload.email);
    }
  }
};
