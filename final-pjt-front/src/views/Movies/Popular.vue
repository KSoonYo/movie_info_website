<template>
  <div>
    <b-container class="p-4">
      <b-row>
        <b-col @click="$router.push({name: 'MoviesListItem', params:{movieId: popularMovie.id}}).catch(()=>{})" v-for="popularMovie in popularMovies"
        :key="popularMovie.id">
          <b-img thumbnail :src="popularMovie.poster_path" alt="Poster"></b-img>
        </b-col>
      </b-row>
    </b-container>
    <button v-if="currentPage > 1" @click="getPrev">이전</button>
    <button v-if="popularMovies.length === moviesPageSize" @click="getNext"> 다음</button>
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
      return this.$store.state.popularMovies
    },
  },

  methods:{
    getNext(){
      this.currentPage = this.currentPage + 1
      this.$store.dispatch('setPopularMovies', this.currentPage)
    },

    getPrev(){
      this.currentPage = this.currentPage - 1 
      this.$store.dispatch('setPopularMovies', this.currentPage)
    }
  },

  created(){
    this.$store.dispatch('setPopularMovies', this.currentPage)
  }
  
}
</script>

<style>

</style>