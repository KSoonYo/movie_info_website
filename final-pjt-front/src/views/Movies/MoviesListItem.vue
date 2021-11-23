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
      <button  @click="pressDislikeButton" v-else-if="isLogin && likeStatus">좋아요 취소</button>
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


export default {
  name: 'MoviesListItem',
  data(){
    return{
      videoURL: this.$store.state.movie.trailer_path,
      reviewContent : '',
      rank: 1,
      likeUsers : this.$store.state.movie.like_users.length
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


    likeStatus(){
      return this.$store.state.likeMovies.find(elem=>{
        return elem.id === this.movie.id
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
      this.$store.dispatch('pressLike', this.movie)
      this.likeUsers += 1

    },

    pressDislikeButton(){
      this.$store.dispatch('pressDislike', this.movie)
      this.likeUsers -= 1

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