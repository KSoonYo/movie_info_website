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
import likeMovies from '@/views/Accounts/likeMovies'
import likeArticles from '@/views/Accounts/likeArticles'
import myArticles from '@/views/Accounts/myArticles'
import myComments from '@/views/Accounts/myComments'
import myReviews from '@/views/Accounts/myReviews'

// movies
import MoviesList from '../views/Movies/MoviesList'
import MoviesListItem from '@/views/Movies/MoviesListItem'
import NowPlay from '@/views/Movies/NowPlay'
import Popular from '@/views/Movies/Popular'
import NowMovie from '@/views/Movies/NowMovie'
import TotalMovie from '@/views/Movies/TotalMovie'
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
      },

      {
        path: '/movies/total',
        name: 'TotalMovie',
        component: TotalMovie
      },

    ]
  },

  {
    path:'/movies/popular/detail/',
    name: 'MoviesListItem',
    component: MoviesListItem
  },

  {
    path:'/movies/now-play/detail/',
    name: 'NowMovie',
    component: NowMovie
  },

  


  // Community routing mapping
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
        path: '/community/detail',
        name: 'CommunityArticle',
        component: CommunityArticle,
      },

      {
        path: '/community/create/:category',
        name: 'CommunityCreate',
        component: CommunityCreate,
      },

      {
        path: '/community/update/',
        name: 'CommunityUpdate',
        component: CommunityUpdate,
      }

    ]
  },

  // user router mapping
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    children: [
      {
        path: '/profile/likeMovies',
        name: 'likeMovies',
        component: likeMovies
      },
      {
        path: '/profile/likeArticles',
        name: 'likeArticles',
        component: likeArticles
      },
      {
        path: '/profile/myArticles',
        name: 'myArticles',
        component: myArticles
      },
      {
        path: '/profile/myComments',
        name: 'myComments',
        component: myComments
      },
      {
        path: '/profile/myReviews',
        name: 'myReviews',
        component: myReviews
      },
      
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// ????????? ??????????????? ?????? ??????
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken')
  if (to.name === 'Index' || to.name === 'Login' || to.name === 'Signup') {
    if (accessToken) {
      // console.log('?????????????????????.')
      next({ name: 'TotalMovie' })
    }
  } else if(to.name === 'CommunityCreate' || to.name === 'Profile'){
    if(!accessToken){
      alert('???????????? ???????????????.')
      next(from)
    }
  }
  next()
})



export default router
