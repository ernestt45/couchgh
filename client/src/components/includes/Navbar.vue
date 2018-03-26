<template>
  <nav class="teal">
    <div class="nav-wrapper  container">
      <router-link to="/" class="brand-logo">ChochGH</router-link>
      <a href="#mobile-side" data-activates="mobile-side" class="button-collapse"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
      <template v-if="!isAuth">
        <li><router-link to="/login" ><i class="material-icons">lock_open</i></router-link></li>
        <li><router-link to="/register" ><i class="material-icons">person_add</i></router-link></li>
      </template>
      <template v-else>
        <li ><router-link to="/profile" ><i class="material-icons">person</i></router-link></li>
        <li @click="logout" ><router-link to="/" ><i class="material-icons">lock</i></router-link></li>
      </template>
      </ul>
      <ul class="side-nav" id="mobile-side">
          <li><router-link to="/" >Home<i class="material-icons">home</i></router-link></li>
        <template v-if="!isAuth">
          <li><router-link to="/login" >Login<i class<i class="material-icons">lock_open</i></router-link></li>
          <li><router-link to="/register" >Register<i class<i class="material-icons">person_add</i></router-link></li>
        </template>
        <template v-else>
          <li ><router-link to="/profile" >Profile<i class="material-icons">person</i></router-link></li>          
          <li @click="logout" ><router-link to="/" >Logout<i class="material-icons">lock</i></router-link></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<script>

import {bus} from '../../main'

import Materialize from 'materialize-css'
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
        watch: {
          isAuth: val=>{
            console.log(val)
            if (val != true) {
              Materialize.toast('You\'ve been logged out', 3000) 
              console.log('Hello')
            }
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