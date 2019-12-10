<template>
  <div>
    <el-row class="result-tab">
      <el-tabs v-model="resultName"
               @tab-click="chooseResult">
        <template v-for="(item, index) in resultList">
          <el-tab-pane :key="index"
                       :label="item.name"
                       :name="item.name"> </el-tab-pane>
        </template>
      </el-tabs>
    </el-row>
    <el-row class="progress">
      储能系统性能衰减度 &nbsp;
      <el-col :xs="8"
              :sm="6"
              :md="3"
              :lg="3"
              :xl="3">
        <el-progress :percentage="percent"
                     :stroke-width="18"> </el-progress>
      </el-col>
    </el-row>
    <el-row class="progress"> 文本解释判据: {{ explain }} </el-row>
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
          <mzh-line title="手柄级位"
                    :yArea="yArea"
                    :lineData="lineData.force" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <power-line title="能耗 kW·h"
                      :legend="legend"
                      :lineData="lineData.power" />
        </div>
      </el-col>
    </el-row>
    <!-- <el-row class="speed-line">
      预测能耗(实际级位)与实际能耗(实际级位)平均差异：{{lineData.power.ratio}}
    </el-row> -->
    <el-button id="scroll"
               @click="goDynastic">实时运行图表</el-button>
    <el-button @click="goCase">查看实例报告</el-button>
    <div class="tips">
      预估能耗为原来<span>{{ number }}%</span>
    </div>
    <template v-if="showDynastic">
      <template v-if="showAgain">
        <template v-if="resultType === 2">
          <move-train :current="current" />
        </template>
        <template v-else>
          <move-train />
        </template>
      </template>
      <el-row :gutter="19"
              class="chart-container">
        <el-col :span="24">
          <div class="chart-box">
            <mzh-line title="手柄级位(实时)"
                      :yArea="yArea"
                      :lineData="dynasticDataOne" />
          </div>
        </el-col>
        <el-col :span="24">
          <div class="chart-box">
            <power-line title="能耗(实时) kW·h"
                        :legend="legend"
                        :lineData="dynasticDataTwo" />
          </div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
// AsciiMath 转换
import MarkdownItVue from 'markdown-it-vue';
import Line from '../components/line.vue';
import MovingTrain from '../components/movingTrain.vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import PowerLine from '../components/powerLine.vue';

