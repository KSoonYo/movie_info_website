<template>
  <div class="mb-5">
    <nav-bar></nav-bar>
    <section class="d-flex flex-column align-items-center container mt-5">
      <article class="row">
        <img class="col-4" :src="nowPlay.poster_path" alt="영화포스터">
        <div class="col-8">
          <h2>제목: {{ nowPlay.title}} </h2>
          <h3>원제: {{ nowPlay.original_title || nowPlay.title }} </h3>
          <span v-for="(genre, index) in genres" :key="index"> {{genre}} </span>
          <!-- <p class="mt-3"> 상영시간: {{nowPlay.runtime}}분 </p> -->
          <p> 영화 평점: {{nowPlay.vote_average}} </p>
          <p> 개봉일: {{nowPlay.release_date}} </p>
          <p class="mt-3">{{ nowPlay.overview }} </p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'NowMovie',
  components:{
    NavBar
  },
  data(){
    return{
    }
  },

  computed:{
    nowPlay(){
      return this.$store.state.nowPlay
    },

     genres(){
      return this.$store.state.nowPlay.genre_id.map(genreElem=>{
        return genreElem['genre']
      })
    },
  },

  created(){
    this.$store.dispatch('setNowPlayMovies', this.$route.query.movieId)
  }
}
</script>

<style>

</style>