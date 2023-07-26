<template>
  <indexVue :isshow="data.loading"> </indexVue>
  <div class="blogContainer" :style="{
    backgroundColor: store.state.themeColor.color,

  }">
    <!-- <div class="blogLeft">le</div> -->
    <div class="blogCenter" :style="{ opacity: data.loading ? '0' : '1' }">
      <!-- 最新博客标题 -->
      <blogoption :optionSrc="changeData.option.newBlogTitle.src" :option="changeData.option.newBlogTitle.option" />
      <!-- 最新博客内容 -->
      <blogItem :blogId="data.newBlogData[0].id" :isTitle="true" :isShow="true" :time="data.newBlogData[0].createtime"
        :blogTitle="data.newBlogData[0].name" :container="data.newBlogData[0].container" :about="data.newBlogData[0].img"
        :visitnum="data.newBlogData[0].visitnumber" :commentnum="data.newBlogData[0].commentnum"
        :laudnum="data.newBlogData[0].laudnum" :img="data.newBlogData[0].img
          ? data.newBlogData[0].img
          : 'http://hyyyh.top:3001/icon/loading.png'
          " :sortname="data.newBlogData[0].sortname" :labelname="data.newBlogData[0].labelname" />
      <!-- 所有博客标题 -->
      <blogoption :optionSrc="changeData.option.allBlogTitle.src" :option="changeData.option.allBlogTitle.option" />

      <!-- 所有博客内容 -->
      <blogItem :blogId="item.id" :blogTitle="item.name" :time="item.createtime" :num="index"
        :img="item.img ? item.img : 'http://hyyyh.top:3001/icon/loading.png'" :container="item.container"
        v-for="(item, index) in data.showBlogData" :isShow="item.isShow == 0 ? false : true" :key="item.id"
        :id="'id' + index" :visitnum="item.visitnumber" :commentnum="item.commentnum" :laudnum="item.laudnum"
        :sortname="item.sortname" :labelname="item.labelname" />

      <div class="moreBlock" @click="addMoreBlog" :class="data.haveMoreData ? 'hovermore' : ''">
        <button class="more ">
          {{ data.haveMoreData ? changeData.moreText : changeData.nomoreText }}
        </button>

      </div>
    </div>

    <blogRight :isshow="data.loading" />
  </div>
  <blogbottomVue  ></blogbottomVue>
</template>
<script setup lang="ts">
import indexVue from "../index/index.vue";
import blogbottomVue from "../../../components/blog-bottom/blogbottom.vue";
import blogoption from "../../../components/blog-option/blogoption.vue";
import blogItem from "../../../components/blog-item/blogItem.vue";
import blogRight from "../../../components/blog-right/blogRight.vue";
import {
  reactive,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  h,
  watch,
  computed,
} from "vue";
import { getBlogData, QQlogin } from "../../../axios/apis";
import { ElMessage, ElNotification } from "element-plus";
import router from "../../../router";
import { useStore } from "vuex";
import throttle from "../../../func/throttle/throttle";
import QC from "qc";
import { DATA } from './blog'

// 国际化
import { useI18n } from "vue-i18n"; //要在js中使用国际化
let i18n = useI18n();

const store = useStore();

let changeData: any = computed(() => {
  return {
    option: {
      newBlogTitle: {
        src: "https://hyyyh.top:3001/icon/newblogtitle.png",
        option: i18n.t("blog.newblog"),
      },
      allBlogTitle: {
        src: "https://hyyyh.top:3001/icon/allblogtitle.png",
        option: i18n.t("blog.allblog"),
      },
    },
    moreText: i18n.t("blog.more"),
    nomoreText: i18n.t("blog.nomore"),
  };
});

const data: DATA = reactive({
  newBlogData: [
    {
      createtime: "",
      name: "",
      container: "",
    },
  ], //最新博客数据
  showBlogData: <any>[], //展示的博客数据
  pageNum: 1, //分页
  Num: 5, //每页数量
  haveMoreData: true, //是否还有更多数据
  scrollOption: {
    screenH: 0,
    domHight: window.innerHeight,
    scrollTop: 0,
    id: 0,
    scrollHeight: 0,
    offsetTop: 0,
    top: 0,
    bottom: 0,
  },
  loading: true
  // themeColor: store.state.themeColor, //当前主题颜色
});

onMounted(async () => {
  if (QC.Login.check()) {
    // console.log(QC.Login.check());
    QC.Login.getMe((openId: any, accessToken: any) => {
      if (openId != undefined) {
        QC.api("get_user_info").success(async (res: any) => {
          // console.log(res.data);
          let resolve = await QQlogin(res.data, openId, accessToken);
          console.log(resolve);
          let data = resolve.data.data;
          if (resolve.status == 200) {
            localStorage.setItem("openID", openId);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("id", data.id);
            localStorage.setItem("header", data.headerurl);
            localStorage.setItem("name", data.name);
            store.state.username = data.name;
            store.state.userid = data.id;
            store.state.userdata = data;
            store.state.userinfo = data;
          }
        });
      }
    });
  }

  // 获取博客数据
  const res = await getBlogData(1, 5) as DATA['showBlogData'];
  // console.log(res);
  if (!store.state.isPC) {
    res.map((item: any) => {
      item.isShow = 1;
      return item;
    });
  } else {
    scrollToTop();
    window.addEventListener("scroll", throttle(scrollToTop, 200));
  }
  clearHTML(res);
  // 渲染数据
  data.newBlogData = res.splice(0, 1);
  data.showBlogData = res;

  setTimeout(() => {
    data.loading = false
  }, 200);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollToTop);
});

// 加载更多
const addMoreBlog = async () => {
  if (!data.haveMoreData) return
  data.pageNum++;
  const res = await getBlogData(data.pageNum, data.Num) as DATA['showBlogData'];
  let DATA = res;
  if (DATA.length < data.Num) {
    data.haveMoreData = false;
    changeData.moreText = "~~到底啦~~";
  }
  if (DATA.length == 0) {
    window.removeEventListener("scroll", scrollToTop);
    return;
  }
  !store.state.isPC && DATA.map((item: any) => (item.isShow = 1)); //如果是手机就直接显示
  clearHTML(DATA);
  data.showBlogData = data.showBlogData.concat(DATA);
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
  data.scrollOption.scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
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
@import url('./blog.less');
</style>
