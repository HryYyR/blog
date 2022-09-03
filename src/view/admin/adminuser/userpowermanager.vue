<template>
  <div>
    <el-table :data="data.gradedata" style="width: 100%" sortable border stripe>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in data.tabledata"
        :key="index"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { log } from "console";
import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";
import { getAdminGradeData } from "../../../axios/adminApi";
const data = reactive({
  gradedata: <any>[],
  tabledata: [
    {
      prop: "id",
      label: "id",
    },
    {
      prop: "name",
      label: "昵称",
    },
    {
      prop: "grade",
      label: "权限等级",
    },
    {
      prop: "createtime",
      label: "创建时间",
    },
  ],
});
onMounted(async () => {
  const resolve = await getAdminGradeData();
  if (resolve.status == 200) {
    return (data.gradedata = resolve.data.data);
  }
  ElMessage.error("获取数据失败！", resolve.data.msg);
});
</script>

<style scoped lang="less"></style>
