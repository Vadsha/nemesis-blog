<template>
  <div>
      <router-view class="text-[15px]"></router-view>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style >
  body::-webkit-scrollbar {
    display: none;
  }
  
  @font-face {
    font-family: courgette;
    src: url('@/assets/courgette.ttf');
  }
  @font-face {
    font-family: itim;
    src: url('@/assets/itim.ttf');
  }
  html {
    font-family: itim;
  }
  h1 {
    font-family: courgette;
  }
</style>