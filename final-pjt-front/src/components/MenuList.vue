<template>
  <div class="menu-list d-flex justify-content-around">
    <span class="navigation p-2" @click="toMovies"> Movies </span>
    <span class="navigation p-2" @click="toCommunity"> Community </span>
    <span class="navigation p-2 " @click="showModal"> Login </span>
    
    <login-modal v-if="!hideModal"></login-modal>
    
  </div>
</template>

<script>
import LoginModal from '@/components/accounts/LoginModal'

export default {
  name: 'MenuList',
  data(){
    return{
      hideModal : true
    }
  },
  components:{
    LoginModal
  },
  methods:{
    toMovies(){
      this.$router.push('/movies').catch(()=>{})
    },

    toCommunity(){
      this.$router.push('/community').catch(()=>{})
    },

    // show(){
    //   this.$modal.show('login-modal');
    // },

    // hide(){
    //   this.$modal.hide('login-modal');
    // },

    showModal(){
      this.$modal.show(LoginModal, 
          {prpos: null}, 
          { name: 'LoginModal',
            draggable: true,
            width: '500px',
            height: 'auto',
            scrollable: true
          })
    }
  }
}
</script>

<style>
.menu-list{
  margin-top: 50px;
  padding-right: 10px;
}

.navigation{
  font-size: 1.5rem;
  font-weight: bolder;
  cursor: pointer;
  box-shadow: 2px 2px 10px black inset;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
}

.navigation:hover{
  box-shadow: 5px 5px 5px 5px gray
}

</style>