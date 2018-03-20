<template>
    <div>
        <navbar></navbar>
        <home-form>
            <div slot="title">
                <error></error>
                <loading></loading>
                <h3 >Register</h3>
            </div>
            <form action="/register" method="post" slot="form">
                <div class="container">
                    <div class="input-field">
                        <i class="material-icons prefix">account_circle</i>
                        <input @blur="isUsername" v-model="username" id="username" type="text" class="validate">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">mail</i>                        
                        <input @blur="isEmail" v-model="email" id="email" type="email" class="validate">
                        <label for="email">Email</label>
                    </div>
                    <div class="input-field ">
                        <i class="material-icons prefix">lock</i>
                        <input @blur="checkPasslength" v-model="password" id="password" type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                    <div class="input-field ">
                        <i class="material-icons prefix">loop</i>                        
                        <input v-model="confirm_password" id="confirm_password" type="password" class="validate">
                        <label for="confirm_password">Confirm Password</label>
                    </div>
                    <blockquote class="teal-text">
                        By clicking Register, you agree to our Terms and Conditions of Our Online Booking and Reservations.
                    </blockquote>
                </div>
            </form>
            <button @click.prevent="registerUser" slot="button" class="btn waves-effect">Register</button>
        </home-form>
        <div id="successModal" class="modal bottom-sheet">
            <div class="modal-content">
                <h4 class="teal-text">Registration Successfull</h4>
                <blockquote>A verification mail has been sent to your mail. Please verify to activate your account</blockquote>
            </div>
            <div class="modal-footer">
                <router-link to="/login" class="modal-action modal-close waves-effect waves-green btn-flat">login</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import HomeForm from '@/components/includes/HomeForm'
import Navbar from '@/components/includes/navbar'
import Error from '@/components/includes/error'
import Loading from '@/components/includes/ProgressLoader'


import $ from 'jquery'
import materialize from 'materialize-css'

import config from '../../config/api'
import {bus} from '../main'

export default {
  name: 'register',
  components: {HomeForm,Navbar,Error, Loading},
  data(){
      return {
          username: '',
          email: '',
          password: '',
          confirm_password: '',
          usernameExist: false,
          emailExist: false 
      }
  },
  methods:{
    registerUser(){

        this.passMatch()
            console.log(!this.usernameExist, !this.emailExist, this.password.length, this.password, this.confirm_password)

        if (
            (!this.usernameExist && !this.emailExist)&&
            (this.password.length >= 6)&&
            (this.password == this.confirm_password)) 
        {
            
            var data = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            
            this.$store.dispatch('registerUser', data)
        }
    },
    isUsername(e){
        bus.$emit('error',{})
        this.usernameExist = false
        console.log(e)
        if (this.username) {
            this.$http.get(config.host+'/user/username/'+this.username+'/exist').then((data)=>{
                if (data.body.isExist) {
                    bus.$emit('error',{
                        color: 'orange',
                    message: 'username already taken'
                    })
                this.usernameExist = true
                }
                console.log('done checking')
            })
        }
    },
    isEmail(){
        bus.$emit('error',{})
        this.emailExist = false
        if (this.email) {  
            this.$http.get(config.host+'/user/email/'+this.email+'/exist').then((data)=>{
                if (data.body.isExist) {
                    bus.$emit('error',{
                        color: 'orange',
                        message: 'the email has already been registered'
                    })
                    this.emailExist = true
                }
            })
        }   
    },
    checkPasslength(){
        if (this.password.length < 6) {
            bus.$emit('error',{
                color: 'orange',
                message: 'password must be more than six characters'
            })
        }
    },
    passMatch(){
        bus.$emit('error',{})
        if (this.password !== this.confirm_password) {
            bus.$emit('error',{
                color: 'orange',
                message: 'passwords do not match'
            })
        }
    }   
  },
  created(){
    $(document).ready(function(){
        $('.modal').modal();
    });
  }
}
</script>

<style scope>
    .input-field {
        color: #333
    }
</style>
