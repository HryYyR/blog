<template>
  <indexVue :themeColor="data.themeColor"> </indexVue>
  <div
    class="blogContainer"
    :style="{
      backgroundImage: `linear-gradient(${data.themeColor.start},${data.themeColor.end})`,
    }"
  >
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

  <!-- 切换主题颜色 -->
  <changeBgColor @changeBgColor="ChangeBgColor"></changeBgColor>
  <!-- 太阳 -->
  <div
    class="sun"
    :style="{ right: `${data.sunOptions.X}%`, bottom: `${data.sunOptions.Y}%` }"
  >
    <img src="https://hyyyh.top:3001/icon/sun.png" />
  </div>
  <!-- cover -->
  <div
    class="cover"
    :style="{
      opacity: data.coverOption.opacity,
      backgroundColor: data.coverOption.color,
      zIndex: data.coverOption.zIndex,
    }"
  ></div>
</template>
<script setup lang="ts">
import titleVue from "../../components/title.vue";
import indexVue from "./index.vue";
import blogbottomVue from "../../components/blogbottom.vue";
import blogoption from "../../components/blogoption.vue";
import blogItem from "../../components/blogItem.vue";
import blogRight from "../../components/blogRight.vue";
import changeBgColor from "../../components/change-bgColor.vue";
import { reactive, onMounted, onUnmounted, h } from "vue";
import { getBlogData } from "../../axios/apis";
import { ElMessage, ElNotification } from "element-plus";
import router from "../../router";
import { useStore } from "vuex";
import throttle from "../../func/throttle/throttle";
import { nextTick } from "process";
const store = useStore();

const data = reactive({
  option: {
    newBlogTitle: {
      src: "https://hyyyh.top:3001/icon/newblogtitle.svg",
      option: "最新博客",
    },
    allBlogTitle: {
      src: "https://hyyyh.top:3001/icon/allblogtitle.svg",
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
  scrollOption: {
    screenH: 0,
    domHight: window.innerHeight,
    scrollTop: 0,
    id: <any>0,
    scrollHeight: <any>0,
    offsetTop: <any>0,
    top: <any>0,
    bottom: <any>0,
  },
  themeColor: { id: 0, start: "", end: "" }, //当前主题颜色
  bgImgOptions: [{ id: 0, start: "", end: "" }], //所有主题颜色
  sunOptions: {
    //太阳位置
    X: 3,
    Y: -10,
  },
  coverOption: {
    color: "red",
    opacity: 0,
    zIndex: -99,
  },
});

onMounted(async () => {
  data.themeColor = store.state.themeColor;
  data.bgImgOptions = store.state.themeColorOption;
  setsunPosition(data.themeColor.id);
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
    window.addEventListener("scroll", throttle(scrollToTop, 500));
  }
  // 消除html标签
  res.data.map((item: any) => {
    item.container = item.container.replace(/<.*?>/gi, "");
    return item;
  });
  // 渲染数据
  data.newBlogData = res.data.splice(0, 1);
  data.showBlogData = res.data;
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollToTop);
});

// 切换主题颜色
const ChangeBgColor = (item: any) => {
  data.coverOption = {
    zIndex: 98,
    color: item.start,
    opacity: 1,
  };
  setTimeout(() => {
    store.state.themeColor = item;
    data.themeColor = item;
    data.coverOption.opacity = 0;
    setsunPosition(item.id);

    setTimeout(() => {
      data.coverOption.zIndex = -99;
    }, 1000);
  }, 2000);
};

//  滚动显示博客
const scrollToTop = () => {
  data.scrollOption.screenH = document.body.clientHeight - window.innerHeight;
  if (data.scrollOption.screenH == data.scrollOption.scrollTop + 1) {
    addMoreBlog();
  }

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
    window.removeEventListener("scroll", scrollToTop);
    return (data.moreText = "暂无更多");
  }
  data.showBlogData = data.showBlogData.concat(res.data);
};

const setsunPosition = (id: number) => {
  switch (id) {
    case 0:
      data.sunOptions = {
        X: 3,
        Y: -10,
      };
      break;
    case 1:
      data.sunOptions = {
        X: 45,
        Y: 90,
      };
      break;
    case 2:
      data.sunOptions = {
        X: 94,
        Y: 5,
      };
      break;
    case 3:
      data.sunOptions = {
        X: -100,
        Y: 100,
      };
      break;
  }
};
</script>

<style scoped lang="less">
* {
  font-family: Georgia, STZhongsong;
}
.blogContainer {
  width: 100%;
  background-size: 800%;
  background-position: 0% 50%;
  display: flex;
  justify-content: center;
  padding: 6rem 0;
  overflow: hidden;
  transition: 1s;

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
    padding: 1rem;
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
.sun {
  position: fixed;
  z-index: 0;
  width: 160px;
  height: 160px;
  animation: sun 20s infinite linear;
  user-select: none;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
@keyframes sun {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.cover {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  top: 0;
  transition: 1.5s;
}
</style>
