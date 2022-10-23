<template>
  <div
    class="blogheaderContainer"
    :class="bgColor ? 'navColor' : 'navColor'"
    v-loading.fullscreen="data.loading"
    element-loading-background="rgba(255,255,255,0.5)"
    element-loading-text="全力加载中。。。"
  >
    <div class="nav_ul">
      <div v-for="(item, index) in navList" @click="jump(item, index)">
        {{ item.title }}
      </div>
    </div>

    <div style="color: black">
      <el-popover placement="bottom" :width="150" :visible="data.visibleLanguage">
        <template #reference>
          <div class="changelanguage" @mouseenter="data.visibleLanguage = true">
            <img src="https://hyyyh.top:3001/global.png" alt="" />
            <span>{{ data.language }}</span>
          </div>
        </template>
        <div class="userHeader_popover" @mouseleave="data.visibleLanguage = false">
          <p @click="changeLanguage('ch')">中文</p>
          <p @click="changeLanguage('en')">English</p>
        </div>
      </el-popover>
    </div>
    <div
      class="userHeader"
      :class="{ ShowCover: data.islogin }"
      :style="{ opacity: data.ShowUserHeader ? '1' : '0' }"
    >
      <div class="userHeader_Text" @click="toLogin" v-if="!data.islogin">
        {{ i18n.t("header.login") }}
      </div>

      <el-popover placement="bottom" :width="150" trigger="hover" v-if="data.islogin">
        <template #reference>
          <div class="userHeader_Img"><img :src="data.header" /></div>
        </template>
        <div class="userHeader_popover">
          <p @click="openUserInfo">个人资料</p>
          <p @click="loginOut">退出登录</p>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../router/index";
import { verifyToken, loginout, login } from "../axios/apis";

import { onMounted, reactive, computed } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import { useRoute } from "vue-router";

import { useI18n } from "vue-i18n"; //要在js中使用国际化
import store from "../store";
let i18n = useI18n();

var route = useRoute();
let emit = defineEmits(["changePage"]);

let navList: any = computed(() => {
  return [
    { name: "blog", path: "/blog", title: i18n.t("header.home") },
    { name: "sort", path: "/sort", title: i18n.t("header.tags") },
    { name: "interaction", path: "/interaction", title: i18n.t("header.interaction") },
    { name: "friendLink", path: "/friendLink", title: i18n.t("header.friends") },
    { name: "record", path: "/record", title: i18n.t("header.record") },
    { name: "message", path: "/about", title: i18n.t("header.about") },
  ]; //导航栏信息
});

const data = reactive({
  islogin: false,
  loading: false,
  viewTitle: "", //当前页面标题
  header: "", //头像
  ShowUserHeader: false, //是否展示用户信息选项卡
  language: localStorage.getItem("language")?.toUpperCase() || "EN", //当前语言
  visibleLanguage: false, //是否展示切换语言选项卡
});
defineProps({
  bgColor: {
    type: Boolean,
    default: false,
  },
});

onMounted(async () => {
  const isToken = await verifyToken();
  data.ShowUserHeader = true;
  if (!isToken.data.token) {
    data.islogin = false;
    return localStorage.clear();
  }
  data.header = localStorage.getItem("header") || "";
  data.islogin = true;
});

// 国际化
const changeLanguage = (lang: string) => {
  data.visibleLanguage = false;
  data.language = lang.toUpperCase();
  i18n.locale.value = lang;
  store.state.language = lang;
  localStorage.setItem("language", lang);
};

// 路由跳转
const jump = async (item: any, index: number) => {
  if (route.path.includes(item.name)) {
    return;
  }
  emit("changePage");
  setTimeout(() => {
    router.push(item.path);
    data.viewTitle = item.name;
  }, 200);
};

const toLogin = () => {
  router.push({ path: "/login" });
};

const loginOut = async () => {
  const id = localStorage.getItem("id")!;
  const idd = parseInt(id);
  const res = await loginout(idd);
  if (res.status == 201) {
    ElMessage.error(res.data.msg);
  } else {
    localStorage.clear();
    router.push("/login");
    ElMessage.success(res.data.msg);
  }
};

const openUserInfo = () => {
  store.state.isVisibelUserDrawer = true;
};
</script>

<style scoped lang="less">
@bg-light-color: rgba(255, 255, 255, 0.9);
* {
  font-family: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';";
}
.blogheaderContainer {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  transition: 0.5s all;
  z-index: 99;
  color: white;
  overflow: hidden;

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
      color: black;
      font-weight: 900;
      /* background: rgba(0, 0, 0, 0.2); */
      margin: 1rem;
      padding: 0.5rem 1.5rem;
      transition: 0.2s;
      border-radius: 10px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
      }
    }
  }
  .changelanguage {
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
  .userHeader {
    color: black;
    border-radius: 10px;
    font-weight: 900;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    user-select: none;
    margin: 1rem 3rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all;
    &:hover {
      background-color: rgba(0, 0, 0, 0.9);
      color: white;
    }
    .userHeader_Img {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ShowCover {
    &:hover {
      background-color: transparent;
      color: white;
    }
  }
}
.navColor {
  background: @bg-light-color;
  backdrop-filter: blur(10px);
}
.userHeader_popover {
  cursor: pointer;
  user-select: none;
  width: 100%;
  p {
    text-align: center;
    width: 100%;
    padding: 0.6rem 0;
    transition: 0.3s all;
    border-radius: 10px;
    margin: 0.2rem 0;
    &:hover:nth-child(1) {
      background-color: skyblue;
      color: white;
    }
    &:hover:nth-child(2) {
      background-color: red;
      color: white;
    }
  }
}
</style>
