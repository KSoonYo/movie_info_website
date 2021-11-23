<template>
  <div>
    <div v-for="likeMovie in likeMovies"
      :key="likeMovie.id">
      <img :src="likeMovie.poster_path ? likeMovie.poster_path : ''" 
      alt="영화이미지">
      <p>
        {{ likeMovie.title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'likeMovies',
  computed:{
    likeMovies(){
      return this.$store.state.likeMovies
    }
  },
 
}
</script>

<style>

</style>