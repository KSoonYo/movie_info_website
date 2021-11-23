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
    recommendMovies: [],

    // Community
    articles : [],
    article: null,
    comments : [],

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

    // 추천 영화 셋팅
    SET_RECOMMEND_MOVIES(state, recommendMovies){
      state.recommendMovies = recommendMovies
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
    // UPDATE_LIKE_MOVIES(state, payload){
    //   const includeStatus = !!state.likeMovies.find(elem=>{
    //     return elem.id === payload.id
    //   })  
    //   if(includeStatus){
    //     const index = state.likeMovies.find(elem=>{ return elem.id === payload.id })
    //     state.likeMovies.splice(state.likeMovies.indexOf(index), 1)
    //   } else{
    //     state.likeMovies.push(payload)
    //   }
      
    // },

    // 좋아요
    SET_LIKE_MOVIE(state, myMovie){
      state.likeMovies.push(myMovie)
    },

    DELETE_LIKE_MOVIE(state, myMovie){
      const targetMovieIndex = state.likeMovies.find(elem=>{
        return elem.id === myMovie.id
      })
      state.likeMovies.splice(state.likeMovies.indexOf(targetMovieIndex), 1)
    },


    // 게시글 셋팅
    SET_ARTICLES(state, articles){
      state.articles = articles
    },

    // 단일 게시글 조회
    SET_ARTICLE(state, article){
      state.article = article
    },

    // 게시글 작성
    CREATE_ARTICLE(state, newArticle){
      state.articles.push(newArticle)
      
      const newMyArticle = {
        id: newArticle.id,
        title: newArticle.title,
        category: newArticle.category,
        image: newArticle.image
      }
      state.myArticles.push(newMyArticle)
    },

    // 게시글 수정
    UPDATE_ARTICLE(state, updatedArticle){
      state.articles = state.articles.map(article=>{
        if(article.id === updatedArticle.id){
          return updatedArticle
        } else{
          return article
        }
      })
    },

    // 게시글 삭제
    DELETE_ARTICLE(state, deletedArticle){
      state.articles.splice(state.articles.indexOf(deletedArticle.id), 1)
    },

    // 댓글 셋팅
    SET_COMMENTS(state, comments){
      state.comments = comments
    },

    // 댓글 생성
    CREATE_COMMENT(state, comment){
      state.comments.push(comment)
    },

    // 댓글 삭제
    DELETE_COMMENT(state, commentId){
      state.comments.splice(state.comments.indexOf(commentId), 1)
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

    setNowPlayMovies({commit}){
      axios.get('movies/play/')
        .then(res=>{
          commit('SET_NOW_MOVIES', res.data)
        })
    },

    
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

    // 추천 영화 목록 조회
    getRecommendMovies({commit}, movieId){
      axios.get(`/movies/${movieId}/recommend/`)
        .then(res=>{
          console.log(res)
          commit('SET_RECOMMEND_MOVIES', res.data)
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

    // 좋아요
    pressLike({commit, state}, movie){
      axios.post(`movies/${movie.id}/like/`, {}, {}, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(()=>{
        commit('SET_LIKE_MOVIE', {
          id: movie.id,
          title: movie.title
        })
      })
    },
    
    // 싫어요
    pressDislike({commit, state}, movie){
      axios.post(`movies/${movie.id}/like/`, {}, {}, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(()=>{
        commit('DELETE_LIKE_MOVIE', {
          id: movie.id,
          title: movie.title
        })
      })
    },


    // 게시글 목록 조회
    getArticles({commit}){
      axios.get('/articles/')
        .then(res=>{
          commit('SET_ARTICLES', res.data.results)
        })
    },
  
    // 단일 게시글 조회
    getArticle({commit}, articleId){
      axios.get(`/articles/${articleId}/`)
        .then(res=>{
          commit('SET_ARTICLE', res.data)
          router.push({name: 'CommunityArticle', query:{ articleId : articleId}} ).catch(()=>{})

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
    },

    // 게시글 수정
    updateArticle({commit, state}, payload){
      axios.put(`/articles/${payload.articleId}/`, payload.formData, 
      {
        headers:{
          Authorization: `Bearer ${state.accessToken}`,
        }
      }).then((res)=>{
        // console.log('update', res.data)
        commit('UPDATE_ARTICLE', res.data)
        // router.push({name: 'CommunityArticle', query: {articleId: payload.articleId}})
      })
    },

    // 게시글 삭제
    deleteArticle({commit, state}, article){
      axios.delete(`/articles/${article.id}/`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      })
        .then(()=>{
          commit('DELETE_ARTICLE', article)
          router.go(-1)
        })
    },


    // 댓글 목록 조회
    getComments({commit}, articleId){
      axios.get(`/articles/${articleId}/comment/`)
        .then(res=>{
          console.log('댓글 목록', res.data)
          commit('SET_COMMENTS', res.data)
        })
    },

    // 댓글 생성
    createComment({commit, state}, payload){
      axios.post(`/articles/${payload.articleId}/comment/`, {
        content: payload.content
      }, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(res=>{
        commit('CREATE_COMMENT', res.data)
  
      })
    },

    // 댓글 삭제
    deleteComment({commit, state}, payload){
      axios.delete(`/articles/${payload.articleId}/comment/${payload.commentId}`, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(()=>{
        commit('DELETE_COMMENT', payload.commentId)
  
      })
    }

  },
  modules: {
  }
})
