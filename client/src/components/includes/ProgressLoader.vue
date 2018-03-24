<template>
    <div :class="{'progress': loading}">
        <div class="indeterminate"></div>
    </div>
</template>
<script>
import {bus} from '../../main'

    export default {
        name: 'loading',
        data(){
            return {
                loading: false
            }
        },
        created(){
            bus.$on('loading',(data)=>{
                this.loading = data
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

