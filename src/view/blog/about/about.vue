<template>
  <div class="about">
    <blogheaderVue :bgColor="data.isshowtitle"></blogheaderVue>
    <div class="about_container" ref="about_container">
      <div
        class="toaboutdetail"
        v-for="(item, index) in data.aboutdetaildata"
        :key="index"
        :style="{ left: item.left, top: item.top, opacity: data.isshowbtn ? '1' : '0' }"
        @click="toAboutDetailPage(item, index)"
      >
        <p
          :style="{ color: item.textcolor }"
          class="toaboutdetailtext_left"
          v-if="item.name == 'skill' || item.name == 'specialnote'"
        >
          {{ item.text }}
        </p>
        <div
          class="toaboutdetail_item"
          :style="{ backgroundColor: item.backgroundcolor }"
        ></div>
        <p
          :style="{ color: item.textcolor }"
          class="toaboutdetailtext_right"
          v-if="item.name == 'me' || item.name == 'blog'"
        >
          {{ item.text }}
        </p>
      </div>
      <div
        class="aboutmedialog aboutdialog"
        :style="{
          opacity: data.aboutdetaildata[0].isopen ? '1' : '0',
          marginLeft: data.aboutdetaildata[0].isopen ? '7vmin' : '0',
        }"
      >
        <p v-if="!data.ispc">{{ data.aboutdetaildata[0].text }}</p>

        <ul style="list-style: auto">
          <li>Hi there, I'm HuangRui</li>
          <li>平常会写点代码，提升自己,并不是生活的全部,为了生存罢了.</li>
          <li>不太会说话,得罪了请见谅.</li>
          <li>音乐还算我最爱的兴趣,它能给我很多力量.</li>
          <li>游戏什么的,都会一点，但不多.</li>
          <li>想拥有一只猫和一条狗.</li>
        </ul>
        <div class="" v-if="data.ispc">
          <p style="text-align: center; color: white">技能</p>
          <el-progress
            :percentage="item.percentage"
            :color="item.customColor"
            :format="item.progresstext"
            v-for="(item, index) in data.percentagedata"
            :key="index"
            indeterminate
            class="progress"
          />
        </div>
      </div>
      <div
        class="aboutblogdialog aboutdialog"
        :style="{
          opacity: data.aboutdetaildata[1].isopen ? '1' : '0',
          marginLeft: data.aboutdetaildata[1].isopen ? '56vw' : '60vw',
        }"
      >
        <p v-if="!data.ispc">{{ data.aboutdetaildata[1].text }}</p>
        <ol>
          <li>本网站于2022年7月5日开始搭建.</li>
          <li>目的是为了毕业而做的毕业设计,但不是唯一目的.</li>
          <li>
            希望此博客能为我不断积累技术,坚持总结，也希望通过此博客结识各方面的爱好者.
          </li>
          <li>当您看到此处时，我很开心又多了一位看过我博客的过客.</li>
          <li>也希望各位大佬，对本博客的完善提出建议，在此感谢.</li>
        </ol>
      </div>
      <div
        class="aboutskilldialog aboutdialog"
        :style="{
          opacity: data.aboutdetaildata[2].isopen ? '1' : '0',
          marginTop: data.aboutdetaildata[2].isopen ? '70vh' : '60vh',
        }"
      >
        <p v-if="!data.ispc">{{ data.aboutdetaildata[2].text }}</p>

        <ol>
          <li>client: Vue3 + Ts + Element-plus.</li>
          <li>admin: Vue3 + Ts + Element-plus.</li>
          <li>server: koa + Mysql + Nginx.</li>
          <li>服务器由阿里云提供支持.</li>
          <li>本站前后端均为个人书写，个人水平有限，不入法眼还请轻喷.</li>
        </ol>
      </div>
      <div
        class="aboutspecialnotedialog aboutdialog"
        :style="{
          opacity: data.aboutdetaildata[3].isopen ? '1' : '0',
          marginLeft: data.aboutdetaildata[3].isopen ? '72vw' : '65vw',
        }"
      >
        <p v-if="!data.ispc">{{ data.aboutdetaildata[3].text }}</p>

        <ol>
          <li>本站所有内容仅代表个人观点，和任何组织或个人无关</li>
          <li>本站内容仅供学习交流，请勿用于任何形式商业行为</li>
          <li>本站如无意中侵犯了某些组织或个人的知识产权，请速告之，我会及时处理</li>
        </ol>
      </div>
    </div>
    <div
      class="cover"
      :style="{
        opacity: data.isshowcover ? '0' : '1',
        display: data.isdisplaycover ? '0' : '1',
        zIndex: data.isdisplaycover ? -2 : 5,
      }"
    >
      <div class="speed">
        <div class="speed_item" :style="{ width: data.loadbgspeed }"></div>
        <p>{{ data.loadbgspeed }}</p>
      </div>
      <div class="loadingtext">
        <span>全</span>
        <span>力</span>
        <span>加</span>
        <span>载</span>
        <span>中</span>
        <span>。</span>
        <span>。</span>
        <span>。</span>
      </div>
      <div class="about_tip">提示 : 部分分辨率会出现显示错误！</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import blogheaderVue from "../../../components/blog-header/blogheader.vue";
