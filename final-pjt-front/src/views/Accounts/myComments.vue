<template>
  <section class="container w-100">
      <div class="row px-2 justify-content-around">
        <article class="my-bg mx-3 col-3 mt-3 rounded" v-for="(myComment, index) in myComments" :key="index">
          <div class="mt-2">
            <p> {{ myComment.article.category === 'FREE' ? '자유' : '추천' }} </p>
            <p>{{ myComment.article.title }}</p>
          </div>
          <div>
            <div class="mt-5">
              <p class="mb-1 my-comment">☞ {{ myComment.content }}  </p>
            </div>
          </div>
      </article>
    </div>


    <!-- <ul>
      <li v-for="myComment in myComments" :key="myComment.id">
        <p> 제목: {{ myComment.article.title }} | 분류: {{  myComment.article.category === 'FREE' ? '자유' : '추천' }} </p>
        <p> ☞ {{ myComment.content }} </p>
      </li>
    </ul> -->

  </section>
</template>

<script>
export default {
  name: 'myComments',
  computed:{
    myComments(){
      return this.$store.state.myComments
    },
  }
}
</script>

<style>

</style>