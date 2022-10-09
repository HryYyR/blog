<template>
  <div
    class="titleContainer"
    v-if="isShow"
    :style="{ backgroundImage: `linear-gradient(${themeColor.start},${themeColor.end})` }"
  >
    <h1 class="titleWord" :class="data.wordInto ? 'wordInto' : ''">
      <!-- {{ props.viewTitle == "" ? "加载中。。。" : props.viewTitle }} -->
    </h1>
    <button
      @click="ToIndex()"
      class="navBtn"
      :style="{ opacity: data.wordInto ? '1' : '0' }"
    >
      开启旅程
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="down" @click="ToIndex">
      <img src="../assets/down.png" alt="" />
    </div>
  </div>
  <div class="bg">
    <div class="stars">
      <div
        v-for="(item, index) in data.bg.startnum"
        :key="index"
        class="star"
        ref="star"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { log } from "console";
import { type } from "os";
import { array } from "snabbdom";
import { onMounted, reactive, ref, watch, defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore();
const star = ref(null);

const data = reactive({
  wordInto: false,
  target: <Element>{},
  bg: {
    startnum: 120,
    distance: 800,
  },
});
type themeColor = {
  start: string;
  end: string;
};
watch(store.state.themeColor, (newvalue: themeColor, oldvalue: themeColor) => {
  console.log(newvalue, oldvalue);
});

onMounted(() => {
  if (navigator.platform != "Win32") {
    data.bg.startnum = 80;
    // console.log("pe");
  }

  setTimeout(() => {
    data.wordInto = true;
  }, 600);
  data.target = document.querySelector(".down")!;
  // console.log(star.value);

  let starNodes = <any>star.value;
  starNodes.forEach((item: any) => {
    let speed = 0.2 + Math.random() * 1;
    let thisDistance = data.bg.distance + Math.random() * 300;
    item.style.transformOrigin = `0 0 ${thisDistance}px`;
    item.style.transform = `
        translate3d(0,0,-${thisDistance}px)
        rotateY(${Math.random() * 360}deg)
        rotateX(${Math.random() * -50}deg)
        scale(${speed},${speed})`;
  });
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
  themeColor: {
    type: Object,
    default: { start: "", end: "" },
  },
});
</script>

<style scoped lang="less">
@import "../css-compoments/nav-btn.css";

.titleContainer {
  width: 100%;
  height: 99.9vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: linear-gradient(#6cc6cb, #eae59c);
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
    z-index: 80;
    cursor: pointer;
    transition: 0.5s;
    padding: 1rem;
    width: 12rem;
    height: 4.5rem;
    position: relative;
    top: 2rem;
    font-size: 1.2rem;
    letter-spacing: 4px;
    border-radius: 10px;
    font-family: STHupo !important ;
    backdrop-filter: blur(10px);
    border: none;
    background-color: transparent;
    color: white;
    overflow: hidden;
  }
  .down {
    z-index: 80;
    cursor: pointer;
    position: absolute;
    width: auto;
    bottom: 0;
    animation: mymove 1s infinite alternate;
    img {
      width: 3rem;
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
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(0deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  left: 45%;
  animation: rotate 90s infinite linear;
  bottom: 0;
  user-select: none;
}
.star {
  width: 2px;
  height: 2px;
  border-radius: 20px;
  background: #f7f7b6;
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
  user-select: none;
}
.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  z-index: 0;
}
</style>
