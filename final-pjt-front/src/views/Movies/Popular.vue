<template>
  <div>
    <b-container class="p-4">
      <b-row>
        <b-col @click="getMovie(popularMovie.id)" v-for="popularMovie in popularMovies"
        :key="popularMovie.id">
          <b-img thumbnail :src="popularMovie.poster_path" alt="Poster"></b-img>
        </b-col>
      </b-row>
    </b-container>
    <button v-if="currentPage > 1 && !$route.query.searchKeyWord" @click="getPrev">이전</button>
    <button v-if="popularMovies.length === moviesPageSize && !$route.query.searchKeyWord" @click="getNext"> 다음</button>
  </div>
</template>

<script>

export default {
  name: 'Popular',
  data(){
    return{
      currentPage: 1
    }
  },

  computed:{
    moviesPageSize(){
      return this.$store.state.pagePerSize
    },

    popularMovies(){
      if(this.$route.query.searchKeyWord){
        // 검색 필터링
        return this.$store.state.popularMovies.filter(popularmovie=>{
          return popularmovie.title.includes(this.$route.query.searchKeyWord)
        })
      } else {
        return this.$store.state.popularMovies
      }
    },
  },

  methods:{
    getNext(){
      this.currentPage += 1

      const newPayload = {
        pageNum : this.currentPage,
        searchKeyWord : null
      }
      this.$store.dispatch('setPopularMovies', newPayload)
    },

    getPrev(){
      this.currentPage -= 1
      
       const newPayload = {
        pageNum : this.currentPage,
        searchKeyWord : null
      }
      this.$store.dispatch('setPopularMovies', newPayload)
    },

    getMovie(movieId){
      this.$store.dispatch('getMovie', movieId)
    }
  },

  created(){
    this.$store.commit('SET_SEARCH_KEY', this.$route.query.searchKeyWord)
    
    const payload = {
      pageNum : 1,
      searchKeyWord : this.$store.state.searchKeyWord
    }
    console.log('현재 위치 컴포넌트 이름', this.$route.name)

    if(this.$store.state.searchKeyWord){
      console.log('검색 필터링')
      console.log('검색 키워드', this.$route.query.searchKeyWord)
      // 검색 필터링 적용
      this.$store.dispatch('setPopularMovies', payload)
    } else{
      this.$store.dispatch('setPopularMovies', payload)
    }
  }
  
}
</script>

<style>

</style>