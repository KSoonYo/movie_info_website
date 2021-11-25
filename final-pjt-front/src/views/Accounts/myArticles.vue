<template>
  <section class="px-0">
    <div class="row px-0 mx-0">
      <article class="d-flex flex-column align-items-between col-3 mt-2 px-0" v-for="(article, index) in myArticles" :key="index">
        <div class="col-12 mb-5">
          <div class="my-bg h-100 mx-4 mb-5 rounded">
            <div class="d-flex flex-column mt-3 mb-4 justify-content-center">
              <h1 class="mt-5">{{ article.title }}</h1>
              <p>{{ article.content }}</p>
            </div>
            <div>
              <p class="mb-1"> 작성시간: {{ article.created_at }}</p>
              <p> 수정시간: {{ article.updated_at }} </p>
            </div>
          </div>
        </div>
        <div>
        </div>
      </article>
    </div>
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