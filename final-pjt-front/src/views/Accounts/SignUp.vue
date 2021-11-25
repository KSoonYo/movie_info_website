<template>
  <div>
    <nav-bar></nav-bar>
    <h1 class="text-center mt-5">회원가입</h1>
    <section class="p-3 container rounded mt-3">
      <!-- form 스타일링 필요 -->
      <div class="col-4 offset-4">
        <form @submit="createUser" class="my-form p-2 col-12 rounded">
      
        <div class="row my-1 mx-2">
          <label for="username" class="p-0"> 아이디 </label>
          <b-form-input class="p-0 px-2" v-model="username" id="username" type="text" required></b-form-input>
          <p v-if="multipleUserNameError">
            <span class="text-danger"> {{ multipleUserNameError }} </span>
          </p>
          <span class="text-danger" v-if="usernameAlertStatus"> 입력칸을 채워주세요 </span>
        </div>
        
        <div class="row my-1 mx-2">
          <label for="nickname" class="p-0"> 닉네임 </label>
          <b-form-input class="p-0 px-2" v-model="nickname" id="nickname" type="text" required></b-form-input>
          <p v-if="multipleNickNameError">
            <span class="text-danger"> {{ multipleNickNameError }}  </span>
          </p>
          <span class="text-danger" v-if="nicknameAlertStatus"> 입력칸을 채워주세요 </span>
        </div>

        <div class="row my-1 mx-2">
          <label for="password" class="p-0"> 비밀번호 </label>
          <b-form-input class="p-0 px-2" v-model="password" id="password" type="password" required></b-form-input>
          <span v-if="passwordAlertStatus"> 입력칸을 채워주세요 </span>
        </div>

        <div class="row my-1 mx-2">
          <label for="passwordConfrimation" class="p-0"> 비밀번호 확인 </label>
          <b-form-input v-model="passwordConfirmation" class="p-0 px-2" id="passwordConfirmation" type="password" required>
          </b-form-input>
          <p v-if="invalidPasswordConfirm">
            <span> {{ invalidPasswordConfirm }}  </span>
          </p>
          <span v-if="passwordConfirmAlertStatus"> 입력칸을 채워주세요 </span>
        </div>
  
       <div class="row my-3 mx-2 ">
        <div class="d-flex justify-content-end px-0">
          <button class="btn my-button">sign up</button>
        </div>
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
</style>