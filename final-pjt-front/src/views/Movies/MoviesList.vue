<template>
  <div>
    <nav-bar @search-content="search"></nav-bar>
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
  
  data(){
    return{
      searchTarget : ''
    }
  },

  methods:{
    search(nextTo){
      console.log('다음 경로 컴포넌트', nextTo)
      console.log('쿼리 파라미터', this.$store.state.searchKeyWord)
      this.$router.push({name: nextTo, query:{searchKeyWord: this.$store.state.searchKeyWord }}) // 검색 키워드를 가지고 이동
    }
  },


  // mount 되면 로컬스토리지에 남아있는 movie 정보를 빈값으로 초기화
  mounted(){
    this.$store.commit('DELETE_MOVIE_INFO')
  }
}
</script>

<style>

</style>