<template>
  <div class="backg-black py-2">
    <b-navbar toggleable="lg" type="light" class="container bar">
      <b-navbar-nav>
        <b-navbar-brand class="logo text-white ms-2 me-5 text-center" @click="$router.push({name: 'TotalMovie'}).catch(()=>{})">
           <span class="logo-text">夜심</span>
           <br>
           <span class="logo-text">영화관</span>      
        </b-navbar-brand>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse" style="background-color: white;"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <div class="d-flex"> -->
          <b-navbar-nav class="col-lg-1">
            <b-nav-item @click="$router.push({name: 'TotalMovie'}).catch(()=>{})"> Movies </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="col-lg-1">
            <b-nav-item @click="$router.push({name: 'AllCommunity'}).catch(()=>{})">Community</b-nav-item>
          </b-navbar-nav>
        <!-- </div> -->

        <!-- <div> -->
          <b-navbar-nav class="col-lg-2 offset-lg-2">
            <b-nav-form @submit="search">
              <b-form-input v-model="searchContent" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            </b-nav-form>
          </b-navbar-nav>
        <!-- </div> -->
        
        <!-- <div class="d-flex"> -->
          <b-navbar-nav v-if="!isLogin" class="col-lg-1 offset-lg-5">
            <b-nav-item @click="showModal">Login</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLogin" class="col-lg-2 offset-lg-2">
            <b-nav-text class="me-2">
              <a v-if="isSuperUser" :href="adminUrl" class="text-decoration-none my-a">관리자 페이지</a>
            </b-nav-text>
          </b-navbar-nav>
          
          <b-navbar-nav v-if="isLogin" class="d-lg-none col-lg-1">
            <b-nav-item  @click="showMyProfile">Profile</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLogin" class="col-lg-1">
            <b-nav-item  @click="logOut">Logout</b-nav-item>
          </b-navbar-nav>
        <!-- </div> -->

          <b-navbar-nav v-if="isLogin" class="d-none d-lg-block col-lg-1">
            <b-nav-item>
              <i v-b-toggle.sidebar-no-header class="far fa-user-circle my-logo"></i>
            </b-nav-item>
          </b-navbar-nav>
      </b-collapse>
      <login-modal v-if="!hideModal"></login-modal>
        
      
      <b-sidebar id="sidebar-no-header" 
      width="250px" 
      title="프로필 페이지"
      aria-labelledby="sidebar-no-header-title" 
      bg-variant="secondary"
      no-header
      right shadow>
        <template v-slot:default="{hide}">
          <div class="px-3 py-2 ms-3 ">
            <div class="d-flex justify-content-center">
              <i class="far fa-user-circle my-profile mt-5"></i>
            </div>
            <b-nav vertical class="mt-3">
              <b-nav-item @click="hide" class="my-2">
                <router-link :to="{name: 'likeMovies'}" class="text-decoration-none text-dark like-movies"> <b-icon class="mx-2" icon="film"></b-icon> 좋아요 한 영화</router-link>
              </b-nav-item>
              <b-nav-item @click="hide" class="my-2">
                <router-link :to="{name: 'likeArticles'}" class="text-decoration-none text-dark like-articles"> <b-icon class="mx-2" icon="hand-thumbs-up"></b-icon> 추천을 누른 게시글</router-link>
              </b-nav-item>
              <b-nav-item @click="hide" class="my-2">
                <router-link :to="{name: 'myArticles'}" class="text-decoration-none text-dark my-articles">  <b-icon class="mx-2" icon="brush"></b-icon> 내가 쓴 게시글</router-link>
              </b-nav-item>
              <b-nav-item @click="hide" class="my-2">
              <router-link :to="{name: 'myReviews'}" class="text-decoration-none text-dark my-reviews"> <b-icon class="mx-2" icon="journal"></b-icon> 내가 쓴 리뷰</router-link>
              </b-nav-item>
              <b-nav-item @click="hide" class="my-2">
                <router-link :to="{name: 'myComments'}" class="text-decoration-none text-dark my-comments"> <b-icon class="mx-2" icon="chat-left-dots"></b-icon> 내가 쓴 댓글</router-link>
              </b-nav-item>
            </b-nav>
            <div class="container">
             <div class="row justify-content-center my-2">
               <b-button @click="hide"> close </b-button>   
             </div>
            </div>
          </div>
          

        </template>
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

      const nextTo = this.$route.name // 현재 위치 컴포넌트

      // 검색 필터링 적용
      this.$store.commit('SET_SEARCH_KEY', this.searchContent)
      nextTo === 'Popular' ? this.$store.dispatch('setPopularMovies', {pageNum: 0, searchKeyWord: this.$store.state.searchKeyWord}) :
      nextTo === 'TotalMovie' ? this.$store.dispatch('setPopularMovies', {pageNum: 0, searchKeyWord: this.$store.state.searchKeyWord}) :
      nextTo === 'MoviesListItem' ? this.$store.dispatch('setPopularMovies', {pageNum: 0, searchKeyWord: this.$store.state.searchKeyWord}) :
      nextTo === 'NowMovie' ? this.$store.dispatch('setPopularMovies', {pageNum: 0, searchKeyWord: this.$store.state.searchKeyWord}) :
      this.$router.push({name: nextTo, query:{searchKeyWord: this.$store.state.searchKeyWord }}).catch(()=>{})

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
  text-align: center;
  border: 0.2rem solid #fff; 
  border-radius: 2rem; padding: 0.4em; 
  box-shadow: 0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #4e3957, 0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
}



.logo-text{
  text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px rgb(231, 44, 200),
      0 0 80px rgb(221, 29, 29), 0 0 90px rgba(232, 7, 240, 0.89), 0 0 100px rgb(230, 21, 195), 0 0 150px #0fa;
}

.close{
  height: fit-content;
}

.backg-black {
  background-color: rgb(0, 0, 0);
}

.text-white{
  color: white;
}

.nav-item > a{
  color: rgb(220, 220, 220) !important;
}

.nav-item > a:hover{
  color: white !important;
}

.my-a {
  color: rgb(220, 220, 220) !important;
}

.my-a:hover{
  color: white !important;
}

.my-logo{
  font-size: 2rem;
}

.my-profile{
  font-size : 7rem;
}

.like-movies:hover, .like-articles:hover, .my-articles:hover,
.my-reviews:hover, .my-comments:hover
{
  font-weight: bold;
}
</style>