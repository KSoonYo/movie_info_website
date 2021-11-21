<template>
  <div>
    <nav-bar></nav-bar>
    <section class="container">
      <h1> 개인 프로필 페이지 </h1>
      <profile-menu></profile-menu>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import ProfileMenu from '@/components/accounts/ProfileMenu'

export default {
  name:'Profile',
   components:{
    NavBar,
    ProfileMenu
  },
}
</script>

<style>

</style>