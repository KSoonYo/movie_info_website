<template>
  <form @submit="createArticle">
    <select name="category" id="category-options">
      <option value="자유" :selected="categoryStatus === 'free'">자유</option>
      <option value="추천" :selected="categoryStatus === 'recommend'">추천</option>
    </select>

    <div>
      <label for="title"> 제목 </label>
      <input id="title" type="text">
    </div>
    <div>
      <label for="content"> 내용 </label>
      <textarea name="content" id="content" cols="100" rows="5"></textarea>
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
      // TODO: 카테고리 상태에 따른 select 옵션 default 설정
      categoryStatus : this.$route.params.category
   
    }
  },

  methods: {
    createArticle(){      
      alert('생성되었습니다!')
    }
  }
}
</script>

<style>

</style>