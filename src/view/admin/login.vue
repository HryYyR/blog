<template>
  <div class="top loginpage_top">
    <div class="login_container">
      <div class="backindex" @click="toindex">
        <img src="http://hyyyh.top:3001/icon/back.png" alt="" />
      </div>
      <div class="loginTitle">
        <span style="color: black">密码登录</span>|<span @click="smlogin">短信登录</span>
      </div>

      <div class="input_box">
        <div class="name">
          <span>账号:</span><input type="text" placeholder="账号" v-model="data.user" />
        </div>
        <div class="pass">
          <span>密码:</span
          ><input type="password" placeholder="密码" v-model="data.pass" />
          <span class="forgetPass">忘记密码</span>
        </div>
      </div>
      <div class="btn_box">
        <button class="btn login" @click="sendLogin" type="submit">登录</button>
      </div>
      <div class="registerbtn">
        <span class="toregister" @click="toRegister" type="submit">去注册</span>
      </div>
    </div>
    <div class="register_container" :style="{ zIndex: data.isShowRegister ? 99 : -1 }">
      <div class="backindex" @click="toindex">
        <img src="http://hyyyh.top:3001/icon/back.png" alt="" />
      </div>
      <div class="registerTitle">
        <span>注册</span>
      </div>
      <div class="input_box">
        <div class="name">
          <span>昵称:</span
          ><input type="text" placeholder="昵称" v-model="data.rigister.name" />
        </div>
        <div class="name">
          <span>邮箱:</span
          ><input type="text" placeholder="邮箱" v-model="data.rigister.email" />
        </div>
        <div class="name">
          <span>密码:</span
          ><input
            type="text"
            placeholder="密码不能少于6位"
            v-model="data.rigister.pass"
          />
        </div>
        <div class="name">
          <span>确认密码:</span
          ><input type="text" placeholder="确认密码" v-model="data.rigister.checkpass" />
        </div>
        <div class="name">
          <span>验证码:</span
          ><input
            type="text"
            placeholder="验证码"
            v-model="data.rigister.checkyzm"
            style="width: 100px"
          />
          <span
            class="yzm"
            @click="data.yzm = JSON.stringify(Math.floor(Math.random() * 8999 + 1000))"
            >{{ data.yzm }}</span
          >
        </div>
      </div>
      <div class="btn_box">
        <button class="btn login" @click="sendregister" type="submit">注册</button>
      </div>
      <div class="backlogin" @click="backlogin">返回登录</div>
    </div>
  </div>
</template>

<!-- <div class="registerTitle" v-if="data.isShowRegister">
        <span>注册</span>
      </div> -->

