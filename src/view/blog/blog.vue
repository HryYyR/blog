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
        :img="data.newBlogData[0].img ? data.newBlogData[0].img : './src/assets/logo.png'"
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
        :img="item.img ? item.img : './src/assets/logo.png'"
        :container="item.container"
        v-for="(item, index) in data.showBlogData"
        :isShow="item.isShow == 0 ? false : true"
        :key="item.id"
        :id="'id' + index"
        :visitnum="item.visitnumber"
        :commentnum="item.commentnum"
      />

      <div class="moreBlock">
        <button class="more" @click="addMoreBlog">{{ data.moreText }}</button>
      </div>
      <el-backtop :right="100" :bottom="100" />
    </div>

    <blogRight />
  </div>
</template>

<script setup lang="ts">
import titleVue from "../../components/title.vue";
import indexVue from "./index.vue";
import blogoption from "../../components/blogoption.vue";
import blogItem from "../../components/blogItem.vue";
import blogRight from "../../components/blogRight.vue";
import { reactive, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { getBlogData } from "../../axios/apis";
import { ElMessage } from "element-plus";
import router from "../../router";

const data = reactive({
  option: {
    newBlogTitle: {
      src: "./src/assets/newblogtitle.svg",
      option: "最新博客",
    },
    allBlogTitle: {
      src: "./src/assets/allblogtitle.svg",
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
  bgImg: "url(./src/assets/containerimg/con3.jpg)",
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
  scrollToTop();
  // window.addEventListener("scroll", throttle(scrollToTop, 100));
  window.addEventListener("scroll", scrollToTop);

  const res = await getBlogData(1, 5);
  if (res.status != 200) {
    return ElMessage.error("信息获取失败！");
  }

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
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  padding-top: 6rem;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  overflow: hidden;

  & > div {
    margin: 0 1rem;
    min-height: 20rem;
    /*  background: rgb(214, 168, 168);*/
  }

  .blogCenter {
    overflow: hidden;
    width: 45%;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
        font-weight: 900;
        font-size: 1.1rem;
        font-family: heiti;
        &:hover {
          border: 2px solid orange;
          color: orange;
        }
      }
    }
  }
}
</style>
