<template>
    <div id="app" class="pb-3">
  <vue-scroll :ops="ops"> 
      <transition name="fade" mode="out-in">
          <router-view></router-view>
      </transition>

  </vue-scroll>
    </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        ops: {
          vuescroll: {  
              mode: 'native',
              // sizeStrategy: 'percent',
              // detectResize: true,
              /** Enable locking to the main axis if user moves only slightly on one of them at start */
              locking: true,},
          scrollPanel: {},
          rail: {},
          bar: {
                background: '#c1c1c1',
                specifyBorderRadius: true,
                size: '7px',
          }
        }
      }
    },

  created(){
    const accessToken = localStorage.getItem('accessToken')
    this.$store.commit('SET_TOKEN', accessToken)
  
  }
  
}
</script>

<style>
#app {
  font-family: 'IBM Plex Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  height: 100%;
  overflow: auto;

  /* background: linear-gradient(to right, rgba(9, 8, 10, 0.795) 0%, rgba(19, 17, 15, 0.959) 80%, rgb(22, 21, 21) 100%); */
  background: rgb(15, 15, 15);
  color: rgb(238, 238, 238);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* 
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
} */

</style>
