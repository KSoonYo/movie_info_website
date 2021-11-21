<template>
  <section>
    <p>게시판 분류: </p>
    <h1>타이틀: </h1>
    <p>content</p>
    <img src="../../assets/logo.png" alt="이미지">
    <p>작성시간: </p>
    <p>수정시간: </p>
    <p>작성자 아이디: </p>
    <button>추천: </button>
    <br>
    <button 
    @click="updateArticle" 
    >
    수정
    </button>
    <button>삭제</button>

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
  // data(){
  //   return{
  //     articleId: this.$route.params.articleId
  //   }
  // },
  methods:{
    updateArticle(){
      this.$router.push({name: 'CommunityUpdate', params:{articleId: this.$route.params.articleId} })
    }
  }
}
</script>

<style>

</style>