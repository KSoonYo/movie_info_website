<template>
  <div>
    <section class="d-flex flex-column align-items-stretch align-items-center">
      <h1 class="mx-5 mt-5 mb-4 text-center">Login</h1>
      <!-- 부트스트랩 login form 사용 예정 -->
      <form @submit="toLogin" class="mx-5 d-flex flex-column">
        <div>
          <b-form-input type="text" id="username" v-model="username" placeholder="아이디" style="background-color: rgb(65, 65, 65); color: white; border-color: rgb(65, 65, 65);"></b-form-input>
        </div>
        <br>
        <div>
          <b-form-input type="password" id="password" v-model="password" placeholder="비밀번호" style="background-color: rgb(65, 65, 65); color: white; border-color: rgb(65, 65, 65);"></b-form-input>
        </div>
        <br>
        <button class="btn btn-primary">로그인</button>
        <div class="d-flex my-3 justify-content-between align-items-center">
          <span>아직 계정이 없으신가요?</span>
          <button @click="toSignUp" class="btn mt-0 btn-link">회원 가입</button>
        </div>
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
    }
  },

  methods:{
    toLogin(event){
      event.preventDefault()
      if(!this.username.trim() || !this.password.trim()){
        alert('빈 항목을 채워주세요.')
        return
      }

      const payload = {
        username : this.username,
        password : this.password
      }
      this.$emit('close')
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
.my-form{
  background-color: rgb(65, 65, 65);
  color: white;
}

.vm--modal {
  background: rgb(45, 45, 45) !important;
  color: white;
}
</style>