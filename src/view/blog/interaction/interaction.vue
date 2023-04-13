<template>
  <div class="interaction_container" :style="{
    backgroundImage: `linear-gradient(${store.state.themeColor.start},${store.state.themeColor.end})`,
  }">
    <blogheaderVue :bgColor="true" @changePage="changePage" />
    <div class="interaction_body">
      <div class="interaction_body_container" :style="{}">
        <h1 style="color: var(--WB)">{{ i18n.t("interaction.title") }}</h1>
        <div class="interaction__inputbody">
          <el-input v-model="data.textarea" :rows="2" type="textarea" :placeholder="i18n.t('interaction.textarea')"
            :autosize="{ minRows: 5, maxRows: 6 }" />
          <div class="interaction__btnbody">
            <span>{{ i18n.t("interaction.info") }}</span><el-button type="primary" class="submitbtn"
              @click="submitcomment">{{
                i18n.t("interaction.submitinfo")
              }}</el-button>
          </div>
        </div>
        <div class="interaction_comment flex-jcc-aic">
          <div class="interaction_comment_item" v-for="(item, index) in data.commentData" :index="item.id">
            <div class="interaction_comment_img">
              <img :src="item.avatar || 'http://hyyyh.top:3001/icon/github.png'" alt="" />
            </div>
            <div class="interaction_comment_container">
              <div class="interaction_comment_top">
                <span class="interaction_name">{{ item.username }}{{ item.userid === "1" ? "(博主)" : "" }}</span>
                <span class="interaction_time">{{ item.createtime }}</span>
                <span class="interaction_time">IP:{{ item.userip }}</span>
              </div>
              <div class="interaction_comment_mid" @click="openReplyInteractionDialog(item, index)">
                {{ item.container }}
              </div>
              <div class="interaction_comment_bottom">
                <div @click="laudinteraction(item)">
                  <img :src="
                    item.islaud
                      ? 'http://hyyyh.top:3001/icon/laud_0.png'
                      : 'http://hyyyh.top:3001/icon/laud.png'
                  " alt="" />{{ item.laudnum }}
                </div>
                <div class="reply">
                  <span @click="openReplyInteractionDialog(item, index)">回复</span>
                </div>
              </div>

              <div v-for="(childen, index) in item.childen" :key="index" class="replycontainer">
                <span><span style="color: rgb(135, 168, 235)">{{ childen.username }}{{ item.userid === "1" ? "(博主)" : ""
                }}</span>:{{ childen.container }}</span>
              </div>
              <div class="replydialog" v-if="item.isopenreply">
                <el-input class="replytextarea" type="textarea" v-model="data.replycontent"></el-input>
                <el-button class="replybtn" type="primary" @click="submitreply">评论</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <tologindialogVue :isshow="data.isshowtologindialog" @back="closedialog" />
  <div class="wave" :style="{ opacity: data.isshowwave, zIndex: 0 }"></div>
</template>

<script setup lang="ts">
import blogheaderVue from "../../../components/blog-header/blogheader.vue";
import blogRightVue from "../../../components/blog-right/blogRight.vue";
import Wave from "../../../func/wave/wave.es.min";
import { reactive, onMounted, watch, onBeforeUnmount } from "vue";
import anime from "animejs";
import { ElMessage } from "element-plus";
import debounce from "../../../func/debounce/debounce";
import scope from 'lodash/escape';
import {
  addinteraction,
  getallinteraction,
  luadinteraction,
  interactionhasBeenLaud,
  getassigninteractionlaud,
  getIpAndPath,
  AddIpBlackList
} from "../../../axios/apis";
import tologindialogVue from "../../../components/to-login-dialog/tologindialog.vue";
import { useStore } from "vuex";

// 国际化
import { useI18n } from "vue-i18n"; //要在js中使用国际化
let i18n = useI18n();

let store = useStore();
const data = reactive({
  textarea: "",
  commentData: <any>[],
  isshowtologindialog: false,
  isshowwave: 0,
  userid: localStorage.getItem("id"),
  username: localStorage.getItem("name"),
  userhasbeenlaudData: [],
  replycontent: "",
  newopenreplydialogIndex: -1,
  // themeColor: store.state.themeColor,
  containerOpacity: 1,
});
// watch(store.state, (newvalue, oldvalue) => {
//   data.themeColor = newvalue.themeColor;
// });

