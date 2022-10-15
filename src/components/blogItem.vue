<template>
  <div
    class="newBlog"
    id="newBlog"
    :style="{ height: isTitle ? '20rem' : '16rem', left: num % 2 ? '-10rem' : '10rem' }"
    :class="isShow ? (num % 2 == 0 ? 'leftShowBlog' : 'RightShowBlog') : ''"
    @click="toDetail(blogId)"
  >
    <div class="newBlog_right" v-if="num % 2 == 0 ? false : true">
      <img
        v-lazy="img"
        :alt="blogTitle"
        :key="blogId"
        :style="{ 'max-height': store.state.isPC ? '100%' : '160px' }"
      />
    </div>
    <div class="newBlog_left">
      <div>
        <p
          class="newblog_labelsort"
          :style="{ 'justify-content': num % 2 == 0 ? 'flex-end' : '' }"
        >
          <span> {{ sortname }}</span>
          <span v-for="(item, index) in labelname" :key="index" style="margin: 0 2px">{{
            item
          }}</span>
        </p>
        <p
          class="newBlog_Title"
          :style="{ 'justify-content': num % 2 == 0 ? 'flex-end' : '' }"
        >
          {{ blogTitle }}
        </p>
      </div>
      <p class="newBlog_body">{{ container }}</p>
      <div class="newBlog_info">
        <div class="newBlog_info_item">
          <span
            ><img src="../assets/chat.png" alt="评论数" />
            <span class="newBlog_read"> {{ commentnum }}</span></span
          >
          <span
            ><img src="../assets/eye.png" alt="访问次数" style="margin-right: 3px" />{{
              visitnum
            }}</span
          >
          <span
            ><img src="../assets/good.png" alt="点赞数" style="margin-right: 3px" />{{
              laudnum
            }}</span
          >
        </div>

        <span class="newBlog_time">{{ time }}</span>
      </div>
    </div>
    <div class="newBlog_right" v-if="num % 2 == 0 ? true : false">
      <img
        v-lazy="img"
        :alt="blogTitle"
        :key="blogId"
        :style="{ 'max-height': store.state.isPC ? '100%' : '160px' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { array } from "snabbdom";
import {} from "vue";
import router from "../router/index";
import { useStore } from "vuex";
import VanillaTilt from "vanilla-tilt";

let domArr: any = document.querySelectorAll(".newBlog");
let VanillaTiltOption = {
  reverse: true,
  scale: 1,
  max: 5,
  speed: 1000,
  // "full-page-listening": true,
};
VanillaTilt.init(domArr, VanillaTiltOption);
const store = useStore();
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
  sortname: {
    type: String,
    default: "",
  },
  labelname: {
    type: Array,
    default: [],
  },
});

// 去详情页
const toDetail = (id: number) => {
  router.push({ path: `/blog/blogdetail/${id}` });
};
</script>

<style scoped lang="less">
.newBlog {
  cursor: pointer;
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
    padding: 0.5rem 1rem 0.5rem 1rem;
    width: 100%;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .newblog_labelsort {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-wrap: wrap;
      & span {
        font-family: "yahei";
      }
      & > :nth-child(1) {
        color: rgba(0, 0, 0, 0.7);
        margin-right: 3px;
        font-weight: 900;
      }
    }

    .newBlog_Title {
      font-weight: 600;
      min-height: 1.5rem;
      font-size: 1.5rem;
      margin: 0.2rem 0;
      color: rgba(0, 0, 0, 0.9);
      transition: 0.3s;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: flex;
      &:hover {
        color: orange;
      }
    }
    .newBlog_body {
      line-height: 1.5rem;
      color: rgba(0, 0, 0, 0.7);
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .newBlog_time {
      width: 3rem;
      color: rgba(0, 0, 0, 0.5);
      margin-left: 0.2rem;
      position: relative;
    }
    .newBlog_info {
      font-family: "kaiti";
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
      position: relative;
      bottom: 0.5rem;
      .newBlog_info_item {
        display: flex;
        height: auto;
        & span {
          width: auto;
          margin: 0 0.3rem;
        }
      }
      & span {
        user-select: none;
        opacity: 0.6;
        width: auto;
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
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 100%;
      width: 100%;
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
.sortlabel {
  width: 100%;
  height: 1rem;
  background-color: red;
}
</style>
