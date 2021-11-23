<template>

  <section class="d-flex flex-column align-items-center container">
    <div class="row w-100">
      <h1 class="col-7 offset-5">영화 상세 페이지</h1>
      <button class="offset-11 col-1" @click="$router.go(-1)">뒤로가기</button>
    </div>
    <article class="row">
      <iframe :src="movie.trailer_path" frameborder="0" class="col-12 mb-5" style="width: 100vw; height: 40vw;"></iframe>
      <img class="col-4" :src="movie.poster_path" alt="영화포스터">
      <div class="col-8">
        <h2>제목: {{ movie.title}} </h2>
        <h3>원제: {{ movie.original_title || movie.title }} </h3>
        <span v-for="(genre, index) in genres" :key="index"> {{genre}} </span>
        <p class="mt-3"> 상영시간: {{movie.runtime}}분 </p>
        <p> 영화 평점: {{movie.vote_average}} </p>
        <span> {{ likeUsers }} 명이 이 영화를 좋아합니다. </span>
        <button @click="pressLikeButton" v-if="isLogin && !likeStatus">좋아요</button> 
        <button  @click="pressDisLikeButton" v-else-if="isLogin && likeStatus">좋아요 취소</button>
        <p class="mt-3">{{ movie.overview }} </p>
      </div>
      <!-- <iframe :src="videoURL" frameborder="0"></iframe> -->

    </article>

    <!-- 리뷰 -->
    <article class="w-100 mt-5 mx-0 px-0">
      <h2>댓글</h2>
      <div class="px-0 container">


          <table class="text-white row mx-0 pb-2" style="">
            <tbody class="px-0">
              <tr v-for="review in reviews" :key="review.id">
                <th class="col-2">{{ review.user }}</th>
                <td class="col-7">{{ review.content }}</td>
                <td class="col-1">{{ review.rank === 1 ? '★☆☆☆☆' : review.rank === 2 ? '★★☆☆☆' : review.rank === 3 ? '★★★☆☆' : review.rank === 4 ? '★★★★☆' : '★★★★★' }}</td>
                <td class="col-2">{{ review.created_at }}</td>
              </tr>
            </tbody>
          </table>


      </div>
      <form @submit="createReview" v-if="isLogin" class="mx-1">
        <select v-model="rank" name="rank" id="rank">
          <option value="1">★☆☆☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="3">★★★☆☆</option>
          <option value="4">★★★★☆</option>
          <option value="5">★★★★★</option>
        </select>
        <input type="text" v-model="reviewContent">
        <button>작성</button>
      </form>
    </article>

    <!-- 추천 영화 목록  -->
    <aside class="my-5 container px-0">
      <div class="row mx-1 px-0">
        <h3 class="col px-0">추천 영화 목록</h3>
      </div>
      <div class="container">
        <div class="row justify-content-between">
          <img class="movie-poster col-2 px-0" :src="recommendMovie.poster_path" alt="" v-for="recommendMovie in recommendMovies" :key="recommendMovie.id">
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
  table {
    border-radius: 0.5rem;
    background-color: rgb(34, 40, 49);
  }

  tbody {
    cursor: default;
  }

</style>