<template>
  <form @submit="updateArticle">
    <div>
      <label for="title"> 제목 </label>
      <input v-model="title" id="title" type="text" :placeholder="article.title">
    </div>
    <div>
      <label for="content"> 내용 </label>
      <textarea v-model="content" name="content" id="content" cols="100" rows="5" :placeholder="article.content"></textarea>
    </div>

    <div>
      <label for="image-upload"> 이미지 주소 </label>
      <input @change="onInputImage()" ref="serveyImage" type="file"> 
    </div>    
    <button> 수정 </button>
  </form>
</template>

<script>
export default {
  name: 'CommunityUpdate',
  data(){
    return{
      title: '',
      content: '',
      image: ''
    }
  },

  computed:{
    article(){
      return this.$store.state.article
    }
  },

  methods:{
    onInputImage(){
      this.image = this.$refs.serveyImage.files[0]
    },

    // 이미지 업로드 방법 당최 모르겠다.
    updateArticle(event){
      event.preventDefault()
      const formData = new FormData()
      formData.append("title", this.title)
      formData.append("content", this.content)
      formData.append("image", this.image)

      const newPayload = {
       articleId : this.$route.query.articleId,
       formData : formData
      }
      this.$store.dispatch('updateArticle', newPayload)
    }
  },

  created(){
    this.$store.dispatch('getArticle', this.$route.query.articleId)
  }
}
</script>

<style>

</style>