<script setup lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";
import { reactive, ref, onMounted } from "vue";
import router from "../../router";
import anime from "animejs";
import { login, rigister } from "../../axios/apis";
import { useStore } from "vuex";

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
const store = useStore();
onMounted(() => {
  data.yzm = JSON.stringify(Math.floor(Math.random() * 8999 + 1000));
  setTimeout(() => {
    let myAnimation = anime({
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
  let passreg = /^[a-zA-Z0-9_-]{6,16}$/;

  // user正则
  if (!userreg.test(data.user)) {
    ElMessage.error("昵称只能包含字母，数字，下划线，减号，且大于1位不超过10位");
    return;
  }
  // pass正则
  if (!passreg.test(data.pass)) {
    ElMessage.error("密码只能包含字母，数字，下划线，减号，且大于6位不超过16位");
    return;
  }

  if (!data.user || !data.pass) {
    ElMessage.error("账号或密码不能为空");
    return;
  }
  try {
    const res = await login(data.user, data.pass);
    if (res.status == 200) {
      ElMessage.success(res.data.msg);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("token", res.data.token);

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
    ElMessage.error("昵称只能包含字母，数字，下划线，减号，且大于1位不超过10位");
    return;
  }
  // pass正则
  if (!passreg.test(data.rigister.pass)) {
    ElMessage.error("密码只能包含字母，数字，下划线，减号，且大于6位不超过16位");
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

  const rigisterres = await rigister(
    data.rigister.name,
    data.rigister.pass,
    data.rigister.email
  );
  console.log(rigisterres.data);
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

//  短信登录
const smlogin = () => {
  ElMessage.error("暂未开放");
};

const sendRegister = async () => {
  data.isShowRegister = true;
};
</script>

<style scoped lang="less">
* {
  font-family: Georgia, STZhongsong;
}
input {
  border: none;
  outline: none;
}
.top {
  height: 100vh;
  width: 100vw;
  background-size: 100% 100%;
  overflow: hidden !important;
  display: flex;
  align-items: center;
  z-index: 1;
  background-image: linear-gradient(135deg, rgb(246, 240, 180), rgb(155, 224, 95));
  .backindex {
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
    user-select: none;
  }

  .login_container {
    overflow: hidden;
    width: 30%;
    min-width: 500px;
    z-index: 99;
    opacity: 1;
    height: 30%;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 15px 3px rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(2px);
    opacity: 0;
    position: absolute;
    transform: translateX(35vw) translateY(20vh);

    .loginTitle {
      font-size: 1.5rem;
      color: white;
      margin-bottom: 1rem;
      cursor: pointer;
      user-select: none;
      position: relative;
      margin-top: 20px;
    }
  }

  .btn_box {
    display: flex;
    width: 400px;
    justify-content: space-around;
    margin-top: 1rem;

    .btn {
      font-size: 1.2rem;
      color: gray;
      cursor: pointer;
      user-select: none;
      width: 10rem;
      height: 2.5rem;
      border-radius: 5px;
      transition: 0.5s;
      border: 1px solid rgba(255, 255, 255, 0.6);
      background-color: transparent;
      background-color: rgb(255, 255, 255);
    }
    .login {
      &:hover {
        background-color: rgb(145, 227, 121);
        color: white;
      }
    }
  }
  .registerbtn {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 20px;
    cursor: pointer;
    user-select: none;
    transition: 0.2s;
    .toregister {
      transition: 0.2s;
      color: white;
      &:hover {
        color: rgb(0, 181, 214);
      }
    }
  }
  .register_container {
    overflow: hidden;
    width: 30%;
    min-width: 500px;
    opacity: 0;
    height: auto;
    z-index: -1;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 15px 3px rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(2px);
    position: absolute;
    transform: translateX(35vw);
    padding: 20px 0;
    .backlogin {
      position: absolute;
      font-size: 1rem;
      right: 10px;
      bottom: 5px;
      cursor: pointer;
      user-select: none;
      transition: 0.2s;
      color: white;
      &:hover {
        color: rgb(0, 181, 214);
      }
    }
    .registerTitle {
      font-size: 1.5rem;
      color: black;
      margin-bottom: 1rem;
      cursor: pointer;
      user-select: none;
      position: relative;
    }
  }

  .input_box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    border: 1px solid gray;
    position: relative;
    input {
      width: 300px;
      height: 43px;
      padding: 0;
      overflow: hidden;
    }
    span {
      padding: 0 13px;
    }
    .name {
      border-bottom: 1px solid gray;
      width: 400px;
    }
    .pass {
      input {
        width: 250px;
      }
      .forgetPass {
        cursor: pointer;
        user-select: none;
        width: 100px;
        color: rgb(0, 161, 214);
      }
    }
  }
}
.yzm {
  width: 100px;
  background-color: green;
  height: 70px;
  font-size: 2rem;
  position: relative;
  top: 5px;
  user-select: none;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    width: 120px;
    height: 2px;
    background-color: white;
    margin-left: -90px;
    margin-top: 20px;
    transform: rotate(10deg);
  }
  &::before {
    content: "";
    position: absolute;
    width: 110px;
    height: 3px;
    background-color: white;
    margin-left: -20px;
    margin-top: 10px;
    transform: rotate(-15deg);
  }
}
</style>
