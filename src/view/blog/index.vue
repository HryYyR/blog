<template>
  <div class="container">
    <blogheader :bgColor="data.navColor"></blogheader>
    <viewTitle :viewTitle="data.viewTitle" :isShow="data.isShowTitle"></viewTitle>
    <!-- <div class="viewBody">body</div> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import viewTitle from "../../components/title.vue";
import blogheader from "../../components/blogheader.vue";
import anime from "animejs";
import { onMounted, onUnmounted, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import router from "../../router";
import { verifyToken } from "../../axios/apis";
const route = useRouter();

const data = reactive({
  isShowTitle: true,
  viewTitle: "", //当前页面标题
  navColor: false,
});

onMounted(async () => {
  const isToken = await verifyToken();
  if (!isToken.data.token) {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  }

  window.addEventListener("scroll", changeNavColor);
});
onUnmounted(() => {
  window.removeEventListener("click", changeNavColor);
});
// 切换导航栏颜色
const changeNavColor = () => {
  let windowHeight;
  windowHeight = window.innerHeight;
  if (window.scrollY > windowHeight - 50) {
    data.navColor = true;
  } else {
    data.navColor = false;
  }
};
watchEffect(() => {
  data.viewTitle = route.currentRoute.value.path.slice(1);
});
</script>

<style scoped lang="less">
* {
  font-family: Georgia, STZhongsong;
}
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  flex-direction: column;
}
</style>
