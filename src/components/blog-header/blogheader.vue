<template>
  <div class="blogheaderContainer" :class="bgColor ? 'navColor' : 'navColor'" v-loading.fullscreen="data.loading"
    element-loading-background="rgba(255,255,255,0.5)" element-loading-text="全力加载中。。。" v-if="store.state.isPC">
    <div class="nav_ul">
      <div v-for="(item, index) in navList" @click="jump(item, index)" :class="{ check: item.check }">
        <span>{{ item.title }}</span>
        <div v-if="!item.check" class="nav_ul_cover"></div>
      </div>
    </div>

    <div>
      <el-switch v-model="data.dark" size="large" style="--el-switch-on-color: #000; --el-switch-off-color: skyblue"
        inline-prompt @change="changecolortheme" :active-icon="Sunny" :inactive-icon="Moon" />
    </div>

    <div style="color: black">
      <el-popover placement="bottom" :width="150" :visible="data.visibleLanguage">
        <template #reference>
          <div class="changelanguage" @mouseenter="data.visibleLanguage = true">
            <span>{{ data.language }}</span>
          </div>
        </template>
        <div class="userHeader_popover" v-on:mouseleave="data.visibleLanguage = false">
          <p @click="changeLanguage('ch')">中文</p>
          <p @click="changeLanguage('en')">English</p>
        </div>
      </el-popover>
    </div>

    <!-- PC端 -->
    <div class="userHeader" :class="{ ShowCover: data.islogin }" :style="{ opacity: data.ShowUserHeader ? '1' : '0' }">
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

  <!-- PE端 -->
  <div class="PEnav" :class="{ openPEnav: data.isopenPEnav }" v-if="!store.state.isPC">
    <div class="PEnav_img" @click="openPEnav">
      <img src="https://hyyyh.top:3001/icon/open.png" v-show="!data.isopenPEnav" />
      <img src="https://hyyyh.top:3001/icon/close.png" v-show="data.isopenPEnav" />
    </div>
    <div class="penav_title"></div>
    <div class="pelanguage">
      <img src="https://hyyyh.top:3001/icon/changelanguage.png" @click.stop="changeLanguage('')" alt="" />
    </div>
    <div class="peheader">
      <div class="userHeader" :class="{ ShowCover: data.islogin }" :style="{ opacity: data.ShowUserHeader ? '1' : '0' }">
        <div class="userHeader_Text" @click="toLogin" v-if="!data.islogin">
          {{ i18n.t("header.login") }}
        </div>

        <el-popover placement="bottom" :width="150" trigger="hover" class="popover" v-if="data.islogin">
          <template #reference>
            <div class="userHeader_Img"><img v-lazy="data.header" /></div>
          </template>
          <div class="userHeader_popover">
            <p @click="openUserInfo">个人资料</p>
            <p @click="loginOut">退出登录</p>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="penav_ul" :style="{
      opacity: data.isopenPEnav ? '1' : '0',
      height: data.isopenPEnav ? '100%' : '0px',
    }">
      <div v-for="(item, index) in navList" @click="jump(item, index)" :class="{ pecheck: item.check }">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../../router/index";
import { verifyToken, loginout, login, getuserdata } from "../../axios/apis";

import { onMounted, reactive, computed, watchEffect, ref } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";

import { useI18n } from "vue-i18n"; //要在js中使用国际化
import store from "../../store";

import { Moon, Sunny } from "@element-plus/icons-vue";

import QC from "qc";
import { type } from "os";
let i18n = useI18n();

var route = useRoute();
let emit = defineEmits(["changePage"]);
let navList: any = computed(() => {
  let routesList: any = [] //导航栏信息
  router.getRoutes().forEach((item: any, index: Number) => {
    if (item.meta.isBlogHeader) {
      routesList.push({
        "name": item.name,
        "path": item.path,
        "title": i18n.t(`header.${item.name}`)
      })
    }

  })
  return routesList

}
);

const data = reactive({
  isopenPEnav: false,
  islogin: false,
  loading: false,
  viewTitle: "", //当前页面标题
  header: localStorage.getItem("header") || "", //头像
  ShowUserHeader: false, //是否展示用户信息选项卡
  language: localStorage.getItem("language")?.toUpperCase() || "EN", //当前语言
  visibleLanguage: false, //是否展示切换语言选项卡
  dark: store.state.currentColorTheme,
  darkImg: {
    moon: "https://hyyyh.top:3001/icon/moon.png",
    sun: "https://hyyyh.top:3001/icon/moon.png",
  },
});
defineProps({
  bgColor: {
    type: Boolean,
    default: false,
  },
});

onMounted(async () => {
  //解决刷新后header选中问题
  navList.value.forEach((e: any, index: number) => {
    if (e.name == route.name) {
      navList.value[index].check = true;
    }
  });
  const isToken = await verifyToken();
  data.ShowUserHeader = true;
  if (!isToken.data.token && !QC.Login.check()) {
    data.islogin = false;
    return localStorage.clear();
  }

  data.islogin = true;
});

