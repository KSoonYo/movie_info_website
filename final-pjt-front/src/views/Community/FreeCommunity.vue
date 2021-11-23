<template>
  <div>
    <create-article :category="category"></create-article>
    <community-articles :items="items"></community-articles>
  </div>


</template>

<script>
import CommunityArticles from  '@/components/community/CommunityArticles'
import CreateArticle from '@/components/community/CreateArticle'

export default {
  name: 'FreeCommunity',
  components: {
    CommunityArticles,
    CreateArticle
  },
   data(){
    return{
      category: 'free',
    }
  },

  
  computed:{
    items(){
      return this.$store.state.articles.filter(elem=>{
        return elem.category === '자유'
      })
    }
  },

  created(){
    this.$store.dispatch('getArticles')
    console.log(this.$store.state.articles)
  }
}
</script>

<style>

</style>