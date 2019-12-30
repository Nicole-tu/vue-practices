import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueCarousel from "vue-carousel";
import FullCalendar from 'vue-full-calendar';

import {
  library,
  dom
} from "@fortawesome/fontawesome-svg-core";
import {
  fab,
  faGoogle
} from "@fortawesome/free-brands-svg-icons";
import {
  fas
} from "@fortawesome/free-solid-svg-icons";
import {
  far
} from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

import jQuery from "jquery";
import moment from "moment";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/basic.css";

import router from "./router";
import store from "./store";

library.add(fas, far, fab, faGoogle);
dom.watch();

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueRouter, VueCarousel, FullCalendar);

Vue.config.productionTip = false;
window.jQuery = window.$ = jQuery;
const _ = require("lodash");
Vue.prototype._ = _;
Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");