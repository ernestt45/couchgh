// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import materialize from 'materialize-css'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuex from 'vuex'

import Store from './store/store'
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
Vue.use(Vuex)
Vue.use(resource)

Vue.config.productionTip = false

export var bus = new Vue()

$(document).ready(function () {
  $('input.autocomplete').autocomplete({
    data: {
      "Accra": null,
      "Kumasi": null,
      "Cape Coast": null,
      "Volta": null,
      "Takoradi": null,
      "Sunyani": null,
      "Wa": null,
      "Bolgatanga": null,
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function (val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
})

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store: Store,
  router,
  components: { App },
  template: '<App/>'
})
