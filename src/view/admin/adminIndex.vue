<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header class="header">
        <el-button typeof="primary" color="skyblue" @click="router.push('/')"
          >返回首页</el-button
        >
        <el-button typeof="danger" color="red" @click="signout()">退出登录</el-button>
      </el-header>
      <el-container class="center">
        <el-aside width="200px" class="left">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                class="el-menu-vertical"
                active-text-color="#ffd04b"
                text-color="#fff"
                background-color="#545c64"
                :collapse="data.isCollapse"
              >
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <Edit />
                    </el-icon>
                    <span>博客管理</span>
                  </template>
                  <el-menu-item
                    :index="item.index"
                    v-for="(item, index) in data.blogData"
                    :key="index"
                    @click="router.push(item.path)"
                    >{{ item.name }}</el-menu-item
                  >
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><Coordinate /></el-icon>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item
                    v-for="(item, index) in data.userData"
                    :index="item.index"
                    @click="router.push(item.path)"
                    :key="index"
                    >{{ item.name }}</el-menu-item
                  >
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><Coordinate /></el-icon>
                    <span>记录管理</span>
                  </template>
                  <el-menu-item
                    v-for="(item, index) in data.recordData"
                    :index="item.index"
                    @click="router.push(item.path)"
                    :key="index"
                    >{{ item.name }}</el-menu-item
                  >
                </el-sub-menu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="right"> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import router from "../../router";
import { loginout } from "../../axios/apis";
import { parseInt } from "lodash";
import { ElMessage } from "element-plus";

onMounted(() => {});
const data = reactive({
  isCollapse: false,
  fileActionUrl: "http://hyyyh.top:3001/File",
  blogData: [
    { name: "发布文章", index: "1-1", path: "/admin/addblog" },
    { name: "文章管理", index: "1-2", path: "/admin/blogManager" },
    { name: "标签管理", index: "1-3", path: "/admin/labelManager" },
    { name: "分类管理", index: "1-4", path: "/admin/sortManager" },
    { name: "评论管理", index: "1-5", path: "/admin/commentManager" },
    { name: "点赞管理", index: "1-6", path: "/admin/laudManager" },
  ],
  userData: [
    { name: "用户信息管理", index: "2-1", path: "/admin/userinfoManager" },
    { name: "用户权限管理", index: "2-2", path: "/admin/userPowerManager" },
  ],
  recordData: [{ name: "记录管理", index: "3-1", path: "/admin/recordmanager" }],
});
const signout = async () => {
  const id = localStorage.getItem("id")!;
  const idd = parseInt(id);
  const res = await loginout(idd);
  if (res.status == 201) {
    ElMessage.error(res.data.msg);
  } else {
    localStorage.clear();
    router.push("/login");
    ElMessage.success(res.data.msg);
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.container {
  height: 100vh;
  .header {
    border-bottom: 3px solid gray;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-button {
      margin: 0 1rem;
      padding: 0.5rem;
      font-weight: 900;
      color: white;
    }
  }
  .center {
    .left {
      border-right: 3px solid gray;
    }
  }
}
.el-row {
  user-select: none;
  cursor: pointer;
}
</style>
