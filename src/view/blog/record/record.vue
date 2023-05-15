<template>
  <div>
    <blogheaderVue :bgColor="true"  @changePage="changePage"></blogheaderVue>
    <div class="record flex-jcc" :style="{
        backgroundColor: store.state.themeColor.color
      }">
      <div class="record_body flex-jcc">
        <div class="rope"></div>
        <div class="circle">
          <div class="circle_item" :style="{ background: index % 2 == 0 ? 'rgb(135,206,235)' : 'rgb(28,188,0)' }"
            v-for="(item, index) in data.recordData.length" :key="index">
          </div>
        </div>
        <div class="record_container ">
          <div class="record_item"
            :class="[index % 2 == 0 ? 'before' : 'after', `record_item${data.recordData.length - index - 1}`]"
            v-for="(item, index) in data.recordData" :key="index">
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
    <div class="record_yaer" v-if="store.state.isPC">
      <div v-for="(item, index) in data.timeArr" :key="index" @click="jumpToAssignYear(index)">
        {{ item }}
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
import { DATA } from './record'

// 国际化
import { useI18n } from "vue-i18n"; //要在js中使用国际化
let i18n = useI18n();

let store = useStore();
const data: DATA = reactive({
  recordData: <any>[{}, {}, {}, {}, {}],

  timeArr: [],
  domArr: []
});
onMounted(async () => {
  const res = await getRecordData();
  if (res.status == 201) {
    return ElMessage.error(res.data.msg);
  }
  data.recordData = res.data.data;

  let reversedata = [...data.recordData]
  reversedata.reverse()
  let time: number = 2022
  reversedata.forEach((item: any, index: number) => {
    console.log(item.createtime.slice(0, 4) == time);

    if (item.createtime.slice(0, 4) == time) {
      data.timeArr.push(item.createtime.slice(0, 4))
      data.domArr.push(`record_item${index}`)
      time++

    }
  })

  anime({
    targets: [".record_body"],
    translateY: "-5rem",
    opacity: 1,
    duration: 1000,
  });
});

const jumpToAssignYear = (index: number) => {
  let dom = document.querySelector(`.${data.domArr[index]}`)

  dom?.scrollIntoView({ behavior: "smooth" })

}

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
  height: 100%;
  top: 23vh;
}

.record_body {
  position: relative;
  width: 100%;
  margin-top: 23vh;

  .record_container {
    width: 40%;
    background-image: url('https://hyyyh.top:3001/recordimg/recordbg.png');
    min-height: 100vh;
    background-color: var(--BW-8);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 5rem 2rem;
    transition: 0.3s;

    .record_item {
      transition: 0.3s all;
      min-width: 40%;
      max-width: 40%;
      padding: 0.5rem;
      margin: 1rem 0;
      position: relative;
      border-bottom: 1px dashed var(--WB-5);

      .record_text {
        font-size: 1.3rem;
        color: var(--WB);
        font-weight: 600;
        margin-bottom: 0rem;
      }

      .record_time {
        color: var(--WB-3);
      }
    }
  }
}

.after {
  margin-left: auto !important;
}

.before {
  margin-right: auto !important;
}

.rope {
  transition: 0.3s all;
  position: absolute;
  margin: 4rem auto auto auto;
  height: 95%;
  width: 5px;
  background-color: var(--WB);
  z-index: 99;
  border-radius: 5px;

  &::before {
    position: absolute;
    content: "";
    width: 40px;
    height: 8px;
    background-color: var(--WB);
    left: -18px;
    border-radius: 5px;
    transition: 0.3s;
  }

  &::after {
    position: absolute;
    content: "";
    width: 40px;
    height: 8px;
    background-color: var(--WB);
    border-radius: 5px;
    bottom: 0;
    left: -18px;
    transition: 0.3s;

  }
}

.circle {
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;

  .circle_item {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-left: -1px;
    margin-top: 15vh;
    z-index: 99;
    box-shadow: 0 0 0 10px var(--BW);
    transition: 0.3s;
  }
}

.record_yaer {
  position: fixed;
  top: 150px;
  left: 73%;
  font-size: 2rem;
  font-weight: 600;
  color: var(--BW);
  cursor: pointer;
 & > div{
  transition: 0.2s;
  &:hover{
    color: orange;
  }
 }
}
</style>
