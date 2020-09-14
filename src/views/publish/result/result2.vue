<template>
  <div v-loading="showLoading">
    <template v-if="resultType === 2">
      <el-row class="result-tab">
        <el-tabs v-model="resultId"
                 @tab-click="chooseResult">
          <template v-for="(item, index) in resultList">
            <el-tab-pane :key="index"
                         :label="item.name"
                         :name="item.id.toString()"> </el-tab-pane>
          </template>
        </el-tabs>
      </el-row>
      <el-row v-if="type === 2"
              class="progress">
        <el-col :span="4">电池欧姆内阻: &nbsp;{{ percent[0] }} mR</el-col>
        <el-col :span="8"
                class="percentage-num">
          电池额定容量: &nbsp;
          <el-progress :percentage="percent[1]"
                       :stroke-width="18"> </el-progress>
        </el-col>
        <el-col :span="8"
                class="percentage-num">
          电容额定容量: &nbsp;
          <el-progress :percentage="percent[2]"
                       :stroke-width="18"> </el-progress>
        </el-col>
      </el-row>
      <el-row v-else
              class="progress">
        <el-col :span="4">电池欧姆内阻: &nbsp;{{ percent[0] }} mR</el-col>
        <el-col :span="8"
                class="percentage-num">
          电池额定容量: &nbsp;
          <el-progress :percentage="percent[1]"
                       :stroke-width="18"> </el-progress>
        </el-col>
      </el-row>
      <el-row class="tips">
        预测能耗为<span> {{ precit2 }} </span>kWh
      </el-row>
    </template>
    <template v-else>
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
      <el-row :gutter="19"
              class="tips-box">
        <el-col :span="12">
          <div class="tip-content">
            <div>
              预测{{ tip }}: <span>{{ precit }}</span> {{ tip == '时间' ? 's' : 'kWh' }}</div>
            <div>
              实际{{ tip }}: <span>{{ actual }}</span> {{ tip == '时间' ? 's' : 'kWh' }}</div>
            <div>
              预测{{ tip }}为实际 <span>{{ ((precit / actual) * 100).toFixed(2) }}%</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="limit-box">
            <mzh-line title="运行速度 （km/h）"
                      :lineData="lineData.speed"
                      :chartType="resultType === 2 ? 'precit' : ''" />
          </div>
        </el-col>
      </el-row>
    </template>
    <el-row :gutter="19"
            class="chart-container chart-1">
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="手柄级位"
                    :yArea="yArea"
                    :lineData="lineData.force"
                    :chartType="resultType === 2 ? 'precit' : ''" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <power-line title="能耗 (kWh)"
                      :legend="legend"
                      :lineData="lineData.power"
                      :chartType="resultType === 2 ? 'precit' : ''" />
        </div>
      </el-col>
    </el-row>
    <el-button id="scroll"
               @click="goDynastic">实时运行图表</el-button>
    <el-button @click="goCase">查看实例报告</el-button>
    <template v-if="showDynastic">
      <move-train :current="current"
                  :lineType="type === 2 ? 0 : 1" />
      <el-row :gutter="19"
              class="chart-container">
        <el-col :span="24">
          <div class="chart-box">
            <power-line title="能耗 (kWh)"
                        :moveType="2"
                        :legend="legend"
                        :lineData="lineData.power"
                        :chartType="resultType === 2 ? 'precit' : ''" />
          </div>
        </el-col>
        <el-col :span="24">
          <div class="chart-box">
            <mzh-line v-if="resultType === 1"
                      title="运行速度 (km/h)"
                      :moveType="2"
                      :lineData="lineData.speed"
                      :chartType="resultType === 2 ? 'precit' : ''" />
          </div>
        </el-col>
        <el-col :span="24">
          <div class="chart-box">
            <mzh-line title="手柄级位"
                      :moveType="2"
                      :yArea="yArea"
                      :lineData="lineData.force"
                      :chartType="resultType === 2 ? 'precit' : ''" />
          </div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
// AsciiMath 转换
// import MarkdownItVue from 'markdown-it-vue';
import Line from '../components/line.vue';
import MovingTrain from '../components/movingTrain.vue';
// import 'markdown-it-vue/dist/markdown-it-vue.css';
import PowerLine from '../components/powerLine.vue';

