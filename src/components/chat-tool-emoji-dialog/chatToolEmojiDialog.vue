<template>
    <div class="emoji">
        <div class="emoji_item" v-for="item in data.emojiList" :key="item" @click="emit('addEmoji', item)" >
            {{ item }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['addEmoji'])

const data = reactive({
    emojiList: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😗', '🥰', '😘', '😍', '😎', '😋', '😊', '😉', '😙', '😚', '🙁', '🙂', '🤗', '🤩', '🤔', '🤨', '😮', '😥', '😣', '😏', '🙄', '😶', '😑', '😐', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '🙃', '😕', '😔', '😓', '😒', '🤤', '😝', '😜', '🤑', '😲',
        '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥺', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿']
})

onMounted(() => {

})

</script>

<style scoped lang="less" >
.emoji {
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    overflow-y: auto;
    cursor: pointer;
    user-select: none;

    .emoji_item {
        font-size: 1rem;
        cursor: pointer;
        padding: 0.4rem;
        transition: 0.2s background-color;

        &:hover {
            background-color: rgb(194, 194, 194);
        }
    }
}
</style>