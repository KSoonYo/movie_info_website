<template>
  <div>
    <ul>
      <li v-for="myComment in myComments" :key="myComment.id">
        <p> 제목: {{ myComment.article.title }} | 분류: {{  myComment.article.category === 'FREE' ? '자유' : '추천' }} </p>
        <p> ☞ {{ myComment.content }} </p>
      </li>
    </ul>

  </div>
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