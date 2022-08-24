<template>
  <div class="about">
    <blogheaderVue :bgColor="true"></blogheaderVue>
    <div class="about_container">
      <div class="a"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import blogheaderVue from "../../components/blogheader.vue";
</script>

<style scoped lang="less">
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .about_container {
    width: 70%;
    height: 400px;
    background-color: gray;
    .a {
      width: 200px;
      height: 100px;
      border-radius: 30px;
      background-color: white;
      border: 3px solid skyblue;
      transition: 3s;
      transform: rotateY(0deg);
    }
  }
}
</style>
