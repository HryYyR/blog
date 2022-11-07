<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['about']">
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <!-- 切换主题颜色 -->
  <changeBgColorVue @ChangeBgColor="ChangeBgColor" />
  <!-- 太阳 -->
  <div
    class="sun"
    :style="{ right: `${data.sunOptions.X}%`, bottom: `${data.sunOptions.Y}%` }"
  >
    <img src="https://hyyyh.top:3001/icon/sun.png" />
  </div>
  <!-- 覆盖层 -->
  <div
    class="stylecover"
    :style="{
      opacity: data.coverOption.opacity,
      backgroundColor: data.coverOption.color,
      zIndex: data.coverOption.zIndex,
    }"
  ></div>

  <!-- 个人资料 -->
  <el-drawer v-model="store.state.isVisibelUserDrawer" title="个人资料" direction="rtl">
    <div class="UserDrawer">
      <div class="avatar">
        <img :src="data.user_avatar" alt="" />
      </div>
      <div class="UserDrawer_name">
        <span>昵称：</span>
        <el-input v-model="data.user_name" placeholder="name" disabled />
      </div>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import changeBgColorVue from "./components/change-bgColor.vue";
import { onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.commit("getTimeState");
  store.state.userid = data.user_id;
  store.state.username = data.user_name;
});
const data = reactive({
  //太阳位置
  sunOptions: {
    X: 3,
    Y: -10,
  },
  // 覆盖层数据
  coverOption: {
    color: "white",
    opacity: 0,
    zIndex: -99,
  },
  user_drawer: false, ///是否显示个人资料
  user_avatar: localStorage.getItem("header") || "",
  user_name: localStorage.getItem("name") || "",
  user_id: localStorage.getItem("id") || "-1",
  NowIsChangeBgColor: false, //现在是否正在切换背景颜色
});
watch(store.state, (newvalue, oldvalue) => {
  data.user_avatar = localStorage.getItem("header") || "";
  data.user_name = localStorage.getItem("name") || "";
  data.user_id = localStorage.getItem("id") || "-1";
});
// 切换主题颜色
const ChangeBgColor = (item: any) => {
  if (data.NowIsChangeBgColor) {
    return;
  } else {
    data.NowIsChangeBgColor = true;
  }
  data.coverOption = {
    zIndex: 98,
    color: item.start,
    opacity: 1,
  };
  setTimeout(() => {
    store.state.themeColor = item;
    data.coverOption.opacity = 0;
    setsunPosition(item.id);

    setTimeout(() => {
      data.coverOption.zIndex = -99;
      data.NowIsChangeBgColor = false;
    }, 1000);
  }, 2000);
};
// 设定太阳位置
const setsunPosition = (id: number) => {
  switch (id) {
    case 0:
      data.sunOptions = {
        X: 3,
        Y: -10,
      };
      break;
    case 1:
      data.sunOptions = {
        X: 45,
        Y: 90,
      };
      break;
    case 2:
      data.sunOptions = {
        X: 94,
        Y: 5,
      };
      break;
    case 3:
      data.sunOptions = {
        X: -100,
        Y: 100,
      };
      break;
  }
};
</script>

