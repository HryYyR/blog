<template>
  <div>
    <blogheaderVue :bgColor="true" @changePage="changePage"></blogheaderVue>
    <div class="record flex-jcc" :style="{
      backgroundImage: `linear-gradient(${store.state.themeColor.start},${store.state.themeColor.end})`,
    }">
      <div class="record_body flex-jcc">
        <div class="rope"></div>
        <div class="record_container">
          <div class="record_item" :class="index % 2 == 0 ? 'before' : 'after'" v-for="(item, index) in data.recordData"
            :key="index">
            <p class="record_text" :style="{}">
              {{ item.container }}
            </p>
            <p class="record_time">
              {{ item.createtime }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import blogheaderVue from "../../../components/blog-header/blogheader.vue";
import blogRightVue from "../../../components/blog-right/blogRight.vue";
import { getRecordData } from "../../../axios/apis";
import { ElMessage } from "element-plus";
import anime from "animejs";
import { useStore } from "vuex";

// 国际化
import { useI18n } from "vue-i18n"; //要在js中使用国际化
let i18n = useI18n();

let store = useStore();
const data = reactive({
  recordData: <any>[{}, {}, {}, {}, {}],
  // themeColor: store.state.themeColor,
});
// watch(store.state, (newvalue, oldvalue) => {
//   data.themeColor = newvalue.themeColor;
// });
onMounted(async () => {
  const res = await getRecordData();
  if (res.status == 201) {
    return ElMessage.error(res.data.msg);
  }
  data.recordData = res.data.data;

  let myAnimation = anime({
    targets: [".record_body"],
    translateY: "-5rem",
    opacity: 1,
    duration: 1000,
  });
});

const changePage = () => {
  anime({
    targets: [".record_body"],
    opacity: 0,
    duration: 1500,
  });
};
</script>

<style scoped lang="less">
.record {
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  .record_body {
    width: 50%;
    min-width: 700px;
    height: auto;
    opacity: 0;
    background-color: var(--BW);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    border-radius: 30px;
    position: relative;
    top: 20vh;
    margin-bottom: 20rem;
    padding-bottom: 5rem;
    background-image: url(https://hyyyh.top:3001/recordimg/recordbg.png);
    transition: 0.3s background-color;

    .record_title {
      position: relative;
      top: 2rem;
      left: 0rem;
      font-size: 2rem;
      font-weight: 900;
    }
  }

  .rope {
    transition: 0.3s all;
    width: 0;
    height: 97%;
    border: 2px solid var(--WB);
    position: relative;
    left: 136px;
    top: 6rem;
    margin: 1rem 0;

    &::before {
      transition: 0.3s;
      position: absolute;
      content: "";
      background-color: var(--WB);
      width: 30px;
      height: 5px;
      left: -15px;
      top: -2px;
      border-radius: 5px;
    }

    &::after {
      transition: 0.3s;
      position: absolute;
      content: "";
      background-color: var(--WB);
      width: 30px;
      height: 5px;
      bottom: -2px;
      left: -15px;
      border-radius: 5px;
    }
  }

  .record_container {
    margin-top: 100px;

    .record_item {
      padding: 0px 0px;
      position: relative;
      width: 300px;
      height: auto;
      border-bottom: 1px dashed gray;
      margin: 1rem;

      .record_text {
        transition: 0.5s;
        color: var(--WB);
        font-size: 1.2rem;
        font-weight: 900;
        opacity: 0.9;
      }

      .record_time {
        font-size: 0.8rem;
        color: rgba(127, 127, 127, 1);
        font-weight: 600;
        margin: 1rem 0 0.2rem 0;
        font-family: Rubik, Avenir, Helvetica, Arial, sans-serif;
      }
    }
  }
}

.before {
  left: -194px;
  text-align: left;

  &::before {
    position: relative;
    left: 302px;
    top: 17px;
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 20px;
    border: 6px solid var(--BW);
    background-color: skyblue;
    transition: 0.3s;
  }
}

.after {
  left: 136px;
  text-align: left;

  &::before {
    position: relative;
    left: -27px;
    top: 17px;
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 20px;
    border: 6px solid var(--BW);
    background-color: rgb(28, 188, 0);
    transition: 0.3s;

  }
}
</style>
