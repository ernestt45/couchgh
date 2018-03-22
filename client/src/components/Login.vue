<template>
    <div>
        <navbar></navbar>
        <loading></loading>
        <home-form>
            <div slot="title">
                <error></error>
                <h3>Login</h3>
            </div>
            <form slot="form">
                <div class="container">
                    <div class="input-field">
                        <i class="material-icons prefix">account_circle</i>
                        <input v-model="username" id="username" type="text" class="validate">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field ">
                        <i class="material-icons prefix">lock</i>
                        <input v-model="password" id="password" type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
            </form>
            <button @click="login" slot="button" class="btn waves-effect">Login</button>
            <div slot="footer">
                <p class="right">Don't have an account? <router-link to="/register">register</router-link></p>
            </div>
        </home-form>
    </div>
</template>
<script>
import HomeForm from '@/components/includes/HomeForm'
import Navbar from '@/components/includes/navbar'
import Loading from '@/components/includes/ProgressLoader'
import Error from '@/components/includes/error'

import {bus} from '../main'

export default {
  name: 'login',
  components: {HomeForm,Navbar,Loading, Error},
  data(){
      return {
          username: '',
          password: '',
          isAuth: this.$store.getters.isAuth || false
      }
  },
  methods:{
      login(){
          if (this.username == '' || this.password == '') {
              bus.$emit('error',{
                  color: 'orange',
                  message: 'Please provide the username and password'
              })
          }else{
              this.$store.dispatch('loginUser',{
                  username: this.username,
                  password: this.password
              })
          }
      }
  },
  created(){


      console.log(this.$store.getters.isAuth)

      if (this.isAuth) {
          this.$router.push('/')
      }

      bus.$on('isUser', (payload)=>{
          this.$router.push('/')
      })
  }
}
</script>

<style scope>
    .input-field {
        color: #333
    }
</style>
