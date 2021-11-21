<template>
  <div>
    <create-article :category="category"></create-article>
    <community-articles></community-articles>
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
      category: 'free'
    }
  }
}
</script>

<style>

</style>