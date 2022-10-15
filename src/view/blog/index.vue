<template>
  <div class="container">
    <blogheader :bgColor="data.navColor"></blogheader>
    <viewTitle
      :viewTitle="data.viewTitle"
      :isShow="data.isShowTitle"
      :themeColor="themeColor"
    ></viewTitle>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import viewTitle from "../../components/title.vue";
import blogheader from "../../components/blogheader.vue";
import blogbottomVue from "../../components/blogbottom.vue";
import anime from "animejs";
import {
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  reactive,
  watchEffect,
  defineProps,
} from "vue";
import { useRouter } from "vue-router";
import router from "../../router";
import { useStore } from "vuex";
import throttle from "../../func/throttle/throttle";
const route = useRouter();
const store = useStore();

const data = reactive({
  isShowTitle: true,
  viewTitle: "", //当前页面标题
  navColor: false,
  isdisplay: true,
});

defineProps({
  themeColor: {
    type: Object,
  },
});

onMounted(async () => {
  // data.isShowTitle = store.state.isPC;
  window.addEventListener("scroll", changeNavColor);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", changeNavColor);
});
// 切换导航栏颜色
const changeNavColor = () => {
  let windowHeight;
  windowHeight = window.innerHeight;
  if (window.scrollY > windowHeight - 70) {
    data.navColor = true;
  } else {
    data.navColor = false;
  }
};
watchEffect(() => {
  console.log(route.currentRoute.value.name);

  data.viewTitle = route.currentRoute.value.name!.toString();
});
</script>

<style scoped lang="less">
* {
  font-family: Georgia, STZhongsong;
}
.container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  flex-direction: column;
}
</style>
