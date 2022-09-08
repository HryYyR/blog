<template>
  <div class="blogDetailContainer">
    <blogheaderVue :bgColor="true"></blogheaderVue>
    <div class="blogDetailbody" :style="{ opacity: data.isdisplay ? '1' : '0' }">
      <div class="edit">
        <div @click="tolaud()">
          <el-badge :value="data.LaudNum" class="item">
            <img
              :src="
                data.isLaud
                  ? 'http://hyyyh.top:3001/icon/laud_0.png'
                  : 'http://hyyyh.top:3001/icon/laud.png'
              "
            />
          </el-badge>
        </div>
        <div @click="toComment">
          <el-badge :value="data.blogData.commentnum" class="item">
            <img src="http://hyyyh.top:3001/icon/comment.png" alt="" />
          </el-badge>
        </div>
      </div>
      <div class="content">
        <div class="content_container">
          <h1 class="title">{{ data.blogData.name }}</h1>
          <h4 class="time">创建时间：{{ data.blogData.createtime }}</h4>
          <div class="cover"><img :src="data.blogData.img" alt="" /></div>
          <div v-html="data.blogData.container" class="blogdetailContainerHtml"></div>
        </div>
        <div class="comment">
          <div class="myComment">
            <h2>评论</h2>
            <el-input
              v-model="data.commentInput"
              placeholder="请输入你的评论"
              type="textarea"
              height="100px"
            ></el-input>
            <div class="sendComment">
              <el-button type="primary" @click="sendComment">发表评论</el-button>
            </div>
          </div>
          <div class="allComment">
            <h2>全部评论</h2>
            <p class="nomorecomment" v-if="data.commentData.length == 0 ? true : false">
              暂无评论
            </p>
            <div>
              <div
                class="allComment_item"
                v-for="(item, index) in data.commentData"
                :key="index"
              >
                <div class="allComment_item_left">
                  <div>
                    <img src="../../assets/1.jpg" alt="" />
                  </div>
                </div>
                <div class="allComment_item_right">
                  <div class="allComment_item_name">
                    <span>{{ item.blogusername }}</span
                    ><span>{{ item.createtime }}</span>
                  </div>
                  <div class="allComment_item_container">{{ item.container }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <blogRightVue style="margin-top: 1rem"></blogRightVue>

      <el-dialog
        v-model="data.isToLoginVisible"
        title="登陆提示"
        width="20%"
        top="20rem"
        :show-close="false"
        :lock-scroll="false"
      >
        <span>{{ data.toLoginDialogText }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="data.isToLoginVisible = false">取消</el-button>
            <el-button type="success" @click="tologin">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import blogheaderVue from "../../components/blogheader.vue";
import router from "../../router/index";
import blogRightVue from "../../components/blogRight.vue";
import anime from "animejs";
import {
  getAssignBlogData,
  publishComment,
  getAssignComment,
  verifyToken,
  laud,
  getLaudNum,
  hasBeenLaud,
} from "../../axios/apis";
import { ElMessage } from "element-plus";

const data = reactive({
  blogData: <any>[],
  isLaud: false,
  commentInput: "",
  commentData: <any>[],
  isToLoginVisible: false,
  toLoginDialogText: "",
  LaudNum: 0,
  userid: parseInt(localStorage.getItem("id")!),
  isdisplay: false,
});

onMounted(async () => {
  const id = parseInt(<string>router.currentRoute.value.params.id);
  const blogRes = await getAssignBlogData(id); //获取博客数据
  const commentRes = await getAssignComment(id); //获取评论数据

  if (blogRes.status != 200 || commentRes.status == 201) {
    ElMessage.error(blogRes.data.msg);
    return ElMessage.error(commentRes.data.msg);
  }
  data.blogData = blogRes.data.data[0];
  data.commentData = commentRes.data.data;

  // 获取点赞数
  const LaudNumRes = await getLaudNum(data.blogData.id);
  // console.log(LaudNumRes.data);

  if (LaudNumRes.status == 200) {
    data.LaudNum = LaudNumRes.data.length;
  }

  const hasBeenLaudRes = await hasBeenLaud(data.blogData.id, data.userid);
  if (hasBeenLaudRes.data.is) {
  } else {
    data.isLaud = !data.isLaud;
  }

  data.isdisplay = true;
  let myAnimation = anime({
    targets: [".blogDetailbody"],
    left: "0rem",
    duration: 1000,
  });
});

const tolaud = async () => {
  if (await islogin()) {
    const blogid = data.blogData.id;
    const hasBeenLaudRes = await hasBeenLaud(blogid, data.userid);
    if (!hasBeenLaudRes.data.is) {
      ElMessage.error("你已经点过赞了！");
      return;
    }

    const laudRes = await laud(blogid, data.userid);
    if (laudRes.data.status == 201) {
      ElMessage.error(laudRes.data.msg);
      return;
    }
    ElMessage.success(laudRes.data.msg);
    data.LaudNum++;
    data.isLaud = !data.isLaud;
    return;
  } else {
    data.toLoginDialogText = "你当前尚未登录无法点赞，是否前往登录页面？";
    data.isToLoginVisible = true;
    return;
  }
};

const tologin = () => {
  data.isToLoginVisible = false;
  router.push({ path: "/login" });
};

// 滚动到评论区
const toComment = () => {
  const target = document.querySelector(".comment")!;
  target.scrollIntoView({
    behavior: "smooth",
  });
};
// 发送请求发表评论
const sendComment = async () => {
  if (!data.blogData || !data.commentInput) {
    return ElMessage.error("内容不能为空！");
  }
  if (await islogin()) {
    const res = await publishComment(
      data.blogData.createuserid,
      data.blogData.id,
      data.commentInput,
      data.blogData.createusername,
      data.blogData.name
    );
    data.commentInput = "";
    if (res.status == 200) {
      ElMessage.success(res.data.msg);
      data.commentData = res.data.data;
      data.blogData.commentnum++;
      return;
    }
    ElMessage.error(res.data.msg);
  } else {
    data.toLoginDialogText = "你当前尚未登录无法评论，是否前往登录页面？";
    data.isToLoginVisible = true;
    return;
  }
};

const islogin = async () => {
  if (
    localStorage.getItem("id") ||
    localStorage.getItem("token") ||
    localStorage.getItem("name")
  ) {
    const res = await verifyToken();
    if (res.data.status == 201) {
      return false;
    }

    return true;
  } else {
    return false;
  }
};
</script>

<style scoped lang="less">
.blogDetailContainer {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.8);
  padding-bottom: 5rem;
  background-color: rgba(128, 128, 128, 0.1);
  overflow: hidden;
  .blogDetailbody {
    position: relative;
    left: -10rem;
    width: 90%;
    display: flex;
    justify-content: center;
    margin-top: 5rem;
    .content {
      width: 55%;
      height: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .content_container {
        padding: 1rem;
        background-color: white;

        .title {
          margin: 0 0 2rem 0;
          color: black;
        }
        .time {
          color: rgba(0, 0, 0, 0.2);
          margin-bottom: 2rem;
        }
        .cover {
          width: 80%;
          margin-bottom: 1rem;
          img {
            width: 100%;
          }
        }
        .blogdetailContainerHtml {
          overflow: hidden;
        }
      }
      .comment {
        height: auto;
        background-color: white;
        width: 97%;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        .myComment {
          margin-bottom: 1rem;
          & h2 {
            margin-bottom: 2rem;
          }
          & .sendComment {
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            margin-top: 1rem;
            position: relative;
          }
        }
        .allComment {
          min-height: 100px;
          .nomorecomment {
            display: flex;
            justify-content: center;
            font-weight: 900;
            font-family: "heiti";
            color: rgba(0, 0, 0, 0.5);
          }
          .allComment_item {
            display: flex;
            margin: 2rem 0;
            padding: 1rem 1rem 1rem 0.5rem;
            background-color: rgba(157, 157, 157, 0.1);
            .allComment_item_left {
              width: 60px;
              height: auto;
              display: flex;
              justify-content: center;
              padding-top: 0.5rem;
              & div {
                width: 60px;
                height: 60px;
                border-radius: 50px;
                overflow: hidden;

                & img {
                  width: 60px;
                  height: 60px;

                  transform-origin: center;
                }
              }
            }
            .allComment_item_right {
              padding: 0.3rem 0 0 0.3rem;
              flex: 1;
              .allComment_item_name {
                padding-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                color: black;
              }
            }
          }
        }
      }
    }
    .edit {
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: fixed;
      left: 10rem;
      top: 17%;
      & > div {
        cursor: pointer;
        user-select: none;
        width: 3rem;
        height: 3rem;
        margin: 1rem 0.5rem;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        transition: 0.2s;

        &:hover {
          background-color: rgba(128, 128, 128, 0.1);
        }
      }
      & > div img {
        width: 80%;
        height: 80%;
      }
    }

    .info {
      width: 20%;
      background-color: white;
    }
  }
}
.item {
  margin-right: -7px;
}
</style>
