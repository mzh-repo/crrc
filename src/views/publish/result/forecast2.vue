<template>
  <div>
    <el-row class="title">
      <div class="dot"></div>
      <div>最大旅行速度</div>
    </el-row>
    <el-row class="progress">
      储能系统性能衰减度 &nbsp;
      <el-col :xs="8"
              :sm="6"
              :md="3"
              :lg="3"
              :xl="3">
        <el-progress :percentage="percent"
                     :stroke-width="18">
        </el-progress>
      </el-col>
    </el-row>
    <el-row class="progress">
      文本解释判据: {{explain}}
    </el-row>
    <el-row :gutter="19"
            class="chart-container chart-1">
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="手扳极位" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="牵引功率" />
        </div>
      </el-col>
    </el-row>
    <el-row class="speed-line">
      平均速度： {{speed}}km/s &nbsp;&nbsp;&nbsp; 总能耗: {{energy}}km/h
    </el-row>
    <move-train />
    <el-row :gutter="19"
            class="chart-container">
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="手扳极位" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="牵引功率" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Line from '../components/line.vue';
import MovingTrain from '../components/movingTrain.vue';

export default {
  components: { 'mzh-line': Line, 'move-train': MovingTrain },
  data() {
    return {
      percent: 80,
      explain: 'xxxxxxxxxxxxxxxxxxxxxxx',
      speed: 10,
      energy: 10,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 49px;
  font-size: 18px;
  font-weight: normal;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  padding: 12px 0;
  margin-bottom: 24px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;

  .dot {
    width: 6px;
    height: 6px;
    background: rgba(51, 51, 51, 1);
    border-radius: 50%;
    margin-right: 9px;
  }
}

.progress {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);

  .el-col {
    text-align: left;

    /deep/ .el-progress-bar__inner {
      background-color: #ff2b2b;
    }

    /deep/ .el-progress-bar__outer {
      background-color: #d8d8d8;
    }
  }
}

.chart-container {
  height: 318px;
  margin-top: 60px;
  // margin-bottom: 103px;

  &.chart-1 {
    margin-bottom: 30px;
  }

  .chart-box {
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 16px 16px 0;
  }
}

.speed-line {
  text-align: left;
  height: 25px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  margin-bottom: 103px;
}
</style>
