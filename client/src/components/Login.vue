<template>
    <div>
        <navbar></navbar>
        <loading></loading>
        <home-form>
            <h3 slot="title">Login</h3>
            <form slot="form">
                <div class="container">
                    <div class="input-field">
                        <i class="material-icons prefix">account_circle</i>
                        <input id="username" type="text" class="validate">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field ">
                        <i class="material-icons prefix">lock</i>
                        <input id="password" type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
            </form>
            <button slot="button" class="btn waves-effect">Login</button>
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

export default {
  name: 'login',
  components: {HomeForm,Navbar,Loading}
}
</script>

<style scope>
    .input-field {
        color: #333
    }
</style>
