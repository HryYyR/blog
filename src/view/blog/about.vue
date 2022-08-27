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
        <div
          class="toaboutdetail_item"
          :style="{ backgroundColor: item.backgroundcolor }"
        ></div>
        <p :style="{ color: item.textcolor }">{{ item.text }}</p>
      </div>
      <div
        class="aboutmedialog aboutdialog"
        :style="{
          opacity: data.aboutdetaildata[0].isopen ? '1' : '0',
          marginLeft: data.aboutdetaildata[0].isopen ? '4rem' : '0',
        }"
      >
        <ul style="list-style: auto">
          <li>Hi there, I'm HuangRui</li>
          <li>平常会写点代码，提升自己的技能,并不是生活的全部,为了生存罢了.</li>
          <li>不太会说话,得罪了请见谅.</li>
          <li>音乐还算我最爱的兴趣,它能给我很多力量.</li>
          <li>什么游戏类型都有接触,平时也爱玩游戏,不过随时可以抛弃.</li>
          <li>想拥有一只猫和一条狗.</li>
        </ul>
        <div class="">
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
          marginLeft: data.aboutdetaildata[1].isopen ? '67rem' : '77rem',
        }"
      >
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
          marginTop: data.aboutdetaildata[2].isopen ? '41rem' : '31rem',
        }"
      >
        <ol>
          <li>client: Vue3 +Ts+ Element-plus.</li>
          <li>admin: Vue3 +Ts + Element-plus.</li>
          <li>server: koa +Mysql.</li>
          <li>服务器由阿里云提供支持.</li>
          <li>本站前后端均为个人书写，个人水平有限，不入法眼还请轻喷.</li>
        </ol>
      </div>
      <div
        class="aboutspecialnotedialog aboutdialog"
        :style="{
          opacity: data.aboutdetaildata[3].isopen ? '1' : '0',
          marginLeft: data.aboutdetaildata[3].isopen ? '95rem' : '75rem',
        }"
      >
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
      <div class="about_tip">
        提示 : 目前只兼容15.6寸笔记本电脑,其余分辨率会出现不同的显示错误
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { log } from "console";
import { onMounted, ref, reactive } from "vue";
import blogheaderVue from "../../components/blogheader.vue";
import axios from "axios";

