import { db } from "@/firebase/init";
import firebase from "firebase";

export default {
  namespaced: true,
  state: {
    categories: null,
    subCategories: null
  },
  getters: {
    categories(state) {
      return state.categories ? state.categories.slice().sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      }) : state.categories;
    },
    subCategories(state) {
      return state.subCategories ? state.subCategories.slice().sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      }) : state.subCategories;
    },
    categoriesCollection(state, getters, rootState, rootGetters) {
      if (rootGetters.user) {
        return db
          .collection(`userData`)
          .doc(rootGetters.user.uid)
          .collection(`categories`);
      } else {
        return {};
      }
    }
  },
  mutations: {
    setCategories(state, payload) {
      const categories = [];

      payload.forEach(doc => {
        categories.push(
          Object.assign({}, doc.data(), {
            id: doc.id
          })
        );
      });

      state.categories = categories;
    },
    setSubcategories(state, category) {
      if (!category && category.subcategories) {
        state.subCategories = null;
      } else {
        const subcategories = [];

        for (let key in category.subcategories) {
          subcategories.push(
            Object.assign({}, category.subcategories[key], {
              id: key
            })
          );
        }
        
        state.subCategories = subcategories.length ? subcategories : null;
      }
    },
    clearLocalSubcategories(state) {
      state.subCategories = null;
    }
  },
  actions: {
    addCategory({ getters }, payload) {
      const ref = getters.categoriesCollection;

      return ref.add({ title: payload }).then(docRef => docRef);
    },
    addSubCategory({ getters }, payload) {
      const ref = getters.categoriesCollection.doc(payload.id);

      return ref.update({
        [`subcategories.${payload.subcatId}.title`]: payload.title
      });
    },
    deleteCategory({ getters }, payload) {
      const ref = getters.categoriesCollection.doc(payload);

      return ref.delete().then(docRef => docRef);
    },
    deleteSubCategory({ getters }, payload) {
      const ref = getters.categoriesCollection.doc(payload.id);

      return ref
        .update({
          [`subcategories.${payload.subcatId}`]: firebase.firestore.FieldValue.delete()
        })
        .then(docRef => docRef);
    }
  }
}