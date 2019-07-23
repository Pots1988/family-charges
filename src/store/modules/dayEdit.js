import { db } from "@/firebase/init";

export default {
    namespaced: true,
    state: {
        date: null
    },
    getters: {
        date(state) {
            return state.date;
        },
        editDateDoc(state, getters, rootState, rootGetters) {
            if (rootGetters.user) {
                return db
                    .collection(`users`)
                    .doc(rootGetters.user.uid)
                    .collection(`days`);
            } else {
                return {};
            }
        }
    },
    mutations: {
        setDate(state, payload) {
            state.date = payload.data();
        },
        removeDate(state) {
            state.date = null;
        }
    },
    actions: {
        editDate({ getters, dispatch }, payload) {
            const ref = getters.editDateDoc,
                docId = `${+payload}`;

            return ref.doc(docId).get()
                .then(doc => {
                    if (!doc.exists) {
                        dispatch(`changeDayCounter`, 1, { root: true });
                        return ref.doc(docId).set({
                            date: docId,
                            last_update: +new Date(),
                            products: getters.date.products
                        });
                    } else {
                        throw `Такая дата уже существует`;
                    }
                });
        },
        addProduct({ getters }, payload) {
            const ref = getters.editDateDoc.doc(getters.date.date);
            const newProducts = getters.date.products.slice();

            newProducts.push(payload);
            return ref.update({ products: newProducts }).then(docRef => docRef);
        },
        removeProduct({ getters }, payload) {
            const ref = getters.editDateDoc.doc(getters.date.date);
            const newProducts = getters.date.products.filter(product => product.id == payload ? false : true);

            return ref.update({ products: newProducts }).then(docRef => docRef);
        },
        editProduct({ getters }, payload) {
            const ref = getters.editDateDoc.doc(getters.date.date);
            const newProducts = getters.date.products.map(product => product.id == payload.id ? payload : product);

            return ref.update({ products: newProducts }).then(docRef => docRef);
        }
    }
}