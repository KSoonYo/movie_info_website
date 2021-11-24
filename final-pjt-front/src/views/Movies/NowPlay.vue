<template>
  <b-container fluid class="p-4">
  <b-row>
    <b-col @click="getNowMovie(nowMovie.id)" v-for="nowMovie in nowMovies" :key="nowMovie.id">
      <b-img thumbnail fluid :src="nowMovie.poster_path" alt="Image 1"></b-img>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'NowPlay',

  computed:{
    nowMovies(){
      return this.$store.state.nowPlayMovies
    }
  },

  methods:{
    getNowMovie(movieId){
      this.$store.dispatch('getNowMovie', movieId)
    }
  },

  created(){
    this.$store.dispatch('setNowPlayMovies', 0)
  }
}
</script>

<style scoped>

</style>
