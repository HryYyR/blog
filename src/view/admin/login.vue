<template>
  <div class="top">
    <div class="container">
      <h1>login</h1>
      <div class="name">
        账号: <input type="text" placeholder="账号" v-model="data.user" />
      </div>
      <div class="pass">
        密码:<input type="text" placeholder="密码" v-model="data.pass" />
      </div>
      <button class="login" @click="sendLogin">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import router from "../../router";

const data = reactive({
  user: "Hyyyh",
  pass: "123",
});

const sendLogin = () => {
  if (!data.user || !data.pass) {
    alert("no!!!");
    console.log("no!!");

    return;
  }
  axios({
    method: "post",
    url: "/login",
    data: {
      user: data.user,
      pass: data.pass,
    },
  })
    .then((res) => {
      // console.log(res);
      if (res.status == 200) {
        ElMessage.success(res.data.msg);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        router.push("/admin");
      } else {
        ElMessage.error(res.data.msg);
      }
    })
    .catch((res) => {
      console.log(res);
    });
};
</script>

<style scoped lang="less">
.top {
  height: 100vh;
  width: 100vw;
  display: flex;

  .container {
    margin: auto;
    width: 20rem;
    height: 25rem;
    background-color: skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    input {
      border: none;
      height: 2rem;
      width: 15rem;
      margin: 0.3rem 0;
    }
  }
  .login {
    width: 6rem;
    height: 2rem;
    margin-top: 3rem;
    border-radius: 5px;
    border: none;
    background-color: rgb(97, 237, 97);
    color: white;
  }
}
</style>
