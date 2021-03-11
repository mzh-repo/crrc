<template>
  <div v-loading="showLoading">
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
    <template v-if="resultName !== '感应线圈布署策略'">
      <el-row :gutter="19"
              class="limit-container">
        <el-col :span="24">
          <div class="limit-box">
            <el-col :span="24">
              <el-row>约束条件</el-row>
              <el-row v-for="(item, index) in limitList"
                      :key="index"
                      class="limit-item">
                <el-col :span="20"
                        v-html="item"></el-col>
                <el-col :span="4">
                  <svg-icon icon-class="满足约束条件" />
                </el-col>
              </el-row>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-row v-for="(item, index) in configList"
                :key="index"
                class="grid-other">
          <el-row class="grid-tag">
            <el-col>
              <el-tag>{{ item.tag }}</el-tag>
            </el-col>
            <el-col>
              成本： <strong>{{ item.pay }}</strong> 万元
            </el-col>
          </el-row>
          <el-row class="grid-source"
                  v-html="item.source">
          </el-row>
        </el-row>
      </el-row>
    </template>
    <template v-else>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-table height="336"
                    :data="energyData"
                    border
                    style="width: 100%">
            <el-table-column type="index"
                             width="50"> </el-table-column>
            <template v-for="(item, index) in tagList">
              <el-table-column :key="index"
                               :prop="item.prop"
                               :label="item.name"
                               :width="item.prop === 'area' ? '200px' : 'auto'"></el-table-column>
            </template>
          </el-table>
        </el-col>
        <el-col :span="12">
          <div class="chart-box">
            <battery-line :lineData="lineData.battery" />
          </div>
        </el-col>
      </el-row>
    </template>
    <el-row v-if="resultName !== '感应线圈布署策略'"
            style="text-align:left; font-size: 18px;">
      选择配置：
      <el-select v-if="resultName !== '感应线圈布署策略'"
                 v-model="selectName"
                 placeholder="请选择"
                 @change="chooseResult">
        <el-option v-for="item in options"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>
      &nbsp;能耗: <strong>{{energy}}</strong> kWh
    </el-row>
    <el-row :gutter="19"
            class="chart-container chart-1">
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="手柄级位"
                    :yArea="yArea"
                    :lineData="lineData.force"
                    chartType="precit" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <power-line chartType="precit"
                      title="能耗 (kWh)"
                      :lineData="lineData.power" />
        </div>
      </el-col>
    </el-row>
    <el-row id="scroll-1"
            style="margin-top: 30px">
      <el-button @click="goDynastic">实时运行图表</el-button>
      <el-button @click="goCase">查看实例报告</el-button>
    </el-row>
    <template v-if="showDynastic">
      <move-train :current="current"
                  :lineType="type === 2 ? 0 : 1" />
      <el-row :gutter="19"
              class="chart-container">
        <el-col :span="24">
          <div class="chart-box">
            <power-line chartType="precit"
                        title="能耗预测 (kWh)"
                        :moveType="2"
                        :lineData="lineData.power" />
          </div>
        </el-col>
        <el-col :span="24">
          <div class="chart-box">
            <mzh-line chartType="precit"
                      title="手柄级位 (预测)"
                      :moveType="2"
                      :yArea="yArea"
                      :lineData="lineData.force" />
          </div>
        </el-col>
      </el-row>
    </template>
    <system-optimize v-if="showStatics" />
  </div>
</template>

<script>
/* eslint-disable */
import Line from '../components/line.vue';
import MovingTrain from '../components/movingTrain.vue';
import BatteryLine from '../components/batteryLine.vue';
import SystemOptimize from '@/components/systemOptimize.vue';
// import DashboardChart from '@/components/dashboardChart.vue';
import PowerLine from '../components/powerLine.vue';

