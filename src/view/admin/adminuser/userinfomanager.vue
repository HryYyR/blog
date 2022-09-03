<template>
  <div>
    <el-table :data="data.userdata" style="width: 100%" sortable border stripe>
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
import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";
import { getAdminUserData } from "../../../axios/adminApi";
const data = reactive({
  userdata: <any>[],
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
      prop: "username",
      label: "用户名",
    },
    {
      prop: "userip",
      label: "ip地址",
    },
    {
      prop: "userpass",
      label: "用户密码",
    },
    {
      prop: "email",
      label: "用户邮箱",
    },
    {
      prop: "loginnumber",
      label: "登录次数",
    },
    {
      prop: "createtime",
      label: "创建时间",
    },
    {
      prop: "lastlogintime",
      label: "最后登陆时间",
    },
    {
      prop: "userstatus",
      label: "登陆状态",
    },
    {
      prop: "grade",
      label: "用户权限等级",
    },
  ],
});
onMounted(async () => {
  const resolve = await getAdminUserData();
  if (resolve.status == 200) {
    return (data.userdata = resolve.data.data);
  }
  ElMessage.error("获取数据失败！", resolve.data.msg);
});
</script>

<style scoped lang="less"></style>
