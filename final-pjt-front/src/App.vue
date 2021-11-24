<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  created(){
    const accessToken = localStorage.getItem('accessToken')
    this.$store.commit('SET_TOKEN', accessToken)
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  height: 100%;
  overflow: auto;

  /* background: linear-gradient(to right, rgba(9, 8, 10, 0.795) 0%, rgba(19, 17, 15, 0.959) 80%, rgb(22, 21, 21) 100%); */
  background: rgb(7, 6, 6);
  color: rgb(238, 238, 238);
}

</style>
