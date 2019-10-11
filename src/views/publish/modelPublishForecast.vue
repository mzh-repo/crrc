<template>
  <el-container class="container">
    <div class="title">
      <div class="title-left">
        <span>{{this.$store.state.modelSelected.name}}预测</span>
        <span>实例{{this.$store.state.exampleSelected.name||'1908231434'}}</span>
      </div>
      <div class="title-right">
        <span>更新时间: {{date||'2019.09.11'}} {{time||'19:00:00'}}</span>
        <span>当前时间: {{date||'2019.09.11'}} {{time||'19:00:00'}}</span>
      </div>
    </div>
    <div class="forecast-data">
      <span>平均预测时间: {{'1'}}s</span>
      <span>预测总次数: {{'128'}}次</span>
      <span>预测总数据大小: {{'128'}}M</span>
    </div>
    <el-row v-if="result === 1"
            class="line-area">
      <el-col :span="8">
        <div class="chart-wrapper">
          <Mzh-line :lineData="lineData.power"
                    :title="'能耗对比 kW·h'"
                    :yTitle="'预测'" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <Mzh-line :lineData="lineData.speed"
                    :title="'速度 km/h'" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper nopadding">
          <Mzh-line :lineData="lineData.force"
                    :title="'牵引力 KN'" />
        </div>
      </el-col>
    </el-row>
    <el-row v-if="result === 2"
            class="recommend-battery">
      <el-col v-for="(item,index) in recommendBattery"
              :span="12"
              :key="index">
        <el-row>{{item.title}}</el-row>
        <el-row>{{item.recommendNum}}</el-row>
        <el-row>实际 {{item.actualNum}}</el-row>
      </el-col>
    </el-row>
    <el-row v-if="result === 3"></el-row>
    <el-row v-if="result === 4">
      <forcecast-one />
    </el-row>
    <el-row v-if="result === 5">
      <forcecast-two />
    </el-row>
    <el-row v-if="result === 6">
      <forcecast-three />
    </el-row>
    <Mzh-table v-if="result === 1 || result ===2 || result === 3" />
  </el-container>
</template>

<script>
import line from './components/line.vue';
import Mzhtable from '../../components/table.vue';
import forecastOne from './result/forecast1.vue';
import forecastTwo from './result/forecast2.vue';
import forecastThree from './result/forecast3.vue';

export default {
  components: {
    'Mzh-table': Mzhtable,
    'Mzh-line': line,
    'forcecast-one': forecastOne,
    'forcecast-two': forecastTwo,
    'forcecast-three': forecastThree,
  },
  data() {
    return {
      lineData: {},
      resettime: false,
      date: '',
      time: '',
      result: 6,
      recommendBattery: [
        {
          title: '推荐电池串联数',
          recommendNum: 356,
          actualNum: 349,
        },
        {
          title: '推荐电池并联数',
          recommendNum: 6,
          actualNum: 10,
        },
      ],
    };
  },
  mounted() {
    this.getLineData();
    this.b();
    const nowDate = new Date();
    this.date = `${nowDate.getFullYear()}-${nowDate.getMonth()
      + 1}-${nowDate.getDate()}`;
    this.time = `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`;
  },
  methods: {
    b() {
      if (!this.resettime) {
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
  beforeDestroy() {
    this.resettime = true;
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
/deep/.el-col-8 {
  padding: 0 16px 16px 2px;
}
/deep/.el-col-8:nth-child(3) {
  padding: 0 2px 16px 0;
}
.line-area {
  width: 100%;
  margin-bottom: 30px;
  height: 300px;
}

.recommend-battery {
  width: 100%;
  height: 225px;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  border: 1px solid rgba(225, 225, 225, 1);
  padding: 36px 62px;
  display: flex;
  justify-content: flex-start;

  .el-row {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
