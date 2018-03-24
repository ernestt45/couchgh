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



/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store: Store,
  router,
  components: { App },
  template: '<App/>',
  created(){
    if (localStorage.getItem('token')!= undefined) {
      this.$store.commit('setUser', {
        uid: localStorage.getItem('uid'),
        token: localStorage.getItem('token')        
      })
    }
  }
})
