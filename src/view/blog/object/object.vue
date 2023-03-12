<template>
  <div
    class="object flex-jcc"
    :style="{
      backgroundImage: `linear-gradient(${store.state.themeColor.start},${store.state.themeColor.end})`,
    }"
  >
    <blogheaderVue :bgColor="true" @changePage="changePage" />
    <div class="obj_conatiner">
      <div class="obj_list flex-jcc">
        <div
          v-for="(item, index) in data.objList"
          :key="item.id"
          class="obj_list_item flex-jcc-aic"
          @click="toAssignProject(item.obj_url)"
        >
          <div class="obj_list_item_img">
            <img :src="item.img" :alt="item.obj_name" />
          </div>
          <div class="obj_list_item_right flex">
            <div :slot="item.tipList" class="obj_list_item_tiplist">
              <span v-for="(tip, index) in item.tipList" :key="index"
                ><i># {{ tip.name }} </i></span
              >
            </div>
            <div
              class="obj_list_item_name"
              :style="{
                left: data.loading ? '100px' : '-100px',
                opacity: data.loading ? '0' : '1',
              }"
            >
              {{ item.obj_name }}
            </div>
            <div
              class="obj_list_item_introduce"
              :style="{
                left: data.loading ? '100px' : '-100px',
                opacity: data.loading ? '0' : '1',
              }"
            >
              {{ item.introduce }}
            </div>
            <div class="obj_list_item_time">{{ item.createtime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  h,
  watch,
  computed,
} from "vue";
import blogheaderVue from "../../../components/blog-header/blogheader.vue";

import { getAllobjectData } from "../../../axios/apis";

// 国际化
import anime from "animejs";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { useStore } from "vuex";
let i18n = useI18n();
const store = useStore();

type tip = {
  label_id: number;
  name: string;
};

type objList = [
  {
    id: number;
    img: string;
    introduce: string;
    obj_name: string;
    obj_url: string;
    tipList: Array<{ label_id: number; name: string }>;
    createtime: string;
  }
];

const data = reactive({
  objList: <objList>new Array(),
  // themeColor: store.state.themeColor, //当前主题颜色
  loading: true, //播放加载动画
});
// watch(store.state, (newvalue, oldvalue) => {
//   data.themeColor = newvalue.themeColor;
// });
onMounted(async () => {
  let resolve = await (await getAllobjectData()).data.data;
  setTimeout(() => {
    data.loading = false;
    anime({
      targets: [".obj_list"],
      translateY: "-10vh",
      opacity: 1,
      duration: 1000,
    });
  }, 250);

  data.objList = resolve;
  // console.log(data.objList);
});
const changePage = () => {
  anime({
    targets: [".obj_list"],
    opacity: 0,
    duration: 1000,
  });
};

const toAssignProject =(url:String)=>{
window.location.href=`https://hyyyh.top/${url}`
}
</script>

<style scoped lang="less">
.object {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 6rem 0;
  user-select: none;
  color: var(--WB);
  .obj_conatiner {
    width: 1300px;
    height: 100%;
    .obj_list {
      transition: 0.5S;
      width: 100%;
      top: 10rem;
      transition: 0.1s;
      opacity: 0;
      position: relative;
      .obj_list_item {
        border-radius: 1rem;
        overflow: hidden;
        width: 100%;
        height: 400px;
        flex-direction: row;
        cursor: pointer;
        .obj_list_item_img {
          width: 60%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .obj_list_item_right {
          position: relative;
          font-family: Rubik, Avenir, Helvetica, Arial, sans-serif;
          height: 100%;
          flex: 1;
          background-color:  var(--BW);
          flex-direction: column;
          & div {
            position: relative;
            left: -100px;
          }
          .obj_list_item_tiplist {
            margin: 2rem 0;
            span {
              margin: 0 0.3rem;
            }
          }
          .obj_list_item_name {
            transition: 0.3s all;

            font-size: 2.25rem;
            font-weight: 900;
            margin: 0 0 1rem 0;
            color: rgb(135, 155, 235);
          }
          .obj_list_item_introduce {
            transition: 0.6s all;

            font-size: 1.3rem;
            font-weight: 600;
          }
          .obj_list_item_time {
            position: relative;
            top: 130px;
            color: var(--WB-5);
            transition: 0.3S;
          }
          &::before {
            position: absolute;
            content: "";
            background-image: linear-gradient(
              90deg,
              var(--BW-1),
              var(--BW)
            );
            width: 300px;
            height: 400px;
            margin-left: -300px;
          }
        }
        &::after {
          transition: 0.3s;
          position: absolute;
          content: "";
          width: 98%;
          height: 40px;
          background-color: var(--BW-5);
          margin-top: 380px;
          z-index: -1;
          border-radius: 30px;
        }
      }
    }
  }
}
</style>
