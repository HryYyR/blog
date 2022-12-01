<template>
  <div>
    <el-table :data="data.list" style="width: 100%" sortable border stripe>
      <el-table-column
        :prop="item"
        :label="item"
        v-for="(item, index) in data.titlelist"
        :key="index"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getAdminFriendLinkData } from "../../../axios/adminApi";
const data = reactive({
  list: [],
  titlelist: <any>[],
});
onMounted(async () => {
  let resolve = await getAdminFriendLinkData();
  data.list = resolve.data;
  //   console.log(data.list);
  let arr = [];
  for (let i in data.list[0]) {
    arr.push(i);
  }
  data.titlelist = arr;
});
</script>

<style scoped lang="less"></style>
