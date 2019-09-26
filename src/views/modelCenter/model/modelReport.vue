<template>
  <el-container class="report-container">
    <el-row class="main-title">
      车载储能系统性能劣化条件下的列车运行控制模型
    </el-row>
    <el-row class="basic-container">
      <el-col :span="6">
        适用场景: {{reportData.scene}}
      </el-col>
      <el-col :span="6">
        适用数据集: {{reportData.suitDataSet}}
      </el-col>
      <el-col :span="6">
        部署实例总次数: {{reportData.example}} 次
      </el-col>
    </el-row>
    <el-row class="describe">
      简介: {{reportData.describe}}
    </el-row>
    <el-row :gutter="16"
            class="chart-report">
      <el-col :span="10">
        <div class="chart">
          <bar-chart />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="chart">
          <bar-chart :colors="colors" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="chart">
          <div class="config">
            <el-tag type="primary"
                    size="mini">推荐配置
            </el-tag>
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
              <div>{{total}}M</div>
            </div>
            <div class="data-show">
              <div>大小</div>
              <div>{{size}}MB</div>
            </div>
            <div class="data-show">
              <div>使用框架</div>
              <div>{{frame}}M</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="17">
      <el-col :span="6">
        <instance />
      </el-col>
      <el-col :span="6">
        <instance />
      </el-col>
      <el-col :span="6">
        <instance />
      </el-col>
      <el-col :span="6">
        <instance />
      </el-col>
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
      reportData: {
        scene: '列车运行控制',
        suitDataSet: '间歇式供电列车行车数据集',
        example: '188',
        describe:
          '对非接触供电列车的储能系统、供电系统、牵引系统、制动系统等进行建模，对相应各系统的容量配置、关键部件选型、关键参数进行优化。',
      },
      colors: ['#00C4C0', '#8FD866'],
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
      total: 100,
      size: 34.2,
      frame: 'keras',
    };
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
.report-container {
  @include flex-column;

  .el-row {
    display: flex;
    justify-content: flex-start;
  }
}

.main-title {
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  font-size: 24px;
  margin-top: 53px;
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
</style>
