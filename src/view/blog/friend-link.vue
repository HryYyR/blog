<template>
  <div
    class="friend_link"
    :style="{
      backgroundImage: `linear-gradient(${data.themeColor.start},${data.themeColor.end})`,
    }"
  >
    <blogheaderVue :bgColor="true" @changePage="changePage" />
    <div class="friend_link_container">
      <p class="title">{{ i18n.t("friend.title1") }}</p>
      <div class="input">
        <div class="input_left">
          <div class="website">
            <div class="input_itemTitle">{{ i18n.t("friend.website") }}</div>
            <el-input
              v-model="data.inputData.website"
              placeholder="website"
              class="input-with-select"
              size="large"
              clearable
            >
              <template #prepend>
                <el-select
                  v-model="data.websiteprefix"
                  placeholder="Select"
                  style="width: 115px"
                  size="large"
                >
                  <el-option label="http://" value="http://" />
                  <el-option label="https://" value="https://" />
                </el-select>
              </template>
            </el-input>
          </div>
          <div class="icon">
            <div class="input_itemTitle">{{ i18n.t("friend.favicon") }}</div>
            <el-input
              v-model="data.inputData.icon"
              placeholder="icon"
              class="input-with-select"
              size="large"
              clearable
            />
          </div>
          <div class="email">
            <div class="input_itemTitle">{{ i18n.t("friend.email") }}</div>

            <el-input
              v-model="data.inputData.email"
              placeholder="email"
              class="input-with-select"
              size="large"
              clearable
            />
          </div>
        </div>
        <div class="input_right">
          <el-input
            v-model="data.inputData.textarea"
            :rows="3"
            type="textarea"
            :placeholder="i18n.t('friend.blogIntroduction')"
          />
          <el-button type="primary" class="apply" size="large" @click="apply">{{
            i18n.t("friend.btn")
          }}</el-button>
        </div>
      </div>
    </div>
    <div class="friend_link_container">
      <p class="title">{{ i18n.t("friend.title2") }}</p>
      <!-- 友链 -->
      <div class="link_list">
        <div v-for="(item, index) in data.linkData" :key="item.id" class="link_item">
          <a :href="item.website" target="_blank">
            <img :src="item.icon" :alt="item.website" />
            <div>
              <p>{{ item.username }}</p>
              <p>{{ item.container }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import blogheaderVue from "../../components/blogheader.vue";
import { applyFriendLink, getFriendLink } from "../../axios/friend-link-api";
import { onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import anime from "animejs";
import { dataset } from "dom7";

// 国际化
import { useI18n } from "vue-i18n"; //要在js中使用国际化
let i18n = useI18n();

let store = useStore();
onMounted(async () => {
  const resolve: any = await getFriendLink();
  resolve.status != 200 && ElMessage.error("数据获取失败！");
  data.linkData = resolve.data.data;
  console.log(data.linkData);

  anime({
    targets: [".friend_link_container"],
    translateY: "-10vh",
    opacity: 1,
    duration: 1000,
  });
});
watch(store.state, (newvalue, oldvalue) => {
  data.themeColor = newvalue.themeColor;
});
const data = reactive({
  themeColor: store.state.themeColor,
  userid: store.state.userid,
  username: store.state.username,
  websiteprefix: "http://",
  linkData: <any>[], //所有友链数据
  inputData: <any>{
    website: "",
    icon: "",
    email: "",
    textarea: "",
  },
});
const changePage = () => {
  anime({
    targets: [".friend_link_container"],
    opacity: 0,
    duration: 1000,
  });
};
const apply = async () => {
  Object.keys(data.inputData).forEach((key) => {
    if (data.inputData[key].length < 6) {
      return ElMessage.error("输入的信息有误，请重新输入");
    }
  });
  let { website, icon, email, textarea } = data.inputData;
  const res = await applyFriendLink(
    data.websiteprefix + website,
    icon,
    email,
    textarea,
    data.userid,
    data.username
  );
  if (res.status != 200) {
    return ElMessage.error("友联申请失败！请稍微再试");
  }
  ElMessage.success("友链申请成功！，请等待审核通过");
  let Data = await getFriendLink();
  data.linkData = Data.data.data;
};
</script>

<style scoped lang="less">
@bgcolor: rgba(255, 255, 255, 0.7);
@boxshadow: 0 13px 0px -5px rgba(255, 255, 255, 0.4);
.friend_link {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 17vh;
  .friend_link_container {
    margin: 2rem 0 0rem 0;
    width: 60%;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    position: relative;
    box-shadow: @boxshadow;
    .title {
      font-size: 2rem;
      position: relative;
      margin: 2rem 0;
      font-weight: 900;
    }
    .input {
      width: 80%;
      height: auto;
      background-color: @bgcolor;
      box-shadow: @boxshadow;
      border-radius: 30px;
      position: relative;
      user-select: none;
      display: flex;
      justify-content: space-around;
      padding: 1rem;
      margin-bottom: 3rem;
      .input_left {
        width: 50%;
        height: 100%;
        & > div {
          margin: 0.5rem 0;
          display: flex;

          & > div {
            min-width: 70px;
          }
        }
      }
      .input_right {
        width: 40%;
        height: 100%;
        & > div {
          margin: 0.5rem 0;
        }
      }
      .input_itemTitle {
        margin: auto;
        min-width: 3rem;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 600;
      }
      .apply {
        margin-top: 0.8rem;
        width: 100%;
      }
    }

    .link_list {
      position: relative;
      width: 90%;
      padding: 1rem;
      margin-bottom: 4rem;
      min-height: 200px;
      background-color: @bgcolor;
      box-shadow: @boxshadow;
      border-radius: 30px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .link_item {
        width: 320px;
        height: 120px;
        background-color: rgba(241, 243, 249, 1);
        box-shadow: 0px 2px 5px rgb(197, 197, 197);
        border-radius: 10px;
        transition: 0.3s;
        overflow: hidden;
        user-select: none;
        margin: 0.5rem 0.5rem;
        &:hover {
          background-color: rgb(255, 255, 255);
        }
        a {
          width: 100%;
          height: 100%;
          display: flex;
          text-decoration: none;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 1rem;
          color: black;
          transition: 0.5s;
          img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            position: relative;
          }
          & > div {
            position: relative;
            flex: 1;
            padding-left: 1rem;
            padding-right: 2rem;
            overflow: hidden;
            & p:nth-child(1) {
              font-size: 1.1rem;
              margin-bottom: 0.5rem;
              font-weight: 900;
            }
            & p:nth-child(2) {
              font-size: 1rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
