<template>
  <div class="top">
    <div class="container" :class="data.isLoading ? 'addWidth' : ''">
      <div class="loginTitle">
        <span style="color: rgb(0, 161, 214)">密码登录</span>||<span>短信登录</span>
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
        <button class="register btn" @click="sendRegister" type="submit">注册</button>
        <button class="btn login" @click="sendLogin" type="submit">登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";
import { reactive, ref, onMounted } from "vue";
import router from "../../router";
import { login } from "../../axios/apis";

const data = reactive({
  user: "Hyyyh",
  pass: "123",
  isLoading: false,
});

onMounted(() => {
  setTimeout(() => {
    data.isLoading = true;
  }, 200);
});

const sendLogin = async () => {
  if (!data.user || !data.pass) {
    ElMessage.error("账号或密码不能为空");
    return;
  }
  const res = await login(data.user, data.pass);
  // console.log(res);
  if (res.status == 200) {
    ElMessage.success(res.data.msg);
    localStorage.setItem("name", res.data.name);
    localStorage.setItem("id", res.data.id);
    localStorage.setItem("token", res.data.token);
    router.push("/blog");
  } else {
    ElMessage.error(res.data.msg);
  }
};

const sendRegister = async () => {};
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
  display: flex;
  background-size: 100% 100%;

  .container {
    overflow: hidden;
    margin: auto;
    width: 0;
    opacity: 0;
    height: 20rem;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: 0.5s;
    backdrop-filter: blur(2px);

    .loginTitle {
      font-size: 1.5rem;
      color: white;
      margin-bottom: 1rem;
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
      input {
        width: 300px;
        height: 43px;
        padding: 0;
      }
      span {
        padding: 0 13px;
      }
      .name {
        border-bottom: 1px solid gray;
      }
      .pass {
        input {
          width: 200px;
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
  .btn_box {
    display: flex;
    width: 400px;
    justify-content: space-around;
    margin-top: 1rem;

    .btn {
      font-size: 1.2rem;
      color: white;
      cursor: pointer;
      user-select: none;
      width: 10rem;
      height: 2.5rem;
      border-radius: 5px;
      transition: 0.5s;
      border: 1px solid rgba(255, 255, 255, 0.6);
      background-color: transparent;
    }
    .login {
      background-color: rgb(0, 161, 214);
    }
  }
}

.addWidth {
  width: 100% !important;
  box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.2);
  opacity: 1 !important;
}
</style>