const data = reactive({
  loadbgspeed: "", //进度条
  isshowcover: false, //隐藏cover
  isdisplaycover: false, //显示cover
  isshowtitle: true, //是否展示标题
  isshowbtn: false,
  percentagedata: [
    { percentage: 95, customColor: "green", progresstext: () => "HTML" },
    { percentage: 85, customColor: "grren", progresstext: () => "CSS" },
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
  const about_container = document.querySelector(".about_container");
  const bodywidth = window.innerWidth;
  const bodyheight = window.innerHeight;
  const aboutbg = new Image(bodywidth, bodyheight);

  const bg = await getaboutbg();
  const objectURL = URL.createObjectURL(bg.data);
  aboutbg.src = objectURL;
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
  return axios.get("/bg/aboutbg.png", {
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
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100vh;
  width: 100vw;

  .about_container {
    width: 100%;
    height: 100%;
    transition: 1s;
    .aboutdialog {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.6);
      padding: 0.5rem 1.2rem;
      backdrop-filter: blur(5px);
      border-radius: 20px;
      overflow: hidden;
    }
    .aboutmedialog {
      width: 250px;
      height: 280px;
      margin-top: 22rem;
      font-size: 0.6rem;
      left: 0px;
      transition: 0.5s;
      opacity: 1;
      background-color: rgba(155, 100, 175, 0.4);
      li {
        line-height: 1.2rem;
        color: rgba(0, 0, 0, 0.6);
      }
      .progress {
        height: 20px;
      }
    }
    .aboutblogdialog {
      width: 350px;
      height: 200px;
      margin-left: 67rem;
      margin-top: 26rem;
      font-size: 0.6rem;
      left: 0px;
      transition: 0.5s;
      opacity: 1;
      background-color: rgba(251, 199, 177, 0.4);
      li {
        line-height: 1.5rem;
        color: rgba(0, 0, 0, 0.6);
      }
    }
    .aboutskilldialog {
      width: 200px;
      height: 250px;
      margin-left: 46rem;
      margin-top: 41rem;
      font-size: 0.6rem;
      transition: 0.5s;
      opacity: 1;
      background-color: rgba(105, 104, 121, 0.2);
      li {
        line-height: 1.5rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .aboutspecialnotedialog {
      width: 150px;
      height: 200px;
      font-size: 0.6rem;
      margin-top: 26rem;
      margin-left: 95rem;
      transition: 0.5s;
      opacity: 1;
      background-color: rgba(206, 107, 162, 0.3);

      li {
        line-height: 1.5rem;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .toaboutdetail {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    position: absolute;
    top: 30rem;
    left: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    cursor: pointer;
    user-select: none;
    transition: 2s;

    .toaboutdetail_item {
      width: 100%;
      height: 100%;
      background-color: rgba(245, 234, 203, 0.7);
      border-radius: 50%;
      z-index: 99;
    }
    &::after {
      content: "";
      position: absolute;
      width: 3rem;
      height: 3rem;
      left: 0rem;
      top: 0rem;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      animation: toaboutdetail1 1s infinite linear;
    }
    &::before {
      content: "";
      position: absolute;
      width: 3rem;
      height: 3rem;
      left: 0rem;
      top: 0rem;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      animation: toaboutdetail1 2s infinite 1s linear;
    }
    p {
      position: absolute;
      top: 3rem;
      width: 5rem;
      left: 3rem;
      font-weight: 900;
    }
  }
  @keyframes toaboutdetail1 {
    from {
      width: 3rem;
      height: 3rem;
    }
    to {
      left: -2.5rem;
      top: -2.5rem;
      width: 8rem;
      height: 8rem;
      opacity: 0;
    }
  }
  .cover {
    background-image: linear-gradient(135deg, rgb(36, 26, 79), rgb(115, 83, 154));
    z-index: 4;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 3s;
    user-select: none;
    .loadingtext {
      position: relative;
      top: 3rem;
      left: 7rem;
      color: white;
      font-size: 0.9rem;
      @keyframes loadingtext {
        0% {
          top: 0rem;
        }
        50% {
          top: -1rem;
        }
        100% {
          top: 0rem;
        }
      }
      @keyframes loadingtextd {
        0% {
          top: 0rem;
        }
        50% {
          top: -0.4rem;
        }
        100% {
          top: 0rem;
        }
      }
      span {
        transition: 2s all;
        display: inline-block;
        position: relative;
      }
      span:nth-child(1) {
        animation: loadingtext 2s ease-in-out;
      }
      span:nth-child(2) {
        animation: loadingtext 2s 1 1s ease-in-out;
      }
      span:nth-child(3) {
        animation: loadingtext 2s 1 2s ease-in-out;
      }
      span:nth-child(4) {
        animation: loadingtext 2s 1 3s ease-in-out;
      }
      span:nth-child(5) {
        animation: loadingtext 2s 1 4s ease-in-out;
      }
      span:nth-child(6) {
        animation: loadingtextd 1s 1 5s;
      }
      span:nth-child(7) {
        animation: loadingtextd 1s 1 6s;
      }
      span:nth-child(8) {
        animation: loadingtextd 1s 1 7s;
      }
    }

    .speed {
      position: fixed;
      width: 20rem;
      height: 2.5rem;
      border-radius: 50px;
      border: 3px solid rgba(0, 0, 0, 0.6);
      overflow: hidden;
      color: rgba(255, 255, 255, 0.85);
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      p {
        position: absolute;
        margin-left: 1rem;
      }

      .speed_item {
        width: 0%;
        height: 100%;
        border-radius: 0px;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
      }
    }
    .about_tip {
      position: absolute;
      bottom: 2rem;
      color: white;
    }
  }
}
.me {
  transform-origin: 0rem 55%;
  transform: scale(3);
}
.blog {
  transform-origin: 66.5% 61%;
  transform: scale(3);
}
.skill {
  transform-origin: 42% 100%;
  transform: scale(3);
}
.specialnote {
  transform-origin: 100% 60%;
  transform: scale(3);
}
</style>
