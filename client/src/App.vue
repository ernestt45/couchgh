<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  created(){
    if (localStorage.getItem('token')) {
      this.$store.dispatch('setUser',{
        uid: localStorage.getItem('uid'),
        token: localStorage.getItem('token')
      })
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
