<template>
  <div class="container">
    <nav id="community-menu">
      <div class="d-flex justify-content-center">
        <router-link class="border px-3 text-decoration-none text-white rounded-start bss" :to="{name: 'AllCommunity'}">전체 게시판 </router-link>
        <router-link class="border px-3 text-decoration-none text-white" :to="{name: 'FreeCommunity'}">자유 게시판 </router-link>
        <router-link class="border px-3 text-decoration-none text-white rounded-end" :to="{name: 'RecommendCommunity'}">추천 게시판 </router-link>
      </div>
    </nav>
  </div>
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

.bss {
  background-color: white;
  color: black !important;
}

</style>