export default {
  components: {
    'mzh-line': Line,
    'move-train': MovingTrain,
    MarkdownItVue,
    PowerLine,
  },
  props: {
    resultType: {
      type: Number,
    },
  },
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
        '利用长短期记忆网络求解列车运行过程多目标方程函数，搭建我们的LSTM（Long ShortTerm Memory Network)',
      model: '```AsciiMath\nF_(t+1)=h(S_(t-l+1),S_(t-l+2),⋯,S_t )\n```',
      targetFuc:
        '```AsciiMath\nL= ||F_{t+1}-\\tilde{F}_{t+1}||^2-α||F_(t+1)||-β||F_(t+1)||^2\n```',
      speed: 10,
      energy: 10,
      lineData: {
        force: {},
        power: {},
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
        green: [],
      },
      dynasticData: {},
      type: 3, // 2 间歇式, 3 非接触式
      time: [],
      timer: [],
      legend: [
        '预测能耗(预测级位)',
        '实际能耗(实际级位)',
        '预测能耗(实际级位)',
      ],
      resultName: '最佳能耗',
      resultList: [
        { name: '最佳能耗', id: 1 },
        { name: '最快旅行速度', id: 2 },
      ],
      showAgain: true,
      yArea: [],
      dataSetId: '',
      curent: 0,
      showDynastic: false,
      numberList: [],
      number: 82.87,
    };
  },
  mounted() {
    const { dataBase } = this.$store.state;
    if (dataBase === 1) {
      this.type = 2;
      this.numberList = ['82.87', '96.59'];
      // eslint-disable-next-line prefer-destructuring
      this.number = this.numberList[0];
      this.yArea = ['100', '-100'];
    } else {
      this.yArea = ['7', '-7'];
      this.numberList = ['93.64', '80.98'];
      // eslint-disable-next-line prefer-destructuring
      this.number = this.numberList[0];
      this.type = 3;
    }
    this.getData();
  },
  methods: {
    goDynastic() {
      this.showDynastic = true;
      this.$nextTick(() => {
        document
          .getElementById('scroll')
          .scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    },
    goCase() {
      this.$router.push('/report');
    },
    getData() {
      if (this.$store.state.modelDatasetId !== '') {
        this.dataSetId = this.$store.state.modelDatasetId;
      } else {
        this.dataSetId = this.$store.state.dataSelected;
      }
      this.$axios
        .get(`form/graph?model_type=${this.type}&dataset_id=${this.dataSetId}`)
        .then((res) => {
          this.lineData.force = res.level;
          this.lineData.power = res.energy_consumption;
          this.renderData(res);
        });
    },
    renderData(val) {
      const dataIndex = val.level.data_list.length;
      for (let i = 0; i < dataIndex; i += 1) {
        this.time[i] = setTimeout(() => {
          this.current = Math.ceil(((i + 1) / (dataIndex + 1)) * 100);
          if (i > 200) {
            this.dynasticDataOne.data_list.shift();
            this.dynasticDataOne.predict_data_list.shift();
            // this.dynasticDataOne.date_list.shift();
            this.dynasticDataTwo.data_list.shift();
            this.dynasticDataTwo.predict_data_list.shift();
            this.dynasticDataTwo.green.shift();
            // this.dynasticDataTwo.date_list.shift();
            const data = {
              data_list: [
                ...this.dynasticDataOne.data_list,
                val.level.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataOne.predict_data_list,
                val.level.predict_data_list[i],
              ],
            };
            const powerData = {
              data_list: [
                ...this.dynasticDataTwo.data_list,
                val.energy_consumption.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataTwo.predict_data_list,
                val.energy_consumption.predict_data_list[i],
              ],
              green: [
                ...this.dynasticDataTwo.green,
                val.energy_consumption.green[i],
              ],
            };
            this.dynasticDataOne = data;
            this.dynasticDataTwo = powerData;
          } else {
            const data = {
              data_list: [
                ...this.dynasticDataOne.data_list,
                val.level.data_list[i],
              ],

              predict_data_list: [
                ...this.dynasticDataOne.predict_data_list,
                val.level.predict_data_list[i],
              ],
            };
            const powerData = {
              data_list: [
                ...this.dynasticDataTwo.data_list,
                val.energy_consumption.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataTwo.predict_data_list,
                val.energy_consumption.predict_data_list[i],
              ],
              green: [
                ...this.dynasticDataTwo.green,
                val.energy_consumption.green[i],
              ],
            };
            this.dynasticDataOne = data;
            this.dynasticDataTwo = powerData;
          }
        }, 100 * i);
      }
    },
    // 不同结果集
    chooseResult() {
      this.showAgain = false;
      this.showAgain = false;
      for (let i = 0; i < this.lineData.force.data_list.length; i += 1) {
        clearTimeout(this.time[i]);
        clearTimeout(this.timer[i]);
      }
      this.dynasticDataOne = {
        date_list: [],
        data_list: [],
        predict_data_list: [],
      };
      this.dynasticDataTwo = {
        date_list: [],
        data_list: [],
        predict_data_list: [],
        green: [],
      };
      if (this.resultName === '最佳能耗') {
        // eslint-disable-next-line prefer-destructuring
        this.number = this.numberList[0];
        this.getData();
      } else {
        // eslint-disable-next-line prefer-destructuring
        this.number = this.numberList[1];
        this.getDataOther();
      }
      this.$nextTick(() => {
        this.showAgain = true;
      });
    },
    getDataOther() {
      if (this.$store.state.modelDatasetId !== '') {
        this.dataSetId = this.$store.state.modelDatasetId;
      } else {
        this.dataSetId = this.$store.state.dataSelected;
      }
      this.$axios
        .get(`form/graph?model_type=${this.type}&dataset_id=${this.dataSetId}`)
        .then((res) => {
          this.lineData.force = res.level_speed;
          this.lineData.power = res.energy_consumption_speed;
          this.renderDataOther(res);
        });
    },
    renderDataOther(val) {
      const dataIndex = val.level.data_list.length;
      for (let i = 0; i < val.level.data_list.length; i += 1) {
        this.timer[i] = setTimeout(() => {
          this.current = Math.ceil(((i + 1) / (dataIndex + 1)) * 100);
          if (i > 200) {
            this.dynasticDataOne.data_list.shift();
            this.dynasticDataOne.predict_data_list.shift();
            // this.dynasticDataOne.date_list.shift();
            this.dynasticDataTwo.data_list.shift();
            this.dynasticDataTwo.predict_data_list.shift();
            this.dynasticDataTwo.green.shift();
            // this.dynasticDataTwo.date_list.shift();
            const data = {
              data_list: [
                ...this.dynasticDataOne.data_list,
                val.level_speed.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataOne.predict_data_list,
                val.level_speed.predict_data_list[i],
              ],
            };
            const powerData = {
              data_list: [
                ...this.dynasticDataTwo.data_list,
                val.energy_consumption_speed.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataTwo.predict_data_list,
                val.energy_consumption_speed.predict_data_list[i],
              ],
              green: [
                ...this.dynasticDataTwo.green,
                val.energy_consumption_speed.green[i],
              ],
            };
            this.dynasticDataOne = data;
            this.dynasticDataTwo = powerData;
          } else {
            const data = {
              data_list: [
                ...this.dynasticDataOne.data_list,
                val.level_speed.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataOne.predict_data_list,
                val.level_speed.predict_data_list[i],
              ],
            };
            const powerData = {
              data_list: [
                ...this.dynasticDataTwo.data_list,
                val.energy_consumption_speed.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataTwo.predict_data_list,
                val.energy_consumption_speed.predict_data_list[i],
              ],
              green: [
                ...this.dynasticDataTwo.green,
                val.energy_consumption_speed.green[i],
              ],
            };
            this.dynasticDataOne = data;
            this.dynasticDataTwo = powerData;
          }
        }, 100 * i);
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.time);
    clearTimeout(this.timer);
    this.time = null;
    this.timer = null;
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
  margin-top: 20px;

  &.chart-1 {
    margin-bottom: 50px;
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
  margin-left: 50%;
  height: 25px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  // margin-bottom: 103px;
}

.result-tab {
  text-align: left;
  height: 50px;
  font-size: 24px;
  margin-bottom: 30px;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;

    .el-tabs__item {
      font-size: 24px;
    }
  }
}

.tips {
  text-align: right;
  font-size: 30px;
  margin-top: -40px;

  span {
    margin-left: 5px;
    color: $primary-color;
  }
}
</style>
