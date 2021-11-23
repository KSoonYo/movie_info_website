<template>
  <div>
    <create-article :category="category"></create-article>
    <community-articles :items="items" ></community-articles>
  </div>
</template>

<script>
import CommunityArticles from  '@/components/community/CommunityArticles'
import CreateArticle from '@/components/community/CreateArticle'


export default {
  name: 'RecommendCommunity',
    components: {
    CommunityArticles,
    CreateArticle
  },

  data(){
    return{
      category: 'recommend',
    }
  },

  computed:{
    items(){
      return this.$store.state.articles.filter(elem=>{
        return elem.category === 'RECOMMEND'
      })
    }
  },

  created(){
    return this.$store.dispatch('getArticles')

  }
}
</script>

<style>

</style>