import axios from "axios";
import { useStore } from "vuex";
const store = useStore();

const data = reactive({
  scrollwidth: window.innerWidth,
  scrollheigth: window.innerHeight,
  ispc: true,
  loadbgspeed: "", //进度条
  isshowcover: false, //隐藏cover
  isdisplaycover: false, //显示cover
  isshowtitle: true, //是否展示标题
  isshowbtn: false,
  objectURL: "", //图片url
  percentagedata: [
    { percentage: 95, customColor: "green", progresstext: () => "HTML" },
    { percentage: 85, customColor: "green", progresstext: () => "CSS" },
    { percentage: 80, customColor: "yeloow", progresstext: () => "JS" },
    { percentage: 70, customColor: "yeloow", progresstext: () => "VUE" },
    { percentage: 40, customColor: "red", progresstext: () => "NODE" },
  ],
  aboutdetaildata: [
    {
      name: "me",
      top: "52%",
      left: "21%",
      backgroundcolor: "rgba(145,89,170,0.8)",
      text: "关于博主",
      textcolor: "rgba(215,180,250, 0.7)",
      isopen: false,
    },
    {
      name: "blog",
      top: "54%",
      left: "47%",
      backgroundcolor: "rgba(249,238,206,0.8)",
      text: "关于博客",
      textcolor: "rgba(50,50,50, 0.6)",
      isopen: false,
    },
    {
      name: "skill",
      top: "88%",
      left: "55%",
      backgroundcolor: "rgba(75,118,186,0.8)",
      text: "技术栈",
      textcolor: "rgba(145,228,255, 1)",
      isopen: false,
    },
    {
      name: "specialnote",
      top: "53%",
      left: "92.5%",
      backgroundcolor: "rgba(37,34,93,0.8)",
      text: "特别说明",
      textcolor: "rgba(255,255,255, 0.6)",
      isopen: false,
    },
  ],
});

onMounted(async () => {
  data.ispc = store.state.ispc;
  const about_container = document.querySelector(".about_container");
  const bodyheight = window.innerHeight;

  const aboutbg = new Image(data.scrollwidth, data.scrollheigth); //创建图片
  const bg: any = await getaboutbg(); //获取图片信息

  // -------------------
  data.objectURL = URL.createObjectURL(bg.data); //创建url
  aboutbg.src = data.objectURL; //图片添加url
  aboutbg.classList.add("aboutbg");

  about_container?.appendChild(aboutbg);
});

const toAboutDetailPage = (item: any, index: number) => {
  const about_container = document.querySelector(".about_container");
  switch (index) {
    case 0:
      if (item.isopen) {
        about_container?.classList.remove("me");
      } else {
        about_container?.classList.add("me");
      }
      break;
    case 1:
      if (item.isopen) {
        about_container?.classList.remove("blog");
      } else {
        about_container?.classList.add("blog");
      }
      break;
    case 2:
      if (item.isopen) {
        about_container?.classList.remove("skill");
      } else {
        about_container?.classList.add("skill");
      }
      break;
    case 3:
      if (item.isopen) {
        about_container?.classList.remove("specialnote");
      } else {
        about_container?.classList.add("specialnote");
      }
      break;
  }
  if (item.isopen) {
    item.isopen = !item.isopen;
  } else {
    setTimeout(() => {
      item.isopen = !item.isopen;
    }, 500);
  }

  data.isshowtitle = !data.isshowtitle;
};

function getaboutbg() {
  axios.defaults.baseURL = "http://hyyyh.top:3001";
  // axios.defaults.baseURL = "http://localhost:3001";

  const bgurl = data.scrollwidth < 700 ? "/bg/peaboutbg.jpeg" : "/bg/aboutbg.png";

  return axios.get(bgurl, {
    responseType: "blob",
    onDownloadProgress: function (event) {
      // 下载进度监听
      let percentComplete = (event.loaded / event.total) * 100;
      data.loadbgspeed = Math.floor(percentComplete) + "%";
      if (percentComplete == 100) {
        setTimeout(() => {
          data.isshowcover = true;
        }, 1000);
        setTimeout(() => {
          data.isdisplaycover = true;
          data.isshowbtn = true;
        }, 3000);
      }
    },
  });
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>
