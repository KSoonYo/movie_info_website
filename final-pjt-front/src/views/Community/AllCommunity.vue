<template>
  <div>
    <create-article></create-article>
    <community-articles></community-articles>
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
  }
}
</script>

<style>

</style>