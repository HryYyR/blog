<template>
  <div class="titleContainer" :style="{ backgroundImage: data.bgColor }" v-if="isShow">
    <h1 class="titleWord" :class="data.wordInto ? 'wordInto' : ''">
      {{ props.viewTitle == "" ? "加载中。。。" : props.viewTitle }}
    </h1>
    <button
      @click="ToIndex()"
      class="navBtn"
      :style="{ opacity: data.wordInto ? '1' : '0' }"
    >
      开启旅程
    </button>
    <div class="down" @click="ToIndex">
      <img src="../assets/down.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineProps, reactive } from "vue";

const data = reactive({
  bgColor: "url(../src/assets/titleimg/1.jpg)",
  wordInto: false,
  target: <Element>{},
});

onMounted(() => {
  setTimeout(() => {
    data.wordInto = true;
  }, 500);
  data.target = document.querySelector(".blogContainer")!;
});

const ToIndex = () => {
  data.target.scrollIntoView({
    behavior: "smooth",
  });
};

const props = defineProps({
  viewTitle: {
    type: String,
    default: "index",
  },
  isShow: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="less">
.titleContainer {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 116% 100%;
  background-attachment: fixed;
  transition: 0.3s;
  .titleWord {
    user-select: none;
    font-size: 6.5rem;
    opacity: 0;
    position: relative;
    top: -100px;
    transition: 0.5s;
    color: white;
  }
  .wordInto {
    opacity: 1 !important;

    top: 0;
  }
  .navBtn {
    cursor: pointer;
    transition: 0.5s;
    padding: 1rem;
    width: 12rem;
    height: 4.5rem;
    position: relative;
    top: 2rem;
    font-size: 1.2rem;
    border-radius: 10px;
    font-family: STHupo !important ;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.4);
    animation: navbtn 1s infinite alternate;

    @keyframes navbtn {
      from {
        background: rgba(0, 0, 0, 0.2);
        color: rgba(255, 255, 255, 0.4);
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.4);
      }
      to {
        transition: 0.5s;
        box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0, 0.1);
        color: white;
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }
  .down {
    cursor: pointer;
    position: absolute;
    width: auto;
    bottom: 0;
    animation: mymove 1s infinite alternate;
    img {
      width: 4rem;
    }
  }
  @keyframes mymove {
    from {
      bottom: 0px;
    }
    to {
      bottom: 1rem;
    }
  }
}
</style>
