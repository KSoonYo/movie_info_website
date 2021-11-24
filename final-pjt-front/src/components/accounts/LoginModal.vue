<template>
  <div>
     <aside>이미지</aside>
      <section class="d-flex flex-column">
        <h1>Login</h1>
        <p v-if="invalidationStatus">로그인 실패실패</p>
        <!-- 부트스트랩 login form 사용 예정 -->
        <form @submit="toLogin">
          <input :class="{'invalid-alert': usernameAlertStatus}" type="text" v-model="username">
          <span v-if="usernameAlertStatus"> 아이디를 입력해주세요 </span>
          <br>
          <input :class="[{'invalid-alert': passwordAlertStatus}]"  type="password" v-model="password">
          <span v-if="passwordAlertStatus"> 비밀번호를 입력해주세요 </span>
          <br>
          
          <button>login</button>
        </form>
        <form @submit="toSignUp">
          <button>sign up</button>
        </form>
      </section>
  </div>
</template>

<script>

export default {
  name: 'LoginModal',
  data(){
    return{
      username: '',
      password: '',
      usernameAlertStatus: false,
      passwordAlertStatus: false,
      invalidationStatus : false,
    }
  },

  methods:{
    toLogin(event){
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

      if(this.usernameAlertStatus || this.passwordAlertStatus){
        return
      }

      const payload = {
        username : this.username,
        password : this.password,
        instance: this
      }
      this.$store.dispatch('getToken', payload)
    },
    
    toSignUp(event){
      event.preventDefault()
      this.$emit('close')
      this.$router.push({name: 'SignUp'}).catch(()=>{})
    }
  }
}
</script>

<style>
.invalid-alert{
  border: 5px solid rgba(192, 36, 36, 0.856);
}
</style>