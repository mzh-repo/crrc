<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: PingFangSC, sans-serif, 'Microsoft YaHei', 微软雅黑, 'MicrosoftJhengHei', 华文细黑;
  text-align: center;
  color: #2c3e50;
}

/* 滚动条的宽度 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  position: fixed;
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #b9bdcb;
}
</style>
