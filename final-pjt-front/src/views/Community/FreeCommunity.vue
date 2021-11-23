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
        return elem.category === 'FREE'
      }).map(elem=>{
        return {
          id: elem.id,
          '분류': elem.category === "RECOMMEND" ? '추천' : '자유' ,
          '제목': elem.title,
          '작성자': elem.user.nickname,
          '작성시간' : elem.created_at
        }
      })
    }
  },

  created(){
    this.$store.dispatch('getArticles')
  }
}
</script>

<style>

</style>