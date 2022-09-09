<template>
  <div
    class="blogheaderContainer"
    :class="bgColor ? 'navColor' : ''"
    v-loading.fullscreen="data.loading"
    element-loading-background="rgba(255,255,255,0.5)"
    element-loading-text="全力加载中。。。"
  >
    <div class="nav_ul">
      <div v-for="(item, index) in data.navList" @click="jump(item.name, index)">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../router/index";
import { onMounted, reactive } from "vue";
import { ElLoading, ElMessage } from "element-plus";

const data = reactive({
  loading: false,
  viewTitle: "", //当前页面标题
  navList: [
    { name: "blog", path: "/blog", title: "首页" },
    { name: "sort", path: "/sort", title: "分类" },
    { name: "interaction", path: "/interaction", title: "互动" },
    { name: "record", path: "/record", title: "记录" },
    { name: "message", path: "/about", title: "关于" },
    { name: "login", path: "/login", title: "登录" },
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
  if (name)
    data.navList.forEach((item) => {
      if (item.name == "login") {
        item.title = name;
      }
    });
});

// 路由跳转
const jump = async (name: string, index: number) => {
  // data.loading = !data.loading;
  setTimeout(() => {
    // data.loading = !data.loading;
    if (localStorage.getItem("id") && name == "login") {
      if (localStorage.getItem("id") != "1") {
        return ElMessage.error("暂未开放");
      }
      return router.push({ path: "/admin" });
    }
    router.push(data.navList[index].path);
    data.viewTitle = data.navList[index].name;
  }, 100);
};
</script>

<style scoped lang="less">
* {
  font-family: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';";
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
  overflow: hidden;

  &:after {
    content: " ";
    width: 100%;
    height: 0px;
    position: absolute;
    /* 圆点型的border */
    border-bottom: 10px dotted rgba(255, 255, 255, 0.1);
    /* 偏移一个半径，让圆点的一半覆盖div */
    right: -10px;
    bottom: -4px;
  }

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
