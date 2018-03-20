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
        user:{
            token: '',
        }
    },
    getters:{

    },
    mutations:{
        setUserToken(state, payload){
            state.user = payload
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
                        commit('setUserToken', user.data.token)                 
                        console.log('Got Token:', user.data.token)
                    }
                }else{
                    bus.$emit('error',{
                        message: 'Can\'t connect to our server',
                        color: 'orange'
                    })
                }
                setTimeout(function() {
                    bus.$emit('loading', false)       
                }, 5000);
            })
        }
    }
})

export default store