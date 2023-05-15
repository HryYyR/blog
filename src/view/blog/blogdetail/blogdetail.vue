<template>
  <div class="blogDetailContainer" :style="{
    backgroundColor: store.state.themeColor.color
  }">
    <blogheaderVue :bgColor="true"></blogheaderVue>
    <div class="blogDetailbody" :style="{ opacity: data.isdisplay ? '1' : '0' }">
      <div class="edit">
        <div @click="tolaud()">
          <el-badge :value="data.LaudNum" class="item">
            <img :src="data.isLaud
              ? 'http://hyyyh.top:3001/icon/laud_0.png'
              : 'http://hyyyh.top:3001/icon/laud.png'
              " />
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
            <el-input v-model="data.commentInput" placeholder="请输入你的评论" type="textarea" height="100px"></el-input>
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
              <div class="allComment_item" v-for="(item, index) in data.commentData" :key="index">
                <div class="allComment_item_left">
                  <div>
                    <img :src="item.avatar || 'http://hyyyh.top:3001/icon/github.png'" alt="" />
                  </div>
                </div>
                <div class="allComment_item_right">
                  <div class="allComment_item_name">
                    <span>{{ item.blogusername }}</span><span>{{ item.createtime }}</span>
                  </div>
                  <div class="allComment_item_container">{{ item.container }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <blogRightVue style="margin-top: 1rem"></blogRightVue> -->

      <el-dialog v-model="data.isToLoginVisible" title="登陆提示" :width="store.state.isPC ? '20%' : '90%'" top="20rem"
        :show-close="false" :lock-scroll="false">
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
import blogheaderVue from "../../../components/blog-header/blogheader.vue";
import router from "../../../router/index";
import blogRightVue from "../../../components/blog-right/blogRight.vue";
import anime from "animejs";
import {
  getAssignBlogData,
  publishComment,
  getAssignComment,
  verifyToken,
  laud,
  getLaudNum,
  hasBeenLaud,
} from "../../../axios/apis";
import { ElMessage } from "element-plus";
import { checkTEXT } from "../../../func/checkText/checkText";
import {useStore} from 'vuex'
let store = useStore()

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

  blogRes.data.data[0].container = blogRes.data.data[0].container.replaceAll(
    "<img",
    "<img style='max-width:600px' "
  );

  blogRes.data.data[0].container = blogRes.data.data[0].container.replaceAll(
    "<pre>",
    "<pre style='background-color:rgb(33,37,43);color:white;overflow-x:auto;padding:1rem;min-width:260px;border-radius:10px'>"
  );

  data.blogData = blogRes.data.data[0];
  // console.log(data.blogData);

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
  const { id, createusername, name } = data.blogData
  if (!data.blogData || !data.commentInput) {
    return ElMessage.error("内容不能为空！");
  }
  if (!await checkTEXT(data.commentInput)) {
    return
  }
  if (await islogin()) {
    const res = await publishComment(
      store.state.userid,
      id,
      data.commentInput,
      createusername,
      name
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
@import "./index.less";
</style>
