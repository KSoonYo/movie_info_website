<template>
  <div class="container my-form p-3 rounded mt-5">
    <form @submit="updateArticle" class="col-12">
      <div class="row md-1 mt-3 mx-2">
        <label for="title" class="col-12"> 제목 </label>
        <div>
          <b-form-input
            id="title"
            v-model="title"
            type="text"
            style="
              background-color: rgb(34, 40, 49);
              color: white;
              border-color: rgb(34, 40, 49);
            "
          >
          </b-form-input>
        </div>
      </div>

      <div class="row md-1 mt-3 mx-2">
        <label for="content" class="col-12"> 내용 </label>
        <div>
          <b-form-textarea
          name="content"
          id="content"
          cols="100"
          rows="5"
          v-model="content"
          style="
            background-color: rgb(34, 40, 49);
            color: white;
            border-color: rgb(34, 40, 49);
          "
          >
          </b-form-textarea>
        </div>
      </div>

      <div class="row md-1 mt-3 mx-2">
        <label for="image-upload" class="col-12">이미지</label>
        <div>
          <input class="col-11 ps-0" @change="onInputImage" ref="articleImage" type="file">
        </div>
      </div>

      <div class="row md-3 mt-4 mx-2">
        <div>
          <button class="btn my-button"> 작성 </button>
        </div>
      </div>
    </form>
  </div>
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
    // 이미지 업로드 방법 당최 모르겠다.
    updateArticle(event){
      event.preventDefault()
      const formData = new FormData()
      formData.append("title", this.title)
      formData.append("content", this.content)
      if (this.image[0]) {
        formData.append("image", this.image[0])
      }
      console.log('보내기전')

      const newPayload = {
       articleId : this.$route.query.articleId,
       formData : formData
      }
      this.$store.dispatch('updateArticle', newPayload)
    },

    onInputImage(){
      this.image = this.$refs.articleImage.files
    },
  },

  created(){
    this.$store.dispatch('getArticles', this.$route.query.articleId)
    this.title = this.article.title
    this.content = this.article.content
  }
}
</script>

<style>
.my-form{
  background-color: rgb(39, 46, 56);
}

.my-button {
  background-color: rgb(111, 74, 142);
  color: white;
}
</style>