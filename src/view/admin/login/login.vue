<template>
  <div class="top loginpage_top">
    <div class="login_container">
      <div class="backindex" @click="toindex">
        <img src="http://hyyyh.top:3001/icon/back.png" alt="" />
      </div>
      <div class="loginTitle">
        <span style="color: black">{{ i18n.t("login.passlogin") }}</span>
      </div>

      <div class="input_box">
        <div class="name">
          <span>{{ i18n.t("login.user") }}:</span>
          <input type="text" :placeholder="i18n.t('login.user')" v-model="data.user" />
        </div>
        <div class="pass">
          <span>{{ i18n.t("login.pass") }}:</span>
          <form>
            <input type="password" :placeholder="i18n.t('login.pass')" v-model="data.pass" autocomplete="" />
          </form>
          <span class="forgetPass">{{ i18n.t("login.forget") }}</span>
        </div>
      </div>
      <div class="btn_box">
        <button class="btn login" @click="sendLogin" type="submit">
          {{ i18n.t("login.loginbtn") }}
        </button>
      </div>
      <div class="btn_box">
        <!-- <span id="qqLoginBtn"></span> -->

        <!-- <span id="qqLoginBtn" data-v-7b08df9c=""> -->
        <a href="https://graph.qq.com/oauth2.0/authorize?client_id=102020370&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fhyyyh.top%2Fblog"
          target="_self"><img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="QQ登录"
            border="0" /></a>
        <!-- </span> -->
      </div>
      <div class="registerbtn">
        <span class="toregister" @click="toRegister" type="submit">{{
          i18n.t("login.toregister")
        }}</span>
      </div>
    </div>
    <div class="register_container" :style="{ zIndex: data.isShowRegister ? 99 : -1 }">
      <div class="backindex" @click="toindex">
        <img src="http://hyyyh.top:3001/icon/back.png" alt="" />
      </div>
      <div class="registerTitle">
        <span>{{ i18n.t("register.title") }}</span>
      </div>
      <div class="input_box">
        <div class="name">
          <span>{{ i18n.t("register.name") }}:</span><input type="text" :placeholder="i18n.t('register.name')"
            v-model="data.rigister.name" />
        </div>
        <div class="name">
          <span>{{ i18n.t("register.email") }}:</span><input type="email" :placeholder="i18n.t('register.email')"
            v-model="data.rigister.email" />
        </div>
        <div class="name">
          <span>{{ i18n.t("register.pass") }}:</span>
          <form>
            <input type="password" :placeholder="i18n.t('register.pass')" v-model="data.rigister.pass" autocomplete="" />
          </form>
        </div>
        <div class="name">
          <span>{{ i18n.t("register.Verifypassword") }}:</span>
          <form>
            <input type="password" :placeholder="i18n.t('register.Verifypassword')" v-model="data.rigister.checkpass"
              autocomplete="" />
          </form>
        </div>
        <div class="name">
          <span>{{ i18n.t("register.Verification") }}:</span><input type="text"
            :placeholder="i18n.t('register.Verification')" v-model="data.rigister.checkyzm" style="width: 100px" />
          <span class="yzm" @click="data.yzm = JSON.stringify(Math.floor(Math.random() * 8999 + 1000))">{{ data.yzm
          }}</span>
        </div>
      </div>
      <div class="btn_box">
        <button class="btn login" @click="sendregister" type="submit">
          {{ i18n.t("register.title") }}
        </button>
      </div>
      <div class="backlogin" @click="backlogin">{{ i18n.t("register.tologin") }}</div>
    </div>
  </div>
</template>

<!-- <div class="registerTitle" v-if="data.isShowRegister">
        <span>注册</span>
      </div> -->

<script setup lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import router from "../../../router";
import anime from "animejs";
import { login, rigister } from "../../../axios/apis";
import { useStore } from "vuex";
import { Md5 } from "ts-md5";

import QC from "qc";

// 国际化
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { log } from "console";
import { checkTEXT } from "../../../func/checkText/checkText";
let i18n = useI18n();

const store = useStore();
const data = reactive({
  user: "",
  pass: "",
  isLoading: false,
  isShowRegister: false,
  yzm: "",
  rigister: <any>{
    name: "",
    email: "",
    pass: "",
    checkpass: "",
    checkyzm: "",
  },
  bg: {
    startnum: 30,
    distance: 800,
  },
});
onMounted(() => {
  data.yzm = JSON.stringify(Math.floor(Math.random() * 8999 + 1000));
  setTimeout(() => {
    anime({
      targets: [".login_container"],
      left: "0",
      opacity: "1",
      translateY: "0rem",
      translateX: "35vw",
      duration: 1000,
    });
  }, 200);
});

