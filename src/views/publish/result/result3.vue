<template>
  <div class="status-container"
       v-loading="showLoading">
    <el-row class="title">状态监测</el-row>
    <el-row class="sub-title">原始指标</el-row>
    <el-row :gutter="20">
      <el-col v-for="(item,index) in earlyList"
              :key="index"
              :span="8">
        <div class="status-box">
          <Chart :title="item.name+ ':'+item.value"
                 :nowValue="item.value"
                 :threshold="item.threshold"
                 :update="new Date()" />
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
          <el-row v-for="(item,index) in recordList"
                  :key="index"
                  class="record-box">
            <el-col :span="14">{{item.name}}</el-col>
            <el-col :span="10">{{item.time}}</el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="error">
          <el-row>故障概率</el-row>
          <div class="error-box">{{errorProbably}}<span>(%)</span></div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="error">
          <el-row>检修里程</el-row>
          <div class="error-box">{{ errorDistance }}<span>(km)</span></div>
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
    };
  },
  mounted() {
    if (this.time) {
      clearTimeout(this.time);
    }
    const dataBase = sessionStorage.getItem('dataBaseId');
    if (Number(dataBase) === 1) {
      this.type = 0;
    } else {
      this.type = 1;
    }
    this.showLoading = true;
    this.round();
  },
  methods: {
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
    round() {
      this.time = setTimeout(() => {
        this.getData();
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
  padding: 30px;
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
  margin-top: 30px;
  font-size: 30px;
  display: flex;
  align-items: baseline;
  justify-content: center;

  span {
    font-size: 16px;
  }
}

.strategy-box {
  margin-top: 30px;
  font-size: 18px;
  display: flex;
  justify-content: flex-start;
}
</style>
