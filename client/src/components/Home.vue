-<template>
    <div>
        <navbar></navbar>
        <error></error>
        <loader></loader>
        <div class="container">
            <div class="center">
                <div class="card">
                    <div class="card-title teal truncate">
                        <h3 class="white-text">Find Trips</h3>
                    </div>
                    <div class="card-content">
                        <div class="row">
                            <form class="col s12">
                                <div class="row">
                                    <div class="input-field col s12 m6 l4">
                                        <i class="material-icons prefix">location_on</i>
                                        <input v-model="from" id="from" type="text">
                                        <label for="from">From</label>
                                    </div>
                                    <div class="input-field col s12 m6 l4">
                                        <i class="material-icons prefix">chevron_right</i>                                        
                                        <input v-model="to" id="to" type="text" >
                                        <label for="to">To</label>
                                    </div>
                                    <div class=" input-field col s12 m12 l4">
                                        <i class="material-icons prefix">date_range</i>                                        
                                        <input v-model="date" id="departure" type="date">
                                    </div>
                                    <div class="input-field col s12 m6 offset-m3 l4 offset-l4">
                                        <button @click.prevent="findTrips" class="btn waves-effect">Ready Set Choch?</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                <transition name="fade" mode="out-in">
                    <table v-if="trips" class="centered  striped responsive-table">
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Date</th>
                                <th>Departure Time</th>
                                <th>Vender</th>
                                <th>Price</th>
                                <th>Seats Available</th>
                                <th>Book</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="trip in trips" :key="trip._id">
                                <td>{{trip.from}}</td>
                                <td>{{trip.to}}</td>
                                <td>{{new Date(trip.date).toDateString()}}</td>
                                <td>{{trip.time}}</td>
                                <td>{{trip.vendor}}</td>
                                <td>{{trip.ammount}}</td>
                                <td>{{trip.seatsAvailable}}</td>
                                <td>
                                    <button @click="bookTrip(trip._id)" class="btn btn-floating waves-effect hoverable pulse">
                                        <i class="large material-icons">add</i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
    import Navbar from './includes/navbar'
    import Error from './includes/error'
    import Loader from './includes/progressLoader'
    import {bus} from '../main'
    export default {
        name: 'Home',
        components: {Navbar,Error,Loader},
        data(){
            return {
                from: '',
                to: '',
                date: '',
                trips: '',
            }
        },
        methods:{
            findTrips:function(){
                if ((this.from == '') && (this.to == '')) {
                    bus.$emit('error', {
                        message: 'Please fill in the from and to fields',
                        color: 'orange'
                    })
                }else{
                    this.$store.dispatch('findTrips', {
                        from: this.from,
                        to: this.to,
                        date: this.date
                    })
                }
            },bookTrip:function(uid){
                this.$router.push('book/'+uid)
            }
        },
        created(){
            //setting the date to the current day
            var date = new Date()
            var month =date.getMonth()+1
            if (month < 10){
                month = '0'+month.toString()
            }
            this.date = (
                date.getFullYear().toString()+'-'+
                month+'-'+
                date.getDate().toString()
            )


            bus.$on('trips',()=>{
                this.trips = this.$store.getters.getTrips
            })
        }
    }

</script>
<style scope>

    i.prefix{
        margin-top: 21px
    }

</style>
