<template>
  <div>
    <nav-bar @search-content="search"></nav-bar>
    <section class="container">
      <h1 class="col-2 offset-5 text-center my-4">영화</h1>
      <div class="row">
        <router-link class="col-1 offset-4 text-decoration-none border text-center text-white rounded" :to="{name: 'NowPlay'}"> 개봉중 </router-link>
        <router-link class="col-1 offset-2 text-decoration-none border text-center text-white rounded" :to="{name: 'Popular'}"> 인기 </router-link>
        <router-view></router-view>
      </div>
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