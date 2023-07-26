<template>
    <div class="error flex-jcc-aic">
        <img src="../../assets/404.png" alt="">
        <div>
            <h1>页面找不到....</h1>
            <h1 class="error_back" @click="$router.push({ path: '/' })">返回首页</h1>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.error {
    height: 100vh;
    user-select: none;

    .error_back {
        cursor: pointer;
        color: skyblue;
    }
}
</style>