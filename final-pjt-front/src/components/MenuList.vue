<template>
  <div>
    <button @click="toMovies"> movies </button>
    <button @click="toCommunity" class="mx-2"> community </button>
    <button @click="showModal"> login </button>
    
    <!-- <modal name="login-modal"
    :adaptive="true"
    :draggable="true"
    :focusTrap="true"
    :scrollable="true"
    height="auto"
    :classes="['d-flex', 'justify-content-between']"
    >
      <p>이미지</p>
      <section class="d-flex flex-column">
        <h1>Login</h1>
        <form>
          <input type="text">
          <br>
          <input type="text">
          <br>
          <button>login</button>
          <button>sign up</button>
        </form>
      </section>
    </modal> -->

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
            draggable: true
          })
    }
  }
}
</script>

<style>


</style>