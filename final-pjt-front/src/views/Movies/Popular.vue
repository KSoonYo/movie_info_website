<template>
  <div>
    <b-container class="p-4">
      <b-row class="my-3">
        <b-col class="px-3 py-3" v-for="popularMovie in popularMovies"
        :key="popularMovie.id">
          <b-img style="height: 15vw;" thumbnail :src="popularMovie.poster_path" alt="Poster" class="pointer" @click="getMovie(popularMovie.id)"></b-img>
        </b-col>
      </b-row>
    </b-container>

    <div class="container" v-if=" !$route.query.searchKeyWord">
      <div class="row">
        <div class="col-1 offset-5 px-0">
          <div class="page-item disabled">
            <button class="page-link ms-auto rounded-0 rounded-start" v-if="currentPage === 1" @click="getPrev">&laquo;</button>
          </div>
          <div class="page-item">
            <button class="page-link ms-auto rounded-0 rounded-start" v-if="currentPage > 1" @click="getPrev">&laquo;</button>
          </div>
        </div>
        <div class="col-1 px-0">
          <div class="page-item" v-if="popularMovies.length === moviesPageSize">
            <button class="page-link rounded-0 rounded-end" @click="getNext">&raquo;</button>
          </div>
          <div class="page-item disabled" v-else>
            <button class="page-link rounded-0 rounded-end" @click="getNext">&raquo;</button>
          </div>
        </div>
      </div>
    </div>
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
.pointer:hover{
  cursor: pointer;
}
</style>