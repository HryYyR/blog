<template>
  <div>
    <blogheaderVue :bgColor="true" @changePage="changePage" />
    <div class="about flex-jcc-aic" :style="{
        backgroundColor: store.state.themeColor.color
      }">


      <div class="about_container" ref="about_container">
        <div class="dialogList" ref="dialogList">
          <div class="dialog_item" :style="{
              marginLeft: item.isResponse ? 'auto' : '0',
              backgroundColor: item.isResponse ? store.state.themeColor.color : 'var(--BW)',
            }" v-for="(item, index) in data.DialogList" :key="index">
            {{ item.text }}
          </div>
        </div>
        <div class="SectionList" v-show="data.SectionListShow">
          <div class="SectionLis_item" v-for="(item, index) in data.SectionList" :key="item.id" v-show="item.show"
            @click="useSection(item)">
            {{ item.text }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { isString } from "lodash";
import blogheaderVue from "../../../components/blog-header/blogheader.vue";
import { reactive, onMounted, ref, watch } from 'vue'
import { useStore } from "vuex";
import anime from "animejs";

let store = useStore();

const dialogList: any = ref("")
const about_container:any = ref("")

const data = reactive({

  SectionList: [
    {
      id: 1,
      type: "blog",
      text: '为什么写博客?',
      show: true
    },
    {
      id: 2,
      text: '你有什么其他的爱好吗?',
      type: "like",
      show: true
    },
    {
      id: 3,
      text: '这个博客用了哪些技术栈呢?',
      type: "stack",
      show: true
    },
    {
      id: 4,
      text: '有什么想对我说的?',
      type: "talk",
      show: true
    },
    {
      id: 5,
      text: '不聊了,再见!',
      type: "exit",
      show: false
    },
  ],
  SectionListShow: false,
  DialogList: <any>[],
  aboutInfo: <any>{
    start: ["Hello, world🚀", "欢迎您的到来.", "你想了解什么呢😊", true],
    blog: [
      "这个博客是2022年7月5日开始搭建的",
      "目的是为了毕业而做的毕业设计😁",
      "但其实更多的对自己学的技术做总结",
      "当然",
      "如果能交到更多的朋友那就更好了🙌", true],
    like: ["音乐还算是我最大的兴趣,它能给我很多力量.", "emmm....", "如果可以的话", "想拥有一只猫和一条狗🐶", "emmmm.....", "还有", "我游戏贼6😎", true],
    stack: ["前端用 Vue3.2+Element-Plus 写的", "后端是Node.js + koa2", "服务器是Nginx", "数据库是Mysql", "云服务是阿里的", "大概就这些🎈", true],
    talk: ["祝你", "前程似锦", "逢考必过", "工作顺利", "一帆风顺", "前程无忧", "早生贵子", "好了,没词了😆", true],
    exit: ["再见🖐"]
  },


})
onMounted( () => {
  anime({
    targets: [".about_container"],
    translateY: "-10vh",
    opacity: 1,
    duration: 1000,
  });
  main()
})

const main = () => {
  outputDialog(data.aboutInfo.start)
}

const outputDialog = (info: any) => {
  for (let i = 0; i < info.length; i++) {
    setTimeout(function () {
      dialogList.value.scrollTop = 10000
      isString(info[i]) ? data.DialogList.push({ text: info[i]}) : changeSectionListShow()
    }, i * 800)

  }
}
type i ={
      id: number,
      text: string,
      type: string,
      show: boolean
    }
// 选项被点击
const useSection = (item: i) => {
  data.DialogList.push({ text: item.text, isResponse: true })
  data.SectionList[4].show = true
  changeSectionListShow()
  setTimeout(() => {
    item.show = false
    let type = data.aboutInfo[item.type]
    outputDialog(type)
    if (item.type == "exit") {
      data.SectionListShow = false
      dialogList.value.style.height = "400px"
      return
    }
  }, 1500)
}

const changeSectionListShow = () => {
  data.SectionListShow = !data.SectionListShow
  dialogList.value.scrollTop = 10000

}
const changePage = () => {
  anime({
    targets: [".about_container"],
    opacity: 0,
    duration: 1000,
  });
}

</script>

<style scoped lang="less">
@import "./index.less";
</style>