<template>
  <div class="container">
    <el-table :data="data.labelData" style="width: 95%" height="100%" stripe border>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : ''"
        sortable
        v-for="(item, index) in data.tableData"
        :key="index"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { getAdminLabelData } from "../../../axios/adminApi";

const data = reactive({
  tableData: [
    { prop: "id", label: "ID", width: "" },
    { prop: "name", label: "名称", width: "" },
    { prop: "num", label: "数量", width: "" },
    { prop: "addtime", label: "添加时间", width: "" },
    { prop: "adduser", label: "添加用户", width: "" },
  ],
  labelData: <any>[],
});
onMounted(async () => {
  const res = await getAdminLabelData();
  data.labelData = res.data;
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
