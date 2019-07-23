import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import places from "./modules/places";
import categories from "./modules/categories";
import message from "./modules/message";
import newDay from "./modules/newDay";
import days from "./modules/days";
import dayEdit from "./modules/dayEdit";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    places,
    categories,
    message,
    newDay,
    days,
    dayEdit
  }
});
