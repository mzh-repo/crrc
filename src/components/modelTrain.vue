<template>
  <el-container class="model-train">
    <div>
      <span class="title">{{modelData.name||'面向间歇式供电列车的模型训练'}}</span>
      <span class="number">Loss {{number||'1'}}</span>
    </div>
    <svg-icon icon-class="首页loss"
              class="img" />
  </el-container>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0,
    },
    modelData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.model-train {
  @include flex-row();
  justify-content: space-between;
  align-items: center;
  height: 164px;
  width: 100%;

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

.img {
  width: 178px;
  height: 164px;
}
</style>
