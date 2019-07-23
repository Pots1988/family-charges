import { db } from "@/firebase/init";

export default {
  namespaced: true,
  state: {
    places: null
  },
  getters: {
    places(state) {
      return state.places ? state.places.slice().sort((a, b) => {
        return a.title > b.title ? 1 : -1
      }) : state.places;
    },
    placeCollection(state, getters, rootState, rootGetters) {
      if (rootGetters.user) {
        return db
          .collection(`userData`)
          .doc(rootGetters.user.uid)
          .collection(`places`);
      } else {
        return {};
      }
    }
  },
  mutations: {
    setPlaces(state, payload) {
      const places = [];

      payload.forEach(doc => {
        places.push({
          id: doc.id,
          title: doc.data().title
        });
      });

      state.places = places;
    }
  },
  actions: {
    addPlace({ getters }, payload) {
      const ref = getters.placeCollection;

      return ref.add({ title: payload }).then(docRef => docRef);
    },
    deletePlace({ getters }, payload) {
      const ref = getters.placeCollection.doc(payload);

      return ref.delete().then(docRef => docRef);
    },
    updatePlace({ getters }, payload) {
      const ref = getters.placeCollection.doc(payload.id);

      return ref.update({ title: payload.title }).then(docRef => docRef);
    }
  }
}