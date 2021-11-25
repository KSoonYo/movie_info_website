<template>
  <div>
    <nav-bar></nav-bar>
    <section class="container text-center">
      <h1> 개인 프로필 </h1>
      <profile-menu></profile-menu>

      <transition name="router-anim">
        <router-view></router-view>
      </transition>
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

.router-anim-enter-active{
  animation: comming 1s;
  opacity: 0;
}


.router-anim-leave-active {
  animation: going 1s;
}

@keyframes going{
  from{
    transform: translateX(0);
  }
  to{
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming{
  from{
    transform: translateX(-50px);
    opacity: 0;
  }
  to{
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>