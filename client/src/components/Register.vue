<template>
    <div>
        <navbar></navbar>
        <home-form>
            <div slot="title">
                <error></error>
                <h3 >Register</h3>
            </div>
            <form slot="form">
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
                        By clicking Create Account, you agree to our Terms and Conditions.
                    </blockquote>
                </div>
            </form>
            <button @click="registerUser" slot="button" class="btn waves-effect">Register</button>
        </home-form>
    </div>
</template>
<script>
import HomeForm from '@/components/includes/HomeForm'
import Navbar from '@/components/includes/navbar'
import Error from '@/components/includes/error'

import config from '../../config/api'
import {bus} from '../main'

export default {
  name: 'register',
  components: {HomeForm,Navbar,Error},
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

        if (
            (!this.usernameExist && !this.email)&&
            (this.password.length >= 6)&&
            (this.password == this.confirm_password)) 
        {
            
            this.$http.post(config.host+'user/register').then((data)=>{
                console.log(data)
            })
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
        if (this.password !== this.confirm_password) {
            bus.$emit('error',{
                color: 'orange',
                message: 'passwords do not match'
            })
        }
    }
        
  }
}
</script>

<style scope>
    .input-field {
        color: #333
    }
</style>
