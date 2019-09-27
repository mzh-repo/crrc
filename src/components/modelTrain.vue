<template>
  <el-container class="model-train">
    <div>
      <span class="title">面向间歇式供电列车的模型训练</span>
      <span class="number">Loss 1</span>
    </div>
    <img src="../assets/images/首页loss.png"
         alt=""
         srcset="">
  </el-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '车载储能系统性能劣化条件下的列车运行控制模型预测',
    },
  },
  data() {
    return {};
  },
  mounted() {
    // this.b();
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.model-train {
  @include flex-row();
  justify-content: space-between;
  align-items: center;
  height: 164px;
  width: 488px;

  div {
    padding: 19px 24px;
    @include flex-column();
    justify-content: center;
    align-items: flex-start;
  }
}

.title {
  margin: 0 0 78px;
  font-size: 17px;
  font-family: 'PingFangSC-Regular', 'PingFangSC';
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
}

.number {
  font-size: 18px;
  font-family: 'FZLTZHK--GBK1-0', 'FZLTZHK--GBK1';
  font-weight: normal;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
}

img {
  width: 178px;
  height: 164px;
}
</style>
