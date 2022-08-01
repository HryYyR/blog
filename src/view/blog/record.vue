<template>
  <div>
    <blogheaderVue :bgColor="true"></blogheaderVue>
    <div class="record">
      <div class="record_body">
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
              :style="{ color: index % 3 == 0 ? 'skyblue' : 'green' }"
            >
              {{ item.container }}
            </p>
            <p class="record_time">{{ item.createtime }}</p>
          </div>
        </div>
      </div>

      <blogRightVue></blogRightVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import blogheaderVue from "../../components/blogheader.vue";
import blogRightVue from "../../components/blogRight.vue";
import { getRecordData } from "../../axios/apis";
import { ElMessage } from "element-plus";
const data = reactive({
  bgUrl: "http://localhost:3001/recordbg.jpg",
  recordData: <any>[],
});
onMounted(async () => {
  const res = await getRecordData();
  if (res.status == 201) {
    return ElMessage.error(res.data.msg);
  }
  data.recordData = res.data.data;
});
</script>

<style scoped lang="less">
.record {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: rgba(140, 140, 140, 0.1);
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 7rem;
  .record_body {
    display: flex;
    justify-content: center;
    width: 50%;
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
    border: 2px solid gray;
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
    border: 2px solid gray;
  }
}
</style>
