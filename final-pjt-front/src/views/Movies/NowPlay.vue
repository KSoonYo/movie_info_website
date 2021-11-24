<template>
  <div>
    <!-- <b-container fluid class="p-4 container">
      <b-row class="row">
        <b-col class="col-2" @click="getNowMovie(nowMovie.id)" v-for="nowMovie in nowMovies" :key="nowMovie.id">
          <b-img class="my-3" style="height: 15vw;" thumbnail fluid :src="nowMovie.poster_path" alt="Image 1"></b-img>
        </b-col>
      </b-row>
    </b-container> -->

    <!-- <carousel-3d>
      <slide :index="idx" v-for="(nowMovie, idx) in nowMovies" :key="nowMovie.id">
        <img :src="nowMovie.poster_path" alt="Image">
      </slide>
    </carousel-3d> -->

    
    <VueSlickCarousel v-if="isGet" v-bind="settings" class="mt-5">
      <div v-for="(nowMovie) in nowMovies" :key="nowMovie.id">
        <img @click="getNowMovie(nowMovie.id)" :src="nowMovie.poster_path" alt="Image">
      </div>
    </VueSlickCarousel>

  </div>
</template>

<script>
// import { Carousel3d, Slide } from 'vue-carousel-3d'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'NowPlay',

  data() {
    return {
      isGet : false,
      settings: {
          "dots": true,
          "dotsClass": "slick-dots custom-dot-class",
          "autoplay": true,
          "draggable": false,
          // "focusOnSelect": true,
          // "centerMode": true,
          "edgeFriction": 0.35,
          "infinite": true,
          "speed": 500,
          "slidesToShow": 3,
          "slidesToScroll": 1,
          "pauseOnHover": false
      }
    }
  },

  components: {
    // Carousel3d,
    // Slide,
    VueSlickCarousel,
  },

  computed:{
    nowMovies(){
      return this.$store.state.nowPlayMovies
    },
  },

  watch:{
    nowMovies(){
      this.isGet = true
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

<style= scoped>

</style>
