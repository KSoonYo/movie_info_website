<template>
  <div class="px-4">
    <b-container class="pt-4 pb-0">
      <b-row>
        <b-col class="col-3 d-flex flex-column align-items-center" v-for="likeMovie in likeMovies"
        :key="likeMovie.id">
          <b-img style="height: 20vw;" thumbnail :src="likeMovie.poster_path" alt="Poster" class="pointer" @click="getMovie(likeMovie.id)"></b-img>
          <p class="mb-5">{{ likeMovie.title }}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'likeMovies',
  methods:{
    getMovie(movieId){
       this.$store.dispatch('getMovie', movieId)
    }
  },

  computed:{
    likeMovies(){
      return this.$store.state.likeMovies
    }
  },
 
}
</script>

<style>
.pointer:hover{
  cursor: pointer;
}

</style>