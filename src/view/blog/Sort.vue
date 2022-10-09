<template>
  <div class="container">
    <blogheaderVue :bgColor="true"></blogheaderVue>
    <div class="sort_container">
      <div class="sort_nav" :style="{ opacity: data.isshownav ? 1 : 0 }">
        <div class="sort_nav_sorter">
          <span> 分类：</span>
          <div
            v-for="(item, index) in data.sortData"
            :key="item.id"
            @click="clickSort(item)"
            :class="item.check ? 'check' : ''"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="sort_nav_label">
          <span>标签：</span>
          <div
            v-for="(item, index) in data.labelData"
            :key="item.id"
            @click="clickLabel(item)"
            :class="item.check ? 'check' : ''"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="loading" v-if="!data.isloading"></div>
      <div class="sort_body" v-show="data.isshowcontainer">
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
import blogItemVue from "../../components/blogItem.vue";
import blogheaderVue from "../../components/blogheader.vue";
import { reactive, onMounted } from "vue";
import { getAdminLabelData, getAdminSortData } from "../../axios/adminApi";
import { getBlogData, getAssignSortLabelData } from "../../axios/apis";
import { ElMessage } from "element-plus";
import anime from "animejs";

const data = reactive({
  labelData: <any>[],
  sortData: <any>[],
  checklabel: <any>[],
  checkSort: 0,
  blogData: <any>[],
  isshownav: false,
  isshowcontainer: false,
  isloading: false,
});

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

  const blogres = await getBlogData(1, 5);
  if (blogres.status != 200) {
    return ElMessage.error("信息获取失败！");
  }
  blogres.data.map((item: any) => {
    item.container = item.container.replace(/<.*?>/gi, "");
    return item;
  });
  data.blogData = blogres.data;
  data.isshowcontainer = true;

  setTimeout(() => {
    data.isloading = true;
    let myAnimation = anime({
      targets: [".sort_body"],
      opacity: "1",
      duration: 3000,
    });
  }, 300);

  // console.log(data.labelData, data.sortData);
});

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
.container {
  /*  background-color: rgba(0, 0, 0, 0.1);  */
  background-image: linear-gradient(235deg, rgb(252, 246, 223), rgb(175, 165, 213));

  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .sort_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: auto;
    min-height: 90vh;
    padding-top: 7rem;

    .sort_nav {
      width: 100%;
      height: auto;
      background-color: rgba(0, 0, 0, 0.1);
      transition: 1s;
      & > div {
        display: flex;
        flex-wrap: wrap;
        margin: 1rem 1rem;
        justify-content: center;
        align-items: center;
        & > div {
          cursor: pointer;
          user-select: none;
          width: auto;
          height: auto;
          border: 2px solid rgba(38, 0, 255, 0.3);
          padding: 0.2rem 0.5rem;
          margin: 0.1rem 0.3rem;
          transition: 0.3s;
          &:hover {
            border: 2px dashed white;
          }
        }
      }
    }
    .sort_body {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: 1s;
      .nomore {
        width: 100%;
        height: 40vh;
        text-align: center;
        font-size: 1.4rem;
      }
    }
  }
}
.check {
  border: 2px dashed white !important;
  background-color: skyblue;
  color: white;
}
.loading {
  margin-top: 100px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  user-select: none;
  border-bottom: 1px solid skyblue;
  border-right: 1px solid skyblue;
  animation: loading 1s infinite linear;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
