<template>
  <form @submit="updateArticle">
    <div>
      <label for="title"> 제목 </label>
      <input id="title" type="text" placeholder="기존 제목">
    </div>
    <div>
      <label for="content"> 내용 </label>
      <textarea name="content" id="content" cols="100" rows="5"> 기존 내용 </textarea>
    </div>

    <div>
      <label for="image-upload"> 이미지 주소 </label>
      <input type="text"> <button>업로드 </button> 
    </div>    
    <button> 수정 </button>
  </form>
</template>

<script>
export default {
  name: 'CommunityUpdate',
  methods:{
    updateArticle(){
      alert("수정되었습니다!")
    }
  }
}
</script>

<style>

</style>