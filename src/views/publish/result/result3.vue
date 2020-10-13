<template>
  <div class="status-container"
       v-loading="showLoading">
    <el-row class="result-tab">
      <el-tabs v-model="resultId">
        <template v-for="(item, index) in resultList">
          <el-tab-pane :key="index"
                       :label="item"
                       :name="index.toString()"> </el-tab-pane>
        </template>
      </el-tabs>
    </el-row>
    <template v-if="resultId === '0'">
      <el-row class="sub-title">原始指标</el-row>
      <el-row :gutter="20">
        <el-col v-for="(item,index) in earlyList"
                :key="index"
                :span="8">
          <div class="status-box">
            <Chart :title="item.name+ ':'+item.value"
                   :warning="Number(item.value) > Number(item.threshold)"
                   :nowValue="formatData(item.value)"
                   :threshold="formatData(item.threshold)" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18"
                class="sub-title">
          <el-row class="sub-title">健康评估指标</el-row>
          <el-row :gutter="20">
            <el-col v-for="(item,index) in healthList"
                    :key="index"
                    :span="8">
              <div class="gauge-box">
                <el-row class="gauge-title">{{item.name}}</el-row>
                <Gauge :dataSet="item" />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6"
                class="sub-title">
          <el-row class="sub-title">告警记录</el-row>
          <el-row class="record">
            <template v-if="recordList.length > 0">
              <el-row v-for="(item,index) in recordList"
                      :key="index"
                      class="record-box">
                <el-col :span="14">{{item.name}}</el-col>
                <el-col :span="10">{{item.time}}</el-col>
              </el-row>
            </template>
            <template v-else>
              暂无数据
            </template>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="error">
            <el-row>故障概率</el-row>
            <!-- <div class="error-box">{{errorProbably}}<span>(%)</span></div> -->
            <div class="error-box">A级故障概率: {{rateList[0]}}</div>
            <div class="error-box">B级故障概率: {{rateList[1]}}</div>
            <div class="error-box">C级故障概率: {{rateList[2]}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="error">
            <el-row>检修里程</el-row>
            <!-- <div class="error-box">{{ errorDistance }}<span>(km)</span></div> -->
            <div class="error-instance">{{fixTip}}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="error">
            <el-row>检修策略</el-row>
            <div class="strategy-box">
              {{strategy}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex"
              justify="center"
              style="padding-top: 40px">
        <el-button @click="goCase">查看实例报告</el-button>
      </el-row>
    </template>
    <template v-else>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="status-box">
            <Chart :title="speedData.name+':'+speedData.value"
                   :warning="Number(speedData.value) > Number(speedData.threshold)"
                   :nowValue="formatData(speedData.value)"
                   :threshold="formatData(speedData.threshold)" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="status-box">
            <Chart title="构架温度"
                   :warning="Number(tempData1.value) > Number(tempData1.threshold)"
                   :nowValue="formatData(tempData1.value)"
                   :nowValue2="formatData(tempData2.value)"
                   :nowValue3="formatData(tempData3.value)"
                   :nowValue4="formatData(tempData4.value)"
                   :threshold="formatData(tempData1.threshold)"
                   :legend="['阈值',
                      tempData1.name, tempData2.name, tempData3.name, tempData4.name]" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="temp-box">
        <el-col v-for="(item,index) in tempList"
                :key="index"
                :span="6">
          <div class="gauge-box">
            <el-row class="gauge-title">{{item.name}}</el-row>
            <Gauge :dataSet="item"
                   :max="200" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="error">
            <el-row>线圈位置</el-row>
            <div class="error-instance">{{tempTitle}}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="error">
            <el-row>列车运行控制建议</el-row>
            <div class="error-instance">{{tempTip}}</div>
          </div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import Gauge from '@/components/dashboardChart.vue';
import Chart from '../components/statusChart.vue';

export default {
  components: {
    Chart,
    Gauge,
  },
  data() {
    return {
      newsList: [],
      earlyList: [],
      healthList: [],
      lineDataOne: {
        validation_list: [],
      },
      lineDataTwo: {
        data_list: [],
        validation_list: [],
        record_list: [],
      },
      type: 0, // 模型类型: 0 间歇式, 1 非接触式
      time: null, // 定时器
      recordList: [],
      errorProbably: '', // 故障概率
      errorDistance: '', // 检修里程
      strategy: '', // 检修策略
      showLoading: false,
      initTime: null,
      rateList: [],
      fixTip: '',
      resultId: '0', // 劣化tab 初始值   activeTb must be string
      resultList: [],
      speedData: {},
    };
  },
  mounted() {
    if (this.time) {
      clearTimeout(this.time);
    }
    const dataBase = sessionStorage.getItem('dataBaseId');
    if (Number(dataBase) === 1) {
      this.resultList = ['状态监测'];
      this.type = 0;
      this.rateList = ['0.00%', '0.01%', '需检修'];
      this.fixTip = '需检修';
    } else {
      this.resultList = ['供电系统故障预警', '转向架异常温升监测及预警'];
      this.type = 1;
      this.rateList = ['0.00%', '0.00%', '0.03%'];
      this.fixTip = '35329km';
    }
    this.showLoading = true;
    this.round();
  },
  methods: {
    formatData(val) {
      if (!this.initTime) {
        this.initTime = new Date().valueOf();
      }
      // return [new Date().valueOf() % this.initTime, Number(val)];
      return [new Date().valueOf(), Number(val)];
    },
    getColor(index) {
      switch (index) {
        case 0:
          return 'normal';
        case 1:
          return 'abnormal';
        case 2:
          return 'dangerous';
        default:
          return '';
      }
    },
    getData() {
      this.$axios.get(`form/graph?model_type=${this.type}`).then((res) => {
        this.showLoading = false;
        this.earlyList = res.monitor;
        this.errorProbably = res.error_probability;
        this.errorDistance = res.error_distance;
        this.strategy = res.maintenance_strategy;
        this.healthList = res.healthy;

        const date = new Date();
        res.monitor.forEach((item) => {
          if (item.abnormal === '2') {
            const data = {};
            data.name = `${item.name} 异常`;
            data.time = this.covertDate(date);
            this.recordList.unshift(data);
          }
        });
        this.recordList = this.recordList.splice(0, 8);
      });
    },
    getOther() {
      this.$axios.get('form/graph?model_type=10').then((res) => {
        /* eslint-disable prefer-destructuring */
        this.speedData = res.data[0];
        this.tempData1 = res.data[2];
        this.tempData2 = res.data[4];
        this.tempData3 = res.data[6];
        this.tempData4 = res.data[8];
        this.tempList = [res.data[3], res.data[5], res.data[7], res.data[9]];
        if (Number(res.data[10].value) === 0) {
          this.tempTitle = '当前无感应线圈';
        } else {
          this.tempTitle = `到线圈终点的距离${res.data[1].value}m`;
        }
        const tipMap = ['无', '加速通过感应供电区段', '降低感应供电线圈功率'];
        this.tempTip = tipMap[res.data[11].value];
      });
    },
    round() {
      this.time = setTimeout(() => {
        if (this.resultId === '0') {
          this.getData();
        } else {
          this.getOther();
        }
        this.round();
      }, 1000);
    },
    covertDate(date) {
      return `${date.getFullYear()}/${this.convertNum(
        date.getMonth() + 1,
      )}/${this.convertNum(date.getDate())}
         ${this.convertNum(date.getHours())}:
         ${this.convertNum(date.getMinutes())}:
         ${this.convertNum(date.getSeconds())}`;
    },
    convertNum(val) {
      if (val >= 10) {
        return val;
      }
      return `0${val}`;
    },
    goCase() {
      this.$router.push('/report');
    },
  },
  beforeDestroy() {
    clearTimeout(this.time);
    this.time = null;
  },
};
</script>

<style lang="scss" scoped>
.status-container {
  text-align: left;
}

.title {
  font-size: 28px;
  font-weight: 600;
}

.sub-title {
  font-size: 18px;
  font-weight: 400;
  margin: 10px auto;
}

.status-box {
  background: #fff;
  border-radius: 6px;
  height: 280px;
}

.gauge-box {
  background: #fff;
  border-radius: 6px;
  height: 200px;
  padding-top: 20px;
}

.gauge-title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.record {
  background: #fff;
  border-radius: 6px;
  height: 456px;
  padding: 30px 10px;
  overflow: scroll;
}

.record-box {
  display: flex;
  padding: 10px 0;
  font-size: 16px;
  line-height: 25px;
  border-bottom: 1px solid #d8d8d8;

  .el-col {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;

    &:last-child {
      font-size: 12px;
      color: #999;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.error {
  height: 140px;
  padding: 30px;
  background: #fff;
  border-radius: 8px;

  .el-row {
    font-weight: 500;
    font-size: 24px;
  }
}

.error-box {
  margin-top: 10px;
  font-size: 20px;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.error-instance {
  margin-top: 30px;
  font-size: 28px;
  text-align: center;
}

.strategy-box {
  margin-top: 30px;
  font-size: 18px;
  display: flex;
  justify-content: flex-start;
}

.result-tab {
  text-align: left;
  height: 50px;
  font-size: 24px;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;

    .el-tabs__item {
      font-size: 24px;
    }
  }
}

.temp-box {
  margin: 16px 0;
}
</style>
