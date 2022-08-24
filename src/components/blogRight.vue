<template>
  <div class="blogRight" :style="{ opacity: data.isShow ? '1' : 0 }">
    <el-affix :offset="100">
      <div class="blogRight_about">
        <div class="blogRight_about_item">
          <p class="address blogRight_name">Hyyyh</p>
          <p class="address">
            <span>2020-2023级</span>
          </p>
          <p class="address">
            <img src="http://hyyyh.top:3001/icon/address.png" alt="" /><span
              >Sichuan-Luzhou</span
            >
          </p>
          <p class="address">
            <img src="http://hyyyh.top:3001/icon/email.png" alt="" /><span
              >2452719312@QQ.com</span
            >
          </p>
        </div>
        <div class="contact">
          <hr />
          <span>社交帐号</span>
          <hr />
        </div>
        <div class="meta">
          <el-tooltip
            effect="dark"
            :content="item.info"
            v-for="(item, index) in data.mateData"
            :key="index"
            placement="top"
          >
            <img :src="item.img" :alt="item.info" ref="metaImgUrl" />
          </el-tooltip>
        </div>
      </div>
      <div class="blogRight_label">
        <blogoption
          option="标签"
          optionSrc="http://hyyyh.top:3001/icon/lable.png"
          DefaultMargin="1rem"
        />
        <div class="blogRight_label_container">
          <div class="lable_item" v-for="(item, index) in data.labelData" :key="index">
            <div class="lable_name">{{ item.name }}</div>
            <div class="lable_num">{{ item.num }}</div>
          </div>
        </div>
      </div>
      <div class="blogRight_sort">
        <blogoption
          option="分类"
          optionSrc="http://hyyyh.top:3001/icon/sort.png"
          DefaultMargin="1rem"
        />
        <div class="blogRight_sort_container">
          <div class="sort_item" v-for="(item, index) in data.sortData" :key="index">
            <div class="sort_name">{{ item.name }}</div>
            <div class="sort_num">{{ item.num }}</div>
          </div>
        </div>
      </div>
    </el-affix>
  </div>
</template>

<script setup lang="ts">
import blogoption from "./blogoption.vue";
import { reactive, onMounted, ref } from "vue";
import { getAdminLabelData, getAdminSortData } from "../axios/adminApi";
import anime from "animejs";
const data = reactive({
  labelData: <any>[],
  sortData: <any>[],
  isShow: false,
  mateData: [
    {
      info: "2452719312",
      img: "http://hyyyh.top:3001/icon/QQ.png",
    },
    { info: "17721972680", img: "http://hyyyh.top:3001/icon/wechat.png" },
    { info: "https://github.com/HryYyR", img: "http://hyyyh.top:3001/icon/github.png" },
  ],
});
onMounted(async () => {
  const label = await getAdminLabelData();
  data.labelData = label.data;
  const sort = await getAdminSortData();
  data.sortData = sort.data;

  data.isShow = true;
});
</script>

<style scoped lang="less">
.blogRight {
  margin: 0 3rem;
  padding: 0 0 1rem 0;
  min-height: 20rem;
  width: 22%;
  display: flex;
  flex-direction: column;
  transition: 1s;
  opacity: 0;
  z-index: 2;

  .blogRight_about {
    width: 98%;
    height: auto;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    &:hover {
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
      transform: translate3d(-10px, 10px, 0);
    }
    .contact {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.5rem;
      hr {
        width: 80px;
        height: 3px;
        background-color: rgba(135, 206, 235, 0.5);
        border: none;
      }
      span {
        padding: 0 0.1rem;
      }
    }
    .meta {
      padding: 0.5rem 0;
      img {
        padding: 0 1rem;
      }
    }

    .blogRight_about_item {
      width: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
      .address {
        font-family: "kaiti";
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
    width: 98%;
    height: auto;
    min-height: 15rem;
    background: rgba(255, 255, 255, 0.5);
    margin: 2rem 0;
    padding-top: 0.1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    &:hover {
      box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
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
        border-radius: 3px;
        background-color: white;
        color: rgba(0, 0, 0, 0.6);
        transition: all 0.2s;

        & > div {
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
          border-left: 2px solid rgba(0, 0, 0, 0.2);
          padding: 0 0.3rem;
          font-family: kaiti;
        }
      }
    }
  }

  .blogRight_sort {
    width: 98%;
    height: auto;
    padding-bottom: 0.5rem;
    background: rgba(255, 255, 255, 0.5);
    padding-top: 0.1rem;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    &:hover {
      box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
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
      color: rgba(0, 0, 0, 0.6);
      box-shadow: 1px 1px 5px 0px skyblue;

      .sort_item {
        height: 2rem;
        border-bottom: 2px dashed skyblue;
        display: flex;
        align-items: center;
        background-color: white;
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
          font-family: "kaiti";
        }

        &:last-child {
          border: none;
        }
      }
    }
  }
}
</style>
