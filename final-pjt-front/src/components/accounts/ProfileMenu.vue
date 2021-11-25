<template>
  <div class="container px-4">
    <nav id="profile-menu">
      <div class="row mb-3 mt-5 mx-0 justify-content-center">
        <router-link :to="{name: 'likeMovies'}" 
        class="border py-2 col text-decoration-none text-white rounded-start" 
        :class="{bss: likeMovies}"> 좋아요를 누른 영화 </router-link>
        
        <router-link :to="{name: 'likeArticles'}" 
        class="border py-2 col text-decoration-none text-white" 
        :class="{bss: likeArticles}"
        > 추천을 누른 게시글 </router-link>

        <router-link :to="{name: 'myComments'}" 
        class="border py-2 col text-decoration-none text-white" 
        :class="{bss: myComments}"
        > 내가 쓴 댓글 </router-link>

        <router-link :to="{name: 'myReviews'}" 
        class="border py-2 col text-decoration-none text-white" 
        :class="{bss: myReviews}"
        > 내가 쓴 리뷰 </router-link>
        <router-link :to="{name: 'myArticles'}" 
        class="border py-2 col text-decoration-none text-white rounded-end" 
        :class="{bss: myArticles}"
        > 내가 쓴 게시글 </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ProfileMenu',

  computed:{
    likeMovies(){
      return this.$route.name === 'likeMovies' ? true : false
    },

    likeArticles(){
      return this.$route.name === 'likeArticles' ? true : false
    },

    myComments(){
      return this.$route.name === 'myComments' ? true : false
    },

    myReviews(){
      return this.$route.name === 'myReviews' ? true : false
    },

    myArticles(){
      return this.$route.name === 'myArticles' ? true : false
    }

  }
}
</script>

<style scoped>

.bss {
  background-color: white;
  color: black !important;
}
</style>