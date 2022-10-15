<template>
  <div class="bottom">
    <p>技术栈：Vue3+Element-Plus+Node+Mysql</p>
    <p>至今已苟延残喘{{ data.date }}</p>
    <p>
      <span>© 2022 HYYYH. ALL RIGHTS RESERVED. </span>
      <a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2021029882号-1</a>
    </p>

    <p></p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
const data = reactive({
  date: "",
});
onMounted(() => {
  const date = new Date().valueOf() - Date.parse("2022/7/5");

  data.date = getLocalTime(date);
});

const getLocalTime = (n: number) => {
  const year = new Date(n).getFullYear() - 1970;
  const month = new Date(n).getMonth();
  const day = new Date(n).getDate();
  return `${year == 0 ? "" : year + "年"}${month == 0 ? "" : month + "月"}${day}天`;
};
</script>

<style scoped lang="less">
.bottom {
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
  height: 100px;
  width: 100%;
  background-color: rgba(246, 247, 248, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.4rem;
}
</style>
