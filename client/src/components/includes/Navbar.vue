<template>
  <nav class="teal">
    <div class="nav-wrapper  container">
      <router-link to="/" class="brand-logo">ChochGH <i class="material-icons right">airport_shuttle</i></router-link>
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
        <template v-if="!isAuth">
          <li><router-link to="/login" >Login</router-link></li>
          <li><router-link to="/register" >Register</router-link></li>
        </template>
        <template v-else>
          <li @click="logout" ><router-link to="#logout" >Logout</router-link></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<script>

import {bus} from '../../main'

import $ from "jquery";

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

           $( document ).ready(function(){
              $(".button-collapse").sideNav({
                menuWidth: 300, // Default is 300
                edge: 'left', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true, // Choose whether you can drag to open on touch screens,
                onOpen: function(el) {}, // A function to be called when sideNav is opened
                onClose: function(el) {}, // A function to be called when sideNav is closed
              });
          })
        }
    }
</script>