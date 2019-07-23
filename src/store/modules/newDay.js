import { db } from "@/firebase/init";

export default {
  namespaced: true,
  state: {
    date: null
  },
  getters: {
    date(state) {
      return state.date;
    }
  },
  mutations: {
    setDate(state, payload) {
      state.date = payload;
    },
    addProduct(state, payload) {
      state.date.products.push(payload);
    },
    removeProduct(state, payload) {
      state.date.products = state.date.products.filter(product => product.id != payload);
    },
    editProduct(state, payload) {
      const productIndex = state.date.products.findIndex(item => item.id == payload.id);

      state.date.products.splice(productIndex, 1);
      state.date.products.push(payload);
    },
    changeDate(state, payload) {
      state.date.date = payload;
    },
    removeDate(state) {
      state.date = null;
    }
  },
  actions: {
    addDateToFirebase({ rootGetters, dispatch }, payload) {
      const docId = `${+payload.date}`;
      const refDays = db
        .collection(`users`)
        .doc(rootGetters.user.uid)
        .collection(`days`);

      return refDays
        .doc(docId)
        .get()
        .then(doc => {
          if (!doc.exists) {
            dispatch(`changeDayCounter`, 1, { root: true });

            return refDays.doc(docId).set({
              date: docId,
              last_update: +new Date(),
              products: payload.products
            });
          } else {
            throw `Такая дата уже существует`;
          }
        });
    }
  }
}