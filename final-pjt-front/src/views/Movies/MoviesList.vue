<template>
  <div>
    <nav-bar></nav-bar>
    <section class="container">
      <h1>영화 리스트</h1>
      <router-link :to="{name: 'NowPlay'}"> 최신 활동사진관 </router-link>
      <router-link :to="{name: 'Popular'}"> 명작 활동사진관 </router-link>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'MoviesList',
  components: {
    NavBar
  },

  

  // mount 되면 로컬스토리지에 남아있는 movie 정보를 빈값으로 초기화
  mounted(){
    this.$store.commit('DELETE_MOVIE_INFO')
  }
}
</script>

<style>

</style>