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
   
    pagePerSize : 8,
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

    // ?????? ?????? settings
    // SET_MOVIES_TOTAL(state){

    // },

    // ????????? ??????
    SET_SEARCH_KEY(state, searchKey){
      state.searchKeyWord = searchKey
    },


    // ?????? ?????? ?????? ?????? 
    SET_NOW_MOVIES(state, newMovies){
      state.nowPlayMovies = newMovies
    },

    // ?????? ?????? ?????? ?????? ??????
    SET_NOW_PLAY(state, nowMovie){
      state.nowPlay = nowMovie
      console.log('?????? ?????? ?????? ?????? ??????', state.nowPlay)
    },

    // ?????? ??????
    SET_POPULAR_MOVIES(state, popularMovies){
      state.popularMovies = popularMovies
    },

    // ?????? ?????? ??????
    SET_RECOMMEND_MOVIES(state, recommendMovies){
      state.recommendMovies = recommendMovies
    },

    // ?????? ?????? ??????
    SET_REVIEWS(state, reviews){
      state.reviews = reviews
    },


    // ?????? ??????
    CREATE_REVIEW(state, newReview){
      state.reviews.push(newReview)
      state.myReviews.push(newReview)
    },

    // ?????? ??????
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

    // ?????? ????????? ?????? ????????????
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

    // ?????????
    SET_LIKE_MOVIE(state, myMovie){
      state.likeMovies.push(myMovie)
    },

    // ????????? ??????
    DELETE_LIKE_MOVIE(state, myMovie){
      state.likeMovies = state.likeMovies.filter(likeMovie=>{
        return likeMovie.id !== myMovie.id
      })
    },


    // ????????? ??????
    SET_ARTICLES(state, articles){
      state.articles = articles
    },

    // ?????? ????????? ??????
    SET_ARTICLE(state, article){
      state.article = article
    },

    // ????????? ??????
    CREATE_ARTICLE(state, newArticle){
      state.articles.push(newArticle)
      
      const newMyArticle = {
        id: newArticle.id,
        title: newArticle.title,
        content: newArticle.content,
        category: newArticle.category,
        created_at: newArticle.created_at,
        updated_at: newArticle.updated_at,
        image: newArticle.image
      }
      state.myArticles.push(newMyArticle)
    },

    // ????????? ??????
    UPDATE_ARTICLE(state, updatedArticle){
      state.articles = state.articles.map(article=>{
        if(article.id === updatedArticle.id){
          return updatedArticle
        } else{
          return article
        }
      })
    },

    // ????????? ??????
    DELETE_ARTICLE(state, deletedArticle){
      state.articles = state.articles.filter(article=>{
        return article.id !== deletedArticle.id
      })
    },

    // ????????? ????????? 
    SET_LIKE_ARTICLE(state, article){
      state.likeArticles.push(article)
    },



    // ????????? ?????????
    DELETE_LIKE_ARTICLE(state, article){
      state.likeArticles = state.likeArticles.filter(likeArticle=>{
        return likeArticle.id !== article.id
      })
    },

    // ?????? ??????
    SET_COMMENTS(state, comments){
      state.comments = comments
    },

    // ?????? ??????
    CREATE_COMMENT(state, comment){
      state.comments.push(comment)
      state.myComments.push(comment)
    },

    // ?????? ??????
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

    // ?????? ??????
    // ?????? ?????? ??? ????????? ?????? ??????
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


    // ????????? ??? ?????? ??????
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

    // ?????? ?????? ??????
    getProfile({commit, state}, username){
      axios({
        method: 'get',
        url: `/accounts/profile/${username}/`,
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        } 
      }).then(res=>{
          // console.log('?????? ?????? response', res)
          commit('SET_PROFILE', res.data)
        })
        .then(()=>{
          router.push({name: 'TotalMovie'}).catch(()=>{})
        })
    },

    // ?????? ?????? ?????? ??????
    // setAllMovies({commit}){
    //   axios.get('/movies/total/')
    //     .then(res=>{
    //       console.log(res)
    //       commit()
    //       commit('SET_MOVIES_TOTAL')
    //     })
    // },

    // ?????? ?????? ?????? ?????? ??????
    setNowPlayMovies({commit, dispatch}, movieId){
      if(movieId){
        // ?????? ?????? ??????
        axios.get('movies/play/')
        .then(res=>{
          commit('SET_NOW_MOVIES', res.data)
        })
          .then(()=>{
            dispatch('getNowMovie', movieId)
          })  
      } else {
        // ?????? ?????? ??????
        console.log('?????? ?????? ?????? ?????? ??????')
        axios.get('movies/play/')
          .then(res=>{
            console.log('?????? ?????? ?????? ?????? response', res.data)
            commit('SET_NOW_MOVIES', res.data)
          })
          // .then(()=>{
          //   console.log('?????? ?????? ?????? ???????????? ??????!')
          //   router.push({name: 'NowPlay'}).catch(()=>{})
          // })
      }
    },

    // ?????? ?????? ?????? ?????? ?????? ??????
    getNowMovie({commit, state}, movieId){
      console.log('getNowMovie ??????')
      console.log('nowPlayMovies ?????? ??????', state.nowPlayMovies)
      const selectedMovie = state.nowPlayMovies.find(NowMovie=>{
        return NowMovie.id == movieId
      })
      // commit('SET_NOW_MOVIE', selectedMovie)
        console.log('commit ??????')
        console.log('selectedMovie', selectedMovie)
        commit('SET_NOW_PLAY', selectedMovie)
        router.push({name: 'NowMovie', query: {movieId : movieId}}).catch(()=>{})
      
    },

    
    // ?????? ?????? ?????? ??????
    setPopularMovies({commit, state}, payload){
      const pageParam = payload.pageNum ? `?page=${payload.pageNum}` : ''
      if(payload.searchKeyWord){
        console.log('?????? ?????? ?????? ??????')
        axios.get('/movies/total/')
        .then(res=>{
          // console.log('?????? response', res.data)
          commit('SET_POPULAR_MOVIES', res.data)
        })
        .then(()=>{
          router.push({name: 'Popular', query:{searchKeyWord: state.searchKeyWord }}).catch(()=>{})
        })
      } else {
        axios.get(`/movies/${pageParam}`)
          .then(res=>{
            commit('SET_POPULAR_MOVIES', res.data.results)
            commit('SET_SEARCH_KEY', '')
          })
          // .then(()=>{
          //   router.push({name: 'Popular' }).catch(()=>{})
          // })
      }
    },

    // ?????? ?????? ??????
    getMovie({commit, dispatch}, movieId){
      axios.get(`/movies/${movieId}/`)
      .then(res=>{
        commit('GET_MOVIE', res.data)
      })
      .then(()=>{
        dispatch('getReviews', movieId)
      })
      .then(()=>{
        dispatch('getRecommendMovies', movieId)
      })
      .then(()=>{
        router.push({name: 'MoviesListItem', query: {moiveId : movieId}}).catch(()=>{})
      })
    },

    // ?????? ?????? ?????? ??????
    getRecommendMovies({commit}, movieId){
      axios.get(`/movies/${movieId}/recommend/`)
        .then(res=>{
          
          commit('SET_RECOMMEND_MOVIES', res.data)
        })
    },

    // ?????? ?????? ??????
    getReviews({commit}, movieId){
      axios.get(`/movies/${movieId}/review/`)
        .then(res=>{
          commit('SET_REVIEWS', res.data)
        })
    },


    // ?????? ????????????
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
      .catch(()=>{
        // console.log(error)
        alert('????????? ??????????????????.')
      })
    },

    // ?????? ????????????
    deleteReview({commit, state}, payload){
      axios.delete(`/movies/${payload.movieId}/review/${payload.reviewId}/`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(()=>{
        commit('DELETE_REVIEW', payload.reviewId)
      })

    },

    // ?????? ?????????
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
    
    // ?????????
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


    // ????????? ?????? ??????
    getArticles({commit}){
      axios.get('/articles/')
        .then(res=>{
          commit('SET_ARTICLES', res.data)
        })
    },
  
    // ?????? ????????? ??????
    getArticle({commit}, articleId){
      axios.get(`/articles/${articleId}/`)
        .then(res=>{
          console.log(res.data)
          commit('SET_ARTICLE', res.data)
          router.push({name: 'CommunityArticle', query:{ articleId : articleId}} ).catch(()=>{})
        })
    },

    // ????????? ??????
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

    // ????????? ??????
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

    // ????????? ??????
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

    // ????????? ??????(?????????)
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

    // ????????? ?????? ?????? (????????? ??????)
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



    // ?????? ?????? ??????
    getComments({commit}, articleId){
      axios.get(`/articles/${articleId}/comment/`)
        .then(res=>{
          commit('SET_COMMENTS', res.data)
        })
    },

    // ?????? ??????
    createComment({commit, state}, payload){
      axios.post(`/articles/${payload.articleId}/comment/`, {
        content: payload.content
      }, {
        headers:{
          Authorization: `Bearer ${state.accessToken}`
        }
      }).then(res=>{
        console.log('?????? ?????? ??? response', res.data)
        commit('CREATE_COMMENT', res.data)  
      })
    },

    // ?????? ??????
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
