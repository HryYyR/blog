<template>
  <div class="newBlog_option">
    <img :src="optionSrc" alt="" />
    <span>{{ option }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  optionSrc: String,
  option: String,
  DefaultMargin: {
    type: String,
    default: "1rem 0",
  },
});
</script>

<style scoped lang="less">
.newBlog_option {
  z-index: 1;
  width: auto;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.3);
  margin: v-bind(DefaultMargin);
  font-size: 1.2rem;
  font-weight: 900;
  span {
    transition: 0.6s;
    color: var(--WB-9);
    position: relative;
    top: -0.2rem;
    left: 0.5rem;
  }
  img {
    transition: 0.5s;
  }
  &:hover {
    img {
      transform: rotate(360deg);
    }
  }
}
</style>
