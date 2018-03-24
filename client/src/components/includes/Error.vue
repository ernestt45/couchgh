<template>
    <transition name="fade" mode="out-in">
        <div v-if="err" class="truncate" :class="err.color"><h5 class="center white-text flow-text">{{err.message}}</h5></div>
    </transition>
</template>
<script>
import {bus} from '../../main'

    export default {
        name: 'error-handler',
        data(){
            return {
                err: {}
            }
        },
        created(){
            bus.$on('error', (data)=>{
                if (data) {
                    if (data.color == undefined) {
                        data.color = 'orange'
                    }
                    this.err = data
                }else{
                    this.err = {}
                }
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

