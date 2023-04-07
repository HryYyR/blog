<template>
  <el-popover placement="left" :width="200" trigger="hover">
    <template #reference>
      <div class="change">
        <img :src="`https://hyyyh.top:3001/icon/changeBgColor.png`" alt="" />
      </div>
    </template>
    <div class="changebgcolor">
      <div
        v-for="(item, index) in data.bgImgOptions"
        :key="index"
        class="changebgcolor_item"
        :style="{
          backgroundImage: `linear-gradient(${data.bgImgOptions[index].start},${data.bgImgOptions[index].end})`,
        }"
        @click="emit('changeBgColor', item)"
      >
        <div class="flex-jcc-aic">
          {{ item.label }}
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
let emit = defineEmits(["changeBgColor"]);
const data = reactive({
  themeColor: {},
  bgImgOptions: [{ start: "", end: "", label: "", id: 0 }],
});
onMounted(() => {
  data.themeColor = store.state.themeColor;
  data.bgImgOptions = store.state.themeColorOption;
});
</script>

<style scoped lang="less">
.change {
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  cursor: pointer;
  user-select: none;
  z-index: 1;
  img {
    width: 50px;
    height: 50px;
  }
}
.changebgcolor {
  display: flex;
  .changebgcolor_item {
    margin: 0 0.5rem 1rem 0.5rem;
    width: 30px;
    height: 30px;
    user-select: none;
    border-radius: 50%;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
    font-size: 0.1rem;
    transition:  0.1s transform;
    & div {
      position: relative;
      top: 30px;
    }
    &:hover{
      transform: scale(1.2);
    }
  }
}
</style>
