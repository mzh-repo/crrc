<template>
  <el-container class="container">
    <div class="title">
      <div class="title-left">
        <span>请选择供电系统状态监测及故障预警模型实例</span>
        <span>实例{{'1908231434'}}</span>
      </div>
      <div class="title-right">
        <span>更新时间: {{'2019.09.11'}} {{'19:00:00'}}</span>
        <span>当前时间: {{'2019.09.11'}} {{'19:00:00'}}</span>
      </div>
    </div>
    <div class="forecast-data">
      <span>平均余册时间: {{'1.2'}}s</span>
      <span>预测总次数: {{'128'}}次</span>
      <span>预测总数据大小: {{'128'}}M</span>
    </div>
    <el-row :gutter="16"
            class="line-area">
      <el-col :span="8">
        <div class="chart-wrapper">
          <Mzh-line :lineData="lineData.force" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <Mzh-line :lineData="lineData.speed" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <Mzh-line :lineData="lineData.power" />
        </div>
      </el-col>
    </el-row>
    <Mzh-table />
  </el-container>
</template>

<script>
import line from './components/line.vue';
import Mzhtable from '../../components/table.vue';

export default {
  components: { 'Mzh-table': Mzhtable, 'Mzh-line': line },
  data() {
    return {
      lineData: {},
    };
  },
  mounted() {
    this.getLineData();
    this.b();
  },
  methods: {
    b() {
      if (!this.reseitime) {
        setTimeout(() => {
          this.getLineData();
          this.b();
        }, 1000);
      }
    },
    getLineData() {
      this.$axios.get('form/deployment?id=111').then((res) => {
        this.lineData = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 58px 70px 100px;
  width: 100%;
  height: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'PingFangSC-Regular', 'PingFangSC';
}

.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-left,
.title-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.title-left span:nth-child(1) {
  font-size: 28px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
}
.title-left span:nth-child(2) {
  margin-top: 6px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 25px;
}
.title-right span {
  margin-top: 4px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 22px;
}

.forecast-data {
  width: 100%;
  margin: 27px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;

  span {
    margin: 0 40px 0 0;
  }
}

.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  // margin-bottom: 32px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  position: relative;
}

.line-area {
  margin-bottom: 22px;
}
</style>
