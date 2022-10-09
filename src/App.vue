<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.commit("getTimeState");
});
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
@media screen and (max-width: 700px) {
  /*  blogitem  */
  .newBlog {
    flex-direction: column;
    height: auto !important;
    .newBlog_right {
      height: auto !important;
      img {
        width: 100% !important;
        height: 100% !important;
        min-height: 190px !important;
      }
    }
    .newBlog_left {
      width: 88% !important;
      .newBlog_Title {
        font-size: 1.1rem !important;
      }
      .newBlog_body {
        font-size: 0.8rem !important;
      }
    }
    .newblog_labelsort {
      font-size: 0.4rem !important;
    }
  }

  /*login */
  .loginpage_top {
    width: 100% !important;
    .input_box {
      width: 85% !important;
    }
    .name {
      width: 100% !important;
    }
    .pass {
      width: 100% !important;
    }
    .login_container {
      width: 100% !important;
      min-width: 0 !important;
      transform: none !important;
    }
    .register_container {
      width: 100% !important;
      min-width: 0 !important;
      transform: none !important;
    }
    input {
      width: 100px !important;
    }
  }

  /*  blog */
  .blogRight {
    width: 0 !important;
    margin: 0 !important;
    opacity: 0 !important;
  }
  .blogLeft {
    width: 0 !important;
    margin: 0 !important;
  }
  .blogCenter {
    flex: 1 !important;
    margin: 0 !important;
  }

  /* sort  */
  .sort_container {
    width: 96% !important;
  }
  .interaction_name {
    width: 100% !important;
  }

  /* title  */
  .titleWord {
    font-size: 5rem !important;
  }
  .navBtn {
    width: 8rem !important ;
    height: 3rem !important ;
    font-size: 1rem !important;
  }
  .down {
    img {
      width: 2.5rem !important;
    }
  }

  /* blogheader  */
  .blogheaderContainer {
    .nav_ul {
      & div {
        margin: 0.4rem !important;
      }
    }
  }

  /* blogdetail  */
  .blogDetailContainer {
    .body {
      width: 100% !important;
    }
    .content {
      width: 100% !important;
    }
    .edit {
      display: none !important;
    }
    .info {
      display: none !important;
    }
    .blogdetailContainerHtml {
      max-width: 340px;
      overflow-x: scroll !important;
    }
    .comment {
      width: 92% !important;
    }
  }
  /* record  */
  .record {
    .record_item {
      width: 150px !important;
    }
    .rope {
      margin-left: -10rem !important;
    }
    .before {
      left: -190px !important;
      &::before {
        left: 167px !important ;
      }
    }
  }

  /* inteeraction  */
  .interaction_container {
    .interaction_body_container {
      width: 96% !important;
      padding: 0 !important;
    }
    .interaction_comment {
      width: 94% !important ;
    }
  }

  /* about */
  .about {
    height: auto !important;
    .toaboutdetail {
      display: none !important;
    }
    .cover {
      display: none !important;
    }
    .about_container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 5rem !important;
    }
    .aboutdialog {
      font-size: 1rem !important;
      margin: 1rem 0 !important;
      padding: 35px !important;
      opacity: 1 !important;
      width: 80% !important;
      min-height: 200px !important;
      position: relative !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      flex-direction: column !important;
      div {
        color: white !important;
      }
      p {
        color: white !important;
        font-size: 1.7rem;
        margin-bottom: 0.3rem;
      }
      li {
        color: white !important;
      }
    }
    .aboutbg {
      position: fixed;
      z-index: 0-1 !important;
      top: 0;
      width: 100% !important;
      height: 100% !important;
    }
  }
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: lightsteelblue;
  border-radius: 15px;
}
::-webkit-scrollbar-track {
  background-color: rgb(255, 255, 255);
}
::-webkit-scrollbar-thumb:horizontal {
  background-color: lightseagreen;
}
::-webkit-scrollbar-track:horizontal {
  background-color: lightsalmon;
}
::-webkit-scrollbar-corner {
  background-color: lightcoral;
}

@media screen and (max-width: 1680px) and (min-width: 1100px) {
  /* blogdetail  */
  .blogDetailContainer {
    .edit {
      left: 1rem !important;
    }
  }
}
@media screen and (max-width: 1100px) and (min-width: 700px) {
  /* blogdetail  */
  .blogDetailContainer {
    .edit {
      display: none !important;
    }
    .blogRight {
      width: 0 !important;
      margin: 0 !important;
      opacity: 0 !important;
    }
  }
}
</style>
