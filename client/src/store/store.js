import Vue from 'vue'
import Vuex from 'vuex'
import App, {bus} from '../main'
import axios from 'axios'

import config from '../../config/api'

Vue.use(Vuex)

function postData(url, data){
    
}

const store = new Vuex.Store({
    state:{
        user:{},
        bookings: [],
        trips: [],
        error: '',
        tempTrip: {},
        tempUser:{}
    },
    getters:{
        getError: (state)=>{
            return state.error
        },
        getUser: (state)=>{
            return state.user
        },
        isAuth: (state)=>{
            if (state.user.token != undefined) {
                return true
            }else{
                return false
            }
        },
        getTrips: (state)=>{
            return state.trips
        },
        getTempTrip: state=>{
            return state.tempTrip
        }
    },
    mutations:{
        setUser(state, payload){
            state.user = payload
        },
        loading(state, payload){
            state.loading = payload
        },
        setTrips(state, payload){
            state.trips = payload
            bus.$emit('trips')
        },
        setError(state,payload){
            state.error = payload
            bus.$emit('error')
        },
        setTempTrip(state, payload){
            state.tempTrip = payload
            bus.$emit('tempTrip')
        }
    },
    actions:{
        registerUser({commit},payload){
            bus.$emit('loading', true)
            axios.post(config.host + '/user/register', payload).then((data) => {
                console.log(data)
                if (data.status == 200) {
                    $('#successModal').modal('open');
                } else {
                    bus.$emit('error', {
                        color: 'red',
                        message: 'There seems to be an error registering you'
                    })
                }
                bus.$emit('loading', false)

            }).catch((err) => {
                bus.$emit('loading', false)
                bus.$emit('error', {
                    color: 'red',
                    message: 'There was a problem connecting to the server'
                })
            })
        },

        loginUser({commit, getters}, payload){
            console.log('Checking user credentials')
            bus.$emit('loading',true)
            axios.post(config.host+'/user/login', payload).then(user=>{
                if (user.data) {
                    if (user.data.error) {
                        bus.$emit('error', {
                            message: user.data.message,
                            color: 'orange'
                        })
                    }else{
                        localStorage.setItem('token', user.data.token)
                        localStorage.setItem('uid', user.data.uid)
                        commit('setUser', user.data)
                        console.log('Got Token:', user.data.token)
                        bus.$emit('isUser', true)
                    }
                }else{
                    bus.$emit('error',{
                        message: 'Can\'t connect to our server',
                        color: 'orange'
                    })
                }
                bus.$emit('loading', false)
            })
        },

        logoutUser({commit},payload){
            localStorage.removeItem('token')
            commit('setUser', '')
            bus.$emit('user')
        },

        findTrips({commit},payload){
            commit('setError', '')
            bus.$emit('loading', true)
            axios.post(config.host+'/trip', payload).then((trips)=>{
                if (trips.data[0] != undefined) {
                    console.log(trips.data[0])
                    commit('setTrips', trips.data)
                    bus.$emit('loading', false)
                }else{
                    bus.$emit('error',{
                        color: 'blue',
                        message: 'There are\'t any trips on this picked date'
                    })
                    bus.$emit('loading', false)
                    
                }
                
            }).catch((err)=>{
                bus.$emit('error',{
                    color: 'orange',
                    message: err.message || 'There was an error connecting to our servers'
                })
                console.log(err)
                bus.$emit('loading', false)
                
            })
        },

        loadTrip({commit}, payload){
            axios.get(config.host+'/trip/'+payload).then(doc=>{
                commit('setTempTrip', doc.data)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
})

export default store