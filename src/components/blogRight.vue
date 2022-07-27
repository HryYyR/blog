<template>
  <div class="blogRight">
    <div class="blogRight_about">
      <div class="blogRight_about_item"></div>
      <div class="blogRight_about_Img"><img src="../assets/1.jpg    " alt="" /></div>
    </div>
    <div class="blogRight_label">
      <blogoption option="标签" optionSrc="./src/assets/lable.png" DefaultMargin="1rem" />
      <div class="blogRight_label_container">
        <div class="lable_item" v-for="(item, index) in data.labelData" :key="index">
          <div class="lable_name">{{ item.name }}</div>
          <div class="lable_num">{{ item.num }}</div>
        </div>
      </div>
    </div>
    <div class="blogRight_sort">
      <blogoption option="分类" optionSrc="./src/assets/sort.png" DefaultMargin="1rem" />
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
import blogoption from "./blogoption.vue";
import { reactive, onMounted } from "vue";
import { getAdminLabelData, getAdminSortData } from "../axios/adminApi";
const data = reactive({
  labelData: <any>[],
  sortData: <any>[],
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
  min-height: 20rem;
  width: 22%;
  overflow: hidden;

  .blogRight_about {
    width: 98%;
    height: 10rem;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

    .blogRight_about_item {
      position: relative;
      width: 100%;
      height: 5rem;
      background-color: skyblue;
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
    padding-bottom: 2rem;
    background: rgba(255, 255, 255, 0.5);
    padding-top: 0.1rem;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
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
