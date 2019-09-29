<template>
  <el-container>
    <div class="config">
      推荐配置
      <el-row class="recommend">
        <el-col v-for="item in configList"
                align="left"
                :key="item"
                :span="6">
          <el-row>{{item.name}}</el-row>
          <el-row><span>{{item.value}}</span> {{item.unit}}</el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
      <config title="自选配置"
              :sliderList="sliderList" />
    </div>
    <div class="config model">
      <el-row v-for="item in modelList"
              :key="item">
        {{item.name}}: {{item.value}}
      </el-row>
      <div class="model-line"></div>
      <el-row>算法： {{algorithm}}</el-row>
      <el-row class="model-box">
        <el-col>
          模型：{{model}}
        </el-col>
        <el-col>适用问题： {{suit}}</el-col>
        <el-col>使用框架： {{frame}}</el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import Config from '@/components/configuration.vue';

export default {
  components: { Config },
  data() {
    return {
      configList: [
        {
          name: '轮次',
          value: 8,
          unit: '次',
        },
        {
          name: '内存',
          value: 12,
          unit: 'M',
        },
        {
          name: 'CPU',
          value: 3,
          unit: '个',
        },
        {
          name: 'GPU',
          value: 24,
          unit: 'M',
        },
      ],
      modelList: [
        { name: '模型名称', value: this.$store.state.basic.name },
        { name: '适用场景', value: this.$store.state.basic.scene },
        { name: '数 据 集', value: this.$store.state.basic.datasetName },
        { name: '简介', value: this.$store.state.basic.describe },
      ],
      algorithm: this.$store.state.algorithm.name,
      model: this.$store.state.algorithm.model_name,
      suit: this.$store.state.algorithm.suit,
      frame: this.$store.state.algorithm.frame,
      sliderList: [
        { title: '轮次', value: 8, maxValue: 100 },
        { title: '内存', value: 12, maxValue: 200 },
        { title: 'CPU', value: 3, maxValue: 300 },
        { title: 'GPU', value: 24, maxValue: 400 },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.config {
  text-align: left;
  font-size: 20px;
  color: rgba(51, 51, 51, 1);
  line-height: 28px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 22px 24px 20px 20px;
  margin-right: 26px;
}

.recommend {
  @include flex-row;
  margin-top: 30px;
  margin-bottom: 36px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);

  span {
    font-size: 24px;
  }
}

.line {
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 10px;
}

.model {
  width: 1112px;

  .el-row {
    margin-bottom: 20px;
  }
}

.model-line {
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 16px;
}

.model-box {
  padding-left: 66px;
  font-size: 16px;
  @include flex-row;
}
</style>
