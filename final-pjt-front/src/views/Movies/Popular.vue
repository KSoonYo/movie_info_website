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
    <div class="container">
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
    },

    getMovie(movieId){
      this.$store.dispatch('getMovie', movieId)
    }
  },

  created(){
    this.$store.dispatch('setPopularMovies', this.currentPage)
  }
  
}
</script>

<style>
.pointer:hover{
  cursor: pointer;
}
</style>