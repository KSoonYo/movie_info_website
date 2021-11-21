<template>
  <section>
    <h1>영화 상세 페이지</h1>
    <article>
      <h2>제목: {{ movie.title}} </h2>
      <p>줄거리: {{movie.overview}} </p>
    </article>

  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MoviesListItem',
  data(){
    return{
      movie: null
    }
  },
  created(){
    const accessToken = localStorage.getItem('accessToken') || ''
    axios.get(`${process.env.VUE_APP_BACK_END_URL}movies/${this.$route.params.movieId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
      .then(res=>{
        // console.log(res)
        this.movie = res.data
      })
  }
}
</script>

<style>

</style>