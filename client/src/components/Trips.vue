-<template>
    <div>
        <navbar></navbar>
        <error></error>
        <div class="container">
            <div class="center">
                <div class="card">
                    <div class="card-title teal truncate">
                        <h3 class="white-text">Trips</h3>
                    </div>
                    <table class="collections container">
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Departure</th>
                            <th>Book</th>
                        </tr>
                        <tr>
                            <td>Accra</td>
                            <td>Kumasi</td>
                            <td>{{date}}</td>
                            <td><button class="btn btn-floating waves-effect hoverable">
                                <i class="large material-icons">add</i>
                                </button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
    import Navbar from './includes/navbar'
    import Error from './includes/error'
    import {bus} from '../main'
    export default {
        name: 'Trups',
        components: {Navbar,Error},
        data(){
            return {
                from: '',
                to: '',
                date: ''
            }
        },
        methods:{

        },
        created(){
            var date = new Date()
            this.date = date.toLocaleDateString()
        }
    }

</script>
<style scope>

    i.prefix{
        margin-top: 21px
    }

</style>
