import { db } from "@/firebase/init";
import firebase from "firebase";

export default {
    namespaced: true,
    state: {
        days: null,
        lastDay: null
    },
    getters: {
        lastDay(state) {
            return state.lastDay;
        },
        days(state) {
            return state.days;
        },
        daysCollection(state, getters, rootState, rootGetters) {
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
        setDays(state, payload) {
            const days = [];

            payload.forEach(doc => {
                days.push(doc.data());
            });

            state.days = days;
        },
        setLastDay(state, payload) {
            state.lastDay = payload;
        },
        clearDays(state) {
            state.days = null;
        },
        clearLastDay(state) {
            state.lastDay = null;
        }
    },
    actions: {
        getCountDays({ getters, commit }, payload) {
            return getters.daysCollection.orderBy(`date`, `desc`).limit(payload).get()
                .then(data => {
                    commit(`setDays`, data.docs);
                });
        },
        getMonthDays({ getters, commit }, payload) {
            const minDate = `${+payload}`,
                maxDate = `${+new Date(payload.getFullYear(), payload.getMonth() + 1)}`;

            return getters.daysCollection.orderBy(`date`, `desc`)
                .where(`date`, `>=`, minDate)
                .where(`date`, `<`, maxDate)
                .get()
                .then(data => {
                    commit(`setDays`, data.docs);
                    return data;
                });
        },
        getLastDay({ getters, commit }) {
            return getters.daysCollection.orderBy(`date`, `desc`).limit(1).get()
                .then(data => {
                    data.docs.forEach(item => commit(`setLastDay`, item.data()));
                });
        },
        removeDate({ getters, dispatch }, payload) {
            const ref = getters.daysCollection.doc(payload.date);

            dispatch(`changeDayCounter`, -1, { root: true });

            return ref.delete().then(docRef => docRef);
        },
        changeDayCounter: {
            root: true,
            handler({ rootGetters }, payload) {
                return db.collection(`users`)
                    .doc(rootGetters.user.uid)
                    .update({
                        daysCount: firebase.firestore.FieldValue.increment(payload)
                    });
            }
        }
    }
}