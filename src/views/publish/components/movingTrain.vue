<template>
  <el-row class="train-container">
    <svg-icon icon-class="火车" />
    <div class="trace-line"></div>
    <div class="trace-point"></div>
  </el-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.train-container {
  position: relative;
  height: 110px;
  margin-bottom: 30px;

  .svg-icon {
    width: 441px;
    height: 88px;
    position: absolute;
    animation: mymove 5s infinite;

    @keyframes mymove {
      0% {
        left: 0%;
      }
      25% {
        left: 25%;
      }
      50% {
        left: 50%;
      }
      75% {
        left: 75%;
      }
      100% {
        right: 0px;
      }
    }
  }

  .trace-line {
    width: 100%;
    height: 10px;
    position: absolute;
    background: rgba(102, 102, 102, 1);
    border-radius: 2px;
    top: 88px;
  }
}
</style>
