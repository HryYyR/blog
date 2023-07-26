<template>
  <div class="container">
    <div class="tabBtn">
      <el-button
        type="primary"
        style="width: 10%; height: 80%; margin-right: 3rem"
        @click="data.dialogVisible = true"
        v-if="data.visibelEdit"
        >发布文章</el-button
      >
      <el-button
        type="primary"
        style="width: 10%; height: 80%; margin-right: 3rem"
        v-if="!data.visibelEdit"
        @click="data.dialogVisible = true"
        >提交修改文章</el-button
      >
      <el-input
        style="width: 70%; height: 100%"
        placeholder="请输入文章的标题"
        v-model="data.blogTitle"
      ></el-input>
    </div>
    <div class="editRoom">
      <div class="write">
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc; width: 100%"
            :editor="editorRef"
            :defaultConfig="data.toolbarConfig"
            mode="default"
          />
          <Editor
            style="height: 80vh; overflow-y: hidden"
            v-model="data.valueHtml"
            :defaultConfig="data.editorConfig"
            mode="default"
            @onCreated="handleCreated"
            @onChange="onChange"
          />
        </div>
      </div>
      <div class="show"></div>
    </div>
    <el-dialog v-model="data.dialogVisible" title="完善内容" width="40%">
      <div>
        <div>标题：<el-input v-model="data.blogTitle" style="width: 70%"></el-input></div>
        <div class="tagBlock">
          <span> 标签：</span>
          <div class="tagMain">
            <el-tag
              class="tag"
              @click="item.check = !item.check"
              v-for="(item, index) in data.labelData"
              :key="index"
              size="large"
              :type="item.check != 0 ? '' : 'info'"
              >{{ item.name }}</el-tag
            >
          </div>
        </div>
        <div class="sortBlock">
          <span>分类：</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ data.checkSort.name }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in data.sortData"
                  :key="index"
                  @click="data.checkSort = item"
                >
                  {{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="getFile">
          <el-upload
            action=""
            :on-change="getCoverUrlFile"
            :limit="1"
            :auto-upload="false"
            class="coverImgUpload"
          >
            <div>
              <img :src="data.coverUrl" width="150px" height="150px" />
            </div>
            <el-button type="warning" plain size="default" style="margin-top: 20px"
              >上传本地图片</el-button
            >
          </el-upload>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editBlog()" v-if="!data.visibelEdit"
            >修改</el-button
          >
          <el-button type="primary" @click="UploadBlog()" v-if="data.visibelEdit"
            >发布</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import "@wangeditor/editor/dist/css/style.css"; // 引入富文本css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {
  getAdminLabelData,
  getAdminSortData,
  addblog,
  editblog,
} from "../../../axios/adminApi";
import { File, getAssignBlogData } from "../../../axios/apis";
import { useRoute } from "vue-router";
import {
  reactive,
  watch,
  ref,
  onMounted,
  onBeforeUnmount,
  shallowRef,
  getCurrentInstance,
} from "vue";
import { log } from "console";
import { dataset } from "dom7";
import router from "../../../router";
const route = useRoute();
const internalInstance = getCurrentInstance();

const data = reactive({
  toolbarConfig: {}, //工具栏配置
  editorConfig: { placeholder: "请输入内容...", MENU_CONF: <any>{} }, //内容区配置
  valueHtml: `<p>请输入内容。。。</p>`, // 内容 HTML
  blogTitle: "", //博客标题
  blogContainer: "", //博客内容
  dialogVisible: false, //是否显示发布详情页
  labelData: <any>[], //标签数据
  sortData: <any>[], //分类数据
  checkSort: <any>{ name: "选择分类", id: -1 }, //默认选择的分类
  coverUrl: "", //封面图片base64数据
  visibelEdit: true, ///编辑模式
  willEditBlog: <any>[], //将被修改的博客
});
onMounted(async () => {
  data.sortData = await (await getAdminSortData()).data; //获取sort数据
  data.labelData = await (await getAdminLabelData()).data; //获取label数据

  if (route.query.id) {
    data.visibelEdit = false;
    let id: any = route.query.id;
    let resolve = await (await getAssignBlogData(id)).data.data[0];
    console.log(resolve);
    
    data.willEditBlog = resolve;
    editorRef.value.setHtml(resolve.container);
    data.blogTitle = resolve.name;
    let checkLabel = resolve.label.split(",");

    // 编辑文章时，渲染默认选中的标签
    checkLabel.forEach((item: any) => {
      data.labelData.map((i: any) => {
        if (i.id == item) {
          i.check = 1;
        }
      });
    });

    // 编辑文章时，渲染默认选中的分类
    data.sortData.forEach((item: any) => {
      if (item.id == resolve.sort) {
        data.checkSort = { name: item.name, id: item.id };
      }
    });
  }
}),
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy(); //退出销毁
  });

