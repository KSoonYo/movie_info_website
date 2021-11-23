<template>
     <b-navbar toggleable="lg" type="light" class="bg-light">
       <b-navbar-nav>
        <b-navbar-brand class="logo" @click="$router.push('/').catch(()=>{})">NavBar</b-navbar-brand>
       </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown  text="Movies" right>
                <b-dropdown-item  @click="$router.push('/movies').catch(()=>{})">전체</b-dropdown-item>
                
          </b-nav-item-dropdown>

          <b-nav-item @click="$router.push('/community').catch(()=>{})">Community</b-nav-item>
        </b-navbar-nav>
        
        <b-navbar-nav v-if="!isLogin">
          <b-nav-item @click="showModal">Login</b-nav-item>
        </b-navbar-nav>
          
        <b-navbar-nav v-else>
          <b-nav-item  @click="logOut">Logout</b-nav-item>
          <b-nav-item  @click="showMyProfile" class="d-inline d-lg-none">Profile</b-nav-item>
          <b-nav-item v-if="isSuperUser"> <a :href="process.env.VUE_APP_ADMIN_URL">관리자 페이지</a> </b-nav-item>
        </b-navbar-nav>
      
        <b-navbar-nav>
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          </b-nav-form>
        </b-navbar-nav>

      </b-collapse>
      <login-modal v-if="!hideModal"></login-modal>
        
      <b-navbar-nav class="d-none d-lg-block">
        <b-nav-item>
          <img v-if="isLogin" v-b-toggle.sidebar-right src="../assets/logo.png" width="50px" height="30px" alt="">
        </b-nav-item>
      </b-navbar-nav>
      
      <b-sidebar id="sidebar-right" width="250px" title="프로필 페이지" right shadow>
        <div class="px-3 py-2">
          <b-img src="https://picsum.photos/500/500/?image=54" width="100px" fluid thumbnail></b-img>
          <p>
            <router-link :to="{name: 'Profile'}">좋아요 한 영화</router-link>
          </p>
          <p>
            <router-link :to="{name: 'Profile'}">내가 쓴 게시글</router-link>
          </p>
          <p>
            <router-link :to="{name: 'Profile'}">내가 쓴 리뷰</router-link>
          </p>
          <p>
            <router-link :to="{name: 'Profile'}">내가 쓴 댓글</router-link>
          </p>
          <p>
            <router-link :to="{name: 'Profile'}">추천을 누른 게시글</router-link>
          </p>
          <p>
            <router-link :to="{name: 'Profile'}">추천 영화</router-link>
          </p>
        </div>
    </b-sidebar>
    </b-navbar>
</template>

<script>
import LoginModal from '@/components/accounts/LoginModal'

export default {
  name: 'NavBar',
  data(){
    return{
      hideModal: true
    }
  },
  components:{
    LoginModal
  },

  computed: {
    isLogin(){
      return this.$store.getters.loginStatus
    },

    isSuperUser(){
      return this.$store.getters.isSuperUser
    }
  },

  methods:{
    showModal(){
      this.$modal.show(LoginModal, 
          {prpos: null}, 
          { name: 'LoginModal',
            draggable: true
          }
        )
    },

    showMyProfile(){
      this.$router.push({name: 'Profile'}).catch(()=>{})
    },
    
    logOut(){
      // 코드 순서 중요!(token을 가장 먼저 지워야 함)
      localStorage.removeItem('accessToken')
      this.$store.commit('DELETE_TOKEN')
      this.$store.commit('DELETE_USER_INFO')
      this.$router.push({name: 'Index'}).catch(()=>{})
    }
  },
} 
</script>

<style>
.logo{
  cursor: pointer;
}

.close{
  height: fit-content;
}
</style>