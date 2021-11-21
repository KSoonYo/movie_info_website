<template>
  <div id="index">
    <img class="d-block mx-auto" src="../assets/logo.png" alt="이미지로고">
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
  top: 40%;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);
}

</style>