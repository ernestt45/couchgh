<template>
  <nav class="teal">
    <div class="nav-wrapper  container">
      <router-link to="/" class="brand-logo">OneTravel <i class="material-icons right">airport_shuttle</i></router-link>
      <a href="#mobile-side" data-activates="mobile-side" class="button-collapse"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/login" >Login</router-link></li>
        <li><router-link to="/register" >Register</router-link></li>
      </ul>
      <ul class="side-nav" id="mobile-side">
        <li><router-link to="/login" >Login</router-link></li>
        <li><router-link to="/register" >Register</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
    import $ from "jquery";
    $( document ).ready(function(){
        $(".button-collapse").sideNav();
    })

    export default {
        name: "navbar"
    }
</script>