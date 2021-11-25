<template>
  <div>
    <nav-bar></nav-bar>
    <section class="p-3 container rounded mt-3">
      <!-- form 스타일링 필요 -->
      <div class="col-4 offset-4 my-form mt-5 px-3 rounded">
        <h1 class="text-center pt-4">회원가입</h1>
        <form @submit="createUser" class="p-2 col-12 rounded">
      
        <div class="row mt-1 mb-4 mx-2">
          <label for="username" class="px-0 mb-1"> 아이디 </label>
          <b-form-input
            class="px-2"
            v-model="username"
            id="username"
            type="text"
            required
            style="background-color: rgb(65, 65, 65); color: white; border-color: rgb(65, 65, 65);"
          >
          </b-form-input>
          <p v-if="multipleUserNameError">
            <span class="text-danger"> {{ multipleUserNameError }} </span>
          </p>
          <span class="text-danger" v-if="usernameAlertStatus"> 입력칸을 채워주세요 </span>
        </div>
        
        <div class="row mt-1 mb-4 mx-2">
          <label for="nickname" class="px-0 mb-1"> 닉네임 </label>
          <b-form-input
            class="px-2"
            v-model="nickname"
            id="nickname"
            type="text"
            required
            style="background-color: rgb(65, 65, 65); color: white; border-color: rgb(65, 65, 65);"
          >
          </b-form-input>
          <p v-if="multipleNickNameError">
            <span class="text-danger"> {{ multipleNickNameError }}  </span>
          </p>
          <span class="text-danger" v-if="nicknameAlertStatus"> 입력칸을 채워주세요 </span>
        </div>

        <div class="row mt-1 mb-4 mx-2">
          <label for="password" class="px-0 mb-1"> 비밀번호 </label>
          <b-form-input
            class="px-2"
            v-model="password"
            id="password"
            type="password"
            required
            style="background-color: rgb(65, 65, 65); color: white; border-color: rgb(65, 65, 65);"
          >
          </b-form-input>
          <span v-if="passwordAlertStatus"> 입력칸을 채워주세요 </span>
        </div>

        <div class="row mt-1 mb-4 mx-2">
          <label for="passwordConfrimation" class="px-0 mb-1"> 비밀번호 확인 </label>
          <b-form-input
            v-model="passwordConfirmation"
            class="px-2"
            id="passwordConfirmation"
            type="password"
            required
            style="background-color: rgb(65, 65, 65); color: white; border-color: rgb(65, 65, 65);"
          >
          </b-form-input>
          <p v-if="invalidPasswordConfirm">
            <span> {{ invalidPasswordConfirm }}  </span>
          </p>
          <span v-if="passwordConfirmAlertStatus"> 입력칸을 채워주세요 </span>
        </div>
  
        <div class="row mt-6 mb-4 mx-2 ">
            <button class="btn btn-primary">sign up</button>
        </div>
      </form>
    </div>
      

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
      nicknameAlertStatus: false,
      passwordConfirmAlertStatus: false,


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

      this.invalidPasswordConfirm= '',
      this.multipleUserNameError = '',
      this.multipleNickNameError = ''
      
  
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

      if (!this.nickname.trim()) {
        this.nicknameAlertStatus = true
      } else{
        this.nicknameAlertStatus = false
      }
    
      if (!this.passwordConfirmation.trim()) {
        this.passwordConfirmAlertStatus = true
      } else{
        this.passwordConfirmAlertStatus = false
      }

      if(this.usernameAlertStatus || this.passwordAlertStatus || this.nicknameAlertStatus || this.passwordConfirmAlertStatus){
        return
      }




      this.$store.dispatch('createUser',  {
        username: this.username.trim(),
        nickname: this.nickname.trim(),
        password: this.password.trim(),
        password_confirmation: this.passwordConfirmation.trim(),
        instance : this
      })
     
    }
  }
}
</script>

<style scoped>
.my-form{
  background-color: rgb(45, 45, 45);
}

.my-button{
  background-color: rgb(111, 74, 142);
  color: white;
}

.mt-6 {
  margin-top: 2.3rem;
}
</style>