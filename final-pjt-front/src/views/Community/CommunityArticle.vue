<template>
  <section>
    <p>게시판 분류: {{ article.category ==='FREE' ? '자유' : '추천' }} </p>
    <h1>타이틀: {{ article.title }} </h1>
    <p> {{article.content}} </p>
    <img v-if="article.image" :src="article.image" alt="이미지">
    <p>작성시간: {{ article.created_at }}  </p>
    <p>수정시간: {{ article.updated_at }}  </p>
    <p>작성자 아이디: {{ article.user }}  </p>
    <button>추천: </button>
    <br>
    <button 
    @click="updateArticle" 
    >
    수정
    </button>
    <button @click="deleteArticle">삭제</button>

    <article>
      <h2>댓글 목록</h2>
      <div>
        <p>작성자: SSOO</p>
        <span>댓글: 반갑습니다!</span>
      </div>
      <form>
        <input type="text">
        <button>댓글 작성</button>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  name: 'CommunityArticle',
 
  methods:{
    updateArticle(){
      this.$router.push({name: 'CommunityUpdate', query:{articleId: this.$route.query.articleId} })
    },

    deleteArticle(){
      this.$store.dispatch('deleteArticle', this.article)
    }
  },

  computed:{
    article(){
      console.log('현재 article', this.$store.state.article)
      return this.$store.state.article
    }
  },

  created(){
    this.$store.dispatch('getArticle', this.$route.query.articleId)
    
  }
}
</script>

<style>

</style>