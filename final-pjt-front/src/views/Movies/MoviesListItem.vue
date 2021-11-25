<template>
<div>
  <nav-bar></nav-bar>
  <section class="d-flex flex-column align-items-center container mt-5">
    <!-- <div class="row w-100">
      <button class="offset-11 col-1 btn mt-5 mb-2" @click="$router.push({name: 'Popular'}).catch(()=>{})" style="background-color: rgb(111, 74, 142); color: white;">뒤로가기</button>
      <button class="offset-11 col-1 btn mt-5 mb-2" @click="back" style="background-color: rgb(111, 74, 142); color: white;">뒤로가기</button>
    </div> -->
    <article class="row">
      <img class="col-4" :src="movie.poster_path" alt="영화포스터" style="height: 30vw;">
      <div class="col-8">
        <h2>{{ movie.title}} </h2>
        <h3>{{ movie.original_title || movie.title }} </h3>
        <span v-for="(genre, index) in genres" :key="index"> {{genre}} </span>
        <p class="mt-3"> 상영시간: {{movie.runtime}}분 </p>
        <p> 영화 평점: {{movie.vote_average}} </p>
        <p class="mt-3">{{ movie.overview }} </p>
      </div>
      <!-- <iframe :src="videoURL" frameborder="0"></iframe> -->

    </article>

    <div class="d-flex flex-column align-items-center my-5">
      <button @click="pressLikeButton" v-if="isLogin && !likeStatus" class="btn text-primary"><i class="far fa-thumbs-up"></i></button> 
      <button @click="pressDislikeButton" v-else-if="isLogin && likeStatus" class="btn text-primary"><i class="fas fa-thumbs-up"></i></button>
      <span> {{ likeUsers }} 명이 이 영화를 좋아합니다. </span>
    </div>

    <div class="container px-0">
      <h2>예고편</h2>
      <div class="row">
        <iframe :src="movie.trailer_path" frameborder="0" class="col-12 mb-5" style="width: 100vw; height: 40vw;"></iframe>
      </div>
    </div>

    <!-- 리뷰 -->
    <article class="w-100 mx-0 my-4 p-4 my-bg rounded">
      <h2>리뷰</h2>
      <div class="px-0 container">
        <div v-if="!reviews.length" style="background-color: rgb(34, 40, 49);" class="py-3 ps-2 rounded">아직 리뷰가 없어요...</div>
        <div v-for="review in reviews" :key="review.id" class="my-repl p-2 my-1 rounded">
          <div class="d-flex justify-content-between">
            <strong class="pb-0 my-auto">{{ review.user }}</strong>
            <button v-if="!!createdRevieswByMe.find(myReview=>{
                return myReview.id === review.id
              })"
              class="btn btn-link"
              @click="deleteReview(review.id)"
            >
            <i class="fas fa-trash-alt text-danger"></i>
            </button>
          </div>
          <hr class="mt-1">
          <div class="d-flex justify-content-between">
            <p>{{ review.content }}</p>
            <div>
              <span>{{ review.rank === 1 ? '★☆☆☆☆' : review.rank === 2 ? '★★☆☆☆' : review.rank === 3 ? '★★★☆☆' : review.rank === 4 ? '★★★★☆' : '★★★★★' }}</span>
              <span class="my-font-1 ms-5"> 작성 시간: {{ review.created_at }} </span>
            </div>
          </div>
        </div>
      </div>
   

      <form @submit="createReview" v-if="isLogin" class="mt-3">
        <div>
          <select v-model="rank" name="rank" id="rank" style="background-color: rgb(34, 40, 49); color: white; border-color: rgb(34, 40, 49);">
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
          </select>
        </div>
        <div class="mt-2">
          <b-form-textarea
            id="textarea"
            v-model="reviewContent"
            placeholder="(최대 100자)"
            rows="3"
            max-rows="4"
            style="background-color: rgb(34, 40, 49); color: white; border-color: rgb(34, 40, 49);"
          >
          </b-form-textarea>
        </div>
        <button class="mt-2 btn" style="background-color: rgb(111, 74, 142); color: white;">작성</button>
      </form>
    </article>

    <!-- 추천 영화 목록  -->
    <article class="my-5 w-100 px-0">
      <div class="px-0">
        <h3 class="px-0">추천 영화 목록</h3>
      </div>
      <div class="container px-0">
        <div v-if="recommendMovies.length" class="row mx-0" :class="{'d-flex justify-content-between': recommendMovies.length === 5}">
          <img @click="getRecommendMovie(recommendMovie.id)" class="movie-poster col-2 px-0" :class="{'ms-5': idx > 0}" :src="recommendMovie.poster_path" alt="" v-for="(recommendMovie, idx) in recommendMovies" :key="recommendMovie.id">
        </div>
        <div class="my-5" v-else>
          <p>
            {{ recommendMovies.message }}
          </p>
        </div>
      </div>
    </article>

  </section>

