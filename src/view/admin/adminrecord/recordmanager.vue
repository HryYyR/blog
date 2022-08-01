<template>
  <div class="record">
    <div class="recordEdit">
      <el-button type="primary" @click="toRecord">添加记录</el-button>
      <el-input v-model="data.inputContainer" clearable></el-input>
    </div>
    <el-table :data="data.recordData" style="width: 100%" sortable border stripe>
      <el-table-column prop="id" label="id" width="80" />
      <el-table-column prop="container" label="container" width="380" />
      <el-table-column prop="createtime" label="createtime" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { reactive, onMounted } from "vue";
import { getRecordData, addRecord } from "../../../axios/apis";
const data = reactive({
  recordData: <any>[],
  inputContainer: "",
});
onMounted(async () => {
  const res = await getRecordData();
  if (res.status == 201) {
    return ElMessage.error("获取记录失败！");
  }
  data.recordData = res.data.data;
});

const toRecord = async () => {
  if (data.inputContainer.length < 5) {
    return ElMessage.error("非法输入！");
  }
  const res = await addRecord(data.inputContainer);
  if (res.status == 201) {
    return ElMessage.error(res.data.msg);
  }
  ElMessage.success(res.data.msg);
  data.recordData = res.data.data;
};
</script>

<style scoped lang="less">
.record {
  padding: 1rem;
  .recordEdit {
    display: flex;
    margin: 1rem 0;
    button {
      margin-right: 1rem !important;
    }
  }
}
</style>
