<template>
  <div>
    <div class="mt-5">
      <h2 class="d-inline">현재 상영중</h2>
      <button class="float-end btn my-color" @click="toNowPlay">더보기 ></button>
    </div>
    <VueSlickCarousel v-if="isGet" v-bind="settings" class="mt-3">
      <div v-for="(nowMovie) in nowMovies" :key="nowMovie.id">
        <img @click="getNowMovie(nowMovie.id)" :src="nowMovie.poster_path" alt="Image">
      </div>
    </VueSlickCarousel>

    <div class="mt-5">
      <h2 class="mt-5 d-inline">인기 영화</h2>
      <button class="float-end btn my-color" @click="toPopular">더보기 ></button>
    </div>
    <VueSlickCarousel v-if="isGet" v-bind="settings" class="mt-3 mb-5">
      <div v-for="(popularMovie) in popularMovies" :key="popularMovie.id">
        <img @click="getMovie(popularMovie.id)" :src="popularMovie.poster_path" alt="Image">
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'TotalMovie',

  data() {
    return {
      isGet : false,
      settings: {
          "dots": true,
          "dotsClass": "slick-dots custom-dot-class",
          "autoplay": true,
          "draggable": false,
          // "focusOnSelect": true,
          "centerMode": true,
          "edgeFriction": 0.35,
          "infinite": true,
          "speed": 500,
          "slidesToShow": 4,
          "slidesToScroll": 1,
          "pauseOnHover": false
      }
    }
  },

  components: {
    VueSlickCarousel,
  },

  computed:{
    nowMovies(){
      return this.$store.state.nowPlayMovies
    },

    popularMovies(){
      if(this.searchKey){
        console.log('검색 필터링 실행')
        return this.$store.state.popularMovies.filter(popularmovie=>{
          return popularmovie.title.includes(this.$route.query.searchKeyWord)
        })
      } else {
        return this.$store.state.popularMovies
      }
    },

    searchKey(){
      return this.$store.state.searchKeyWord
    }
  },

  watch:{
    nowMovies(){
      this.isGet = true
    },
  },

  methods:{
    getNowMovie(movieId){
      this.$store.dispatch('getNowMovie', movieId)
    },

    getMovie(movieId){
      this.$store.dispatch('getMovie', movieId)
    },

    toNowPlay(){
      this.$store.dispatch('setNowPlayMovies', 0)
      this.$router.push({name: 'NowPlay'})
    },

    toPopular(){
      this.$store.dispatch('setPopularMovies', {pageNum: 1})
      this.$router.push({name: 'Popular'})
    },
  },

  created(){
    this.$store.dispatch('setNowPlayMovies', 0)
    this.$store.commit('SET_SEARCH_KEY', this.$route.query.searchKeyWord)
    
    const payload = {
      pageNum : 1,
      searchKeyWord : this.$store.state.searchKeyWord
    }

    this.$store.dispatch('setPopularMovies', payload)
  }
}
</script>

<style scoped>
img {
  width: 250px;
  height: 375px;
}

img:hover {
  cursor: pointer;
}

.my-color {
  color: rgb(175, 168, 168)
}
</style>