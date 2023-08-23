<template>
    <div class="flex flex-col items-center w-screen h-screen text-white wrapper">
        <h1 class="my-1 mt-24 text-6xl text-center">WHOOPS!</h1>
        <h2 class="my-1 text-xl text-center">You have landed in the middle of nowhere.</h2>
        <h2 class="my-1 text-xl text-center">Let's get you back on track.</h2>
        <router-link class="px-4 py-1 my-4 border border-white rounded-2xl" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" :to="{name : 'HomeView'}">Take me home</router-link>
    </div>
</template>

<script>
    export default {
        mounted(){
            document.title = '404 : Not Found!'
        }
    }
</script>

<style scoped>
.wrapper{
    background-image: url('@/assets/images/bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>