<template>
  <nav id="community-menu">
  <router-link :to="{name: 'AllCommunity'}">전체 게시판 </router-link>
  <router-link  :to="{name: 'FreeCommunity'}">자유 게시판 </router-link>
  <router-link :to="{name: 'RecommendCommunity'}">추천 게시판 </router-link>
  </nav>
</template>

<script>
export default {
  name: 'CommunityMenu',
}
</script>

<style scoped>
a{
  text-decoration: none;
}

</style>