<template>
  <section>
    <h1>영화 상세 페이지</h1>
    <button @click="$router.go(-1)">뒤로가기</button>
    <article>
      <h2>제목: {{ movie.title}} </h2>
      <h3>원제: {{ movie.original_title || movie.title }} </h3>
      <span v-for="(genre, index) in genres" :key="index"> {{genre}} </span>
      <img class="d-block" :src="movie.poster_path" alt="영화포스터">
      <p>줄거리: {{ movie.overview }} </p>
      <p>상영시간: {{movie.runtime}}분 </p>
      <p> 영화 평점: {{movie.vote_average}} </p>
      <button @click="pressLikeButton" v-if="isLogin && !likeStatus">좋아요</button> 
      <button  @click="pressLikeButton" v-else-if="isLogin && likeStatus">좋아요 취소</button>
      <span> {{ likeUsers }} 명이 이 영화를 좋아합니다. </span>
      <!-- <iframe :src="videoURL" frameborder="0"></iframe> -->

    </article>

    <!-- 리뷰 -->
    <article>
      <h2> 리뷰 목록</h2>
      <div>
        <p v-for="review in reviews" :key="review.id">
          {{ review  }}
        </p>
      </div>
      <form @submit="createReview" v-if="isLogin">
        <select v-model="rank" name="rank" id="rank">
          <option value="1">*####</option>
          <option value="2">**###</option>
          <option value="3">***##</option>
          <option value="4">****#</option>
          <option value="5">*****</option>
        </select>
        <input type="text" v-model="reviewContent">
        <button>작성</button>
      </form>
    </article>

    <!-- 추천 영화 목록  -->
      <aside>
        <h3> 추천 영화 목록 </h3>
        <div class="container">
          <div class="row">
            <img class="movie-poster col-2" :src="recommendMovie.poster_path" alt="" v-for="recommendMovie in recommendMovies" :key="recommendMovie.id">
          </div>
        </div>
      </aside>

  </section>
</template>

<script>
import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BACK_END_URL
const accessToken = localStorage.getItem('accessToken')

export default {
  name: 'MoviesListItem',
  data(){
    return{
      movie : this.$store.state.movie,
      videoURL: this.$store.state.movie.trailer_path,
      reviewContent : '',
      rank: 1,
      likeUsers: this.$store.state.movie.like_users.length,
      likeStatus : this.$store.state.movie.like_users.includes(
        accessToken ? JSON.parse(atob(accessToken.split('.')[1])).user_id  : ''
        )
    }
  },

  computed:{
    genres(){
      return this.movie.genre_id.map(genreElem=>{
        return genreElem['genre']
      })
    },

    reviews(){
      return this.$store.state.reviews
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
      this.$store.dispatch('pressLike', this.movie.id)
        // 영화 정보 상태 업데이트
        // 추천 영화 정보 업데이트
      this.$store.dispatch('getMovie', this.movie.id)
      this.$store.dispatch('getRecommendMovies', this.movie.id)

      
      // console.log(this.movie.like_users)
      // TODO: 아래 POST 요청을 store로 이관하기
      // 현재 로그인한 유저가 좋아하는 영화 목록에 push & pop
      // 이 때 좋아하는 영화 목록에는 영화 id가 들어있어야 함
      axios.post(`${BASE_URL}movies/${this.movie.id}/like/`, {}, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(()=>{
        // 영화 정보 상태 업데이트
        // 추천 영화 정보 업데이트
        this.$store.dispatch('getMovie', this.movie.id)
        this.$store.dispatch('getRecommendMovies', this.movie.id)


        // 좋아요 영화 업데이트
        const payload = {
          title: this.movie.title,
          id: this.movie.id
        }
        this.$store.commit('UPDATE_LIKE_MOVIES', payload)

        this.likeUsers = this.likeStatus ? this.likeUsers-1 : this.likeUsers+1 
        this.likeStatus = !this.likeStatus

      })
      .catch(()=>{
        alert('로그인이 필요합니다!')
      })
    },

    pressDislikeButton(){
      this.$store.dispatch('pressDislike', this.movie)
      this.$store.dispatch('getMovie', this.movie.id)
      this.$store.dispatch('getRecommendMovies', this.movie.id)

    },

    createReview(event){
      event.preventDefault()
      const selectedIndex = event.target[0].options.selectedIndex
      const payload = {
        movieId : this.movie.id,
        content: this.reviewContent,
        rank: selectedIndex === 0 ? 1 : selectedIndex === 1 ? 2 : selectedIndex === 2 ? 3 :
        selectedIndex === 3 ? 4 : 5 
      }
      this.$store.dispatch('createReview', payload)
    }

  },

  // 페이지 렌더링할 때 리뷰 목록 불러오기 + 추천 영화 목록 불러오기
  created(){   
    this.$store.dispatch('getReviews', this.movie.id)
    this.$store.dispatch('getRecommendMovies', this.movie.id)
  }

  
  
}
</script>

<style scoped>

</style>