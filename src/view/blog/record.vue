<template>
  <div>
    <blogheaderVue :bgColor="true"></blogheaderVue>
    <div
      class="record"
      :style="{
        backgroundImage: `linear-gradient(${data.themeColor.start},${data.themeColor.end})`,
      }"
    >
      <div class="record_body">
        <div
          class="rope"
          :style="{
            borderColor:
              data.themeColor.id != 3 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.3)',
          }"
        ></div>
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
                color: index % 3 == 0 && data.themeColor.id != 3 ? 'black' : 'white',
              }"
            >
              {{ item.container }}
            </p>
            <p
              class="record_time"
              :style="{
                color: data.themeColor.id != 3 ? 'black' : 'rgba(255,255,255,0.5)',
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
let store = useStore();
const data = reactive({
  bgUrl: "http://hyyyh.top:3001/recordbg.jpg",
  recordData: <any>[],
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
    translateX: "10rem",
    duration: 1000,
  });
});
</script>

<style scoped lang="less">
.record {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-image: linear-gradient(135deg, rgb(246, 240, 180), rgb(27, 41, 71));
  background-size: 400%;
  background-position: 0% 50%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  animation: changecolor 20s infinite;
  @keyframes changecolor {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .record_body {
    display: flex;
    justify-content: center;
    width: 50%;
    margin-top: -2rem;
  }
  .rope {
    width: 0;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
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
        font-weight: 900;
        opacity: 0.9;
      }
      .record_time {
        color: rgba(0, 0, 0, 0.5);
        margin: 1rem 0 0.2rem 0;
      }
    }
  }
}

.before {
  left: -330px;
  text-align: right;

  &::before {
    position: relative;
    left: 307px;
    top: 17px;
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    border: 2px solid transparent;
    background-color: white;
  }
}
.after {
  left: 0px;

  &::before {
    position: relative;
    left: -23px;
    top: 17px;
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    border: 2px solid transparent;
    background-color: white;
  }
}
</style>
