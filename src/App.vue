<template>
  <div :class="store.state.currentColorTheme ? 'dark' : 'light'">
    <router-view v-slot="{ Component }">
      <keep-alive :include="['about','socket']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>

  <!-- 切换主题颜色 -->
  <changeBgColorVue @ChangeBgColor="ChangeBgColor" />
  <!-- 太阳 -->
  <!-- <div class="sun" @click="
    () => {
      data.dark = !data.dark;
    }
  " :style="{ right: `${data.sunOptions.X}%`, bottom: `${data.sunOptions.Y}%` }">
    <img src="https://hyyyh.top/icon/sun.png" alt="sun" />
  </div> -->
  <!-- 覆盖层 -->
  <div class="stylecover" :style="{
    backgroundColor: data.coverOption.color,
    zIndex: data.coverOption.zIndex,
    transform:`scale(${data.coverOption.scale})`
  }"></div>

  <!-- 个人资料 -->
  <el-drawer v-model="store.state.isVisibelUserDrawer" title="个人资料" direction="rtl"
    :size="store.state.isPC ? '40%' : '100%'">
    <div class="UserDrawer">
      <div class="avatar">
        <img :src="data.user_avatar" alt="" />
      </div>

      <div class="UserDrawer_name">
        <span>昵称：</span>
        <el-input v-model="store.state.userinfo.username" placeholder="name" disabled />
      </div>
      <div class="UserDrawer_name">
        <span>邮箱：</span>
        <el-input v-model="store.state.userinfo.email" placeholder="email" />
      </div>
      <div class="UserDrawer_name">
        <span>性别：</span>
        <el-radio-group v-model="store.state.userinfo.sex" class="ml-4">
          <el-radio label="男" size="large">男</el-radio>
          <el-radio label="女" size="large">女</el-radio>
        </el-radio-group>
      </div>
      <div class="UserDrawer_name">
        <span>年龄：</span>
        <el-select v-model="store.state.userinfo.year" class="m-2" placeholder="Select" size="large">
          <el-option v-for="(item, index) in 50" :key="item" :label="index + 1980" :value="index + 1990" />
        </el-select>
      </div>
      <div class="UserDrawer_name">
        <span>城市：</span>
        <el-input v-model="store.state.userinfo.city" placeholder="year" />
      </div>
      <div class="UserDrawer_name">
        <el-button type="primary" @click="editUserData">保存</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import changeBgColorVue from "./components/change-bgcolor/change-bgColor.vue";
import { onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
import { edituserdata } from "./axios/apis";
import { ElMessage } from "element-plus";
const store = useStore();
onMounted(() => {
  store.commit("getTimeState");
  store.state.userid = data.user_id;
  store.state.username = data.user_name;
});
const data = reactive({

  // 覆盖层数据
  coverOption: {
    color: "white",
    zIndex: -99,
    scale:"0"
  },
  user_drawer: false, //是否显示个人资料
  user_avatar: localStorage.getItem("header") || "",
  user_name: localStorage.getItem("name") || "",
  user_id: localStorage.getItem("id") || "-1",
  NowIsChangeBgColor: false, //现在是否正在切换背景颜色
  dark: false,
  colorList: [
    {
      drak: "rgba(255,255,255)",
      light: "rgba(0,0,0)",
    },
  ],
});
watch(store.state, (newvalue, oldvalue) => {
  data.user_avatar = localStorage.getItem("header") || "";
  data.user_name = localStorage.getItem("name") || "";
  data.user_id = localStorage.getItem("id") || "-1";
});

const editUserData = async () => {
  let { username, email, sex, year, city } = store.state.userinfo;
  let resolve = await edituserdata(store.state.userid, username, email, sex, year, city);
  console.log(resolve);
  if (resolve.status == 200) {
    ElMessage.success("修改信息成功！");
  } else {
    ElMessage.error("修改信息失败！");
  }
  store.state.isVisibelUserDrawer = false;
};



// 切换主题颜色
const ChangeBgColor = (item: any) => {
  if (data.NowIsChangeBgColor) {
    return;
  } else {
    data.NowIsChangeBgColor = true;
  }
  data.coverOption = {
    color: item.color,
    zIndex: 99,
    scale:"200"
  };
  setTimeout(() => {
    store.state.themeColor = item;
    data.coverOption.scale="0"
      data.NowIsChangeBgColor = false;
  }, 500);
};
</script>

<style lang="less">
@import "./app-css/APP.less";
@import "./app-css/screen-adaptation.less";
@containerbgcolor: rgba (227, 237, 255, 0.7);

* {
  padding: 0;
  margin: 0;
}

.light {
  --WB: rgba(0, 0, 0, 1);
  --WB-1: rgba(0, 0, 0, 0.1);
  --WB-3: rgba(0, 0, 0, 0.3);
  --WB-5: rgba(0, 0, 0, 0.5);
  --WB-7: rgba(0, 0, 0, 0.7);
  --WB-8: rgba(0, 0, 0, 0.8);
  --WB-9: rgba(0, 0, 0, 0.9);

  --BW: rgb(255, 255, 255);
  --BW-1: rgba(255, 255, 255, 0.1);
  --BW-3: rgba(255, 255, 255, 0.3);
  --BW-5: rgba(255, 255, 255, 0.5);
  --BW-7: rgba(255, 255, 255, 0.7);
  --BW-8: rgba(255, 255, 255, 0.8);
  --BW-9: rgba(255, 255, 255, 0.9);

  --socket-list:#ecf0f1;
  --socket-list-item:#bdc3c7;
  --socket-list-item-hover:#95a5a6;
  
}

.dark {
  --WB: rgb(255, 255, 255);
  --WB-1: rgba(255, 255, 255, 0.1);
  --WB-3: rgba(255, 255, 255, 0.3);
  --WB-5: rgba(255, 255, 255, 0.5);
  --WB-7: rgba(255, 255, 255, 0.7);
  --WB-8: rgba(255, 255, 255, 0.8);
  --WB-9: rgba(255, 255, 255, 0.9);

  --BW: rgba(0, 0, 0, 1);
  --BW-1: rgba(0, 0, 0, 0.1);
  --BW-3: rgba(0, 0, 0, 0.3);
  --BW-5: rgba(0, 0, 0, 0.5);
  --BW-7: rgba(0, 0, 0, 0.7);
  --BW-8: rgba(0, 0, 0, 0.8);
  --BW-9: rgba(0, 0, 0, 0.9);
  
  --socket-list:rgb(39, 43, 56);
  --socket-list-item:rgb(49, 55, 69);
  --socket-list-item-hover:rgb(33, 37, 48);
  
  
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
    margin-top: 0rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .UserDrawer_name {
    margin-top: 2rem;
    display: flex;
    width: 300px;
    flex-direction: column;

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
  width: 10px;
  height: 10px;
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transition: 0.5s transform;
  border-radius: 50%;
  transform: scale(0);
}
</style>
