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
      items: []
    }
  },

   created(){
      const articles = this.$store.state.articles
      const itemsArray = []
      articles.filter(elem=>{
          return elem.category === 'RECOMMEND'
      }).forEach(elem=>{
        const newElem = {
           id: elem.id,
          '분류': '추천',
          '제목': elem.title,
          '작성자': elem.user,
          '작성시간' : elem.created_at
        }
        itemsArray.push(newElem)
      })
 
    this.items = itemsArray
  }
}
</script>

<style>

</style>