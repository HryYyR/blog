<template>
  <div>
    <blogheaderVue :bgColor="true" @changePage="changePage"></blogheaderVue>
    <div
      class="record"
      :style="{
        backgroundImage: `linear-gradient(${data.themeColor.start},${data.themeColor.end})`,
      }"
    >
      <div class="record_body">
        <div class="record_title">{{ i18n.t("record.title") }}</div>

        <div class="rope"></div>
        <div class="record_container">
          <div
            class="record_item"
            :class="index % 2 == 0 ? 'before' : 'after'"
            v-for="(item, index) in data.recordData"
            :key="index"
          >
            <p
              class="record_text"
              :style="{
                color: data.themeColor.id != 3 ? 'black' : 'black',
              }"
            >
              {{ item.container }}
            </p>
            <p
              class="record_time"
              :style="{
                color:
                  data.themeColor.id != 3
                    ? 'rgba(198, 10, 83, 1)'
                    : 'rgba(198, 10, 83, 1)',
              }"
            >
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
import blogheaderVue from "../../components/blogheader.vue";
import blogRightVue from "../../components/blogRight.vue";
import { getRecordData } from "../../axios/apis";
import { ElMessage } from "element-plus";
import anime from "animejs";
import { useStore } from "vuex";

// 国际化
import { useI18n } from "vue-i18n"; //要在js中使用国际化
let i18n = useI18n();

let store = useStore();
const data = reactive({
  bgUrl: "http://hyyyh.top:3001/recordbg.jpg",
  recordData: <any>[{}, {}, {}, {}, {}, {}, {}, {}, {}],
  themeColor: store.state.themeColor,
});
watch(store.state, (newvalue, oldvalue) => {
  data.themeColor = newvalue.themeColor;
});
onMounted(async () => {
  const res = await getRecordData();
  if (res.status == 201) {
    return ElMessage.error(res.data.msg);
  }
  data.recordData = res.data.data;

  let myAnimation = anime({
    targets: [".record_body"],
    translateY: "-5rem",
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
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  .record_body {
    display: flex;
    justify-content: center;
    width: 50%;
    min-width: 700px;
    height: auto;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    border-radius: 30px;
    position: relative;
    top: 20vh;
    margin-bottom: 20rem;
    padding-bottom: 5rem;
    .record_title {
      position: relative;
      top: 2rem;
      left: 0rem;
      font-size: 2rem;
      font-weight: 900;
    }
  }
  .rope {
    width: 0;
    height: 93%;
    border: 2px solid rgba(0, 0, 0, 1);
    position: relative;
    left: 136px;
    top: 6rem;
    margin: 1rem 0;
    &::before {
      position: absolute;
      content: "";
      background-color: black;
      width: 30px;
      height: 5px;
      left: -15px;
      top: -2px;
      border-radius: 5px;
    }
    &::after {
      position: absolute;
      content: "";
      background-color: black;
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
        font-size: 1.2rem;
        font-weight: 900;
        opacity: 0.9;
      }
      .record_time {
        font-size: 0.9rem;
        color: rgba(138, 10, 83, 1);
        font-weight: 900;
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
    left: 300px;
    top: 17px;
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 20px;
    border: 6px solid rgba(236, 254, 226);
    background-color: rgb(160, 0, 50);
  }
}
.after {
  left: 136px;
  text-align: left;
  &::before {
    position: relative;
    left: -30px;
    top: 17px;
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 20px;
    border: 6px solid rgba(236, 254, 226);
    background-color: rgb(160, 0, 50);
  }
}
</style>
