<template>
  <div>
     <b-navbar toggleable="lg" type="light" class="backg-black">
       <b-navbar-nav>
        <b-navbar-brand class="logo" @click="$router.push('/').catch(()=>{})">NavBar</b-navbar-brand>
       </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown  text="Movies" right>
                <b-dropdown-item @click="$router.push('/movies/popular').catch(()=>{})">전체</b-dropdown-item>
                
          </b-nav-item-dropdown>

          <b-nav-item @click="$router.push({name: 'AllCommunity'}).catch(()=>{})">Community</b-nav-item>
        </b-navbar-nav>
        
        <b-navbar-nav v-if="!isLogin">
          <b-nav-item @click="showModal">Login</b-nav-item>
        </b-navbar-nav>
          
        <b-navbar-nav v-else>
          <b-nav-item  @click="logOut">Logout</b-nav-item>
          <b-nav-item  @click="showMyProfile" class="d-inline d-lg-none">Profile</b-nav-item>
          <b-nav-text class="me-2">
            <a v-if="isSuperUser" :href="adminUrl" class="text-secondary text-decoration-none">관리자 페이지</a>
          </b-nav-text>
        </b-navbar-nav>
      
        <b-navbar-nav>
          <b-nav-form @submit="search">
            <b-form-input v-model="searchContent" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
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
            <router-link :to="{name: 'likeMovies'}">좋아요 한 영화</router-link>
          </p>
          <p>
            <router-link :to="{name: 'myArticles'}">내가 쓴 게시글</router-link>
          </p>
          <p>
            <router-link :to="{name: 'myReviews'}">내가 쓴 리뷰</router-link>
          </p>
          <p>
            <router-link :to="{name: 'myComments'}">내가 쓴 댓글</router-link>
          </p>
          <p>
            <router-link :to="{name: 'likeArticles'}">추천을 누른 게시글</router-link>
          </p>
      
        </div>
    </b-sidebar>
    </b-navbar>

  </div>
</template>

<script>
import LoginModal from '@/components/accounts/LoginModal'

export default {
  name: 'NavBar',
  data(){
    return{
      hideModal: true,
      searchContent: ''
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
    },

    adminUrl () {
      return process.env.VUE_APP_ADMIN_URL
    }
  },

  methods:{
    showModal(){
      this.$modal.show(LoginModal, 
          {prpos: null}, 
          { name: 'LoginModal',
            draggable: true,
            width: '500px',
            height: 'auto',
            scrollable: true
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
    },

    search(event){
      event.preventDefault()
      console.log('다음에 가야 할 컴포넌트 이름', this.$route.name)

      const nextTo = this.$route.name

      this.$store.commit('SET_SEARCH_KEY', this.searchContent)
      this.$emit('search-content', nextTo)
    }
  },

  created(){
    // console.log(this.$route.name)
    // 현재 루트에 있는 공간의 이름 얻기
  }
} 
</script>

<style>
.logo{
  cursor: pointer;
}

.close{
  height: fit-content;
}

.backg-black {
  background-color: white;
}

.text-white {
  color: white;
}
</style>