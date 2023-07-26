<template>
  <div class="blogRight" :style="{ opacity: isshow ? '0' : '1' }">
    <div class="blogRight_about blogRigth_item">
      <div class="blogRight_about_item">
        <p class="address blogRight_name">Hyyyh</p>
        <p class="address">灵感枯竭</p>
      </div>
      <div class="contact">
  
        <hr />
        <span>INFO</span>
        <hr />
      </div>
      <div class="meta">
        <el-tooltip effect="dark" :content="item.info" v-for="(item, index) in data.mateData" :key="index"
          placement="top">
          <img :src="item.img" :alt="item.info" ref="metaImgUrl" />
        </el-tooltip>
      </div>
    </div>
    <div class="blogRight_label blogRigth_item">
      <blogoption :option="i18n.t('blogRight.label')" optionSrc="http://hyyyh.top:3001/icon/lable.png"
        DefaultMargin="1rem" />
      <div class="blogRight_label_container">
        <div class="lable_item" v-for="(item, index) in data.labelData" :key="index">
          <div class="lable_name">{{ item.name }}</div>
          <div class="lable_num">{{ item.num }}</div>
        </div>
      </div>
    </div>
    <div class="blogRight_sort blogRigth_item">
      <blogoption :option="i18n.t('blogRight.sort')" optionSrc="http://hyyyh.top:3001/icon/sort.png"
        DefaultMargin="1rem" />
      <div class="blogRight_sort_container">
        <div class="sort_item" v-for="(item, index) in data.sortData" :key="index">
          <div class="sort_name">{{ item.name }}</div>
          <div class="sort_num">{{ item.num }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import blogoption from "../blog-option/blogoption.vue";
import { reactive, onMounted,defineProps, ref } from "vue";
import { getAdminLabelData, getAdminSortData } from "../../axios/adminApi";
import anime from "animejs";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

let i18n = useI18n();

const props = defineProps({
  isshow: {
    type:Boolean,
    default:true
  }
})

// 国际化

const data = reactive({
  labelData: <any>[],
  sortData: <any>[],
  mateData: [
    {
      info: "2452719312",
      img: "http://hyyyh.top:3001/icon/QQ.png",
    },
    {
      info: "https://juejin.cn/user/462228666458615",
      img: "http://hyyyh.top:3001/icon/juejin.png",
    },
    { info: "https://github.com/HryYyR", img: "http://hyyyh.top:3001/icon/github.png" },
  ],
});
onMounted(async () => {
  const label = await getAdminLabelData();
  data.labelData = label.data;
  const sort = await getAdminSortData();
  data.sortData = sort.data;
});
</script>

<style scoped lang="less">
.blogRight {
  margin: 0 3rem;
  padding: 0 0 1rem 0;
  min-height: 20rem;
  width: 25%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  z-index: 2;
  transition: 0.3s opacity;

  .blogRigth_item {
    width: 100%;
    height: auto;
    display: flex;
    transition: 0.2s all;
    overflow: hidden;
    flex-direction: column;
    box-shadow: 2px 2px 10px var(--WB-3);
    border-radius: 10px;
    transition: 0.3s all;
  }

  .blogRight_about {
    background: var(--BW-5);
    color: var(--WB);
    align-items: center;
    transition: 0.3s all;

    &:hover {
      box-shadow: 10px 10px 20px var(--WB-3);
      transform: translate3d(-10px, 10px, 0);
    }

    .contact {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.5rem;

      hr {
        width: 80px;
        height: 2px;
        background-color: var(--WB-5);
        border: none;
      }

      span {
        padding: 0 0.1rem;
        color: var(--WB);
      }
    }

    .meta {
      padding: 0.5rem 0;
      display: flex;
      justify-content: center;

      img {
        padding: 0 1rem;
        width: 10%;
      }
    }

    .blogRight_about_item {
      width: 100%;
      background-color: var(--BW-7);
      // box-shadow: 0px 0px 20px 10px var(--BW-7);
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
      transition: 0.2s all;

      .address {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        padding: 0.6rem 0;

        img {
          height: 0.8rem;
        }
      }

      .blogRight_name {
        font-size: 1.3rem;
        font-weight: 900;
      }

    }

    .blogRight_about_Img {
      position: relative;
      width: 5rem;
      height: 5rem;
      border-radius: 100%;
      top: -2.5rem;
      overflow: hidden;

      img {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }

  .blogRight_label {
    min-height: 15rem;
    background: var(--BW-5);
    margin: 0.5rem 0;
    padding-top: 0.1rem;
    justify-content: center;

    &:hover {
      box-shadow: 10px 10px 15px var(--WB-3);
      transform: translate3d(-10px, 10px, 0);
    }

    .blogRight_label_container {
      flex: 1;
      margin: 0.5rem 1rem;
      border-radius: 5px;
      display: flex;
      align-content: flex-start;

      flex-wrap: wrap;

      .lable_item {
        width: auto;
        height: auto;
        min-height: 1.7rem;
        border: 2px solid rgba(38, 0, 255, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0.2rem;
        border-radius: 5px;
        background-color: var(--BW);
        color: var(--WB-8);
        transition: all 0.2s;

        &>div {
          cursor: pointer;
          user-select: none;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 900;
          font-size: 0.8rem;
        }

        &:hover {
          color: white !important;
          background-color: rgba(135, 206, 235, 0.7);
          border: 2px solid skyblue;
        }

        .lable_name {
          padding: 0 0.5rem;
        }

        .lable_num {
          border-left: 2px solid var(--WB-3);
          padding: 0 0.3rem;
        }
      }
    }
  }

  .blogRight_sort {
    padding-bottom: 1.4rem;
    background: var(--BW-5);
    padding-top: 0.1rem;

    &:hover {
      box-shadow: 10px 10px 15px var(--WB-3);
      transform: translate3d(-10px, 10px, 0);
    }

    .blogRight_sort_container {
      width: 90%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      border: 2px dashed skyblue;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 1px 1px 5px 0px skyblue;

      .sort_item {
        height: 2rem;
        border-bottom: 2px dashed skyblue;
        display: flex;
        align-items: center;
        background-color: var(--BW);
        color: var(--WB-8);
        font-weight: 900;
        transition: all 0.2s;
        cursor: pointer;
        user-select: none;

        &:hover {
          background-color: skyblue;
          color: white;

          .sort_num {
            border-left: 2px dashed white;
          }
        }

        .sort_name {
          width: 90%;
          padding-left: 1rem;
        }

        .sort_num {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 10%;
          height: 100%;
          border-left: 2px dashed skyblue;
        }

        &:last-child {
          border: none;
        }
      }
    }
  }
}



</style>
