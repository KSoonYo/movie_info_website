import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)



axios.defaults.baseURL = process.env.VUE_APP_BACK_END_URL

export default new Vuex.Store({
  state: {
    // User
    accessToken : '',
    isSuperUser : false,
    likeMovies: [],
    likeArticles: [],
    myComments: [],
    myArticles: [],
    myMovies: [],
    
    pagePerSize : 6,
    // Movie
    nowPlayMovies : [],
    popularMovies: [],
    reviews : [],

    // Community
    allArticles : [],
    freeArticles : [],
    recommendArticles: [],
    comments: [],
  },

  getters: {
    loginStatus(state){
      return !!state.accessToken
    }
  },

  mutations: {
    SET_TOKEN(state, newAccessToken){
      state.accessToken = newAccessToken
    },
    DELETE_TOKEN(state){
      state.accessToken = ''
    },

    SET_NOW_MOVIES(state, newMovies){
      state.nowPlayMovies = newMovies
    },

    SET_POPULAR_MOVIES(state, popularMovies){
      state.popularMovies = popularMovies
    }
  },

  actions: {
    getToken({commit}, {username, password}){
      // drf 문서 참고해서 token부분 받기
      // superuser인지 체크
      // username, password 공백 체크
      axios.post('/api/token/', {username, password})
        .then(response=>{
          console.log(response)
          localStorage.setItem('accessToken', response.data.access)
          commit('SET_TOKEN', response.data.access) 
          router.push({name: 'MoviesList'}).catch(()=>{})
        })
    },

    setNowPlayMovies(){
      
      axios.get('')
        .then(res=>{
          console.log(res.data)
          // commit('SET_NOW_MOVIES', res.data)
        })
    },

    
    setPopularMovies({commit}, pageNum){
      const pageParam = pageNum ? `?page=${pageNum}` : ''
      axios.get(`/movies/${pageParam}`)
        .then(res=>{
          commit('SET_POPULAR_MOVIES', res.data.results)
        })
    },

   

  },
  modules: {
  }
})
