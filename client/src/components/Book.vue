<template>
    <div>
        <navbar></navbar>
        <loader></loader>
        <error></error>
        <div class="row">
            <div class="container">
                <div class="card">
                    <div class="card-title">
                        <h4 class="teal-text center">Booking</h4>
                    </div>
                    <div class="card-content">
                        <div id="trip-info" class="col s12 m6">
                            <p class="flow-text">
                                Accra <b><i id="arrow" class="material-icons">arrow_forward</i></b> Kumasi
                            </p>
                        </div>
                        <div id="user-info" class="col s12 m6"></div>
                    </div>
                    <div class="card-footer">
                        <button class="btn teal waves-effect">book</button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>
<script>
import Navbar from './includes/navbar'
import Error from './includes/error'
import Loader from './includes/ProgressLoader'
import Former from './includes/HomeForm'

    export default {
        name: 'Book',
        components:{Navbar, Error, Loader, Former},
        data(){
            return {
                tripID: ''
            }
        },
        created(){
           this.tripID = this.$route.params.uid
        },
        beforeUpdate(){
            console.log(this.$store.getter.isAuth)
            if (!this.$store.getter.isAuth) {
                this.$route.push('/')
            }
        }
    }
</script>
<style scope>
    #date{
        margin-top: 14px
    }
</style>
