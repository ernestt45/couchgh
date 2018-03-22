<template>
  <nav class="teal">
    <div class="nav-wrapper  container">
      <router-link to="/" class="brand-logo">OneTravel <i class="material-icons right">airport_shuttle</i></router-link>
      <a href="#mobile-side" data-activates="mobile-side" class="button-collapse"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
      <template v-if="!isAuth">
        <li><router-link to="/login" >Login</router-link></li>
        <li><router-link to="/register" >Register</router-link></li>
      </template>
      <template v-else>
        <li @click="logout" ><router-link to="#logout" >Logout</router-link></li>
      </template>
      </ul>
      <ul class="side-nav" id="mobile-side">
        <li><router-link to="/login" >Login</router-link></li>
        <li><router-link to="/register" >Register</router-link></li>
      </ul>
    </div>
  </nav>
</template>


<script>

import {bus} from '../../main'

import $ from "jquery";
    $( document ).ready(function(){
        $(".button-collapse").sideNav();
    })

    export default {
        name: "navbar",
        data(){
          return {
            isAuth: this.$store.getters.isAuth
            }
        },
        methods: {
          logout: function(){
            this.$store.dispatch('logoutUser');
          }
        },
        created(){
          bus.$on('user',()=>{
            this.isAuth = this.$store.getters.isAuth
          })
        }
    }
</script>