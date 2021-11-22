<template>
  <div>
     <aside>이미지</aside>
      <section class="d-flex flex-column">
        <h1>Login</h1>
        <!-- 부트스트랩 login form 사용 예정 -->
        <form @submit="toLogin">
          <input type="text" v-model="username">
          <br>
          <input type="text" v-model="password">
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

</style>