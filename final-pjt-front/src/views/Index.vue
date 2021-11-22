<template>
  <div id="index">
    <!-- <img class="d-block mx-auto" src="../assets/logo.png" alt="이미지로고"> -->
    <div class="index-logo">
      <p>
        <span class="index-text">심야</span>
      </p>
      <p>
        <span class="index-text">영화</span>
      </p>
    </div>
    <menu-list class="menu-list"></menu-list>
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
}
.index-text{
  font-size: 5rem;
  color: #fff;
  animation: flicker 1.5s infinite alternate;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
}

@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa,
      0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa;
  }
  20%,
  24%,
  55% {
    text-shadow: none;
  }
}
</style>