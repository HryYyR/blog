<template>
  <div
    class="blogheaderContainer"
    :class="bgColor ? 'navColor' : ''"
    v-loading.fullscreen="data.loading"
    element-loading-background="rgba(255,255,255,0.5)"
    element-loading-text="全力加载中。。。"
  >
    <div class="nav_ul">
      <div v-for="(item, index) in data.navList" @click="jump(index)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../router/index";
import { onMounted, reactive, defineProps } from "vue";
import { ElLoading } from "element-plus";

const data = reactive({
  loading: false,
  viewTitle: "", //当前页面标题
  navList: [
    { name: "blog", path: "/blog" },
    { name: "music", path: "/music" },
    { name: "sort", path: "/sort" },
    { name: "message", path: "/" },
    { name: "search", path: "/" },
    { name: "login", path: "/login" },
  ], //导航栏信息
});
defineProps({
  bgColor: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  const name = localStorage.getItem("name")!;
  if (name) data.navList[5].name = name;
});

// 路由跳转
const jump = async (index: number) => {
  data.loading = !data.loading;
  setTimeout(() => {
    data.loading = !data.loading;
    if (index == 5 && data.navList[5].name != "login") {
      return router.push({ path: "/admin" });
    }
    router.push(data.navList[index].path);
    data.viewTitle = data.navList[index].name;
  }, 1000);
};
</script>

<style scoped lang="less">
* {
  font-family: Georgia, STZhongsong;
}
.blogheaderContainer {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  transition: 0.5s all;
  z-index: 99;
  color: white;
  .navBlur {
    filter: blur(2px);
  }
  .nav_ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      user-select: none;
      cursor: pointer;
      font-size: 1rem;
      width: auto;
      text-align: center;
      /* background: rgba(0, 0, 0, 0.2); */
      margin: 1.5rem;
      padding: 0.2rem;
    }
  }
}
.navColor {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}
</style>
