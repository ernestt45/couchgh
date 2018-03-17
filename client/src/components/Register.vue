<template>
    <div>
        <navbar></navbar>
        <home-form>
            <h3 slot="title">Register</h3>
            <form slot="form">
                <div class="container">
                    <div class="input-field">
                        <i class="material-icons prefix">account_circle</i>
                        <input id="username" type="text" class="validate">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">mail</i>                        
                        <input id="email" type="email" class="validate">
                        <label for="email">Email</label>
                    </div>
                    <div class="input-field ">
                        <i class="material-icons prefix">lock</i>
                        <input id="password" type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                    <div class="input-field ">
                        <i class="material-icons prefix">loop</i>                        
                        <input id="confirm_password" type="password" class="validate">
                        <label for="confirm_password">Confirm Password</label>
                    </div>
                    <blockquote class="teal-text">
                        By clicking Create Account, you agree to our Terms and Conditions.
                    </blockquote>
                </div>
            </form>
            <button slot="button" class="btn waves-effect">Register</button>
        </home-form>
    </div>
</template>
<script>
import HomeForm from '@/components/includes/HomeForm'
import Navbar from '@/components/includes/navbar'

export default {
  name: 'register',
  components: {HomeForm,Navbar}
}
</script>

<style scope>
    .input-field {
        color: #333
    }
</style>
