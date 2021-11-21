import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'

// Community
import CommunityList from '../views/Community/CommunityList'
import AllCommunity from '../views/Community/AllCommunity'
import FreeCommunity from '../views/Community/FreeCommunity'
import RecommendCommunity from '../views/Community/RecommendCommunity'
import CommunityCreate from '@/views/Community/CommunityCreate'
import CommunityUpdate from '@/views/Community/CommunityUpdate'
import CommunityArticle from '@/views/Community/CommunityArticle'

// accounts
import SignUp from '@/views/Accounts/SignUp'
import Profile from '@/views/Accounts/Profile'

// movies
import MoviesList from '../views/Movies/MoviesList'
import MoviesListItem from '@/views/Movies/MoviesListItem'
import NowPlay from '@/views/Movies/NowPlay'
import Popular from '@/views/Movies/Popular'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },

  {
    path: '/movies',
    name: 'MoviesList',
    component: MoviesList,
    children: [
      {
        path: '/movies/now-play/',
        name: 'NowPlay',
        component: NowPlay
      },

      {
        path: '/movies/popular',
        name: 'Popular',
        component: Popular
      }
    ]
  },

  {
    path:'/movies/detail/?movieID=:movieId',
    name: 'MoviesListItem',
    component: MoviesListItem
  },

  {
    path: '/community',
    name: 'Community',
    component: CommunityList,
    children: [
      {
        path: '/community/all-community',
        name: 'AllCommunity',
        component: AllCommunity,
      },

      {
        path: '/community/free-community',
        name: 'FreeCommunity',
        component: FreeCommunity
      },

      {
        path: '/community/recommend-community',
        name: 'RecommendCommunity',
        component: RecommendCommunity,
        
      },
      
      {
        path: '/community/:articleId',
        name: 'CommunityArticle',
        component: CommunityArticle,
      },

      {
        path: '/community/create/:category',
        name: 'CommunityCreate',
        component: CommunityCreate,
      },

      {
        path: '/community/update/:articleId',
        name: 'CommunityUpdate',
        component: CommunityUpdate,
      }

    ]
  },

  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 라우터 네비게이션 전역 가드
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken')
  if (to.name === 'Index' || to.name === 'Login' || to.name === 'Signup' ) {
    if (accessToken) {
      next({ name: 'MoviesList' })
    }
  } else if(to.name === 'CommunityCreate'){
    if(!accessToken){
      alert('로그인이 필요합니다.')
      next(from)
    }
  }
  next()
})



export default router
