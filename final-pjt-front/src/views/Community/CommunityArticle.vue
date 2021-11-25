<template>
  <section>
    <div class="my-bg m-2 p-4 rounded">
      <div class="d-flex justify-content-between">
        <h1>{{ article.title }}</h1>
        <div>
          <button 
            v-if="createdByMeForArticle"
            @click="updateArticle" 
            class="btn btn-link"
          >
          <i class="fas fa-edit"></i>
          </button>
          <button v-if="createdByMeForArticle" @click="deleteArticle" class="btn btn-link"><i class="fas fa-trash-alt text-danger"></i></button>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <p class="mb-0 pb-0">작성자: {{ article.user }}  </p>
        <p class="mb-0 pb-0">{{ article.category ==='FREE' ? '자유' : '추천' }} 게시판</p>
      </div>
      <hr>
      <div class="d-flex flex-column align-items-center">
        <img v-if="article.image" :src="`http://127.0.0.1:8000${article.image}`" class="mb-2" alt="이미지">
      </div>
      <p class="mb-5"> {{article.content}} </p>
      <hr>
      <div class="d-flex flex-column align-items-end my-font-1">
        <p class="mb-1">작성시간: {{ article.created_at }}  </p>
        <p>수정시간: {{ article.updated_at }}  </p>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center my-4">
        <button @click="likeArticle" v-if="isLogin && !likeStatus" class="btn text-primary"><i class="far fa-thumbs-up"></i></button>
        <button @click="disLikeArticle" v-else-if="isLogin && likeStatus" class="btn text-primary"><i class="fas fa-thumbs-up"></i></button> 
        <span> {{ recommendUsers }} 명이 이 글을 추천합니다. </span>
      </div>
    </div>

    <article class="my-bg m-2 p-4 rounded">
      <h2>댓글</h2>
      <div v-if="!comments.length" style="background-color: rgb(34, 40, 49);" class="py-3 ps-2 rounded">아직 댓글이 없어요...</div>
      <div v-for="comment in comments" :key="comment.id" class="my-repl p-2 my-1 rounded">
        <div class="d-flex justify-content-between">
          <strong class="pb-0 my-auto">{{comment.user }}</strong>
          <button
            v-if="!!createdCommentsByMe.find(myComment=>{
              return myComment.id === comment.id
            })" 
            class="d-inline btn btn-link"
            @click="deleteComment(comment)"
          >
          <i class="fas fa-trash-alt text-danger"></i>
          </button>
        </div>
        <hr class="mt-1">
        <div class="d-flex justify-content-between">
          <p>{{ comment.content }}</p>
          <span class="my-font-1"> 작성 시간: {{ comment.created_at }} </span>
        </div>
      </div>
    </article>
    <div class="my-bg m-2 p-4 rounded">
      <h2>댓글 작성</h2>
      <form v-if="isLogin" @submit="createComment">
        <b-form-textarea
          id="textarea"
          rows="3"
          v-model="commentContent"
          style="background-color: rgb(34, 40, 49); color: white; border-color: rgb(34, 40, 49);"
        >
        </b-form-textarea>
        <button class="mt-2 btn" style="background-color: rgb(111, 74, 142); color: white;">작성</button>
      </form>
      <form v-if="!isLogin" @submit="showModal">
        <b-form-textarea
          id="textarea"
          rows="3"
          v-model="commentContent"
          style="background-color: rgb(34, 40, 49); color: white; border-color: rgb(34, 40, 49);"
        >
        </b-form-textarea>
        <button class="mt-2 btn" style="background-color: rgb(111, 74, 142); color: white;">로그인</button>
      </form>
      <login-modal v-if="!hideModal"></login-modal>
    </div>
    
  </section>
</template>

<script>
import {timeMark} from '@/utils/datetime'
import LoginModal from '@/components/accounts/LoginModal'

export default {
  name: 'CommunityArticle',
  data(){
    return({
      commentContent: '',
      recommendUsers : this.$store.state.article.recommend_users.length,
      hideModal: true,
    })
  },

  components:{
    LoginModal
  },

  methods:{
    showModal(event){
      event.preventDefault()
      this.$modal.show(LoginModal, 
        {prpos: null}, 
        { name: 'LoginModal',
          draggable: true,
          width: '500px',
          height: 'auto',
          scrollable: true
        }
      )
    },

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

<style scoped>
.my-bg {
  background-color: rgb(39, 46, 56);
}

.my-repl {
  background-color: rgb(34, 40, 49);
}

.my-font-1 {
  font-size: 2px;
  color: rgb(190, 190, 190);
}
</style>