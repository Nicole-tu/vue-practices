import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import moment from "moment";
import "moment/locale/zh-tw";
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-TW';

Vue.use(Element, {
  locale
});

import _ from "lodash";
Vue.prototype._ = _;

moment.locale('zh-tw');
Vue.prototype.moment = moment;

import {
  Icon
} from 'leaflet'
import 'leaflet/dist/leaflet.css';

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');