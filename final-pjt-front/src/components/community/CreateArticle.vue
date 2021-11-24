<template>
  <div class="d-flex justify-content-end">
    <button class="btn my-button my-3" @click="communityCreate"> 글 작성하기 </button>
  </div>
</template>

<script>
export default {
  name: 'CreateArticle',
  props:{
    category: {
      type: String
    }
  },

  methods:{
    communityCreate(){
      this.$router.push({name: 'CommunityCreate', params: {category : this.category || 'all'}}).catch(()=>{})
    }
  }
}
</script>

<style scoped>
.my-button {
  background-color: rgb(111, 74, 142);
  color: white;
}

</style>