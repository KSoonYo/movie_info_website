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
      <input type="text"> <button>업로드 </button> 
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
    }
  },

  methods: {
    createArticle(event){      
      event.preventDefault()
      const payload = {
        category: event.target[0].options.selectedIndex === 0 ? 'FREE' : 'RECOMMEND',
        title: this.title,
        content: this.content
      }
      this.$store.dispatch('createArticle', payload)
    
    }
  }
}
</script>

<style>

</style>