const changecolortheme = () => {
  console.log(data.dark);
  store.state.currentColorTheme = data.dark;
};

const openPEnav = () => {
  data.isopenPEnav = !data.isopenPEnav;
};

// 国际化
const changeLanguage = (lang: string) => {
  let language = lang;
  if (lang == "") {
    !localStorage.getItem("language") && (language = "ch");
    localStorage.getItem("language") == "ch" && (language = "en");
    localStorage.getItem("language") == "en" && (language = "ch");
  }

  data.visibleLanguage = false;
  data.language = language.toUpperCase();
  i18n.locale.value = language;
  store.state.language = language;
  localStorage.setItem("language", language);

  //解决刷新后header选中问题
  navList.value.forEach((e: any, index: number) => {
    if (e.name == route.name) {
      navList.value[index].check = true;
    }
  });
};

// 路由跳转
const jump = async (item: any, index: number) => {
  data.isopenPEnav = false;
  store.state.checkPage = index;

  if (route.path == item.path) {
    return;
  }
  emit("changePage");
  setTimeout(() => {
    router.push(item.path);
    data.viewTitle = item.title;
    store.state.title = item.title;
  }, 200);
};

const toLogin = () => {
  router.push({ path: "/login" });
};

const loginOut = async () => {
  const id = localStorage.getItem("id")!;
  if (QC.Login.check()) {
    QC.Login.signOut();
    localStorage.clear();
    router.push("/login");
    ElMessage.success("退出QQ登录成功!");
    return;
  }
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

const openUserInfo = async () => {
  let resolve = await getuserdata();
  if (resolve.status == 200) {
    store.state.isVisibelUserDrawer = true;
    let data = resolve.data.data;
    for (let i in data) {
      data[i] == null && (data[i] = " ");
    }
    store.state.userinfo = data;
    // console.log(resolve.data.data);
  } else {
    ElMessage.error("获取用户数据失败！");
  }
};
</script>

<style scoped lang="less">
@bg-light-color: rgba(255, 255, 255, 0.8);

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
  overflow: hidden;
  backdrop-filter: blur(5px);

  .navBlur {
    filter: blur(2px);
  }

  .nav_ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      position: relative;
      user-select: none;
      cursor: pointer;
      font-size: 1rem;
      width: 95px;
      text-align: center;
      color: var(--WB);
      font-weight: 900;
      /* background: rgba(0, 0, 0, 0.2); */
      margin: 0.5rem ;
      padding: 0.5rem 0rem;
      transition: 0.2s;
      border-radius: 10px;

      .nav_ul_cover {
        position: absolute;
        width: 110px;
        background-color: var(--WB);
        left: -16px;
        height: 20px;
        opacity: 0;
        transition: 0.2s;
        z-index: -1;
        top: 0;
      }

      &:hover {
        & .nav_ul_cover {
          opacity: 1;
          top: -8px;
        }

        color: var(--BW);
      }
    }
  }

  .check {
    background-color: rgba(55, 95, 255, 0.9) !important;
    color: white !important;
  }

  .changelanguage {
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: 0.3s;
    color: var(--WB);

    img {
      width: 40%;
    }

    &:hover {
      opacity: 0.6;
    }
  }

  .userHeader {
    color: var(--WB);
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
  background: var(--BW-8);
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

.PEnav {
  transition: 0.6s;
  width: 100%;
  height: 80px;
  background-color: var(--BW);
  color: var(--WB);
  font-weight: 600;
  border-radius: 3px;
  position: fixed;
  top: 0px;
  z-index: 5;
  cursor: pointer;
  user-select: none;
  transition: 0.2s all;
  display: flex;
  align-items: center;
  flex-direction: column;

  .PEnav_img {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 20px;
    top: 30px;

    img {
      width: 25px;
      height: 25px;
    }
  }

  .penav_title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    width: 100%;
    height: 80px;
    font-size: 1.5rem;
  }

  .pelanguage {
    position: absolute;
    right: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;

    & img {
      width: 30px;
      height: 30px;
    }
  }

  .peheader {
    position: absolute;
    right: 5px;
    z-index: 99;
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      width: 50px;
      height: 50px;
    }
  }

  .penav_ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 0;
    height: 0;
    transition: 0.2s;
    overflow: hidden;
    position: relative;

    &>div {
      width: 100%;
      padding: 1rem 0;
      background-color: var(--BW);
      color: var(--WB);
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-weight: 900;
      }
    }
  }

  .pecheck {
    background-color: var(--WB) !important;
    color: var(--BW) !important;
  }
}

.openPEnav {
  opacity: 0.9;
  height: 100%;
}
</style>
