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
import changeBgColorVue from "./components/change-bgcolor/change-bgColor.vue";
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
@import "./app-css/APP.less";
@import "./app-css/screen-adaptation.less";

@containerbgcolor:rgba (227, 237, 255, 0.7);
* {
  padding: 0;
  margin: 0;
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
  transition: 0.5s;
}
</style>