// 发送登录请求
const sendLogin = async () => {
  let userreg = /^[a-zA-Z0-9_-]{1,10}$/;
  let passreg = /^[a-zA-Z0-9_-]{5,16}$/;

  // user正则
  if (!userreg.test(data.user)) {
    ElMessage.error("昵称只能包含字母,数字,下划线,减号,且大于1位不超过10位");
    return;
  }
  // pass正则
  if (!passreg.test(data.pass)) {
    ElMessage.error("密码只能包含字母,数字,下划线,减号,且大于5位不超过16位");
    return;
  }

  if (!data.user || !data.pass) {
    ElMessage.error("账号或密码不能为空");
    return;
  }
  if (!await checkTEXT(data.user) || !await checkTEXT(data.pass)) {
    return
  }
  try {
    const md5: any = new Md5();
    md5.appendAsciiStr(data.pass);
    const pass = md5.end();

    const res = await login(data.user, pass);
    if (res.status == 200) {
      ElMessage.success(res.data.msg);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("header", res.data.avatar);
      store.state.userid = res.data.id;
      store.state.username = res.data.name;
      store.state.token = res.data.token;
      store.state.header = res.data.avatar;
      store.state.userdata = res.data;

      router.push("/blog");
      return;
    } else {
      ElMessage.error(res.data.msg);
    }
  } catch (error) {
    ElMessage.error("发生了未知的错误");
  }
  // console.log(res);
};

// 发送注册请求
const sendregister = async () => {
  let emailreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let userreg = /^[a-zA-Z0-9_-]{1,10}$/;
  let passreg = /^[a-zA-Z0-9_-]{6,16}$/;

  if (
    data.rigister.name.trim() == "" ||
    data.rigister.pass.trim().length < 6 ||
    data.rigister.checkpass.trim() == "" ||
    data.rigister.email.trim() == "" ||
    data.rigister.checkyzm.trim() == ""
  ) {
    ElMessage.error("内容格式不正确");
    return;
  }
  // user正则
  if (!userreg.test(data.rigister.name)) {
    ElMessage.error("昵称只能包含字母,数字,下划线,减号,且大于1位不超过10位");
    return;
  }
  // pass正则
  if (!passreg.test(data.rigister.pass)) {
    ElMessage.error("密码只能包含字母,数字,下划线,减号,且大于6位不超过16位");
    return;
  }
  // 邮箱正则
  if (!emailreg.test(data.rigister.email)) {
    ElMessage.error("邮箱格式不正确");
    return;
  }
  if (data.rigister.pass != data.rigister.checkpass) {
    ElMessage.error("两次输入密码不相同");
    return;
  }
  if (data.rigister.checkyzm != data.yzm) {
    ElMessage.error("验证码错误");
    return;
  }
  if (!await checkTEXT(data.rigister.name) || !await checkTEXT(data.rigister.pass)) {
    return
  }

  const md5: any = new Md5();
  md5.appendAsciiStr(data.rigister.pass);
  const pass = md5.end();
  const rigisterres = await rigister(data.rigister.name, pass, data.rigister.email);
  if (rigisterres.status == 201) {
    ElMessage.error(rigisterres.data.msg);
    return;
  } else {
    anime({
      targets: [".login_container"],
      opacity: "1",
      translateX: "35vw",
      duration: 1000,
    });

    anime({
      targets: [".register_container"],
      opacity: "0",
      translateY: "0rem",
      translateX: "0",
      duration: 1000,
    });
    ElMessage.success("注册成功！");
  }
};

// 去注册页
const toRegister = () => {
  data.isShowRegister = true;
  anime({
    targets: [".login_container"],
    opacity: "0",
    translateX: "0",
    duration: 1000,
  });

  anime({
    targets: [".register_container"],
    left: "0",
    opacity: "1",
    translateY: "0rem",
    translateX: "35vw",
    duration: 1000,
  });
};

// 返回登录页
const backlogin = () => {
  data.isShowRegister = false;
  anime({
    targets: [".login_container"],
    opacity: "1",
    translateX: "35vw",
    duration: 1000,
  });

  anime({
    targets: [".register_container"],
    opacity: "0",
    translateY: "0rem",
    translateX: "0",
    duration: 1000,
  });
};

// 返回首页
const toindex = () => {
  router.push({ path: "/" });
};
</script>

<style scoped lang="less">
@import url('./login.less');

</style>
