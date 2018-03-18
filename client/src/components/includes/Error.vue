<template>
    <transition name="fade" mode="out-in">
        <div v-if="error" class="" :class="error.color"><h5 class="center white-text flow-text">{{error.message}}</h5></div>
    </transition>
</template>
<script>
import {bus} from '../../main'

    export default {
        name: 'error',
        data(){
            return {
                error: {}
            }
        },
        created(){
            bus.$on('error',(data)=>{
                this.error = data
            })
        }
    }
</script>
<style>
     .fade-enter-active, .fade-leave-active {
        transition: opacity .8s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

