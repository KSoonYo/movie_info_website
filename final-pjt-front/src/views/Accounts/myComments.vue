<template>
  <div></div>
</template>

<script>
export default {
  name: 'myComments',
  computed:{
    myComments(){
      return this.$store.state.myComments
    },
  }
}
</script>

<style>

</style>