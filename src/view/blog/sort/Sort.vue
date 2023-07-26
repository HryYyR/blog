<template>
  <div
    class="container"
    :style="{
    backgroundColor:store.state.themeColor.color
    }"
  >
    <blogheaderVue :bgColor="true" @changePage="changePage"></blogheaderVue>
    <div class="sort_container">
      <div
        class="sort_nav"
        :style="{
          opacity: data.isshownav ? 1 : 0,
        }"
      >
        <div class="sort_nav_sorter">
          <span> 分类：</span>
          <div>
            <div
              v-for="(item, index) in data.sortData"
              :key="item.id"
              @click="clickSort(item)"
              :class="{'check':item.check}"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="sort_nav_label">
          <span>标签：</span>
          <div>
            <div
              v-for="(item, index) in data.labelData"
              :key="item.id"
              @click="clickLabel(item)"
              :class="{'check':item.check}"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="loading" v-if="!data.isloading">
        <img src="https://hyyyh.top:3001/loading.png" alt="" />
      </div>
      <div class="sort_body" :style="{ opacity: data.isshowcontainer ? '1' : '0' }">
        <blogItemVue
          :blogId="item.id"
          :blogTitle="item.name"
          :time="item.createtime"
          :num="index"
          :img="item.img ? item.img : './src/assets/logo.png'"
          :container="item.container"
          v-for="(item, index) in data.blogData"
          :isShow="true"
          :key="item.id"
          :id="'id' + index"
          :visitnum="item.visitnumber"
          :commentnum="item.commentnum"
          :laudnum="item.laudnum"
          :sortname="item.sortname"
          :labelname="item.labelname"
        />
        <div
          class="nomore"
          v-if="data.blogData.length == 0 && data.isshowcontainer == true"
        >
          没有匹配的选项哦！
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import blogItemVue from "../../../components/blog-item/blogItem.vue";
import blogheaderVue from "../../../components/blog-header/blogheader.vue";
import { reactive, onMounted, watch } from "vue";
import { getAdminLabelData, getAdminSortData } from "../../../axios/adminApi";
import { getBlogData, getAssignSortLabelData } from "../../../axios/apis";
import { ElMessage } from "element-plus";
import anime from "animejs";
import { useStore } from "vuex";
import{ DATA} from '../blog-index/blog'
let store = useStore();
const data = reactive({
  labelData: <any>[],
  sortData: <any>[],
  checklabel: <any>[],
  checkSort: 0,
  blogData: <any>[],
  isshownav: false,
  isshowcontainer: false,
  isloading: false,
  // themeColor: store.state.themeColor,
});
// watch(store.state, (newvalue, oldvalue) => {
//   data.themeColor = newvalue.themeColor;
// });
onMounted(async () => {
  let labelres = await getAdminLabelData();
  if (labelres.status == 200) {
    data.labelData = labelres.data;
    data.labelData.map((item: any) => {
      item.check = false;
    });
  }
  let sortres = await getAdminSortData();
  if (sortres.status == 200) {
    data.sortData = sortres.data;
    data.sortData.map((item: any) => {
      item.check = false;
    });
  }
  data.isshownav = true;
  data.isloading = true;
  anime({
    targets: [".sort_container"],
    translateY: "-5rem",
    opacity: "1",
    duration: 1000,
  });

  const blogres = await getBlogData(0, 0) as DATA['showBlogData'];
  blogres.map((item: any) => {
    item.container = item.container.replace(/<.*?>/gi, "");
    return item;
  });
  data.blogData = blogres;
  data.isshowcontainer = true;

  // console.log(data.labelData, data.sortData);
});

const changePage = () => {
  anime({
    targets: [".sort_container"],
    opacity: 0,
    duration: 1500,
  });
};

const clickSort = async (item: any) => {
  if (item.check == true) {
    item.check = false;
    data.checkSort = 0;
  } else {
    data.sortData.map((item: any) => {
      item.check = false;
    });
    item.check = !item.check;
    data.checkSort = item.id;
  }
  const res = await getAssignSortLabelData(data.checkSort, data.checklabel);
  const handledata = handleblogdata(res.data.data);
  data.blogData = handledata;
  // console.log(sortres.data);
};

const clickLabel = async (item: any) => {
  item.check = !item.check;
  if (item.check) {
    data.checklabel.push(item.id.toString());
  } else {
    const ind = data.checklabel.indexOf(item.id);
    data.checklabel.splice(ind, 1);
  }
  const res = await getAssignSortLabelData(data.checkSort, data.checklabel);
  const handledata = handleblogdata(res.data.data);
  data.blogData = handledata;
  // console.log(sortres.data);
};

const handleblogdata = (data: any) => {
  data.map((item: any) => {
    item.container = item.container.replace(/<.*?>/gi, "");
    return item;
  });
  return data;
};
</script>

<style scoped lang="less">
@import url('./sort.less');
</style>
