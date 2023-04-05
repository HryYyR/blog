<template>
  <div
    class="container"
    :style="{
      backgroundImage: `linear-gradient(${store.state.themeColor.start},${store.state.themeColor.end})`,
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
              :class="item.check ? 'check' : ''"
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
              :class="item.check ? 'check' : ''"
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

  const blogres = await getBlogData(0, 0);
  // console.log(blogres);

  if (blogres.status != 200) {
    return ElMessage.error("信息获取失败！");
  }
  blogres.data.map((item: any) => {
    item.container = item.container.replace(/<.*?>/gi, "");
    return item;
  });
  data.blogData = blogres.data;
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
    position: relative;
    top: 5rem;

    .sort_nav {
      width: 100%;
      height: auto;
      border-radius: 10px;
      transition: 0.3s background-color;
      display: flex;
      flex-direction: column;
      background-color: var(--BW-5);
      & span {
        color: var(--WB);
        margin: 0.1rem 0.3rem;
      }
      .sort_nav_label,
      .sort_nav_sorter {
        display: flex;
        flex-wrap: wrap;
        margin: 1rem 1rem;
        align-items: center;
        & > div {
          display: flex;
          flex-wrap: wrap;
          & > div {
            cursor: pointer;
            user-select: none;
            width: auto;
            height: auto;
            color: var(--WB);
            border: 2px solid var(--BW);
            border-radius: 8px;
            background-color: var(--BW);
            padding: 0.2rem 0.5rem;
            margin: 0.1rem 0.3rem;
            transition: 0.3s background-color,border-color;
            &:hover {
              background-color: var(--WB-1);
              border: 2px dashed var(--BW);
            }
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
      transition: 0.3s background-color;
      .nomore {
        width: 100%;
        height: 40vh;
        text-align: center;
        font-size: 1.4rem;
        color: var(--WB);
      }
    }
  }
}
.check {
  border: 2px dashed rgb(255, 255, 255) !important;
  background-color: rgb(153, 210, 248) !important;
  color: white !important;
}
.loading {
  margin-top: 100px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  user-select: none;
  animation: loading 1s infinite linear;
  opacity: 0.1;
  img {
    width: 100%;
    height: 100%;
  }
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
