<template>
  <div></div>
</template>

<script>
export default {
  name: 'myReviews',
  computed:{
    myReviews(){
      return this.$store.state.myReviews
    }
  }
}
</script>

<style>

</style>