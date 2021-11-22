<template>
  <div>
    <p v-for="(myArticle, index) in Articles" :key="index">
        {{myArticle}}
        {{index}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'myArticles',
  data(){
    return{
      Articles: this.$store.state.myArticles
    }
  }
  
}
</script>

<style>

</style>