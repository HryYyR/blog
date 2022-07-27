<template>
  <div class="container">
    <el-table :data="data.blogData" style="width: 95%" stripe border>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : ''"
        sortable
        v-for="(item, index) in data.tableData"
        :key="index"
        show-overflow-tooltip
      />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="data.blogTotal"
      :page-size="data.pageSize"
      :page-count="Math.floor(data.blogTotal / data.pageSize) + 1"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { getAdminBlogData } from "../../../axios/adminApi";
import { onMounted, reactive } from "vue";
const data = reactive({
  tableData: [
    {
      prop: "id",
      label: "ID",
      width: "80",
    },
    {
      prop: "name",
      label: "名称",
    },
    {
      prop: "container",
      label: "内容",
    },
    {
      prop: "createusername",
      label: "发布者昵称",
      width: "150",
    },
    {
      prop: "createuserip",
      label: "发布者ip",
      width: "200",
    },
    {
      prop: "createtime",
      label: "创建时间",
    },
    {
      prop: "isShow",
      label: "是否展示",
      width: "110",
    },
    {
      prop: "isTitle",
      label: "是否最新博客",
      width: "140",
    },
    {
      prop: "lastvisittime",
      label: "最后访问时间",
    },
    {
      prop: "",
      label: "编辑",
    },
  ],
  blogData: <any>[],
  blogTotal: 0, //数据总数
  pageSize: 5, //每页数量
});
onMounted(async () => {
  getData(1, 5);
});

const handleSizeChange = (val: number) => {
  console.log(val);
};

const handleCurrentChange = async (val: number) => {
  getData(val, 5);
};

const getData = async (pageNum: number, num: number) => {
  const res = await (await getAdminBlogData(pageNum, num)).data;
  data.blogTotal = res.Total;
  data.blogData = res.data;
};
</script>

<style scoped lang="less">
* {
  font-family: "Courier New", Courier, monospace;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
}
.el-table-column {
  white-space: 2;
  /* 设置文本不换行 */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
