<template>
  <div class="container">
    <el-table :data="data.LuadData" style="width: 95%" height="100%" stripe border>
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
import { getAdminLuadData } from "../../../axios/adminApi";
const data = reactive({
  tableData: [
    { prop: "id", label: "ID", width: "80" },
    { prop: "blogid", label: "博客id", width: "80" },
    { prop: "userid", label: "用户id", width: "80" },
    { prop: "userip", label: "用户IP地址", width: "" },
    { prop: "createtime", label: "创建时间", width: "" },
  ],
  LuadData: [],
});

onMounted(async () => {
  const res = await getAdminLuadData();
  data.LuadData = res.data;
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
