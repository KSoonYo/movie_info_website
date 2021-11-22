import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)


axios.defaults.baseURL = process.env.VUE_APP_BACK_END_URL

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: state =>({
      accessToken: state.accessToken,
      movie: state.movie,
      nickname: state.nickname,
      likeMovies: state.likeMovies,
      likeArticles: state.likeArticles,
      myComments: state.myComments,
      myArticles: state.myArticles,
      myReviews: state.myReviews
    })
  })],
  state: {
    // User
    accessToken : '',
    nickname: '',
    likeMovies: [],
    likeArticles: [],
    myComments: [],
    myArticles: [],
    myReviews: [],
   
    pagePerSize : 6,
    // Movie
    movie: '',
    nowPlayMovies : [],
    popularMovies: [],
    reviews: [],

    // Community
    articles : [],
  },

  getters: {
    loginStatus(state){
      return !!state.accessToken
    },

    likeUsers(state){
      return state.movie ? state.movie.like_users : '' 
    },

    isSuperUser(state){
      return JSON.parse(atob(state.accessToken.split('.')[1])).is_superuser
    }
  },

  mutations: {
    SET_TOKEN(state, newAccessToken){
      state.accessToken = newAccessToken
    },

    SET_PROFILE(state, userData){
      state.nickname = userData.nickname
      state.likeMovies = userData.like_movies
      state.likeArticles = userData.recommend_articles
      state.myArticles = userData.article_set
      state.myComments = userData.comment_set
      state.myReviews = userData.review_set

      console.log('유저 셋팅 완료!')
    },

    DELETE_TOKEN(state){
      state.accessToken = ''
      
    },

    DELETE_USER_INFO(state){
      state.nickname = ''
      state.likeMovies = []
      state.likeArticles = []
      state.myArticles = []
      state.myComments = []
      state.myReviews = []
    },

    DELETE_MOVIE_INFO(state){
      state.movie = ''
    },

    SET_NOW_MOVIES(state, newMovies){
      state.nowPlayMovies = newMovies
    },

    SET_POPULAR_MOVIES(state, popularMovies){
      state.popularMovies = popularMovies
    },

    // 리뷰 목록 셋팅
    SET_REVIEWS(state, reviews){
      state.reviews = reviews
    },


    // 리뷰 작성
    CREATE_REVIEW(state, newReview){
      state.reviews.push(newReview)
    },

    GET_MOVIE(state, movieData){
      state.movie = movieData
      router.push({name: 'MoviesListItem', query:{movieId: movieData.id}}).catch(()=>{})
    },

    // 유저 좋아요 영화 업데이트
    UPDATE_LIKE_MOVIES(state, payload){
      const includeStatus = !!state.likeMovies.find(elem=>{
        return elem.id === payload.id
      })  
      if(includeStatus){
        const index = state.likeMovies.find(elem=>{ return elem.id === payload.id })
        state.likeMovies.splice(state.likeMovies.indexOf(index), 1)
      } else{
        state.likeMovies.push(payload)
      }
      
    },

    // 좋아요, 좋아요 취소
    GET_MY_MOVIE(state, myMovie){
      state.likeMovies.push(myMovie)
    },

    DELETE_MY_MOVIE(state, myMovie){
      const targetMovieIndex = state.likeMovies.find(elem=>{
        return elem.id === myMovie.id
      })
      state.likeMovies.splice(state.likeMovies.indexOf(targetMovieIndex), 1)
    },


    // 게시글 셋팅
    SET_ARTICLES(state, articles){
      state.articles = articles
    },

    // 게시글 작성
    CREATE_ARTICLE(state, newArticle){
      state.articles.push(newArticle)
      
      const newMyArticle = {
        id: newArticle.id,
        title: newArticle.title,
        category: newArticle.category
      }
      state.myArticles.push(newMyArticle)
    }


  },

  actions: {
    // 로그인 시 토큰 획득
    getToken({commit, dispatch}, {username, password}){
      // drf 문서 참고해서 token부분 받기
      // superuser인지 체크
      // username, password 공백 체크
      axios.post('/api/token/', {username, password})
        .then(response=>{
          localStorage.setItem('accessToken', response.data.access)
          commit('SET_TOKEN', response.data.access)
          dispatch('getProfile', username)
        })
        
    },

    // 유저 정보 조회
    getProfile({commit, state}, username){
      axios({
        method: 'get',
        url: `/accounts/profile/${username}/`,
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        } 
      }).then(res=>{
          commit('SET_PROFILE', res.data)
          router.push({name: 'MoviesList'}).catch(()=>{})
        })
    },

    // setNowPlayMovies(){
    //   axios.get('')
    //     .then(res=>{
    //       // commit('SET_NOW_MOVIES', res.data)
    //     })
    // },

    
    // 인기 영화 목록 조회
    setPopularMovies({commit}, pageNum){
      const pageParam = pageNum ? `?page=${pageNum}` : ''
      axios.get(`/movies/${pageParam}`)
        .then(res=>{
          commit('SET_POPULAR_MOVIES', res.data.results)
        })
    },

    // 단일 영화 조회
    getMovie({commit}, movieId){
      axios.get(`/movies/${movieId}/`)
      .then(res=>{
        commit('GET_MOVIE',res.data)
      })
    },


    // 리뷰 목록 조회
    getReviews({commit}, movieId){
      axios.get(`/movies/${movieId}/review/`)
        .then(res=>{
          commit('SET_REVIEWS', res.data)
        })
    },


    // 리뷰 작성하기
    createReview({commit, state}, payload){
      axios.post(`/movies/${payload.movieId}/review/`, {
        content: payload.content,
        rank: payload.rank
      }, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(res=>{
        commit('CREATE_REVIEW', res.data)
      })
      .catch(error=>{
        console.log(error)
        alert('로그인이 필요합니다!')
      })
    },

    // 게시글 목록 조회
    getArticles({commit}){
      axios.get('/articles/')
        .then(res=>{
          commit('SET_ARTICLES', res.data.results)
        })
    },

    // 게시글 작성
    createArticle({commit, state}, payload){
      axios.post('/articles/', payload, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(res=>{
        commit('CREATE_ARTICLE', res.data)
        router.go(-1)
      })
    }
  },
  modules: {
  }
})
