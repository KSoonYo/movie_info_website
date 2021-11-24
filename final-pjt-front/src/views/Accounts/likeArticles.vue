<template>
  <section>
    <article class="pt-5" v-for="(article, index) in likeArticles" :key="index">
      <h1> 제목: {{ article.title }} </h1>
      <p> {{ article.content }} </p>
      <div>
      <span> 작성시간: {{ article.created_at }} | </span>
      <span> 수정시간: {{ article.updated_at }} </span>
      </div>

    </article>
  </section>
</template>

<script>
import _ from 'lodash'

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
          created_at : likeArticle.created_at,
          updated_at : likeArticle.updated_at
        }
      }),5)
    },

  }
} 
</script>

<style>

</style>