<template>
  <div>loading...</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import QC from "qc";
import { getBlogData, QQlogin } from "../../../axios/apis";
import { ElMessage } from "element-plus";
import router from "../../../router/index";

onMounted(() => {});
</script>

<style scoped lang="less"></style>
