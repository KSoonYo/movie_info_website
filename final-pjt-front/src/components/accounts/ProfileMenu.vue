<template>
  <nav>
  <router-link :to="{name: 'likeMovies'}"> 좋아요를 누른 영화 </router-link>
  <router-link :to="{name: 'likeArticles'}"> 좋아요를 누른 게시글 </router-link>
  <router-link :to="{name: 'myComments'}"> 내가 쓴 댓글 목록 </router-link>
  <router-link :to="{name: 'myReviews'}"> 내가 쓴 리뷰 목록 </router-link>
  <router-link :to="{name: 'myArticles'}"> 내가 쓴 게시글 목록 </router-link>
  </nav>
</template>

<script>
export default {
  name: 'ProfileMenu'
}
</script>

<style>

</style>