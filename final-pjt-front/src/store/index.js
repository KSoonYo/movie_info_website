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
    // validation
    // validationStatus: true,

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
    nowPlay: {genre_id: []},
    searchKeyWord : '',
    // nowPlay: '',
    moviesTotal: [],
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

    },

    // SET_VALIDATION_STATUS(state, status){
    //   state.validationStatus = status
    // },
    
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

    // 전체 영화 settings
    // SET_MOVIES_TOTAL(state){

    // },

    // 검색어 셋팅
    SET_SEARCH_KEY(state, searchKey){
      state.searchKeyWord = searchKey
    },


    // 현재 상영 중인 영화 
    SET_NOW_MOVIES(state, newMovies){
      state.nowPlayMovies = newMovies
    },

    // 현재 상영 중인 단일 영화
    SET_NOW_PLAY(state, nowMovie){
      state.nowPlay = nowMovie
      console.log('단일 상영 영화 상태 체크', state.nowPlay)
    },

    // 인기 영화
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
      state.myReviews.push(newReview)
    },

    // 리뷰 삭제
    DELETE_REVIEW(state, deletedReviewId){
      state.reviews = state.reviews.filter(review=>{
        return review.id !== deletedReviewId
      })
      state.myReviews = state.myReviews.filter(myReview=>{
        return myReview.id !== deletedReviewId
      })
    },

    GET_MOVIE(state, movieData){
      state.movie = movieData
      // router.push({name: 'MoviesListItem', query:{movieId: movieData.id}}).catch(()=>{})
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

    // 좋아요 취소
    DELETE_LIKE_MOVIE(state, myMovie){
      state.likeMovies = state.likeMovies.filter(likeMovie=>{
        return likeMovie.id !== myMovie.id
      })
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
      state.articles = state.articles.filter(article=>{
        return article.id !== deletedArticle.id
      })
    },

    // 게시글 좋아요 
    SET_LIKE_ARTICLE(state, article){
      state.likeArticles.push(article)
    },



    // 게시글 싫어요
    DELETE_LIKE_ARTICLE(state, article){
      state.likeArticles = state.likeArticles.filter(likeArticle=>{
        return likeArticle.id !== article.id
      })
    },

    // 댓글 셋팅
    SET_COMMENTS(state, comments){
      state.comments = comments
    },

    // 댓글 생성
    CREATE_COMMENT(state, comment){
      state.comments.push(comment)
      state.myComments.push(comment)
    },

    // 댓글 삭제
    DELETE_COMMENT(state, commentId){
      state.comments = state.comments.filter(comment=>{
        return comment.id !== commentId
      })
      state.myComments = state.myComments.filter(myComment=>{
        return myComment.id !== commentId
      })
      
    }

  },

  actions: {

    // 회원 생성
    // 회원 생성 후 로그인 상태 유지
    createUser({dispatch}, payload){
      axios.post(`accounts/signup/`, 
      {
        username: payload.username,
        nickname: payload.nickname,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      })
      .then(()=>{
        const loginPayload = {
          username: payload.username,
          password: payload.password,
        }
        dispatch('getToken', loginPayload)
      })
      .catch((err)=>{
        console.log(err.response)
        if ( err.response.data.username){
          payload.instance.multipleUserNameError = '' + err.response.data.username
        } else{
          payload.instance.multipleUserNameError = ''
        }

        if ( err.response.data.nickname){
          payload.instance.multipleNickNameError = '' + err.response.data.nickname
        } else{
          payload.instance.multipleNickNameError = ''
        }

        if (err.response.data.password){
          payload.instance.invalidPasswordConfirm = '' + err.response.data.password
        } else {
          payload.instance.invalidPasswordConfirm = ''
        }
      })
    },


    // 로그인 시 토큰 획득
    getToken({commit, dispatch}, payload){
      axios.post('/api/token/', {
        username: payload.username,
        password: payload.password
      })
        .then(response=>{
          localStorage.setItem('accessToken', response.data.access)
          commit('SET_TOKEN', response.data.access)
        })
        .then(()=>{
          dispatch('getProfile', payload.username)
          if(payload.instance){
            payload.instance.$emit('close')
          }
        })
        .catch(()=>{
          // dispatch('getValidationStatus', false)
          if(payload.instance){
            payload.instance.invalidationStatus = true
          }
        })
       
    },

    // 로그인, 회원가입 유효성 오류
    // getValidationStatus({commit}, status){
    //   commit('SET_VALIDATION_STATUS', status)
    // },

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
        })
        .then(()=>{
          router.push({name: 'NowPlay'}).catch(()=>{})
        })
    },

    // 전체 영화 목록 조회
    // setAllMovies({commit}){
    //   axios.get('/movies/total/')
    //     .then(res=>{
    //       console.log(res)
    //       commit()
    //       commit('SET_MOVIES_TOTAL')
    //     })
    // },

    // 현재 상영 중인 영화 목록
    setNowPlayMovies({commit, dispatch}, movieId){
      if(movieId){
        axios.get('movies/play/')
        .then(res=>{
          commit('SET_NOW_MOVIES', res.data)
        })
          .then(()=>{
            dispatch('getNowMovie', movieId)
          })  
      } else {
        axios.get('movies/play/')
          .then(res=>{
            commit('SET_NOW_MOVIES', res.data)
          })
      }
    },

    // 현재 상영 중인 단일 영화 조회
    getNowMovie({commit, state}, movieId){
      console.log('getNowMovie 실행')
      console.log('nowPlayMovies 상태 체크', state.nowPlayMovies)
      const selectedMovie = state.nowPlayMovies.find(NowMovie=>{
        return NowMovie.id == movieId
      })
      // commit('SET_NOW_MOVIE', selectedMovie)
        console.log('commit 실행')
        console.log('selectedMovie', selectedMovie)
        commit('SET_NOW_PLAY', selectedMovie)
        router.push({name: 'NowMovie', query: {movieId : movieId}}).catch(()=>{})
      
    },

    
    // 인기 영화 목록 조회
    setPopularMovies({commit}, payload){
      const pageParam = payload.pageNum ? `?page=${payload.pageNum}` : ''
      if(payload.searchKeyWord){
        console.log('검색 영화 목록 출력')
        axios.get('/movies/total/')
        .then(res=>{
          // console.log('검색 response', res.data)
          commit('SET_POPULAR_MOVIES', res.data)
        })
      } else {
        console.log('일반 영화 목록 출력')
        axios.get(`/movies/${pageParam}`)
          .then(res=>{
            commit('SET_POPULAR_MOVIES', res.data.results)
          })
      }
    },

    // 단일 영화 조회
    getMovie({commit}, movieId){
      axios.get(`/movies/${movieId}/`)
      .then(res=>{
        commit('GET_MOVIE', res.data)
      })
      .then(()=>{
        router.push({name: 'MoviesListItem', query: {moiveId : movieId}}).catch(()=>{})
      })
    },

    // 추천 영화 목록 조회
    getRecommendMovies({commit}, movieId){
      axios.get(`/movies/${movieId}/recommend/`)
        .then(res=>{
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

    // 리뷰 삭제하기
    deleteReview({commit, state}, payload){
      axios.delete(`/movies/${payload.movieId}/review/${payload.reviewId}/`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(()=>{
        commit('DELETE_REVIEW', payload.reviewId)
      })

    },

    // 좋아요
    pressLike({commit, dispatch, state}, movie){
      axios.post(`movies/${movie.id}/like/`, {}, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(()=>{
        commit('SET_LIKE_MOVIE', {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path
        })     
      })
        .then(()=>{
          dispatch('getMovie', movie.id)
          dispatch('getRecommendMovies', movie.id)
        })
    },
    
    // 싫어요
    pressDislike({commit, dispatch, state}, movie){
      axios.post(`movies/${movie.id}/like/`, {}, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(()=>{
        commit('DELETE_LIKE_MOVIE', {
          id: movie.id,
          title: movie.title
        })
      })
      .then(()=>{
        dispatch('getMovie', movie.id)
        dispatch('getRecommendMovies', movie.id)
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
          console.log(res.data)
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
        router.go(-1)
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

    // 게시글 추천(좋아요)
    likeArticle({commit, dispatch,state}, article){
      axios.post(`articles/${article.id}/like/`, {}, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      })
        .then(()=>{
           commit('SET_LIKE_ARTICLE', article)
        })
        .then(()=>{
          dispatch('getArticle', article.id)
        })
    },

    // 게시글 추천 취소 (좋아요 취소)
    disLikeArticle({commit, dispatch,state}, article){
      axios.post(`articles/${article.id}/like/`, {}, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      })
        .then(()=>{
           commit('DELETE_LIKE_ARTICLE', article)
        })
        .then(()=>{
          dispatch('getArticle', article.id)
        })
    },



    // 댓글 목록 조회
    getComments({commit}, articleId){
      axios.get(`/articles/${articleId}/comment/`)
        .then(res=>{
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
        console.log('댓글 생성 시 response', res.data)
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
