<template>
  <section class="container w-100 ">
    <div class="row px-2 justify-content-around">
      <article class="my-bg mx-3 col-3 mt-3 rounded" v-for="(article, index) in likeArticles" :key="index">
      <div class="d-flex my-5 justify-content-center">
        <h1>{{ article.title }}</h1>
      </div>
      <div >
        <div>
          <p class="mb-1">작성시간: {{ article.created_at }}  </p>
          <p>수정시간: {{ article.updated_at }}  </p>
        </div>
      </div>
    </article>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
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
      return _.take(this.$store.state.likeArticles.map(likeArticle=>{
        return {
          ...likeArticle,
          created_at : timeMark(likeArticle.created_at),
          updated_at : timeMark(likeArticle.updated_at)
        }
      }),5)
    },

  },
} 
</script>

<style>

</style>