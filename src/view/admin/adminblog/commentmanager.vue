<template>
  <div class="container">
    <el-table :data="data.commentData" style="width: 95%" height="100%" stripe border>
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
import { ElMessage } from "element-plus";
import { reactive, onMounted } from "vue";
import { getAdminCommentData } from "../../../axios/adminApi";
const data = reactive({
  tableData: [
    { prop: "id", label: "ID", width: "80" },
    { prop: "blogusername", label: "博客名称", width: "" },
    { prop: "bloguserid", label: "博客用户id", width: "80" },
    { prop: "blogname", label: "评论用户昵称", width: "" },
    { prop: "blogid", label: "评论用户id", width: "80" },
    { prop: "container", label: "内容", width: "700" },
    { prop: "createtime", label: "创建时间", width: "" },
  ],
  commentData: [],
});

onMounted(async () => {
  const res = await getAdminCommentData();
  if (res.status != 200) {
    return ElMessage.error("数据获取失败！");
  }

  data.commentData = res.data;
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
