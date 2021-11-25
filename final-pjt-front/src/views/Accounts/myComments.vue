<template>
  <section class="px-0">
      <div class="row px-0 mx-0">
        <article class="d-flex flex-column align-items-between col-3 mt-2 px-0" v-for="(myComment, index) in myComments" :key="index">
          <div class="col-12 mb-5">
            <div class="my-bg h-100 mx-4 mb-4 rounded">
              <div class="d-flex flex-column mt-3 mb-0 justify-content-center">
                <p class="mt-5"> {{ myComment.article.category === 'FREE' ? '자유' : '추천' }} 게시판</p>
                <p class="mt-3 pt-3">{{ myComment.article.title }}</p>
              </div>
              <div class="mt-3 pt-1">
                <p class="mb-0">☞ {{ myComment.content }}</p>
              </div>
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