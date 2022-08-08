<template>
  <router-view></router-view>
</template>
<script setup lang="ts"></script>

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
        min-height: 300px !important;
      }
    }
    .newBlog_left {
      width: 88% !important;
      .newBlog_Title {
        font-size: 1rem;
      }
      .newBlog_body {
        font-size: 0.8rem;
      }
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
    }
  }

  /* inteeraction  */
  .interaction_body_container {
    width: 100% !important;
    padding: 0 !important;
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
