<template>
  <div class="container">
    <blogheader :bgColor="data.navColor" @changeNavColor="changeNavColor()" ></blogheader>
    <!-- <blogTop :viewTitle="data.viewTitle" :isShow="data.isShowTitle"></blogTop> -->
      <router-view ></router-view>
  </div>
</template>
<style>

</style>
<script setup lang="ts">
import blogTop from "../../../components/blog-top/blogTop.vue";
import blogheader from "../../../components/blog-header/blogheader.vue";
import blogbottomVue from "../../../components/blog-bottom/blogbottom.vue";
import anime from "animejs";
import { onMounted, onBeforeUnmount, reactive, watchEffect, defineProps,ref } from "vue";
import { useRouter } from "vue-router";
import router from "../../../router";
import { useStore } from "vuex";
import throttle from "../../../func/throttle/throttle";
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
  data.isShowTitle = store.state.isPC;
});
onBeforeUnmount(() => {
});
// 切换导航栏颜色
const changeNavColor = () => {
    data.navColor = !data.navColor;
};



watchEffect(() => {
  console.log(route.currentRoute.value.name);
  data.viewTitle = route.currentRoute.value.name!.toString();
});


</script>

<style scoped lang="less">
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
