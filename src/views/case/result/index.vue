<template>
  <el-container class="container">
    <div class="title">
      <div class="title-left">
        <span>{{ this.$store.state.reportData.name }}</span>
      </div>
    </div>
    <div class="forecast-data title-1">
      车次: {{ databasetype == 1 ? "间歇式供电列车" : "非接触式供电列车" }}
    </div>
    <div class="forecast-data">行车线路: 香山——颐和园南门</div>
    <div class="forecast-data">
      <span>预测总数据大小: {{ "128" }}M</span>
    </div>
    <el-row v-if="result === 0"
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
    <el-row v-if="result === 3"
            class="forcecast-container">
      <forcecast-one />
    </el-row>
    <el-row v-if="result === 4"
            class="forcecast-container">
      <forcecast-two :result-type="type" />
    </el-row>
    <el-row v-if="result === 5"
            class="forcecast-container">
      <forcecast-three />
    </el-row>
    <Mzh-table v-if="result === 0 || result === 1 || result === 2" />
  </el-container>
</template>

<script>
import line from '../components/line.vue';
import Mzhtable from '../../../components/table.vue';
import forecastOne from './result1.vue';
import forecastTwo from './result2.vue';
import forecastThree from './result3.vue';

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
      lineData: {
        power: [],
        speed: [],
        force: [],
      },
      resettime: '',
      date: '',
      time: '',
      result: 3,
      recommendBattery: [
        {
          title: '推荐电池串联数',
          recommendNum: 358,
          actualNum: 349,
        },
        {
          title: '推荐电池并联数',
          recommendNum: 6,
          actualNum: 10,
        },
      ],
      modelId: '',
      databaseType: 1,
      type: 1, // 区分 列车运行控制 A和 B 对应的结果集
    };
  },
  mounted() {
    // 车次
    this.databasetype = this.$store.state.dataBase;
    // TODO: 获取不同模型的id 或 类型
    if (this.$route.query.id) {
      this.modelId = Number(this.$route.query.id);
    } else {
      this.modelId = this.$store.state.modelSelected.id;
    }
    if (this.modelId === 1 || this.modelId === 2) {
      // 列车运行控制  A
      this.result = 4;
    } else if (this.modelId === 3 || this.modelId === 4) {
      // 故障预警
      this.result = 5;
    } else if (this.modelId === 5 || this.modelId === 6) {
      // 列车运行控制  C
      this.result = 3;
    } else if (this.modelId === 7 || this.modelId === 8) {
      // 列车运行控制  B
      this.result = 4;
      this.type = 2;
    } else {
      this.result = 0;
      this.b();
    }
    // this.getRandom();
    // this.b();
    const nowDate = new Date();
    this.date = `${nowDate.getFullYear()}-${nowDate.getMonth()
      + 1}-${nowDate.getDate()}`;
    this.time = `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`;
  },
  methods: {
    // 随机模型预测结果
    getRandom() {
      const random = Math.floor((Math.random() * 100) % 6);
      this.result = random;
      if (this.result === 0) {
        this.b();
      }
    },
    b() {
      // if (!this.resettime) {
      //   setTimeout(() => {
      //     this.getLineData();
      //     this.b();
      //   }, 1000);
      // }
      this.resettime = setTimeout(() => {
        this.getLineData();
        this.b();
      }, 1000);
    },
    getLineData() {
      this.$axios.get('form/deployment?id=111').then((res) => {
        this.lineData = res;
      });
    },
  },
  beforeDestroy() {
    // this.resettime = true;
    clearTimeout(this.resettime);
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
  // margin: 27px 0;
  margin-bottom: 10px;
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

  .el-row {
    text-align: left;

    &:first-child {
      font-size: 18px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }

    &:nth-child(2) {
      height: 84px;
      font-size: 60px;
      font-weight: 600;
      color: rgba(72, 72, 180, 1);
      line-height: 84px;
    }

    &:nth-child(3) {
      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 33px;
    }
  }
}

.forcecast-container {
  @include set-size(100%);
}

.title-1 {
  margin-top: 20px;
}
</style>
