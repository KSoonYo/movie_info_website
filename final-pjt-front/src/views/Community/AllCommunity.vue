<template>
  <div>
    <create-article></create-article>
    <community-articles :items="items"></community-articles>
  </div>
</template>

<script>
import CommunityArticles from '@/components/community/CommunityArticles'
import CreateArticle from '@/components/community/CreateArticle'

export default {
  name: 'AllCommunity',
  components: {
    CommunityArticles,
    CreateArticle
  },
  data(){
    return{
      items : []
    }
  },

  created(){
      const articles = this.$store.state.articles
      console.log(articles)
      const itemsArray = []
      articles.forEach(elem=>{
        const newElem = {
          id: elem.id,
          '분류': elem.category === "RECOMMEND" ? '추천' : '자유' ,
          '제목': elem.title,
          '작성자': elem.user,
          '작성시간' : elem.created_at
        }
        itemsArray.push(newElem)
      })
 
    this.items = itemsArray
    console.log(this.items)
  }

}
</script>

<style>

</style>