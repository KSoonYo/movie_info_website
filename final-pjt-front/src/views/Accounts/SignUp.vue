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
          <span v-if="multipleUserNameError"> {{ multipleUserNameError }} </span>
          <span v-if="usernameAlertStatus"> 입력칸을 채워주세요 </span>
        </p>
        <p>
          <label for=""> nickname</label>
          <input v-model="nickname" type="text" required>
          <span v-if="multipleNickNameError"> {{ multipleNickNameError }}  </span>
          <span v-if="!nickname.trim()"> 입력칸을 채워주세요 </span>
        </p>
        <p>
          <label for=""> password</label>
          <input v-model="password" type="password" required>
          <span v-if="passwordAlertStatus"> 입력칸을 채워주세요 </span>

        </p>
        <p>
          <label for=""> passwordConfirmation</label>
          <input v-model="passwordConfirmation" type="password" required>
          <span v-if="invalidPasswordConfirm" > {{ invalidPasswordConfirm }}  </span>
          <span v-if="!passwordConfirmation.trim()"> 입력칸을 채워주세요 </span>

        </p>
       
        <button>sign up</button>
      </form>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'SignUp',
  data(){
    return {
      username: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',

      usernameAlertStatus: false,
      passwordAlertStatus: false,
      invalidPasswordConfirm: '',
      multipleUserNameError : '',
      multipleNickNameError : ''
    }
  },
  components:{
    NavBar,
  },
  methods:{
    createUser(event){
      event.preventDefault()
      if(!this.username.trim()){
        this.usernameAlertStatus = true
      } else{
        this.usernameAlertStatus = false
      } 

      if (!this.password.trim()) {
        this.passwordAlertStatus = true
      } else{
        this.passwordAlertStatus = false
      }


      this.$store.dispatch('createUser',  {
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        instance : this
      })
    }
  }
}
</script>

<style>

</style>