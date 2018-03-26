<template>
    <div>
        <navbar></navbar>
        <loader></loader>
        <error></error>
        <div class="row">

            <div v-if="!fecth" class="center">
                <r-loader></r-loader>
            </div>

            <div v-if="fecth" class="container">

                <div v-if="tripDetails.from != undefined" class="col s12 m10 offset-m1 l6 ">
                    <h3 class="header">Trip's Details</h3>
                    <div class="card horizontal">
                    <div class="card-stacked">
                        <div class="card-content flow-text">
                        <p><b class="teal-text">From</b>: {{tripDetails.from}}</p>
                        <p><b class="teal-text">To</b>: {{tripDetails.to}}</p>
                        <p><b class="teal-text">Date</b>: {{new Date(tripDetails.date).toDateString()}}</p>
                        <p><b class="teal-text">Time</b>: {{tripDetails.time}}</p>
                        <p><b class="teal-text">Vendor</b>: {{tripDetails.vendor}}</p>
                        <p><b class="teal-text">Ammount</b>: GHs {{tripDetails.ammount}}</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div v-else  class="col s12 m10 offset-m1 l6 offset-l3 ">
                    <div class="card horizontal">
                    <div class="card-stacked blue white-text">
                        <div class="card-content flow-text center">
                            <h5 class="">Sorry couldn't get trip's details </h5>
                            <p class="">The trip you are looking for has expired or does not exsit</p>
                        </div>
                    </div>
                    </div>
                </div>

                
                <div v-if="tripDetails.from != undefined" class="col s12 m10 offset-m1 l6 ">
                    <h3 class="header">Your Personal Info</h3>
                    <div class="card horizontal">
                    <div class="card-stacked">
                        <div class="card-content">
                            <form>
                                <div class="row">
                                    <div class="input-field col s12 m4">
                                        <input id="last_name" type="text" class="validate">
                                        <label for="last_name">Last Name</label>
                                    </div>
                                    <div class="input-field col s12 m4">
                                        <input id="first_name" type="text" class="validate">
                                        <label for="first_name">First Name</label>
                                    </div>
                                    <div class="input-field col s12 m4">
                                        <input id="other_names" type="text" class="validate">
                                        <label for="other_names">Other Names</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col m6 s12">
                                        <h5 class="center">Date Of Birth</h5>
                                         <div class="input-field col s12">
                                            <input id="date_of_birth" type="date">
                                         </div>
                                    </div>
                                    <div class="input-field col m6 s12  ">
                                        <h5 class="center">Gender</h5>
                                        <div class="input-field col s12">
                                            <select>
                                            <option value="male"selected>Male</option>
                                            <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-action">
                            <button class="btn right">next</button>
                        </div>
                    </div>
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
import rLoader from './includes/roundLoader'

import $ from 'jquery'

import {bus} from '../main'

    export default {
        name: 'Book',
        components:{Navbar, Error, Loader, Former, rLoader},
        data(){
            return {
                tripID: '',
                tripDetails: {},
                userInfo: {},
                fecth: false
            }
        },
        created(){
           this.tripID = this.$route.params.uid
            $(document).ready(function() {
                $('select').material_select();
            });

            bus.$on('tempTrip',()=>{
                this.tripDetails = this.$store.getters.getTempTrip
                this.fecth = true
            })

            this.$store.dispatch('loadTrip', this.tripID)
        },
        updated(){
            console.log('isAuth:',this.$store.getters.isAuth)
            if (this.$store.getters.isAuth == false) {
                this.$router.push('/login')
                console.log('BeforeUpdate')                
            }
        },
        beforeCreate(){
            if (this.$store.getters.isAuth == false) {
                console.log()
                this.$router.push('/login')
            }
        }
    }
</script>
<style scope>
    #date{
        margin-top: 14px
    }
</style>
