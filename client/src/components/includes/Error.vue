<template>
  <div v-if="error" class="" :class="error.color"><h5 class="center white-text flow-text">{{error.message}}</h5></div>
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
