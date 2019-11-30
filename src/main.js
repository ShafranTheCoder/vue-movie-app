import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = `https://api.themoviedb.org/3/movie/popular?api_key=3605be09777fa4898a8cd239c9eff79a&language=en-US`;
new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
