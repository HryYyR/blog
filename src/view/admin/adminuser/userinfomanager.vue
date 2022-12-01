<template>
  <div>
    <el-table
      :data="data.userdata"
      style="width: 100%; height: 100%"
      sortable
      border
      stripe
    >
      <el-table-column
        :prop="item"
        :label="item"
        v-for="(item, index) in data.tabledata"
        :key="index"
        show-overflow-tooltip
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";
import { getAdminUserData } from "../../../axios/adminApi";
const data = reactive({
  userdata: <any>[],
  tabledata: <any>[],
});
onMounted(async () => {
  const resolve = await getAdminUserData();
  if (resolve.status == 200) {
    data.userdata = resolve.data.data;
    for (let i in data.userdata[0]) {
      data.tabledata.push(i);
    }
    return;
  }
  ElMessage.error("获取数据失败！", resolve.data.msg);
});
</script>

<style scoped lang="less"></style>
