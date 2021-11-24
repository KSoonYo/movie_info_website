<template>
  <div>
    <create-article :category="category"></create-article>
    <community-articles :items="items"></community-articles>
  </div>


</template>

<script>
import CommunityArticles from  '@/components/community/CommunityArticles'
import CreateArticle from '@/components/community/CreateArticle'
import {timeMark} from '@/utils/datetime'

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
        const newTime = timeMark(elem.created_at)
        return {
          id: elem.id,
          '분류': elem.category === "RECOMMEND" ? '추천' : '자유' ,
          '제목': elem.title,
          '작성자': elem.user.nickname,
          '작성시간' : newTime
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