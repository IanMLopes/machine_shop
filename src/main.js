import Vue from 'vue'
import App from './App'
import router from './router/router'
import BootstrapVue from 'bootstrap-vue'
import JQuery from 'jquery'
import VueSlideBar from 'vue-slide-bar'
import VueSweetalert2 from 'vue-sweetalert2'
import swal from "sweetalert2";
import VueGoodWizard from 'vue-good-wizard'
import axios from "axios";
import VueAxios from 'vue-axios'
import apiEnv from '../config/api.env'
import jwt from "jsonwebtoken";
import { chave_jwt } from "../config/api.env.js"
import VueSession from "vue-session"   
// import { BIcon } from 'bootstrap-vue'
import { IconsPlugin } from 'bootstrap-vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import VueQrcodeReader from "vue-qrcode-reader";



// let $ = JQuery

const BASE_URL = apiEnv.url_dev;
axios.defaults.baseURL = BASE_URL;

const HEADER_AUTH  = apiEnv.header_auth;

let header_jwt= jwt.sign( HEADER_AUTH,  `${chave_jwt}` );

axios.defaults.headers.common['header_auth'] = header_jwt;

let options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

// código para remover  warning de Navegação duplicada
const originalPush = router.push;
router.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
	}
	return originalPush.call(this, location).catch(err => err);
}
//----------------------------------------------------------------

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2, options)
Vue.use(VueGoodWizard)
Vue.use(VueAxios, axios)
Vue.use(VueSession)
Vue.use(IconsPlugin)
Vue.component('vue-slide-bar', VueSlideBar)
Vue.use(Vuesax, {})
Vue.use(VueQrcodeReader);
// Vue.component('b-icon', BIcon)
Vue.config.productionTip = false

export const  bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  swal,
  components: {
    App
  },
  template: '<App/>'
})
