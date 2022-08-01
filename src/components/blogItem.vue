<template>
  <div
    class="newBlog"
    id="newBlog"
    :style="{ height: isTitle ? '20rem' : '14rem', left: num % 2 ? '-10rem' : '10rem' }"
    :class="isShow ? (num % 2 == 0 ? 'leftShowBlog' : 'RightShowBlog') : ''"
    @click="toDetail(blogId)"
  >
    <div class="newBlog_right" v-if="num % 2 == 0 ? false : true">
      <img v-lazy="img" alt="" :key="blogId" />
    </div>
    <div class="newBlog_left">
      <p class="newBlog_Title">{{ blogTitle }}</p>
      <p class="newBlog_body" v-html="container"></p>
      <div class="newBlog_info">
        <span
          ><img src="../assets/chat.png" />
          <span class="newBlog_read"> {{ commentnum }}</span></span
        >
        <span><img src="../assets/eye.png" alt="" />{{ visitnum }}</span>
        <span><img src="../assets/good.png" alt="" />{{ laudnum }}</span>
      </div>
      <span class="newBlog_time">{{ time }}</span>
    </div>
    <div class="newBlog_right" v-if="num % 2 == 0 ? true : false">
      <img v-lazy="img" alt="" :key="blogId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import router from "../router/index";

defineProps({
  blogId: {
    type: Number,
    default: 0,
  },
  isTitle: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
    default: "默认时间2022/7/5",
  },
  blogTitle: {
    type: String,
    default: "标题获取失败",
  },
  container: {
    type: String,
    default:
      "默认内容一直以来，习惯在 flex 布局中使用 gap 这个属性设置间距，一直以来也都是在最新的 Chrome 上调试，所以从来没有想在 flex gap 在其他",
  },
  img: {
    type: String,
    default: "./src/assets/logo.png",
  },
  num: {
    type: Number,
    default: 1,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  visitnum: {
    type: Number,
    default: 0,
  },
  commentnum: {
    type: Number,
    default: 0,
  },
  laudnum: {
    type: Number,
    default: 0,
  },
});

// 去详情页
const toDetail = (id: number) => {
  router.push({ path: `/blog/blogdetail/${id}` });
};
</script>

<style scoped lang="less">
.newBlog {
  width: auto;
  height: 20rem;
  display: flex;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  margin: 1.5rem 0;
  transition: 0.3s;
  opacity: 0;
  bottom: -10rem;
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  &:hover {
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.45);
    & > img {
      transform: rotate(3deg) scale(1.1);
    }
  }
  .newBlog_left {
    flex: 1;
    padding: 1.5rem 2rem;
    width: 100%;
    min-width: 150px;
    display: flex;
    flex-direction: column;

    .newBlog_Title {
      font-weight: 600;
      min-height: 2rem;
      font-size: 1.5rem;
      margin: 0.5rem 0;
      color: rgba(0, 0, 0, 0.7);
      transition: 0.3s;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      &:hover {
        color: orange;
      }
    }
    .newBlog_body {
      color: rgba(0, 0, 0, 0.5);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
    .newBlog_time {
      color: rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 0.3rem;
    }
    .newBlog_info {
      font-family: "kaiti";
      flex: 1;
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: flex-end;
      & > span {
        margin: 0 0.25rem;
        cursor: pointer;
        user-select: none;
        opacity: 0.6;
        height: 2rem;
        width: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      img {
        height: 1rem;
      }
    }
  }
  .newBlog_right {
    overflow: hidden;
    width: auto;
    img {
      height: 100%;
      filter: blur(10px);
      /*  max-width: 28rem; */
      transition: 0.5s;
    }
  }
}
.leftShowBlog {
  opacity: 1;
  left: 0 !important;
  bottom: 0;
  img {
    filter: blur(0px) !important;
  }
}
.RightShowBlog {
  opacity: 1;
  left: 0 !important;
  bottom: 0;
  img {
    filter: blur(0px) !important;
  }
}
</style>
