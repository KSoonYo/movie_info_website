<template>
  <button @click="communityCreate"> 글 작성하기 </button>
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

<style>

</style>