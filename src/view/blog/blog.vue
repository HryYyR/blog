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
        :optionSrc="changeData.option.newBlogTitle.src"
        :option="changeData.option.newBlogTitle.option"
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
        :optionSrc="changeData.option.allBlogTitle.src"
        :option="changeData.option.allBlogTitle.option"
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
        <button class="more" @click="addMoreBlog">{{ changeData.moreText }}</button>
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
import changeBgColor from "../../components/change-bgColor.vue";
import {
  reactive,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  h,
  watch,
  computed,
} from "vue";
import { getBlogData } from "../../axios/apis";
import { ElMessage, ElNotification } from "element-plus";
import router from "../../router";
import { useStore } from "vuex";
import throttle from "../../func/throttle/throttle";
import { nextTick } from "process";

// 国际化
import { useI18n } from "vue-i18n"; //要在js中使用国际化
let i18n = useI18n();

const store = useStore();

let changeData: any = computed(() => {
  return {
    option: {
      newBlogTitle: {
        src: "https://hyyyh.top:3001/icon/newblogtitle.svg",
        option: i18n.t("blog.newblog"),
      },
      allBlogTitle: {
        src: "https://hyyyh.top:3001/icon/allblogtitle.svg",
        option: i18n.t("blog.allblog"),
      },
    },
    moreText: i18n.t("blog.more"),
  };
});

const data = reactive({
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
  themeColor: store.state.themeColor, //当前主题颜色
});
watch(store.state, (newvalue, oldvalue) => {
  data.themeColor = newvalue.themeColor;
});

onMounted(async () => {
  data.themeColor = store.state.themeColor;
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
    window.addEventListener("scroll", throttle(scrollToTop, 200));
  }
  // 消除html标签
  // res.data.map((item: any) => {
  //   item.container = item.container.replace(/<.*?>/gi, "");
  //   return item;
  // });
  clearHTML(res.data);
  // 渲染数据
  data.newBlogData = res.data.splice(0, 1);
  data.showBlogData = res.data;
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollToTop);
});

// 加载更多
const addMoreBlog = async () => {
  data.pageNum++;
  const res = await getBlogData(data.pageNum, data.Num);
  if (res.data.length == 0) {
    window.removeEventListener("scroll", scrollToTop);
    return (changeData.moreText = "暂无更多");
  }
  !store.state.isPC && res.data.map((item: any) => (item.isShow = 1)); //如果是手机就直接显示
  clearHTML(res.data);
  data.showBlogData = data.showBlogData.concat(res.data);
};

// 清除html标签
const clearHTML = (data: any) => {
  data.map((item: any) => {
    item.container = item.container.replace(/<.*?>/gi, "");
    return item;
  });
};

//  滚动显示博客
const scrollToTop = () => {
  data.scrollOption.screenH = document.body.clientHeight - window.innerHeight;
  // if (data.scrollOption.scrollTop + 1 > data.scrollOption.screenH) {
  //   addMoreBlog();
  // }
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
    width: 45%;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
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
        font-size: 1.1rem;
        font-weight: 600;
        color: white;
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
