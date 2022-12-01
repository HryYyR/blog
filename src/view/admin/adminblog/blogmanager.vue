<template>
  <div class="container">
    <el-table :data="data.blogData" style="width: 100%" stripe border>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : ''"
        sortable
        v-for="(item, index) in data.tableData"
        :key="index"
        show-overflow-tooltip
      />
      <el-table-column align="center" label="操作" width="200" show-overflow-tooltip>
        <template #default="{ row }">
          <el-button type="primary" @click="toEditBlog(row.id)">编辑</el-button>

          <el-popover v-model:visible="row.isdelete" placement="top" :width="160">
            <p>确定要删除此博客吗？?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="row.isdelete = false">取消</el-button>
              <el-button size="small" type="primary" @click="removeBlog(row)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-button type="danger" @click="row.isdelete = true">删除</el-button>
            </template>
          </el-popover>
        </template>
      </el-table-column>
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
import { getAdminBlogData, deleteBlog } from "../../../axios/adminApi";
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { rest } from "lodash";
import router from "../../../router";
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
      width: "130",
    },
    {
      prop: "createuserip",
      label: "发布者ip",
      width: "150",
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
      prop: "label",
      label: "标签",
      width: "80",
    },
    {
      prop: "sort",
      label: "分类",
      width: "80",
    },
    {
      prop: "isTitle",
      label: "是否最新博客",
      width: "140",
    },
    {
      prop: "visitnumber",
      label: "访问数量",
    },
    {
      prop: "commentnum",
      label: "评论数",
    },
    {
      prop: "lastvisittime",
      label: "最后访问时间",
    },
  ],
  blogData: <any>[],
  blogTotal: 0, //数据总数
  pageSize: 8, //每页数量
  deletevisible: false,
});
onMounted(async () => {
  getData(1, 5);
});

const toEditBlog = (id: number) => {
  router.push({ path: "addblog", query: { id: id } });
};

const handleSizeChange = (val: number) => {
  console.log(val);
};

const handleCurrentChange = async (val: number) => {
  getData(val, 5);
};

const getData = async (pageNum: number, num: number) => {
  const res = await (await getAdminBlogData(pageNum, num)).data;
  data.blogTotal = res.Total;

  // 消除html标签
  res.data.map((item: any) => {
    item.container = item.container.replace(/<.*?>/gi, "");
    return item;
  });

  data.blogData = res.data;
  data.blogData.map((item: any, index: number) => {
    item.isdelete = false;
  });
};
const removeBlog = async (row: any) => {
  row.isdelete = false;
  const id = row.id;
  const res = await deleteBlog(id);
  if (res.status == 200) {
    data.blogData = res.data.data;
    if (data.blogData) {
      data.blogData.map((item: any) => {
        item.isdelete = false;
      });
    }

    // console.log(res.data);

    return ElMessage.success(res.data.msg);
  }
  return ElMessage.error(res.data.msg);
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
