<template>
  <div>
    <nav-bar></nav-bar>
    <section class="container">
      <h1>회원가입 페이지</h1>
      <!-- form 스타일링 필요 -->
      <form @submit="createUser">
        <p>
          <label for=""> username</label>
          <input v-model="username" type="text" required>
        </p>
        <p>
          <label for=""> nickname</label>
          <input v-model="nickname" type="text">
        </p>
        <p>
          <label for=""> password</label>
          <input v-model="password" type="text">
        </p>
        <p>
          <label for=""> passwordConfirmation</label>
          <input v-model="passwordConfirmation" type="text">
        </p>
       
        <button>sign up</button>
      </form>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import axios from 'axios'

export default {
  name: 'SignUp',
  data(){
    return {
      username: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
    }
  },
  components:{
    NavBar,
  },
  methods:{
    createUser(event){
      event.preventDefault()
      axios.post(`${process.env.VUE_APP_BACK_END_URL}accounts/signup/`, 
      {
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      })
      .then(res=>{
        console.log(res)
      })

    }
  }
}
</script>

<style>

</style>