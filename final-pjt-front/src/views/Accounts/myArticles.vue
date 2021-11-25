<template>
   <section>
    <article class="pt-5" v-for="(article, index) in myArticles" :key="index">
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
import {timeMark} from '@/utils/datetime'
import _ from 'lodash'

export default {
  name: 'myArticles',
  computed: {
    myArticles(){
      return _.sortBy(
        this.$store.state.myArticles.map(myArticle=>{
        return {
          ...myArticle,
          created_at : timeMark(myArticle.created_at),
          updated_at : timeMark(myArticle.updated_at)
        }
      }), 'id')
    }
  }
  
}
</script>

<style>

</style>