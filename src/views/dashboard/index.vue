<template>
  <el-container class="dashboard">
    <el-col :span="4">
      <user-info />
    </el-col>
    <el-col :span="20">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="box"></div>
        </el-col>
        <el-col :span="6">
          <div class="box"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="box">
            <bar-chart title="近期训练"
                       :height="chartHeight" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box">
            <bar-chart title="近期应用"
                       :colors="colors"
                       :height="chartHeight" />
          </div>
        </el-col>
      </el-row>
      <el-row class="moder-area"
              :gutter="20">
        <el-col span="24">
          <span class="model-title">模型中心</span>
          <span class="model-more"
                @click.stop="toModel">更多</span>
        </el-col>
        <el-col v-for="item in 3"
                :key="item"
                :span="8">
          <div class="box">
            <ModelTrain />
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-container>
</template>

<script>
import UserInfo from '../../components/userInfo.vue';
import BarChart from '@/components/barChart.vue';
import ModelTrain from '@/components/modelTrain.vue';

export default {
  components: { UserInfo, BarChart, ModelTrain },
  data() {
    return {
      colors: ['#00C4C0', '#8FD866'],
      chartHeight: '326px',
      appData: {},
      trainData: {},
    };
  },
  methods: {
    toModel() {
      this.$router.push({ path: '/chooseModel' });
    },
  },
  mounted() {
    this.$axios.get('/form/recent?type=train').then((res) => {
      this.appData = res.application;
      this.trainData = res.train;
    });
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
}

.el-row {
  &:first-child {
    height: 418px;
    margin-bottom: 20px;
  }
  &:nth-child(2) {
    height: 326px;
    margin-bottom: 20px;
  }
  // &:nth-child(3) {
  //   height: 164px;
  // }
}

.el-col {
  height: 100%;
}

.box {
  background: #fff;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  height: 100%;
}

.moder-area {
  margin: 0 0 20px;

  .el-col:nth-child(1) {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 20px;
  }
}

.model-title {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFangSC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
}

.model-more {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  cursor: pointer;
}
</style>