// 上传博客
const UploadBlog = async () => {
  if (data.blogTitle.length < 5 || data.checkSort.id == -1 || data.coverUrl == "") {
    return ElMessage.error("信息输入有误，请检查后重新提交");
  }

  const res = await addblog(
    data.blogTitle,
    data.blogContainer,
    data.labelData,
    data.checkSort.id,
    data.coverUrl
  );
  // console.log(res);
  if (res.status == 200) {
    data.dialogVisible = false;
    ElMessage.success("添加博客成功！");
  }
};

// 修改博客
const editBlog = async () => {
  if (data.blogTitle.length < 5 || data.checkSort.id == -1) {
    return ElMessage.error("信息输入有误，请检查后重新提交");
  }

  let labelList: any = [];
  data.labelData.map((item: any) => {
    if (item.check == 1) {
      labelList.push(item.id);
    }
  });
  labelList.length > 1 ? labelList.join(",") : "";

  const res = await editblog(
    data.willEditBlog.id,
    data.blogTitle,
    data.blogContainer,
    labelList,
    data.checkSort.id
  );
  if (res.status == 200) {
    data.dialogVisible = false;
    ElMessage.success("修改博客成功！");
    router.back();
  } else {
    console.log(res);
  }
};

// 获取封面信息
const getCoverUrlFile = async (file: any, fileList: any) => {
  const res = (await getBase64(file.raw)) as any;
  data.coverUrl = "data:image/jpg;base64," + res.split(",")[1];
  // console.log(data.coverUrl);

  // getCurrentInstance ['coverImgUpload'].clearFiles()
};

//获取图片的base64
const getBase64 = (file: any) => {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    let imgResult = <any>"";
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgResult = reader.result;
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.onloadend = function () {
      resolve(imgResult);
    };
  });
};

// 富文本钩子
const editorRef = shallowRef();

data.editorConfig.MENU_CONF["uploadImage"] = {
  server: "http://hyyyh.top:3001/api/File",
  metaWithUrl: true,
};
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const onChange = (edit: any) => {
  // console.log(edit);

  data.blogContainer = edit.getHtml();
  // console.log(data.blogContainer);
  const showDom = <HTMLElement>document.querySelector(".show");
  showDom.innerHTML = edit.getHtml();
  // console.log(showDom.innerHTML);
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .tagBlock {
    width: 100%;
    display: flex;
    align-items: center;

    .tag {
      cursor: pointer;
      user-select: none;
      margin: 1rem 0.2rem;
    }
    .tagMain {
      width: auto;
      flex-wrap: wrap;
    }
  }
  .sortBlock {
    display: flex;
    align-items: center;
  }
  .tabBtn {
    width: 100%;
    height: 6rem;
    border-bottom: 1px solid gray;
    padding: 0.5rem;
  }
  .editRoom {
    display: flex;
    overflow: hidden;
    .write {
      width: 50%;
      height: 100%;
    }
    .show {
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
}
</style>