export default {
  components: {
    'mzh-line': Line,
    'move-train': MovingTrain,
    // MarkdownItVue,
    PowerLine,
  },
  props: {
    // 1,2 分别对应多目标和劣化
    resultType: {
      type: Number,
    },
  },
  data() {
    return {
      percent: [60, 90],
      lineData: {
        force: {},
        power: {},
        speed: {}, // 运行速度
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
      resultId: '1', // 劣化tab 初始值   activeTb must be string
      resultList: [
        { name: '最佳能耗', id: 1 },
        { name: '最小旅行时间', id: 2 },
      ],
      yArea: [],
      dataSetId: 1,
      curent: 0,
      showDynastic: false,
      tip: '能耗',
      actual: null, // 实际能耗 / 实际旅行时间
      precit: null, // 预测能耗 / 预测旅行时间
      precit2: null, // 劣化预测能耗值
      dataSource: '', // 数据源
      showLoading: false,
      limitList: [
        'AW2下平均初始加速度（m/s2）：1',
        'AW2下平均加速度（m/s2）：0.6',
        'AW3下常用制动平均减速度（m/s2）：1.1',
        '车辆最低电压（V）：500',
        '车辆最高电压（V）：900',
      ],
    };
  },
  mounted() {
    this.showLoading = true;
    if (this.resultType === 2) {
      this.resultList = [
        {
          name: '循环次数 800',
          id: 1,
        },
        {
          name: '循环次数 1200',
          id: 2,
        },
        {
          name: '循环次数 1600',
          id: 3,
        },
      ];
    }
    // const { dataBase } = this.$store.state;
    const dataBase = Number(sessionStorage.getItem('dataBaseId'));
    if (dataBase === 1) {
      this.type = 2;
      this.percent = [60, 90, 96];
      this.yArea = ['100', '-100'];
    } else {
      this.type = 3;
      this.percent = [60, 90];
      this.yArea = ['7', '-7'];
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
      // this.dataSetId = this.$store.state.reportData.dataSetId;
      // 劣化对应的结果集
      if (this.resultType === 1) {
        this.$axios
          .get(
            `form/graph?model_type=${this.type}&dataset_id=${this.dataSetId}`,
          )
          .then((res) => {
            this.dataSource = res;
            this.actual = Number(
              res.energy_consumption.data_list.pop(),
            ).toFixed(2);
            this.precit = Number(
              res.energy_consumption.predict_data_list.pop(),
            ).toFixed(2);
            this.lineData.force = res.level;
            this.lineData.power = res.energy_consumption;
            this.lineData.speed = res.speed;
            if (this.type === 3) {
              delete this.lineData.power.green;
            }
            // this.renderData(res);
          });
      } else {
        this.$axios
          .get(`form/graph?model_type=${this.type}&tab_id=${this.resultId}`)
          .then((res) => {
            this.precit2 = Number(
              res.energy_consumption.predict_data_list.pop(),
            ).toFixed(2);
            this.lineData.force = res.level;
            this.lineData.power = res.energy_consumption;
            this.lineDate.speed = res.speed;
            // this.renderData(res);
          });
      }
      this.showLoading = false;
    },
    renderData(val) {
      const dataIndex = val.level.data_list.length;
      for (let i = 0; i < dataIndex; i += 1) {
        this.time[i] = setTimeout(() => {
          this.current = Math.ceil(((i + 1) / (dataIndex + 1)) * 100);
          // if (i > 200) {
          //   this.dynasticDataOne.data_list.shift();
          //   this.dynasticDataOne.predict_data_list.shift();
          //   this.dynasticDataTwo.data_list.shift();
          //   this.dynasticDataTwo.predict_data_list.shift();
          //   if (this.type === 2) {
          //     this.dynasticDataTwo.green.shift();
          //   }
          //   const data = {
          //     data_list: [
          //       ...this.dynasticDataOne.data_list,
          //       val.level.data_list[i],
          //     ],
          //     predict_data_list: [
          //       ...this.dynasticDataOne.predict_data_list,
          //       val.level.predict_data_list[i],
          //     ],
          //   };
          //   const powerData = {
          //     data_list: [
          //       ...this.dynasticDataTwo.data_list,
          //       val.energy_consumption.data_list[i],
          //     ],
          //     predict_data_list: [
          //       ...this.dynasticDataTwo.predict_data_list,
          //       val.energy_consumption.predict_data_list[i],
          //     ],
          //     // green: [
          //     //   ...this.dynasticDataTwo.green,
          //     //   val.energy_consumption.green[i],
          //     // ],
          //   };
          //   if (this.type === 2) {
          //     Object.assign(powerData, {
          //       green: [
          //         ...this.dynasticDataTwo.green,
          //         val.energy_consumption.green[i],
          //       ],
          //     });
          //   }
          //   this.dynasticDataOne = data;
          //   this.dynasticDataTwo = powerData;
          // } else {
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
            // green: [...this.dynasticDataTwo.green, val.energy_consumption.green[i]],
          };
          if (this.type === 2) {
            Object.assign(powerData, {
              green: [
                ...this.dynasticDataTwo.green,
                val.energy_consumption.green[i],
              ],
            });
          }
          this.dynasticDataOne = data;
          this.dynasticDataTwo = powerData;
          // }
        }, 100 * i);
      }
    },
    // 不同结果集
    chooseResult() {
      this.showDynastic = false;
      // for (let i = 0; i < this.lineData.force.data_list.length; i += 1) {
      //   clearTimeout(this.time[i]);
      //   clearTimeout(this.timer[i]);
      // }
      // this.dynasticDataOne = {
      //   date_list: [],
      //   data_list: [],
      //   predict_data_list: [],
      // };
      // this.dynasticDataTwo = {
      //   date_list: [],
      //   data_list: [],
      //   predict_data_list: [],
      //   green: [],
      // };
      // this.lineData = {
      //   force: {},
      //   power: {},
      // };

      if (this.resultType === 2) {
        // 间歇式
        if (this.type === 2) {
          if (this.resultId === '1') {
            // TODO
            this.percent = [60, 90, 96];
          } else if (this.resultId === '2') {
            this.percent = [75, 75, 92];
          } else if (this.resultId === '3') {
            this.percent = [90, 60, 88];
          }
          this.getData();
        } else if (this.type === 3) {
          // 非接触
          if (this.resultId === '1') {
            this.percent = [60, 90];
          } else if (this.resultId === '2') {
            this.percent = [75, 75];
          } else if (this.resultId === '3') {
            this.percent = [90, 60];
          }
          this.getData();
        }
      } else if (this.resultName === '最佳能耗') {
        this.tip = '能耗';
        this.actual = Number(
          this.dataSource.energy_consumption.data_list.pop(),
        ).toFixed(2);
        this.precit = Number(
          this.dataSource.energy_consumption.predict_data_list.pop(),
        ).toFixed(2);
        this.getData();
      } else {
        this.tip = '时间';
        this.actual = Number(
          this.dataSource.travel_time.data_list.pop(),
        ).toFixed(2);
        this.precit = Number(
          this.dataSource.travel_time.predict_data_list.pop(),
        ).toFixed(2);
        this.getDataOther();
      }
    },
    getDataOther() {
      this.$axios
        .get(`form/graph?model_type=${this.type}&dataset_id=${this.dataSetId}`)
        .then((res) => {
          this.lineData.force = res.level_speed;
          this.lineData.power = res.energy_consumption_speed;
          this.lineData.speed = res.speed_speed;
          if (this.type === 3) {
            delete this.lineData.power.green;
          }
          // this.renderDataOther(res);
        });
    },
    renderDataOther(val) {
      const dataIndex = val.level.data_list.length;
      for (let i = 0; i < val.level.data_list.length; i += 1) {
        this.timer[i] = setTimeout(() => {
          this.current = Math.ceil(((i + 1) / (dataIndex + 1)) * 100);
          // if (i > 200) {
          //   this.dynasticDataOne.data_list.shift();
          //   this.dynasticDataOne.predict_data_list.shift();
          //   this.dynasticDataTwo.data_list.shift();
          //   this.dynasticDataTwo.predict_data_list.shift();
          //   if (this.type === 2) {
          //     this.dynasticDataTwo.green.shift();
          //   }
          //   const data = {
          //     data_list: [
          //       ...this.dynasticDataOne.data_list,
          //       val.level_speed.data_list[i],
          //     ],
          //     predict_data_list: [
          //       ...this.dynasticDataOne.predict_data_list,
          //       val.level_speed.predict_data_list[i],
          //     ],
          //   };
          //   const powerData = {
          //     data_list: [
          //       ...this.dynasticDataTwo.data_list,
          //       val.energy_consumption_speed.data_list[i],
          //     ],
          //     predict_data_list: [
          //       ...this.dynasticDataTwo.predict_data_list,
          //       val.energy_consumption_speed.predict_data_list[i],
          //     ],
          //     // green: [...this.dynasticDataTwo.green, val.energy_consumption_speed.green[i]],
          //   };
          //   if (this.type === 2) {
          //     Object.assign(powerData, {
          //       green: [
          //         ...this.dynasticDataTwo.green,
          //         val.energy_consumption.green[i],
          //       ],
          //     });
          //   }
          //   this.dynasticDataOne = data;
          //   this.dynasticDataTwo = powerData;
          // } else {
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
            // green: [...this.dynasticDataTwo.green, val.energy_consumption_speed.green[i]],
          };
          if (this.type === 2) {
            Object.assign(powerData, {
              green: [
                ...this.dynasticDataTwo.green,
                val.energy_consumption.green[i],
              ],
            });
          }
          this.dynasticDataOne = data;
          this.dynasticDataTwo = powerData;
          // }
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
  margin: 16px 0;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}

.progress-img {
  margin-bottom: 30px;

  .el-image {
    @include set-size(300px, 200px);
    margin: auto;
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
  // margin-bottom: 30px;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;

    .el-tabs__item {
      font-size: 24px;
    }
  }
}

.tips {
  text-align: center;
  font-size: 30px;
  // margin-top: -40px;

  span {
    margin-left: 5px;
    color: $primary-color;
  }

  .el-button {
    float: right;
  }
}

.tips-box {
  font-size: 30px;
  height: 340px;

  .el-col {
    height: 100%;
  }

  .tip-content {
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;

    div {
      margin-bottom: 10px;
    }

    span {
      color: $primary-color;
    }
  }
}

.limit-box {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 20px 30px;
  text-align: left;

  .el-row:first-child {
    font-size: 24px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 30px;
  }

  .limit-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
    font-weight: 400;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
  }
}

.percentage-num {
  display: flex;

  .el-progress {
    width: 60%;
  }
}
</style>
