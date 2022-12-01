<template>
  <div>
    <el-dialog
      v-model="isshow"
      title="登陆提示"
      width="20%"
      top="20rem"
      :show-close="false"
      :lock-scroll="false"
    >
      <span>{{ info }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emits('back')">取消</el-button>
          <el-button type="success" @click="tologin">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, defineProps, defineEmits } from "vue";
import router from "../../router";
const data = reactive({
  toLoginDialogText: "",
  isToLoginVisible: false,
});
const emits = defineEmits(["back"]);

const props = defineProps({
  isshow: {
    type: Boolean,
    default: false,
  },
  info: {
    type: String,
    default: '"你当前尚未登录无法点赞，是否前往登录页面？"',
  },
});

const tologin = () => {
  data.isToLoginVisible = false;
  router.push({ path: "/login" });
};
</script>

<style scoped lang="less"></style>
