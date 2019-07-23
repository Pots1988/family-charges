import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store/store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "./scss/main.scss";
import "nprogress/nprogress.css";
import firebase from "firebase";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName),
    componentName = upperFirst(
      camelCase(
        fileName
          .split("/")
          .pop()
          .replace(/\.\w+$/, "")
      )
    );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

let app = null;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit(`setUser`, user);
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
