<template>
  <div>
    <!-- <el-row class="tab-container">
      <span v-for="(item,index) in tabList"
            :key="index"
            :class="tabId === item.id ? 'active': ''"
            @click="chooseTab(item.id)">
        {{item.name}}
      </span>
    </el-row> -->
    <el-row class="title">
      <div class="dot"></div>
      <div>最大旅行速度</div>
    </el-row>
    <el-row class="progress">
      储能系统性能衰减度 &nbsp;
      <el-col :xs="8"
              :sm="6"
              :md="3"
              :lg="3"
              :xl="3">
        <el-progress :percentage="percent"
                     :stroke-width="18">
        </el-progress>
      </el-col>
    </el-row>
    <el-row class="progress">
      文本解释判据: {{explain}}
    </el-row>
    <el-row class="target">
      <el-col>
        <el-row>
          模型如下：
        </el-row>
        <markdown-it-vue :content="model" />
      </el-col>
      <el-col>
        <el-row>
          目标函数为：
        </el-row>
        <markdown-it-vue :content="targetFuc" />
      </el-col>
    </el-row>
    <el-row :gutter="19"
            class="chart-container chart-1">
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="手扳极位"
                    :lineData="lineData.force" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="能耗"
                    :lineData="lineData.power" />
        </div>
      </el-col>
    </el-row>
    <el-row class="speed-line">
      平均速度： {{speed}}km/s &nbsp;&nbsp;&nbsp; 总能耗: {{energy}}kwh
    </el-row>
    <move-train />
    <el-row :gutter="19"
            class="chart-container">
      <el-col :span="24">
        <div class="chart-box">
          <mzh-line title="手扳极位(实时)"
                    :lineData="dynasticDataOne" />
        </div>
      </el-col>
      <el-col :span="24">
        <div class="chart-box">
          <mzh-line title="能耗(实时)"
                    :lineData="dynasticDataTwo" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// AsciiMath 转换
import MarkdownItVue from 'markdown-it-vue';
import Line from '../components/line.vue';
import MovingTrain from '../components/movingTrain.vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';

export default {
  components: { 'mzh-line': Line, 'move-train': MovingTrain, MarkdownItVue },
  data() {
    return {
      // tabList: [
      //   { name: 'tabl', id: 1 },
      //   { name: 'tab2', id: 2 },
      //   { name: 'tab3', id: 3 },
      // ],
      // tabId: 1,
      percent: 80,
      explain:
        '利用长短期记忆网络求解列车运行过程多目标方程函数，搭建我们的LSTM（Long ShortTerm Memory Network.',
      model: '```AsciiMath\nF_(t+1)=h(S_(t-l+1),S_(t-l+2),⋯,S_t )\n```',
      targetFuc:
        '```AsciiMath\nL= ||F_{t+1}-F_{t+1} ||^2+α||F_(t+1) v_(t+1) ||^2\n```',
      speed: 10,
      energy: 10,
      lineData: {
        force: [],
        power: [],
      },
      dynasticDataOne: {
        date_list: [],
        data_list: [],
        predict_data_list: [],
      },
      dynasticDataTwo: {
        date_list: [],
        data_list: [],
        predict_data_list: [],
      },
      dynasticData: {},
      type: 3, // 2 间歇式, 3 非接触式
      time: '',
    };
  },
  mounted() {
    // this.getLineData();
    // this.getDynastic();
    const { dataBase } = this.$store.state;
    if (dataBase === 1) {
      this.type = 2;
    } else {
      this.type = 3;
    }
    this.getData();
  },
  methods: {
    // chooseTab(e) {
    //   this.tabId = e;
    // },
    // getLineData() {
    //   this.$axios.get('form/deployment?id=111').then((res) => {
    //     this.lineData = res;
    //   });
    // },
    // getDynastic() {
    //   this.time = setTimeout(() => {
    //     this.$axios.get('form/deployment?id=111').then((res) => {
    //       this.dynasticData = res;
    //     });
    //     this.getDynastic();
    //   }, 1000);
    // },
    // getData() {
    //   this.$axios.get(`form/graph?model_type=${this.type}`).then((res) => {
    //     this.lineData.force = res.level;
    //     this.lineData.power = res.energy_consumption;
    //   });
    // },
    getData() {
      this.$axios.get(`form/graph?model_type=${this.type}`).then((res) => {
        this.lineData.force = res.level;
        this.lineData.power = res.energy_consumption;
        this.renderData(res);
      });
    },
    renderData(val) {
      for (let i = 0; i < val.level.data_list.length; i += 1) {
        this.time = setTimeout(() => {
          const data = {
            data_list: this.dynasticDataOne.data_list.concat(
              val.level.data_list[i],
            ),
            predict_data_list: this.dynasticDataOne.predict_data_list.concat(
              val.level.predict_data_list[i],
            ),
          };
          const powerData = {
            data_list: this.dynasticDataTwo.data_list.concat(
              val.energy_consumption.data_list[i],
            ),
            predict_data_list: this.dynasticDataTwo.predict_data_list.concat(
              val.energy_consumption.predict_data_list[i],
            ),
          };
          this.dynasticDataOne = data;
          this.dynasticDataTwo = powerData;
        }, 1000);
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.time);
  },
};
</script>

<style lang="scss" scoped>
.tab-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  margin-bottom: 30px;

  span {
    margin-right: 40px;
    cursor: pointer;

    &.active {
      font-weight: 600;
      transform: scale(1.15);
      transition: all 0.3s;
    }
  }
}

.title {
  height: 49px;
  font-size: 18px;
  font-weight: normal;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  padding: 12px 0;
  margin-bottom: 24px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;

  .dot {
    width: 6px;
    height: 6px;
    background: rgba(51, 51, 51, 1);
    border-radius: 50%;
    margin-right: 9px;
  }
}

.progress {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 400;
  text-align: left;
  color: rgba(51, 51, 51, 1);

  .el-col {
    text-align: left;

    /deep/ .el-progress-bar__inner {
      background-color: #ff2b2b;
    }

    /deep/ .el-progress-bar__outer {
      background-color: #d8d8d8;
    }
  }
}

.target {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;
  font-weight: 400;
  text-align: left;
  color: rgba(51, 51, 51, 1);

  .el-col {
    display: inline-flex;
    line-height: 30px;
    align-items: center;
  }
}

.chart-container {
  height: 318px;
  margin-top: 60px;

  &.chart-1 {
    margin-bottom: 30px;
  }

  .chart-box {
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 16px 16px 0;
    margin-bottom: 30px;
  }
}

.speed-line {
  text-align: left;
  height: 25px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  margin-bottom: 103px;
}
</style>
