<template>
  <indexVue></indexVue>
  <div class="blogContainer" :style="{ backgroundImage: data.bgImg }">
    <!-- <div class="blogLeft">le</div> -->
    <div class="blogCenter">
      <!-- 最新博客标题 -->
      <blogoption
        :optionSrc="data.option.newBlogTitle.src"
        :option="data.option.newBlogTitle.option"
      />
      <!-- 最新博客内容 -->
      <blogItem
        :blogId="data.newBlogData[0].id"
        :isTitle="true"
        :isShow="true"
        :time="data.newBlogData[0].createtime"
        :blogTitle="data.newBlogData[0].name"
        :container="data.newBlogData[0].container"
        :about="data.newBlogData[0].img"
        :visitnum="data.newBlogData[0].visitnumber"
        :commentnum="data.newBlogData[0].commentnum"
        :laudnum="data.newBlogData[0].laudnum"
        :img="
          data.newBlogData[0].img
            ? data.newBlogData[0].img
            : 'http://hyyyh.top:3001/icon/logo.png'
        "
        :sortname="data.newBlogData[0].sortname"
        :labelname="data.newBlogData[0].labelname"
      />
      <!-- 所有博客标题 -->
      <blogoption
        :optionSrc="data.option.allBlogTitle.src"
        :option="data.option.allBlogTitle.option"
      />

      <!-- 所有博客内容 -->
      <blogItem
        :blogId="item.id"
        :blogTitle="item.name"
        :time="item.createtime"
        :num="index"
        :img="item.img ? item.img : 'http://hyyyh.top:3001/icon/logo.png'"
        :container="item.container"
        v-for="(item, index) in data.showBlogData"
        :isShow="item.isShow == 0 ? false : true"
        :key="item.id"
        :id="'id' + index"
        :visitnum="item.visitnumber"
        :commentnum="item.commentnum"
        :laudnum="item.laudnum"
        :sortname="item.sortname"
        :labelname="item.labelname"
      />

      <div class="moreBlock">
        <button class="more" @click="addMoreBlog">{{ data.moreText }}</button>
      </div>
    </div>

    <blogRight />
  </div>
  <blogbottomVue></blogbottomVue>
</template>

<script setup lang="ts">
import titleVue from "../../components/title.vue";
import indexVue from "./index.vue";
import blogbottomVue from "../../components/blogbottom.vue";
import blogoption from "../../components/blogoption.vue";
import blogItem from "../../components/blogItem.vue";
import blogRight from "../../components/blogRight.vue";
import { reactive, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { getBlogData } from "../../axios/apis";
import { ElMessage } from "element-plus";
import router from "../../router";
import { useStore } from "vuex";
import { log } from "console";

const data = reactive({
  option: {
    newBlogTitle: {
      src: "http://hyyyh.top:3001/icon/newblogtitle.svg",
      option: "最新博客",
    },
    allBlogTitle: {
      src: "http://hyyyh.top:3001/icon/allblogtitle.svg",
      option: "所有博客",
    },
  },
  newBlogData: <any>[
    {
      createtime: "",
      name: "",
      container: "",
    },
  ], //最新博客数据
  showBlogData: <any>[], //展示的博客数据
  pageNum: 1, //分页
  Num: 5, //每页数量
  moreText: "更多",
  // bgImg: "url(./src/assets/containerimg/con3.jpg)",
  bgImg: "",
  scrollOption: {
    domHight: window.innerHeight,
    scrollTop: 0,
    id: <any>0,
    scrollHeight: <any>0,
    offsetTop: <any>0,
    top: <any>0,
    bottom: <any>0,
  },
});

onMounted(async () => {
  const store = useStore();
  store.state.isPC = window.innerWidth < 700 ? false : true;

  // 获取博客数据
  const res = await getBlogData(1, 5);
  if (res.status != 200) {
    return ElMessage.error("信息获取失败！");
  }

  if (!store.state.isPC) {
    res.data.map((item: any) => {
      item.isShow = 1;
      return item;
    });
  } else {
    scrollToTop();
    window.addEventListener("scroll", scrollToTop);
  }

  // 消除html标签
  res.data.map((item: any) => {
    item.container = item.container.replace(/<.*?>/gi, "");
    return item;
  });

  // 渲染数据
  data.newBlogData = res.data.splice(-1, 1);
  data.showBlogData = res.data;
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollToTop);
});

//  滚动显示博客
const scrollToTop = () => {
  // 获取视窗高度
  // let domHight = window.innerHeight;
  // dom滚动位置
  data.scrollOption.scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  // 获取监听元素
  // let id;
  // 获取监听元素本身高度
  // let scrollHeight;
  // 获取监听元素距离视窗顶部距离
  // let offsetTop;
  // 获取监听元素距离顶部高度-窗口高度
  // let top;
  // 元素距离底部的高度+元素本身高度
  // let bottom;
  data.showBlogData.map((i: any, index: any) => {
    data.scrollOption.id =
      document.getElementById(`id${index}`) || document.createElement("div");
    data.scrollOption.scrollHeight = data.scrollOption.id.scrollHeight;
    data.scrollOption.offsetTop = data.scrollOption.id.offsetTop;
    data.scrollOption.top =
      data.scrollOption.offsetTop - data.scrollOption.domHight > 0
        ? data.scrollOption.offsetTop - data.scrollOption.domHight
        : 0;
    data.scrollOption.bottom =
      data.scrollOption.scrollHeight + data.scrollOption.offsetTop;

    // 页面滚动位置 > 元素距离顶部高度-窗口高度 && 页面滚动位置 < 元素距离顶部高度+元素本身高度
    if (
      data.scrollOption.scrollTop >= data.scrollOption.top &&
      data.scrollOption.scrollTop <= data.scrollOption.bottom
    ) {
      setTimeout(() => {
        data.showBlogData[index].isShow = 1;
      }, 200);
    } else {
    }
  });
};
// 加载更多
const addMoreBlog = async () => {
  data.pageNum++;
  const res = await getBlogData(data.pageNum, data.Num);
  if (res.data.length == 0) {
    return (data.moreText = "暂无更多");
  }
  data.showBlogData = data.showBlogData.concat(res.data);
};
</script>

<style scoped lang="less">
* {
  font-family: Georgia, STZhongsong;
}
.blogContainer {
  width: 100%;
  background-image: linear-gradient(0deg, rgb(255, 255, 255), rgb(27, 41, 71));
  background-size: 800%;
  background-position: 0% 50%;

  display: flex;
  justify-content: center;
  padding: 6rem 0;
  overflow: hidden;

  animation: changecolor 30s infinite;
  @keyframes changecolor {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  & > div {
    margin: 0 1rem;
    min-height: 20rem;
    /*  background: rgb(214, 168, 168);*/
  }

  .blogCenter {
    overflow: hidden;
    width: 45%;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1rem 3rem;
    display: flex;
    flex-direction: column;
    .moreBlock {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 2rem;

      .more {
        cursor: pointer;
        user-select: none;
        width: 7.5rem;
        height: 2.5rem;
        transition: 0.2s;
        border-radius: 25px;
        font-family: heiti;
        color: gray;
        border: none;
        background-color: transparent;
      }
    }
  }
}
</style>
