<template>
  <div>
    <nav-bar></nav-bar>
    <section class="container">
      <h1 class="col-2 offset-5 text-center my-4">영화</h1>
      <div class="row">
        <!-- <button @click="toNowPlay" class="col-1 offset-4  rounded"
        :class="[{'bg-dark': !isPopular}, {'text-white': !isPopular}]"
        > 개봉중 </button>
        <button @click="toPopular" class="col-1 offset-2  rounded"
        :class="[{'bg-dark': isPopular}, {'text-white': isPopular}]"
        > 인기 </button> -->

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
    NavBar,
  },
  
  data(){
    return{
      searchTarget : '',
    }
  },

  methods:{
    toNowPlay(){
      this.$store.dispatch('setNowPlayMovies', 0)
      this.isActive = true
    },
    toPopular(){
      this.$store.dispatch('setPopularMovies', {pageNum: 1})
      console.log('toPopular movies')
    },

  },

  computed:{
    isPopular(){
      return  this.$route.name === 'NowPlay' ? true : false
    },
  },

  

  // mount 되면 로컬스토리지에 남아있는 movie 정보를 빈값으로 초기화
  mounted(){
    this.$store.commit('DELETE_MOVIE_INFO')
  }
}
</script>

<style scoped>


</style>