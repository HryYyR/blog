<template>
  <div class="interaction_container">
    <blogheaderVue :bgColor="true" />
    <div class="interaction_body">
      <div class="interaction_body_container">
        <h1>留言板</h1>
        <div class="interaction__inputbody">
          <el-input
            v-model="data.textarea"
            :rows="2"
            type="textarea"
            placeholder="留下你的建议吧！"
            :autosize="{ minRows: 5, maxRows: 6 }"
          />
          <div class="interaction__btnbody">
            <span>(建议登陆后评论哦！)</span
            ><el-button type="primary" class="submitbtn" @click="submitcomment"
              >提交评论</el-button
            >
          </div>
        </div>
        <div class="interaction_comment">
          <div
            class="interaction_comment_item"
            v-for="(item, index) in data.commentData"
            :index="item.id"
          >
            <div class="interaction_comment_img">
              <img src="http://hyyyh.top/icon/github.png" alt="" />
            </div>
            <div class="interaction_comment_container">
              <div class="interaction_comment_top">
                <span class="interaction_name">{{ item.username }}</span>
                <span class="interaction_time">{{ item.createtime }}</span>
              </div>
              <div class="interaction_comment_mid">
                {{ item.container }}
              </div>
              <div class="interaction_comment_bottom">
                <div @click="laudinteraction(item)">
                  <img
                    :src="
                      item.islaud
                        ? 'http://hyyyh.top/icon/laud_0.png'
                        : 'http://hyyyh.top/icon/laud.png'
                    "
                    alt=""
                  />{{ item.laudnum }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <blogRightVue></blogRightVue>
    </div>
  </div>
  <tologindialogVue :isshow="data.isshowtologindialog" @back="closedialog" />
</template>

<script setup lang="ts">
import blogheaderVue from "../../components/blogheader.vue";
import blogRightVue from "../../components/blogRight.vue";
import { reactive, onMounted } from "vue";
import anime from "animejs";
import { ElMessage } from "element-plus";
import {
  addinteraction,
  getallinteraction,
  luadinteraction,
  interactionhasBeenLaud,
  getassigninteractionlaud,
} from "../../axios/apis";
import tologindialogVue from "../../components/tologindialog.vue";
import { log } from "console";
const data = reactive({
  textarea: "",
  commentData: <any>[],
  isshowtologindialog: false,
  userid: localStorage.getItem("id"),
  username: localStorage.getItem("name"),
  userhasbeenlaudData: [],
});
onMounted(async () => {
  let myAnimation = anime({
    targets: [".interaction_body_container"],
    translateY: "-50vh",
    opacity: 1,
    duration: 2000,
  });
  data.commentData = await (await getallinteraction()).data.data;

  if (data.userid) {
    const res = await getassigninteractionlaud(parseInt(data.userid));
    data.userhasbeenlaudData = res.data.data.map((item: any) => {
      return item.interactionid;
    });
    data.commentData.map((item: any) => {
      if (data.userhasbeenlaudData.includes(<never>item.id)) {
        item.islaud = true;
      } else {
        item.islaud = false;
      }
    });
    // console.log(data.userhasbeenlaudData);
  }
});

// 提交留言
const submitcomment = async () => {
  if (!data.userid || !data.username) {
    return ElMessage.error("未登录");
  }
  if (data.textarea == "" || data.textarea.length < 5) {
    return ElMessage.error("您输入的字数不够哦！");
  }

  const resolve = await addinteraction(data.userid, data.username, data.textarea, "1");
  if (resolve.status == 200) {
    data.commentData = resolve.data.data;
    data.commentData.map((item: any) => {
      if (data.userhasbeenlaudData.includes(<never>item.id)) {
        item.islaud = true;
      } else {
        item.islaud = false;
      }
    });
    ElMessage.success("留言成功！");
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
    console.log(islaudres);

    if (islaudres.status == 201) {
      ElMessage.error("你已经点赞过了！");
      return;
    }
    const resolve = await luadinteraction(interaction.id, parseInt(data.userid));
    if (resolve.status == 200) {
      ElMessage.success(resolve.data.msg);
      interaction.laudnum++;
      interaction.islaud = true;
    }
    console.log(resolve);
  }
};

const judge = (data: any) => {
  return data.map((item: any) => {
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
      width: 50vw;
      background-color: rgba(77, 134, 226, 0.1);
      min-height: 100vh;
      margin-top: 6rem;
      position: relative;
      opacity: 0;
      top: 50vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
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
            color: rgba(0, 0, 0, 0.2);
          }
          .submitbtn {
            position: relative;
            top: 1rem;
            right: 0.5rem;
            background-color: skyblue;
            border-color: skyblue;
            transition: 0.2s;
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
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      height: auto;
      width: 100%;
      background-color: white;
      top: 3rem;
      padding-top: 1rem;

      .interaction_comment_item {
        margin: 0 0 3rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: auto;
        width: 100%;
        padding: 1rem 0;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
        .interaction_comment_img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: relative;
          top: -1rem;
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
            .interaction_name {
              color: skyblue;
              font-weight: 900;
              margin-right: 0.5rem;
            }
            .interaction_time {
              color: rgba(0, 0, 0, 0.4);
              font-size: 0.8rem;
            }
          }
          .interaction_comment_mid {
            padding: 0.5rem 0 0.5rem 1rem;
          }
          .interaction_comment_bottom {
            cursor: pointer;
            height: 30px;
            font-size: 0.7rem;

            & div {
              display: flex;
              align-items: center;
              & img {
                width: 1rem;
                margin-right: 3px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
