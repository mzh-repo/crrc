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
      from {
        right: 100%;
      }
      to {
        right: 0%;
      }
    }

    @-moz-keyframes mymove /* Firefox */ {
      from {
        right: 100%;
      }
      to {
        right: 0%;
      }
    }

    @-webkit-keyframes mymove /* Safari 和 Chrome */ {
      from {
        right: 100%;
      }
      to {
        right: 0%;
      }
    }

    @-o-keyframes mymove /* Opera */ {
      from {
        right: 100%;
      }
      to {
        right: 0%;
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
