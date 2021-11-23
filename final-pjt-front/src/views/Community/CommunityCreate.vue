<template>
  <form @submit="createArticle">
    <select name="category" id="category-options">
      <option value="FREE" >자유</option>
      <option value="RECOMMEND" :selected="categoryStatus==='recommend'">추천</option>
    </select>

    <div>
      <label for="title"> 제목 </label>
      <input id="title" v-model="title" type="text">
    </div>
    <div>
      <label for="content"> 내용 </label>
      <textarea name="content" id="content" cols="100" rows="5" v-model="content"></textarea>
    </div>

    <div>
      <label for="image-upload"> 이미지</label>
      <input @change="onInputImage" ref="articleImage" type="file">
    </div>    
    <button> 작성 </button>
  </form>

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
    }
  },

  methods: {
    createArticle(event){      
      event.preventDefault()
      const payload = new FormData()
      payload.append('title', this.title)
      payload.append('content', this.content)
      payload.append('category', event.target[0].options.selectedIndex === 0 ? 'FREE':'RECOMMENT')
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

<style>

</style>