onMounted(async () => {
  let myAnimation = anime({
    targets: [".interaction_body_container"],
    translateY: "-10vh",
    opacity: 1,
    duration: 1000,
  });

  const wave = new Wave(".wave", {
    number: 5,
    smooth: 90,
    velocity: 0.3,
    height: 100,
    colors: ["#3498db", "#9b59b6", "#2980b9", "#8e44ad", "#74b9ff"],
    opacity: 0.2,
    position: "bottom",
    border: {
      show: false,
      width: 2,
      color: [],
    },
  });
  wave.animate();
  data.isshowwave = 1;

  data.commentData = await (await getallinteraction()).data.data;
  // console.log(data.commentData);

  data.commentData.map((item: any) => {
    item.isopenreply = false;
  });

  if (data.userid) {
    getAsiignUserLaud();
  }
});

const changePage = () => {
  anime({
    targets: [".interaction_body_container"],
    opacity: 0,
    duration: 1000,
  });
};

// 提交留言
const submitcomment = async () => {
  if (!data.userid || !data.username) {
    // ElMessage.error("未登录");
    // return
  }
  if (data.textarea == "" || data.textarea.length < 5) {
    return ElMessage.error("您输入的字数不够哦！");
  }

  let { ip }: any = await getIpAndPath();  //获取ip

  console.log(ip);

  if (ip && data.textarea.includes("<script>") || data.textarea.includes("and")) {
    AddIpBlackList({ ip: ip || "null", type: "xss攻击" })
    return ElMessage.error("为什么不听话?")
  }
  const resolve = await addinteraction(
    data.userid || "-1",
    data.username || "游客",
    scope(data.textarea),
    data.userid ? "1" : "-1",
    0,
    -1,
    ip
  );

  if (resolve.status == 200) {
    data.commentData = await (await getallinteraction()).data.data;
    getAsiignUserLaud();
    ElMessage.success("留言成功！");
    data.textarea = "";
  } else {
    ElMessage.error("留言失败！");
  }
};

// 点赞留言
const laudinteraction = async (interaction: any) => {
  if (!data.userid) {
    return (data.isshowtologindialog = true);
  } else {
    const islaudres = await interactionhasBeenLaud(interaction.id, parseInt(data.userid));
    // console.log(islaudres);

    if (islaudres.status == 201) {
      // console.log(islaudres);

      ElMessage.error("你已经点赞过了！");
      return;
    }
    const resolve = await luadinteraction(interaction.id, parseInt(data.userid));
    if (resolve.status == 200) {
      ElMessage.success(resolve.data.msg);
      interaction.laudnum++;
      interaction.islaud = true;
    }
    // console.log(resolve);
  }
};

// 打开留言对话框
const openReplyInteractionDialog = (item: any, index: number) => {
  if (index == data.newopenreplydialogIndex) {
    data.newopenreplydialogIndex = -1;
    item.isopenreply = false;
    return;
  }
  if (data.newopenreplydialogIndex != -1) {
    data.commentData[data.newopenreplydialogIndex].isopenreply = false;
  }
  item.isopenreply = true;
  data.newopenreplydialogIndex = index;
};

// 提交回复
const submitreply = async () => {
  if (!data.userid || !data.username) {
    return ElMessage.error("未登录");
  }
  if (data.replycontent == "") {
    return ElMessage.error("内容不能为空！");
  }

  let { ip }: any = await getIpAndPath();

  const resolve = await addinteraction(
    data.userid,
    data.username,
    data.replycontent,
    "1",
    1,
    data.commentData[data.newopenreplydialogIndex].id,
    ip
  );
  if (resolve.status == 201) {
    ElMessage.error("评论失败！！");
    return;
  }
  data.commentData = await (await getallinteraction()).data.data;
  data.commentData[data.newopenreplydialogIndex].isopenreply = false;
  data.newopenreplydialogIndex = -1;
  data.replycontent = "";

  ElMessage.success("评论成功！");
};

