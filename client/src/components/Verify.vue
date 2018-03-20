<template>
    <div>
        <navbar></navbar>
        <loading></loading>
        <div class="col s12 m6 offset-m3">
            <div class="card">
                <p class="center">{{msg}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import HomeForm from '@/components/includes/HomeForm'
import Navbar from '@/components/includes/navbar'
import Loading from '@/components/includes/ProgressLoader'

import {bus} from '../main'

export default {
  name: 'login',
  components: {HomeForm,Navbar,Loading},
  data(){
      return {
          msg:''
      }
  },
  methods:{
      verifyEmail(){
          
      }
  },
  created(){
      
  }
}
</script>

<style scope>
    .input-field {
        color: #333
    }
</style>
