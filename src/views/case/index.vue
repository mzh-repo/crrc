<template>
  <el-container class="report-container">
    <div class="title">
      <el-button type="primary"
                 @click="$router.go(-1)">返回上一页</el-button>
      实例报告
    </div>
    <el-row class="main-title">
      {{ model.name }}
    </el-row>
    <el-row class="basic-container">
      <el-col :span="6"> 列车: {{ model.car_type }} </el-col>
      <el-col :span="6"> 线路: {{ model.route }} </el-col>
      <el-col :span="12"> 适用场景: {{ model.applicable_scene }} </el-col>
    </el-row>
    <el-row class="describe"> 简介: {{ model.introduction }} </el-row>
    <el-row :gutter="16"
            class="chart-report">
      <el-col :span="12">
        <div class="chart">
          <bar-chart title="近期训练"
                     :dataSet="trainData"
                     :showTip="true"
                     :showXAxis="true"
                     yName="Loss" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart">
          <bar-chart title="差异曲线"
                     :colors="[]"
                     :tooltipList="['差异值']"
                     :dataSet="appData"
                     :showTip="true"
                     :showXAxis="true"
                     yName="数值" />
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
// import Instance from '@/components/instance.vue';
import BarChart from '@/components/barChart.vue';

export default {
  // components: { Instance, BarChart },
  components: { BarChart },
  data() {
    return {
      appData: {},
      trainData: {},
      model: {},
      total: 100,
      size: 34.2,
      frame: 'keras',
      modelList: [],
    };
  },
  mounted() {
    const data = JSON.parse(sessionStorage.getItem('Result'));
    this.modelId = data.id;
    this.getModel();
    this.getdata();
  },
  methods: {
    getModel() {
      this.$axios.get(`/model/${this.modelId}`).then((res) => {
        this.model = res;
      });
    },
    getdata() {
      // this.$axios.get(`/form/recent?id=${this.modelId}`).then((res) => {
      // this.appData = res.application;
      // this.trainData = res.train;
      // });
      this.trainData = {
        data_list: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
        predict_data_list: [0.18, 0.17, 0.16, 0.2, 0.2, 0.21, 0.23, 0.24],
        name: [1, 2, 3, 4, 5, 6, 7, 8],
        type: 'bar',
      };

      this.appData = {
        data_list: [0.07, 0.08, 0.09, 0.05, 0.05, 0.04, 0.02, 0.01],
        name: [1, 2, 3, 4, 5, 6, 7, 8],
        type: 'line',
      };

      // this.$axios.get(`model/instance/list?model_id=${this.modelId}`).then((res) => {
      //   this.modelList = res;
      // });
    },
    unitConvert(data) {
      return (data / 1024 / 1024).toFixed(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.report-container {
  padding: 60px;
  @include flex-column;
}

.title {
  .el-button {
    float: left;
  }
  font-size: 24px;
  color: #333;
  font-weight: bold;
}

.main-title {
  text-align: left;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 16px;
}

.basic-container {
  .el-col {
    display: flex;
    justify-content: flex-start;
    font-size: 16px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 10px;
  }
}

.describe {
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin-bottom: 16px;
  text-align: left;
}

.chart-report {
  margin-bottom: 18px;
  .chart {
    height: 296px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.04);
    border-radius: 8px;
  }
}

.config {
  padding: 20px 14px 19px 18px;
  text-align: left;
}

.recommend {
  @include flex-row;
  margin-top: 30px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);

  span {
    font-size: 24px;
  }

  .el-col {
    text-align: center;
  }

  .el-row {
    align-items: flex-end;
    margin-bottom: 28px;
  }
}

.line {
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 10px;
}

.data-show {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
}

.model-control {
  display: flex;
  flex-wrap: wrap;
}

.model-box {
  box-sizing: border-box;
  margin: 20px 8px 0 0;
  float: left;
}

.model-example {
  text-align: left;
  color: #333;
  font-size: 24px;
  margin-top: 20px;
}
</style>