const judge = (data: any) => {
  data.map((item: any) => {
    if (data.userhasbeenlaudData.includes(<never>item.id)) {
      item.islaud = true;
    } else {
      item.islaud = false;
    }
  });
};

const closedialog = () => {
  data.isshowtologindialog = false;
};

// 获取当前登录用户点赞信息
const getAsiignUserLaud = async () => {
  const res = await getassigninteractionlaud(parseInt(data.userid || "-1"));
  data.userhasbeenlaudData = res.data.data.map((item: any) => {
    return item.interactionid;
  });
  data.commentData.forEach((item: any) => {
    if (data.userhasbeenlaudData.includes(<never>item.id)) {
      item.islaud = true;
    } else {
      item.islaud = false;
    }
  });
};
</script>

<style scoped lang="less">
.interaction_container {
  display: flex;
  justify-content: center;

  .interaction_body {
    display: flex;
    justify-content: center;
    width: 100vw;

    .interaction_body_container {
      z-index: 1;
      width: 50vw;
      box-shadow: 0px 15px 0px -5px var(--BW-8);
      background-color: var(--BW-5);
      border-radius: 15px;
      min-height: 100vh;
      margin: 7rem 0;
      position: relative;
      opacity: 0;
      top: 10vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 1rem 5rem 1rem;
      transition: 0.3s background-color;

      h1 {
        margin-top: 4rem;
      }

      .interaction__inputbody {
        margin-top: 2rem;
        width: 90%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .interaction__btnbody {
          display: flex;
          width: 100%;
          justify-content: space-between;

          & span {
            margin-left: 0.5rem;
            color: var(--WB-7);
          }

          .submitbtn {
            position: relative;
            top: 1rem;
            right: 0.5rem;
            background-color: skyblue;
            border-color: skyblue;

            &:hover {
              background-color: rgb(1, 177, 246);
              border-color: rgb(1, 177, 246);
            }
          }
        }
      }
    }

    .interaction_comment {
      position: relative;
      flex-direction: column;
      flex-wrap: wrap;
      height: auto;
      width: 100%;
      top: 3rem;
      padding: 2rem;

      .interaction_comment_item {
        margin: 0 0 2rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        height: auto;
        width: 100%;
        padding: 0.5rem 0;
        border-radius: 5px;
        background-color: rgba(157, 157, 157, 0.1);
        border: 1px dashed rgba(0, 0, 0, 0.2);
        color: var(--WB);
        transition: 0.5s;

        .interaction_comment_img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: relative;
          top: 1rem;
          overflow: hidden;
          margin-left: 2rem;

          & img {
            width: 100%;
            height: 100%;
          }
        }

        .interaction_comment_container {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding-left: 1rem;

          .interaction_comment_top {
            cursor: pointer;
            height: 30px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .interaction_name {
              color: rgb(135, 168, 235);
              font-weight: 900;
              margin-right: 0.5rem;
            }

            .interaction_time {
              color: var(--WB-3);
              font-size: 0.8rem;
              margin: 0 1rem 0 0;
            }
          }

          .interaction_comment_mid {
            padding: 0.5rem 1rem;
          }

          .interaction_comment_bottom {
            cursor: pointer;
            height: 30px;
            font-size: 0.7rem;
            display: flex;

            .reply {
              display: flex;
              justify-content: flex-end;
              padding-right: 20px;
              color: rgb(135, 168, 235);
            }

            & div {
              flex: 1;
              display: flex;
              align-items: center;

              & img {
                width: 1rem;
                margin-right: 3px;
              }
            }
          }

          .replydialog {
            display: flex;
            align-items: flex-end;

            .replybtn {
              margin: 0.5rem 1rem 0 1rem;
            }
          }

          .replycontainer {
            font-size: 0.8rem;
            margin: 0.5rem 0;
          }
        }
      }
    }
  }
}

.wave {
  position: fixed;
  width: 100%;
  height: 300px;
  bottom: 0;
  z-index: -99;
  bottom: -4px;
  transition: 2s;
}
</style>
