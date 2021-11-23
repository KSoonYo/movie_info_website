<template>
  <section>
    <p>게시판 분류: {{ article.category ==='FREE' ? '자유' : '추천' }} </p>
    <h1>타이틀: {{ article.title }} </h1>
    <p> {{article.content}} </p>
    <img v-if="article.image" :src="`http://127.0.0.1:8000${article.image}`" alt="이미지">
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
      <div v-for="comment in comments" :key="comment.id">
        <p>작성자: {{comment.user }} </p>
        <span> 작성 시간: {{ comment.created_at }} </span>
        <p>
          댓글: {{ comment.content }} 
          <button class="d-inline" @click="deleteComment(comment)"> 댓글 삭제 </button>
        </p>
      </div>
      <form @submit="createComment">
        <input type="text" v-model="commentContent">
        <button>댓글 작성</button>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  name: 'CommunityArticle',
  data(){
    return({
      commentContent: ''
    })
  },

  methods:{
    updateArticle(){
      this.$router.push({name: 'CommunityUpdate', query:{articleId: this.$route.query.articleId} })
    },

    deleteArticle(){
      this.$store.dispatch('deleteArticle', this.article)
    },

    createComment(event){
      event.preventDefault()
      const payload = {
        articleId: this.article.id,
        content: this.commentContent 
      }
      this.$store.dispatch('createComment', payload)
    },

    deleteComment(comment){
      // console.log(comment)
      const payload = {
        articleId : this.article.id,
        commentId: comment.id
      }
      this.$store.dispatch('deleteComment', payload)
    }
  },

  computed:{
    article(){
      return this.$store.state.article
    },
    comments(){
      return this.$store.state.comments
    }
  },

  created(){
    this.$store.dispatch('getArticle', this.$route.query.articleId)
    this.$store.dispatch('getComments', this.$route.query.articleId)
  }
}
</script>

<style>

</style>