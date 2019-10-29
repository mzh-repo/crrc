<template>
  <el-container class="report-container">
    <el-row class="main-title">
      {{reportData.name}}
    </el-row>
    <el-row class="basic-container">
      <el-col :span="6">
        适用场景: {{reportData.scene}}
      </el-col>
      <el-col :span="6">
        适用数据集: {{reportData.dateSetName}}
      </el-col>
      <el-col :span="6">
        部署实例总次数: {{reportData.total}} 次
      </el-col>
    </el-row>
    <el-row class="describe">
      简介: {{reportData.describe}}
    </el-row>
    <el-row :gutter="16"
            class="chart-report">
      <el-col :span="9">
        <div class="chart">
          <bar-chart title="近期训练"
                     :dataSet="trainData"
                     :tooltipList="['训练Loss','测试Loss']"
                     :showTip=true
                     :showXAxis="false"
                     xName="id"
                     yName="Loss" />
        </div>
      </el-col>
      <el-col :span="9">
        <div class="chart">
          <bar-chart title="近期应用"
                     :colors="colors"
                     :dataSet="appData"
                     :showTip=true
                     :showXAxis="false"
                     xName="id"
                     yName="Loss" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="chart">
          <div class="config">
            <!-- <el-tag type="primary"
                    size="mini">推荐配置
            </el-tag> -->
            <el-row class="">推荐配置</el-row>
            <el-row class="recommend">
              <el-col v-for="(item,index) in configList"
                      align="left"
                      :key="index"
                      :span="6">
                <el-row><span>{{item.value}}</span> {{item.unit}}</el-row>
                <el-row>{{item.name}}</el-row>
              </el-col>
            </el-row>
            <div class="line"></div>
            <div class="data-show">
              <div>数据量</div>
              <div>{{reportData.line}}条</div>
            </div>
            <div class="data-show">
              <div>大小</div>
              <div>{{unitConvert(reportData.size)}}M</div>
            </div>
            <div class="data-show">
              <div>使用框架</div>
              <div>{{reportData.frame}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="model-example">相关实例</el-row>
    <el-row class="model-control">
      <template v-for="(item,index) in modelList">
        <div :key="index"
             class="model-box"
             @click="getForecast(item.dataset_id,item.status)">
          <instance :chose="false"
                    :status="item.status"
                    :title="item.name"
                    :lately="item.loss"
                    :traning="item.training_time"
                    :datasetName="item.dataset_name"
                    :estimate="item.estimated_deployment_time" />

        </div>
      </template>
    </el-row>
  </el-container>
</template>

<script>
import Instance from '@/components/instance.vue';
import BarChart from '@/components/barChart.vue';

export default {
  components: { Instance, BarChart },
  data() {
    return {
      appData: {},
      trainData: {},
      reportData: this.$store.state.reportData,
      colors: ['#00C4C0', '#8FD866'],
      configList: [
        {
          name: '轮次',
          value: this.$store.state.reportData.config.rounds,
          unit: '次',
        },
        {
          name: '内存',
          value: this.$store.state.reportData.config.ram,
          unit: 'M',
        },
        {
          name: 'CPU',
          value: this.$store.state.reportData.config.cpu,
          unit: '个',
        },
        {
          name: 'GPU',
          value: this.$store.state.reportData.config.gpu,
          unit: 'M',
        },
      ],
      total: 100,
      size: 34.2,
      frame: 'keras',
      modelList: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios
        .get(`/form/recent?id=${this.$store.state.trainSelected}`)
        .then((res) => {
          this.appData = res.application;
          this.trainData = res.train;
        });
      this.$axios
        .get(
          `model/instance/list?model_id=${this.$store.state.trainSelected || 1}`,
        )
        .then((res) => {
          this.modelList = res;
        });
    },
    unitConvert(data) {
      return (data / 1024 / 1024).toFixed(1);
    },
    getForecast(id, status) {
      if (status === 1) {
        this.$store.commit('setModelDatasetId', id);
        this.$router.push({
          path: `/modelPublish/modelPublishForecast?id=${
            this.$store.state.trainSelected
          }`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.report-container {
  @include flex-column;
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
