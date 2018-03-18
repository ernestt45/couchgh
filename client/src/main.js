// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import materialize from 'materialize-css'
import * as VueGoogleMaps from 'vue2-google-maps'

import Api from '../config/api'

import 'materialize-css/dist/css/materialize.css'
import 'material-icons/material.css'

Vue.use(VueGoogleMaps, {
  load: {
    key: Api.googleMaps,
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
Vue.use(resource)

Vue.config.productionTip = false

export var bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