<style lang="less">
@import "./APP.css";
@containerbgcolor:rgba (227, 237, 255, 0.7);
* {
  padding: 0;
  margin: 0;
}
@media screen and (max-width: 700px) {
  /*  blogitem  */
  .newBlog {
    flex-direction: column;
    height: auto !important;
    .newBlog_right {
      height: auto !important;
      img {
        width: 100% !important;
        height: 100% !important;
        min-height: 190px !important;
      }
    }
    .newBlog_left {
      width: 88% !important;
      .newBlog_Title {
        font-size: 1.1rem !important;
      }
      .newBlog_body {
        font-size: 0.8rem !important;
      }
    }
    .newblog_labelsort {
      font-size: 0.4rem !important;
    }
  }

  /*login */
  .loginpage_top {
    width: 100% !important;
    .input_box {
      width: 85% !important;
    }
    .name {
      width: 100% !important;
    }
    .pass {
      width: 100% !important;
      input {
        min-width: 170px !important;
      }
    }
    .login_container {
      width: 100% !important;
      min-width: 0 !important;
      transform: none !important;
    }
    .register_container {
      width: 100% !important;
      min-width: 0 !important;
      transform: none !important;
    }
    input {
      width: 100px !important;
    }
  }

  /*  blog */
  .blogRight {
    width: 0 !important;
    margin: 0 !important;
    opacity: 0 !important;
  }
  .blogLeft {
    width: 0 !important;
    margin: 0 !important;
  }
  .blogCenter {
    flex: 1 !important;
    margin: 0 !important;
  }

  /* sort  */
  .sort_container {
    width: 96% !important;
  }
  .interaction_name {
    width: 100% !important;
  }

  /* title  */
  .titleWord {
    font-size: 5rem !important;
  }
  .navBtn {
    width: 8rem !important ;
    height: 3rem !important ;
    font-size: 1rem !important;
  }
  .down {
    img {
      width: 2.5rem !important;
    }
  }

  /* blogheader  */
  .blogheaderContainer {
    overflow-x: scroll !important;
    &::-webkit-scrollbar {
      height: 3px !important;
    }
    .userHeader {
      .userHeader_Text {
        width: 40px;
      }
    }
    .nav_ul {
      & div {
        width: 50px !important;
        padding: 0.4rem !important;
      }
    }
  }

  /* blogdetail  */
  .blogDetailContainer {
    .body {
      width: 100% !important;
    }
    .content {
      width: 100% !important;
      .content_container {
        padding: 0.2rem !important;
      }
    }
    .edit {
      display: none !important;
    }
    .info {
      display: none !important;
    }
    .blogdetailContainerHtml {
      max-width: 340px;
      overflow-x: scroll !important;
    }
    .comment {
      width: 93% !important;
      min-width: 0 !important;
    }
  }
  /* record  */
  .record {
    .record_body {
      min-width: 0 !important;
      .record_title {
        left: 95px !important;
      }
      width: 95% !important;
    }
    .record_item {
      width: 150px !important;
    }
    .rope {
      left: 60px !important;
    }
    .before {
      left: -120px !important;
      &::before {
        left: 150px !important;
      }
    }
    .after {
      left: 60px !important;
    }
  }

  /* inteeraction  */
  .interaction_container {
    .interaction_body_container {
      width: 96% !important;
      padding: 0 !important;
    }
    .interaction_comment {
      width: 87% !important ;
      .interaction_time {
        display: none !important;
      }
    }
  }

  /* about */
  .about {
    height: auto !important;
    .toaboutdetail {
      display: none !important;
    }
    .cover {
      display: none !important;
    }
    .about_container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 5rem !important;
    }
    .aboutdialog {
      font-size: 1rem !important;
      margin: 1rem 0 !important;
      padding: 35px !important;
      opacity: 1 !important;
      width: 80% !important;
      min-height: 200px !important;
      position: relative !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      flex-direction: column !important;
      div {
        color: white !important;
      }
      p {
        color: white !important;
        font-size: 1.7rem;
        margin-bottom: 0.3rem;
      }
      li {
        color: white !important;
      }
    }
    .aboutbg {
      position: fixed;
      z-index: 0-1 !important;
      top: 0;
      width: 100% !important;
      height: 100% !important;
    }
  }

  /*  friendlink  */
  .friend_link {
    .friend_link_container {
      width: 95% !important;
      .input {
        width: 85% !important;
        flex-direction: column !important;
        & > div {
          width: 100% !important;
        }
      }
    }
  }
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: lightsteelblue;
  border-radius: 15px;
}
::-webkit-scrollbar-track {
  background-color: rgb(255, 255, 255);
}
::-webkit-scrollbar-thumb:horizontal {
  background-color: lightseagreen;
}
::-webkit-scrollbar-track:horizontal {
  background-color: lightsalmon;
}
::-webkit-scrollbar-corner {
  background-color: lightcoral;
}

@media screen and (max-width: 1680px) and (min-width: 1100px) {
  /* blogdetail  */
  .blogDetailContainer {
    .edit {
      left: 1rem !important;
    }
  }
}
@media screen and (max-width: 1100px) and (min-width: 700px) {
  /* blogdetail  */
  .blogDetailContainer {
    .edit {
      display: none !important;
    }
    .blogRight {
      width: 0 !important;
      margin: 0 !important;
      opacity: 0 !important;
    }
  }
}
</style>
<style lang="less" scoped>
.UserDrawer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .avatar {
    width: 100px;
    height: 100px;
    margin-top: 3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .UserDrawer_name {
    margin-top: 3rem;
    display: flex;
    width: 300px;
    span {
      width: 60px;
      line-height: 2rem;
    }
  }
}

.sun {
  position: fixed;
  z-index: 0;
  width: 160px;
  height: 160px;
  animation: sun 20s infinite linear;
  user-select: none;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
@keyframes sun {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.stylecover {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  top: 0;
  transition: 1.5s;
}
</style>