</div>

</template>
<script src="https://kit.fontawesome.com/7e32e07830.js" crossorigin="anonymous"></script>
<script>

import {timeMark} from '@/utils/datetime'
import NavBar from '@/components/NavBar'

export default {
  name: 'MoviesListItem',
  components:{
    NavBar
  },
  
  data(){
    return{
      reviewContent : '',
      rank: 1,
    }
  },

  computed:{
    genres(){
      return this.movie.genre_id.map(genreElem=>{
        return genreElem['genre']
      })
    },

    movie(){
      return this.$store.state.movie
    },

    videoURL(){
      return this.$store.state.movie.trailer_path
    },

    likeStatus(){
      return this.$store.state.likeMovies.find(elem=>{
        return elem.id === this.movie.id
      })
    },

    likeUsers(){
      return this.$store.state.movie.like_users.length
    },
    reviews(){
     
      return this.$store.state.reviews.map(review=>{
        return {
          ...review,
          created_at : timeMark(review.created_at)
        }
      })
    },

    createdRevieswByMe(){
      return this.$store.state.myReviews
    },

    recommendMovies(){
      return this.$store.state.recommendMovies
    },

    isLogin(){
      return this.$store.getters.loginStatus
    },

  },

  methods: {
    // review 생성
    // createReview(){
    //   axios.post(`${BASE_URL}movies/${this.movie.id}/review/`, {
        
    //   })
    // }

    // 좋아요, 싫어요
    pressLikeButton(){
      this.$store.dispatch('pressLike', this.movie)
      this.likeUsers += 1

    },

    pressDislikeButton(){
      this.$store.dispatch('pressDislike', this.movie)
      this.likeUsers -= 1

    },

    createReview(event){
      event.preventDefault()
      if(this.reviews.find(review=>{ return review.user === this.$store.state.nickname})){
        alert('리뷰는 한번만 작성하실 수 있습니다.')
        this.reviewContent = ''
        return
      }
      const selectedIndex = event.target[0].options.selectedIndex
      const payload = {
        movieId : this.movie.id,
        content: this.reviewContent,
        rank: selectedIndex === 0 ? 1 : selectedIndex === 1 ? 2 : selectedIndex === 2 ? 3 :
        selectedIndex === 3 ? 4 : 5 
      }
      this.$store.dispatch('createReview', payload)
      this.reviewContent = ''
    },

    deleteReview(reviewId){
      const payload = {
        movieId : this.movie.id,
        reviewId 
      }
      this.$store.dispatch('deleteReview', payload)
    },

    getRecommendMovie(movieId){
      this.$store.dispatch('getMovie', movieId)
    },

    // back(){
    //   const nowMovieId = this.movie.id
    //   this.$store.dispatch('toBack', nowMovieId)

    // }

  },

  // 페이지 렌더링할 때 리뷰 목록 불러오기 + 추천 영화 목록 불러오기 + 현재 영화 정보 요청
  created(){
    this.$store.dispatch('getMovie', this.movie.id)
  
  }

  
  
}
</script>

<style scoped>
/* table {
  border-radius: 0.5rem;
  background-color: rgb(34, 40, 49);
}

tbody {
  cursor: default;
}

tbody:hover {
  background-color: rgb(34, 40, 49);
} */

.movie-poster:hover {
    cursor: pointer;
}

.my-bg {
  background-color: rgb(39, 46, 56);
}

.my-repl {
  background-color: rgb(34, 40, 49);
}

.my-font-1 {
  font-size: 2px;
  color: rgb(190, 190, 190);
}
</style>