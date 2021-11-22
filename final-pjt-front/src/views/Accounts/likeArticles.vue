<template>
  <div>
    <p v-for="(article, index) in likeArticles" :key="index">
        {{article}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'likeArticles',
  computed:{
    likeArticles(){
      return this.$store.state.likeArticles
    },

  }
} 
</script>

<style>

</style>