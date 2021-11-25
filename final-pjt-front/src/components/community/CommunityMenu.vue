<template>

  <div class="container">
    <nav id="community-menu">
      <div class="d-flex justify-content-center mt-5 mb-3 row">
        <router-link
          class="border px-3 p-2 col text-decoration-none text-white rounded-start text-center"
          :class="{bss: allCommunity}"
          :to="{name: 'AllCommunity'}"
        >
        전체 게시판
        </router-link>
        <router-link class="border px-3 py-2 col text-decoration-none text-white text-center" 
        :class="{bss: freeCommunity}"
        :to="{name: 'FreeCommunity'}">자유 게시판 </router-link>
        <router-link class="border px-3 py-2 col text-decoration-none text-white rounded-end text-center" 
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
  color: black !important;
  background-color: white;
}

</style>