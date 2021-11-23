<template>
  <div id="index">
    <!-- <img class="d-block mx-auto" src="../assets/logo.png" alt="이미지로고"> -->
    <div class="index-logo">
      <p class="pt-2">
        <span class="index-text">심夜</span>
      </p>
      <p>
        <span class="index-text">영화관</span>
      </p>
    </div>
    <menu-list></menu-list>
  </div>
</template>

<script>
import MenuList from '@/components/MenuList'

export default {
  name: 'Index',
  components: {
    MenuList
  }

}
</script>

<style scoped>
#index{
  position: absolute;
  top: 42%;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);
}

.index-logo{
  text-align: center;
  border: 0.2rem solid #fff; 
  border-radius: 2rem; padding: 0.4em; 
  box-shadow: 0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
}
.index-text{
  font-size: 4rem;
  color: #fff;
  animation: flicker 1.5s infinite alternate; 
}

@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px rgb(231, 44, 200),
      0 0 80px rgb(221, 29, 29), 0 0 90px rgba(232, 7, 240, 0.89), 0 0 100px rgb(230, 21, 195), 0 0 150px #0fa;
  }
  20%,
  24%,
  55% {
    text-shadow: none;
  }
}
</style>