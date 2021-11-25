<template>
  <section class="px-0">
    <div class="row px-0 mx-0">
      <article class="d-flex flex-column align-items-between col-3 mt-2 px-0" v-for="(article, index) in likeArticles" :key="index">
        <div class="col-12 mb-5">
          <div class="my-bg h-100 mx-4 mb-5 rounded">
            <div class="d-flex mt-3 mb-4 justify-content-center">
              <h1 class="mt-5">{{ article.title }}</h1>
            </div>
            <div>
              <p class="mb-1">작성시간: {{ article.created_at }}  </p>
              <p>수정시간: {{ article.updated_at }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import {timeMark} from '@/utils/datetime'

export default {
  name: 'likeArticles',
  computed:{
    likeArticles(){
      // return _.take(_.sortBy(
      //   this.$store.state.likeArticles.map(likeArticle=>{
      //   return {
      //     ...likeArticle,
      //     created_at : timeMark(likeArticle.created_at),
      //     updated_at : timeMark(likeArticle.updated_at)
      //   }
      // }), 'id').reverse(), 5)
      return this.$store.state.likeArticles.map(likeArticle=>{
        return {
          ...likeArticle,
          created_at : timeMark(likeArticle.created_at),
          updated_at : timeMark(likeArticle.updated_at)

        }
      })
    },

  },
} 
</script>

<style>

</style>