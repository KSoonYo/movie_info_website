<template>
  <section>
    <p>게시판 분류: {{ article.category ==='FREE' ? '자유' : '추천' }} </p>
    <h1>타이틀: {{ article.title }} </h1>
    <p> {{article.content}} </p>
    <img v-if="article.image" :src="`http://127.0.0.1:8000${article.image}`" alt="이미지">
    <p>작성시간: {{ article.created_at }}  </p>
    <p>수정시간: {{ article.updated_at }}  </p>
    <p>작성자: {{ article.user }}  </p>
    <button @click="likeArticle" v-if="isLogin && !likeStatus ">추천</button>
    <button @click="disLikeArticle" v-else-if="isLogin && likeStatus">추천 취소</button> 
    <span> {{ recommendUsers }} 명이 이 글을 추천합니다. </span>
    <br>
    <button 
    v-if="createdByMeForArticle"
    @click="updateArticle" 
    >
    수정
    </button>
    <button v-if="createdByMeForArticle" @click="deleteArticle">삭제</button>

    <article>
      <h2>댓글 목록</h2>
      <div v-for="comment in comments" :key="comment.id">
        <p>작성자: {{comment.user }} </p>
        <span> 작성 시간: {{ comment.created_at }} </span>
        <p>
          댓글: {{ comment.content }} 
          <button  v-if="!!createdCommentsByMe.find(myComment=>{
            return myComment.id === comment.id
            })" 
          class="d-inline" @click="deleteComment(comment)"> 댓글 삭제 </button>
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
import {timeMark} from '@/utils/datetime'


export default {
  name: 'CommunityArticle',
  data(){
    return({
      commentContent: '',
      recommendUsers : this.$store.state.article.recommend_users.length
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
      this.commentContent = ''
    },

    deleteComment(comment){
      // console.log(comment)
      const payload = {
        articleId : this.article.id,
        commentId: comment.id
      }
      this.$store.dispatch('deleteComment', payload)
    },

    likeArticle(){
      this.$store.dispatch('likeArticle', this.article)
      this.recommendUsers += 1
    },

    disLikeArticle(){
      this.$store.dispatch('disLikeArticle', this.article)
      this.recommendUsers -= 1
    }
  },

  computed:{
    article(){
      return {
        ...this.$store.state.article,
        created_at: timeMark(this.$store.state.article.created_at),
        updated_at: timeMark(this.$store.state.article.updated_at)
      } 
    },
    comments(){
      return this.$store.state.comments.map(comment=>{
        return {
          ...comment,
          created_at : timeMark(comment.created_at)
        }
      })
    },

    createdByMeForArticle(){
      return !!this.$store.state.myArticles.find(myArticle=>{
        return myArticle.id === this.article.id
      })
    },

    createdCommentsByMe(){
      return this.$store.state.myComments
    },

    likeStatus(){
      return this.$store.state.likeArticles.find(elem=>{
        return elem.id === this.article.id
      })
    },

    isLogin(){
      return this.$store.getters.loginStatus;
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