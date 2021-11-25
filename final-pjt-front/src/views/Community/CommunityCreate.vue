<template>
  <div class="container my-form p-3 rounded mt-5">
    <form @submit="createArticle" class="col-12">
      <div class="row my-1 mx-2">
        <div class="col-12">분류</div>
        <div>
          <select name="category" id="category-options" class="pe-2 py-1" style="background-color: rgb(34, 40, 49); color: white; border-color: rgb(34, 40, 49);">
            <option value="FREE" >자유</option>
            <option value="RECOMMEND" :selected="categoryStatus==='recommend'">추천</option>
          </select>
        </div>
      </div>
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
        <span v-if="titleAlert" class="text-danger"> 제목을 입력해주세요. </span>
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
        <span v-if="contentAlert" class="text-danger"> 내용을 입력해주세요. </span>
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
  name: 'CommunityCreate',
  data(){
    return{
      categoryStatus : this.$route.params.category,
      title : '',
      content: '',
      category: '',
      image: '',

      titleAlert : false,
      contentAlert : false
    }
  },

  methods: {
    createArticle(event){      
      event.preventDefault()

      // 작성 유효성 검사
      if(!this.title.trim()){
        this.titleAlert = true
      } else {
        this.titleAlert = false
      }

      if(!this.content.trim()){
        this.contentAlert = true 
      } else {
        this.contentAlert = false
      }

      if(this.titleAlert || this.contentAlert){
        return
      }

      const payload = new FormData()
      payload.append('title', this.title)
      payload.append('content', this.content)
      payload.append('category', event.target[0].options.selectedIndex === 0 ? 'FREE':'RECOMMEND')
      if (this.image[0]) {
        payload.append('image', this.image[0])
      }
      
      this.$store.dispatch('createArticle', payload)

    },

    onInputImage(){
      this.image = this.$refs.articleImage.files
    }
  }
}
</script>

<style scoped>
.my-bg{
  background-color: rgb(65, 65, 65);
  border-color: rgb(65, 65, 65);
  color: white;
}

.my-form{
  background-color: rgb(39, 46, 56);
}

.my-button {
  background-color: rgb(111, 74, 142);
  color: white;
}


</style>