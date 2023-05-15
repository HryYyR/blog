<template>
    <div>
        <blogheaderVue :bgColor="true" />
        <div class="socket" :style="{
            backgroundColor: store.state.themeColor.color
        }">
            <div class="socket_container flex-jcc">
                <div class="socket_list_container">
                    <!-- 用户列表 -->
                    <div class="user_list">
                        <div class="user_list_title">聊天室人数({{ data.userlist.length }})</div>
                        <div class="user_list_container">
                            <div class="user_list_item flex-aic" v-for="(item, index) in data.userlist" :key="item.id">
                                <img :src="item.head" :alt="item.name"><span>{{ item.name }}{{ item.uuid ==
                                    data.userInfo.uuid
                                    ? "(我)" : "" }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 聊天记录 -->
                    <div class="chat_list">
                        <div class="chat_list_container" ref="chat_list_container">
                            <div class="chat_list_item" v-for="(item, index) in data.chatList" :key="item.id">
                                <div class="chat_list_item_info"
                                    :style="{ justifyContent: item.uuid == data.userInfo.uuid || item.id == data.userInfo.id && item.id != -1 ? 'flex-end' : '' }">
                                    <img :src="item.head" alt=""
                                        v-if="item.uuid != data.userInfo.uuid && item.id != data.userInfo.id && item.id != -1">
                                    <span>{{ item.username }}{{ item.id == 1 ? "(博主)" : "" }}</span>
                                    <img :src="item.head" alt=""
                                        v-if="item.uuid == data.userInfo.uuid || item.id == data.userInfo.id && item.id != -1">
                                </div>
                                <div class="chat_list_item_message"
                                    :style="{ alignItems: item.uuid == data.userInfo.uuid || item.id == data.userInfo.id && item.id != -1 ? 'flex-end' : 'flex-start' }">
                                    <p v-if="item.type == 'text'">{{ item.message }}</p>
                                    <img v-else :src="item.message" :alt="item.message">
                                    <div class="chat_list_item_message_date"> {{ item.createtime }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="chat_dialog">
                            <!-- 工具栏 -->
                            <div class="chat_tool">
                                <!-- emoji -->
                                <div class="chat_tool_item">
                                    <el-popover placement="top" title="表情" :width="400" trigger="click">
                                        <template #reference>
                                            <img src="https://hyyyh.top/icon/emoji.png" alt="">
                                        </template>
                                        <ChatToolEmojiDialog @addEmoji="(item) => addEmoji(item)" />
                                    </el-popover>
                                </div>
                                <!-- 图片上传 -->
                                <div class="chat_tool_item">
                                    <el-upload v-model:file-list="data.fileList" method="post" class="upload-demo"
                                        :action="data.fileUrl" :show-file-list="false" auto-upload
                                        multiple  :on-success="fileSuccess" :on-error="fileError"
                                        :limit="3" :on-exceed="handleExceed">
                                        <img src="https://hyyyh.top/icon/photo.png" alt="">
                                    </el-upload>
                                </div>
                            </div>
                            <!-- 聊天栏 -->
                            <div class="chat_container">
                                <textarea v-model="data.chatMessage" placeholder="请不要尝试攻击哦！"></textarea>
                                <button @click="sendChat(data.chatMessage, 'text')">发送</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import blogheaderVue from '../../../components/blog-header/blogheader.vue';
import { useStore } from 'vuex';
import socket from '../../../websocket/index'
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import { DATA, USERLIST } from './socket'
import { isEmpty } from 'lodash';
import { getFullDate } from '../../../func/Date/Date'
import scope from 'lodash/escape';
import ChatToolEmojiDialog from '../../../components/chat-tool-emoji-dialog/chatToolEmojiDialog.vue';
import { ElMessage } from 'element-plus';

let store = useStore()
let chat_list_container: any = ref('')
const data: DATA = reactive({
    fileUrl: `${import.meta.env.VITE_APP_BASE_URL}/api/upload` ,
    fileList: [],
    chatList: [],
    userlist: [],
    chatMessage: '',
    userInfo: {
        uuid: '-1',
        id: localStorage.getItem('id') || '-1',
        name: localStorage.getItem('name') || '游客',
        head: localStorage.getItem('header') || 'https://hyyyh.top/icon/anonymousHeader.png'
    },
    textarea: ''
})

onMounted(() => {
    getUuid()
    window.addEventListener('keydown', (e) => ListenerEnter(e))
    // 监听
    socket.on('userList', (userList) => {
        // console.log(userList);
        data.userlist = userList
    })
    socket.on('chatList', (chatList) => {
        // console.log(chatList);
        data.chatList = chatList
    })
})

// 发送文字消息
const sendChat = (chatMessage: string, type: string = 'text') => {
    if (isEmpty(data.chatMessage) && type == 'text') return
    let { uuid, id, name, head } = data.userInfo
    socket.emit("message", {
        uuid: uuid,
        id: id,
        username: name,
        head: head,
        message: type == 'img' ? chatMessage : scope(chatMessage),
        type: type,
        createtime: getFullDate()
    });
    data.chatMessage = ""

    // 滚动动画
    setTimeout(() => {
        chat_list_container.value.scrollTo({
            top: 9999,
            behavior: 'smooth'
        })
    }, 200)
}

// 登录
const login = () => {
    data.userInfo.uuid = socket.id
    // console.log(data.userInfo);
    socket.emit('login', data.userInfo)
}

// 获取uuid
const getUuid = () => {
    let getUuid = setInterval(() => {
        if (socket.id !== undefined) {
            clearInterval(getUuid);
            data.userInfo.uuid = socket.id
            console.log(data.userInfo.uuid);
            login() //登录
        }
    }, 100);
}

const addEmoji = (item: string) => {
    data.chatMessage = data.chatMessage + item

}


const handleExceed = () => {
    ElMessage.error('图片最多只能选择3张!')
}
const fileSuccess = (resolve: any) => {
    sendChat(resolve.url, 'img')
    data.fileList=[]

}
const fileError = (i: any) => {
    ElMessage.error('图片发送失败!')
    data.fileList=[]

}

const ListenerEnter = (e: KeyboardEvent) => {
    e.key == 'Enter' && sendChat(data.chatMessage, 'text')
}

onUnmounted(() => {
    socket.close()
    window.removeEventListener('keydown', ListenerEnter)
})
</script>

<style scoped lang="less">
@import url('./socket.less');
</style>