export default {
  components: {
    'mzh-line': Line,
    'move-train': MovingTrain,
    'power-line': PowerLine,
    BatteryLine,
    SystemOptimize,
    // DashboardChart,
  },
  data() {
    return {
      limitList: [],
      lineData: {
        force: {},
        power: {},
        battery: [],
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
        // green: [],
      },
      type: 3, // 2 间歇式, 3 非接触式
      time: [],
      legend: ['预测能耗(预测级位)', '实际能耗(实际级位)', '预测能耗(实际级位)'],
      legendone: ['预测', '实际'],
      yArea: [],
      showDynastic: false,
      resultName: '储能系统优化设计',
      options: ['配置1', '配置2'],
      selectName: '配置1',
      resultList: [
        { name: '储能系统优化设计', id: 2 },
        // { name: '列车系统配置成本最优', id: 1 },
        { name: '感应线圈布署策略', id: 3 },
      ],
      energyData: [],
      current: 0,
      showStatics: false, // 显示统计信息
      configList: [
        {
          tag: '配置1',
          name: '储能',
          source: '2组20Ah钛酸锂电池+1组3000F超级电容储能电源。',
          pay: 293,
        },
        {
          tag: '配置2',
          // source: '运行能耗为：<strong>17.45</strong> kWh<br/> 成本为：<strong>293</strong> 万元',
          source:
            '1组动力电池箱, 每组: 采用25Ah单体, 144串4并。<br/> &nbsp;2组超级电容箱, 每组: 采用9500F模组, 344串2并。',
          pay: 315,
        },
      ],
      configListOther: [
        {
          tag: '能耗最优配置',
          name: '储能',
          // source: '1组25Ah钛酸锂电池+2组9500F超级电容储能电源'
          source:
            '1组动力电池箱, 每组: 采用25Ah单体, 144串4并。<br/> &nbsp;2组超级电容箱, 每组: 采用9500F模组, 344串2并。',
        },
        {
          tag: '能耗最优结果',
          source: '运行能耗为：<strong>14.36</strong> kWh<br/> 成本为：<strong>315 </strong> 万元',
        },
      ],
      tagList: [
        {
          prop: 'area',
          name: '区间',
        },
        {
          prop: 'distance',
          name: '线路距离m',
        },
        {
          prop: 'start',
          name: '线圈起点m',
        },
        {
          prop: 'end',
          name: '线圈终点m',
        },
        {
          prop: 'length',
          name: '线圈长度m',
        },
      ],
      showLoading: false,
      energy: null,
    };
  },
  mounted() {
    // const { dataBase } = this.$store.state;
    this.showLoading = true;
    const dataBase = Number(sessionStorage.getItem('dataBaseId'));
    if (dataBase === 1) {
      this.type = 2;
      this.yArea = ['100', '-100'];
      this.energyData = [
        {
          id: '0',
          area: '植物园~万安公墓',
          distance: '1310',
          start: '912',
          end: '1310',
          length: '398',
        },
        {
          id: '1',
          area: '万安公墓~玉泉郊野公园',
          distance: '1107',
          start: '0',
          end: '295',
          length: '295',
        },
        {
          id: '2',
          area: '玉泉郊野公园~颐和园西门',
          distance: '1320',
          start: '797',
          end: '1320',
          length: '523',
        },
        {
          id: '3',
          area: '颐和园西门~颐和园南门',
          distance: '1256',
          start: '0',
          end: '293',
          length: '293',
        },
      ];
      this.resultList = [
        { name: '储能系统优化设计', id: 2 },
        // { name: '列车系统配置成本最优', id: 1 },
      ];
    } else {
      this.yArea = ['8', '-8'];
      this.type = 3;
      this.energyData = [
        {
          id: '0',
          area: '香山~植物园',
          distance: '1669',
          start: '1422',
          end: '1499',
          length: '77',
        },
        {
          id: '1',
          area: '植物园~万安公墓',
          distance: '1310',
          start: '13',
          end: '488',
          length: '475',
        },
        {
          id: '2',
          area: '植物园~万安公墓',
          distance: '1310',
          start: '1239',
          end: '1310',
          length: '71',
        },
        {
          id: '3',
          area: '万安公墓~玉泉郊野公园',
          distance: '1107',
          start: '142',
          end: '666',
          length: '524',
        },
        {
          id: '4',
          area: '万安公墓~玉泉郊野公园',
          distance: '1107',
          start: '1012',
          end: '1107',
          length: '95',
        },
        {
          id: '5',
          area: '玉泉郊野公园~颐和园西门',
          distance: '1320',
          start: '876',
          end: '1320',
          length: '444',
        },
        {
          id: '6',
          area: '颐和园西门~颐和园南门',
          distance: '1256',
          start: '0',
          end: '224',
          length: '224',
        },
      ];
    }
    this.getData();
    if (this.type === 3) {
      this.limitList = [
        'AW2下最高运行速度（km/h）：50',
        'AW2下平均初始加速度（m/s&sup2;）：1',
        'AW2下平均加速度（m/s&sup2;）：0.6',
        'AW3下常用制动平均减速度（m/s&sup2;）：1.1',
        '车辆最低电压（V）：500',
        '车辆最高电压（V）：900',
      ];
      this.configList = [
        {
          tag: '配置1',
          // name: '储能',
          source: '采用25Ah单体, 电池串联数392, 并联数5',
          pay: 245,
        },
        {
          tag: '配置2',
          // source: '运行能耗为：<strong>35.83</strong> kWh<br/> 成本为：<strong>245</strong> 万元',
          source: '采用25Ah单体, 电池串联数358, 并联数6',
          pay: 268.5,
        },
      ];
      this.configListOther = [
        {
          tag: '配置1',
          source: '采用25Ah单体, 电池串联数358, 并联数6',
        },
        {
          tag: '配置2',
          source:
            '运行能耗为：<strong>31.72</strong> kWh<br/> 成本为：<strong>268.5 </strong> 万元',
        },
      ];
    } else {
      this.limitList = [
        '车辆最高运行速度（km/h）：70',
        '平均最小启动加速度（m/s&sup2;）：1',
        '平均最小加速度（m/s&sup2;）：0.6',
        '常用制动平均减速度（m/s&sup2;）：1.1',
        '车辆最低电压（V）：500',
        '车辆最高电压（V）：900',
      ];
    }
  },
  methods: {
    goStatics() {
      this.showDynastic = false;
      this.showStatics = true;
      this.$nextTick(() => {
        document.getElementById('scroll-1').scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    },
    goDynastic() {
      this.showStatics = false;
      this.showDynastic = true;
      this.$nextTick(() => {
        document.getElementById('scroll-1').scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    },
    goCase() {
      this.$router.push('/report');
    },
    chooseResult() {
      this.showDynastic = false;
      this.getData();
    },
    getData() {
      this.$axios.get(`form/graph?model_type=${this.type === 2 ? '4' : '5'}`).then((res) => {
        this.showLoading = false;
        if (this.type === 3) {
          this.lineData.battery = res.battery;
        }
        if (this.selectName === '配置2') {
          this.lineData.force = res.level;
          this.lineData.power = res.energy_consumption;
        } else {
          this.lineData.force = res.level_speed;
          this.lineData.power = res.energy_consumption_speed;
        }
        this.energy = this.lineData.power.data_list[this.lineData.power.data_list.length - 1];
        // console.log('this.lineData.power: ', this.lineData.power);
        // console.log('this.energy: ', this.energy);
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
            this.dynasticDataTwo.data_list.shift();
            this.dynasticDataTwo.predict_data_list.shift();
            const data = {
              data_list: [...this.dynasticDataOne.data_list, val.level.data_list[i]],
              predict_data_list: [
                ...this.dynasticDataOne.predict_data_list,
                val.level.predict_data_list[i],
              ],
            };
            const powerData = {
              data_list: [...this.dynasticDataTwo.data_list, val.energy_consumption.data_list[i]],
              predict_data_list: [
                ...this.dynasticDataTwo.predict_data_list,
                val.energy_consumption.predict_data_list[i],
              ],
            };
            this.dynasticDataOne = data;
            this.dynasticDataTwo = powerData;
          } else {
            const data = {
              data_list: [...this.dynasticDataOne.data_list, val.level.data_list[i]],
              predict_data_list: [
                ...this.dynasticDataOne.predict_data_list,
                val.level.predict_data_list[i],
              ],
            };
            const powerData = {
              data_list: [...this.dynasticDataTwo.data_list, val.energy_consumption.data_list[i]],
              predict_data_list: [
                ...this.dynasticDataTwo.predict_data_list,
                val.energy_consumption.predict_data_list[i],
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

.limit-container {
  height: 390px;
  margin-bottom: 30px;
  padding-bottom: 40px;

  .el-col {
    height: 100%;
    padding: 0;
  }

  .limit-box {
    height: 100%;
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

  .grid-content {
    height: 150px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 20px 30px;
    margin-bottom: 20px;
    display: flex;

    .svg-icon {
      @include set-size(90px);
    }

    .el-col:nth-child(1) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .el-col:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .el-row {
        display: flex;
        justify-content: flex-end;
        font-weight: 400;

        &:first-child {
          font-size: 24px;
          margin-bottom: 15px;
        }

        &:nth-child(2) {
          font-size: 30px;
        }
      }
    }
  }
}

.grid-other {
  height: 185px;
  background: #fff;
  border-radius: 8px;
  padding: 30px 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.grid-tag {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .el-col:nth-child(1) {
    text-align: left;
  }

  .el-col:nth-child(2) {
    text-align: right;
    font-size: 18px;
  }
}

.grid-source {
  font-size: 22px;
}

.input-content {
  height: 450px;
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

  .el-row:nth-child(2) {
    font-size: 18px;
    overflow-wrap: break-word;
  }
}

.chart-container {
  height: 337px;
  margin-top: 30px;
}

.chart-box {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 36px 16px 0;
}

.train-btn {
  text-align: right;
  margin: -60px 0 30px;
}

.instro {
  margin-top: 30px;
  border: 1px solid #ccc;
  padding: 10px;
}

.result-tab {
  text-align: left;
  height: 50px;
  font-size: 24px;
  display: flex;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;

    .el-tabs__item {
      font-size: 24px;
    }
  }

  .el-select {
    position: absolute;
    right: 0;
  }
}

.progress {
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}

.progress-img {
  margin-bottom: 30px;

  .el-image {
    // height: 500px;
    // width: 50%;
    @include set-size(300px, 200px);
    margin: auto;
  }
}
</style>
