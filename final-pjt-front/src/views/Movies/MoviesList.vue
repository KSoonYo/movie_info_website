<template>
  <div>
    <nav-bar></nav-bar>
    <section class="container">
      <h1>영화 리스트</h1>
      <router-link :to="{name: 'NowPlay'}"> 최신 활동사진관 </router-link>
      <router-link :to="{name: 'Popular'}"> 명작 활동사진관 </router-link>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'MoviesList',
  components: {
    NavBar
  }

}
</script>

<style>

</style>