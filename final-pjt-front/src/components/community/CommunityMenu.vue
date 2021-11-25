<template>

  <div class="container">
    <nav id="community-menu">
      <div class="d-flex justify-content-center">
        <router-link class="border px-3 text-decoration-none text-white rounded-start"
         :class="{bss: allCommunity}"
         :to="{name: 'AllCommunity'}">전체 게시판 </router-link>
        <router-link class="border px-3 text-decoration-none text-white" 
        :class="{bss: freeCommunity}"
        :to="{name: 'FreeCommunity'}">자유 게시판 </router-link>
        <router-link class="border px-3 text-decoration-none text-white rounded-end" 
        :class="{bss: recommendCommunity}"
        :to="{name: 'RecommendCommunity'}">추천 게시판 </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'CommunityMenu',
  computed:{
    allCommunity(){
      return this.$route.name === 'AllCommunity' ? true : false
    },
    freeCommunity(){
      return this.$route.name === 'FreeCommunity' ? true : false
    },
    recommendCommunity(){
      return this.$route.name === 'RecommendCommunity' ? true : false
    },
  }
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