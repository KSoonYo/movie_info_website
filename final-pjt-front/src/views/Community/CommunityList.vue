<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <h1>게시판</h1>
      <community-menu/>

      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>

    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import CommunityMenu from '@/components/community/CommunityMenu'


export default {
  name: 'CommunityList',
  components:{
    NavBar,
    CommunityMenu
  },

  created(){
    // 게시판을 누르자마자 전체게시판 목록을 바로 볼 수 있도록 구성
    this.$router.push('/community/all-community').catch(()=>{})
  }
}
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
   transition: all 0.2s ease;
  }

.slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }

 .slide-fade-leave-to{
    transform: translateX(-10px);
    opacity: 0;
   }

</style>
