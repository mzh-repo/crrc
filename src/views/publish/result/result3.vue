<template>
  <!-- <el-container class="forcast-container">
    <el-row :gutter="16">
      <el-col :span="24">
        <div class="early-warning">
          <span>状态监测</span>
          <el-row>原始指标</el-row>
          <div class="early-data">
            <div v-for="(item, index) in earlyList"
                 :key="index"
                 :class="getColor(Number(item.abnormal))"
                 class="early">
              <el-row>{{ item.name }}</el-row>
              <el-row>{{ item.value }}</el-row>
            </div>
          </div>
          <el-row>健康评估指标</el-row>
          <div class="early-data">
            <el-col v-for="(item, index) in healthList"
                    :key="index"
                    :span="8"
                    :class="getColor(item.value)"
                    class="early normal">
              <el-row>{{ item.name }}</el-row>
              <el-row>{{ item.value }}</el-row>
            </el-col>
          </div>
          <el-row>故障概率</el-row>
          <div class="error-box">{{ type === 0 ? '11.85' : '5.63' }}<span>(%)</span></div>
          <el-row>检修里程</el-row>
          <div class="error-box">{{ type === 0 ? '264.45' : '283.11' }}<span>(km)</span></div>
        </div>
      </el-col>
    </el-row>
    <div v-if="type === 0"
         class="strategy-box">
      <span>检修策略</span>
      <el-row v-html="strategy"></el-row>
    </div>
    <el-row style="padding-top: 40px">
      <el-button @click="goCase">查看实例报告</el-button>
    </el-row>
  </el-container> -->
  <div class="status-container">
    <el-row class="title">状态监测</el-row>
    <el-row class="sub-title">储能电源1原始指标</el-row>
    <el-row :gutter="20">
      <el-col v-for="(item,index) in 3"
              :key="index"
              :span="8">
        <div class="status-box">
          <Chart />
        </div>
      </el-col>
    </el-row>
    <el-row class="sub-title">储能电源2原始指标</el-row>
    <el-row :gutter="20">
      <el-col v-for="(item,index) in 3"
              :key="index"
              :span="8">
        <div class="status-box">
          <Chart />
        </div>
      </el-col>
    </el-row>
    <el-row class="sub-title">储能电源3原始指标</el-row>
    <el-row :gutter="20">
      <el-col v-for="(item,index) in 3"
              :key="index"
              :span="8">
        <div class="status-box">
          <Chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18"
              class="sub-title">
        <el-row class="sub-title">健康评估指标</el-row>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in 6"
                  :key="index"
                  :span="8">
            <div class="gauge-box">
              <Gauge />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6"
              class="sub-title">
        <el-row class="sub-title">告警记录</el-row>
        <el-row class="record"></el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="error">
          <el-row>故障概率</el-row>
          <div class="error-box">{{ type === 0 ? '11.85' : '5.63' }}<span>(%)</span></div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="error">
          <el-row>检修里程</el-row>
          <div class="error-box">{{ type === 0 ? '264.45' : '283.11' }}<span>(km)</span></div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row>检修策略</el-row>
        <div v-if="type === 0"
             class="strategy-box">
          <el-row v-html="strategy"></el-row>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding-top: 40px">
      <el-button @click="goCase">查看实例报告</el-button>
    </el-row>
  </div>
</template>

<script>
import Chart from '../components/statusChart.vue';
import Gauge from '@/components/dashboardChart.vue';

export default {
  components: {
    Chart,
    Gauge,
  },
  data() {
    return {
      strategy: '',
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
      number: [],
      type: 0, // 模型类型: 0 间歇式, 1 非接触式
      time: null, // 定时器
    };
  },
  mounted() {
    if (this.time) {
      clearTimeout(this.time);
    }
    const dataBase = sessionStorage.getItem('dataBaseId');
    if (Number(dataBase) === 1) {
      this.type = 0;
      // this.getStrategy();
      this.strategy =
        '某个电芯温度比其他电芯高20℃，则该电芯内阻过大需要更换电池模组';
    } else {
      this.type = 1;
    }
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
        this.number = res.probably;
        this.earlyList = res.monitor;
        this.healthList = res.healthy;
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
    // 检修策略对应 Map
    // TODO
    getStrategy() {
      this.$axios.get('/maintenance_policy').then();
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
}

.record {
  background: #fff;
  border-radius: 6px;
  height: 420px;
}
</style>
