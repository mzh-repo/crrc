<template>
  <div>
    <el-row class="train-btn">
      <el-button type="primary"
                 @click="$router.push('/upload')">添加训练</el-button>
    </el-row>
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
    <template v-if="resultName !== '线路充电策略优化'">
      <el-row :gutter="19"
              class="limit-container">
        <el-col :span="12">
          <div class="limit-box">
            <el-col :span="24">
              <el-row>约束条件</el-row>
              <el-row v-for="(item, index) in limitList"
                      :key="index"
                      class="limit-item">
                <el-col :span="20">{{ item }}</el-col>
                <el-col :span="4">
                  <svg-icon icon-class="满足约束条件" />
                </el-col>
              </el-row>
            </el-col>
          </div>
        </el-col>
        <el-col v-if="resultName === '列车系统配置成本最优'"
                :span="12">
          <el-row v-for="(item, index) in configList"
                  :key="index"
                  class="grid-other">
            <el-row class="grid-tag">
              <el-col>
                <el-tag>{{ item.tag }}</el-tag>
              </el-col>
              <el-col v-if="type === 2">
                {{ item.name }}
              </el-col>
            </el-row>
            <el-row class="grid-source"
                    v-html="item.source"> </el-row>
          </el-row>
        </el-col>
        <el-col v-else
                :span="12">
          <el-row v-for="(item, index) in configListOther"
                  :key="index"
                  class="grid-other">
            <el-row class="grid-tag">
              <el-col>
                <el-tag>{{ item.tag }}</el-tag>
              </el-col>
              <el-col v-if="type === 2">
                {{ item.name }}
              </el-col>
            </el-row>
            <el-row class="grid-source"
                    v-html="item.source"> </el-row>
          </el-row>
        </el-col>
      </el-row>
      <!-- <el-row id="scroll-1" style="margin-top: 80px">
        <el-button type="primary" @click="goStatics">查看统计信息</el-button>
        <el-button @click="goDynastic">实时运行图表</el-button>
        <el-button @click="goCase">查看实例报告</el-button>
      </el-row> -->
    </template>
    <template v-else>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-table :data="energyData"
                    border
                    style="width: 100%">
            <el-table-column prop="name"
                             label="站点"> </el-table-column>
            <el-table-column prop="value1"
                             label="剩余定量"> </el-table-column>
            <el-table-column prop="value2"
                             label="是否越站充电"> </el-table-column>
            <el-table-column prop="value3"
                             label="当前电量"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <div class="chart-box">
            <battery-line :lineData="lineData.battery" />
          </div>
        </el-col>
      </el-row>
    </template>
    <el-row class="progress"
            v-html="explain"> </el-row>
    <el-row :gutter="30"
            class="progress-img">
      <el-image :src="srcList[0]"
                :preview-src-list="[srcList[0]]" />
    </el-row>
    <el-row id="scroll-1"
            style="margin-top: 30px">
      <el-button type="primary"
                 @click="goStatics">查看统计信息</el-button>
      <el-button @click="goDynastic">实时运行图表</el-button>
      <el-button @click="goCase">查看实例报告</el-button>
    </el-row>
    <template v-if="showDynastic">
      <move-train :current="current" />
      <el-row :gutter="19"
              class="chart-container">
        <el-col :span="24">
          <div class="chart-box">
            <mzh-line chartType="precit"
                      title="手柄级位(预测)"
                      :yArea="yArea"
                      :lineData="dynasticDataOne" />
          </div>
        </el-col>
        <el-col :span="24">
          <div class="chart-box">
            <power-Line chartType="precit"
                        title="能耗(预测) kW·h"
                        :lineData="dynasticDataTwo" />
          </div>
        </el-col>
      </el-row>
      <!-- <dashboard-chart /> -->
    </template>
    <system-optimize v-if="showStatics" />
  </div>
</template>

<script>
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
    'power-Line': PowerLine,
    BatteryLine,
    SystemOptimize,
    // DashboardChart,
  },
  data() {
    return {
      explain:
        '&nbsp;&nbsp;&nbsp;&nbsp;使用深度 FCNN（Fully Connected Neural Network）模型来解决系统优化设计模型的问题。首先构建神经网络结构，确定网络层数、神经元个数、激活函数等超参数；其次结合均方误差函数确认损失函数；最后利用反向传播算法训练数据，从而调整神经网络权重参数降低损失函数，得到确定的网络模型。相较于传统规划求解的方式，其多层的神经网络结构有更加强大的表征能力，通过逐层深入的方式用较少参数来对无法认为构建的复杂函数进行逼近，从而使其模型更符合实际问题。',
      // eslint-disable-next-line global-require
      srcList: [require('@/assets/images/系统优化.png')],
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
      legend: [
        '预测能耗(预测级位)',
        '实际能耗(实际级位)',
        '预测能耗(实际级位)',
      ],
      legendone: ['预测', '实际'],
      yArea: [],
      dataSetId: '',
      showDynastic: false,
      resultName: '列车系统配置成本最优',
      resultList: [
        { name: '列车系统配置成本最优', id: 1 },
        { name: '列车系统配置能耗最优', id: 2 },
        { name: '线路充电策略优化', id: 3 },
      ],
      energyData: [
        {
          name: '香山站',
          value1: '-',
          value2: '-',
          value3: '97%',
        },
        {
          name: '植物园站',
          value1: '69.9%',
          value2: '是',
          value3: '84.18%',
        },
        {
          name: '万安公墓站',
          value1: '51.49%',
          value2: '是',
          value3: '68.43%',
        },
        {
          name: '玉泉郊野公园',
          value1: '42.76%',
          value2: '是',
          value3: '59.7%',
        },
        {
          name: '颐和园西门',
          value1: '30.93%',
          value2: '否',
          value3: '28.63%',
        },
        {
          name: '颐和园南门',
          value1: '13.23%',
          value2: '-',
          value3: '-',
        },
      ],
      current: 0,
      showStatics: false, // 显示统计信息
      configList: [
        {
          tag: '成本最优配置',
          name: '储能',
          source: '2组20Ah钛酸锂电池+1组3000F超级电容储能电源',
        },
        {
          tag: '成本最优结果',
          source:
            '运行能耗为：<strong>29.94</strong> kwh<br/> 成本为：<strong>587.5</strong> 万元',
        },
      ],
      configListOther: [
        {
          tag: '能耗最优配置',
          name: '储能',
          source: '1组25Ah钛酸锂电池+2组9500F超级电容储能电源',
        },
        {
          tag: '能耗最优结果',
          source:
            '运行能耗为：<strong>25.69</strong> kwh<br/> 成本为：<strong>630 </strong> 万元',
        },
      ],
    };
  },
  mounted() {
    const { dataBase } = this.$store.state;
    if (Number(dataBase) === 1) {
      this.type = 2;
      this.yArea = ['100', '-100'];
    } else {
      this.yArea = ['8', '-8'];
      this.type = 3;
    }
    this.getData();
    if (this.type === 3) {
      this.limitList = [
        'AW2下最高运行速度（km/h）：50',
        'AW2下平均初始加速度（m/s2）：1',
        'AW2下平均加速度（m/s2）：0.6',
        'AW3下常用制动平均减速度（m/s2）：1.1',
        '车辆最低电压（V）：500',
        '车辆最高电压（V）：900',
      ];
      this.configList = [
        {
          tag: '成本最优配置',
          source:
            '储能系统：电池串联数392、电池并联数5<br/>牵引系统：两动配置<br/>供电系统：4组接收板',
        },
        {
          tag: '成本最优结果',
          source:
            '运行能耗为：<strong>35.83</strong> kwh<br/> 成本为：<strong>1085</strong> 万元',
        },
      ];
      this.configListOther = [
        {
          tag: '能耗最优配置',
          source:
            '储能系统：电池串联数358、电池并联数6<br/>牵引系统：两动配置<br/>供电系统：6组接收板',
        },
        {
          tag: '能耗最优结果',
          source:
            '运行能耗为：<strong>31.72</strong> kwh<br/> 成本为：<strong>1158.5 </strong> 万元',
        },
      ];
    } else {
      this.limitList = [
        '车辆最高运行速度（km/h）：50',
        '平均最小启动加速度（m/s2）：1',
        '平均最小加速度（m/s2）：0.6',
        '常用制动平均减速度（m/s2）：1.1',
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
        document
          .getElementById('scroll-1')
          .scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    },
    goDynastic() {
      this.showStatics = false;
      this.showDynastic = true;
      this.$nextTick(() => {
        document
          .getElementById('scroll-1')
          .scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    },
    goCase() {
      this.$router.push('/report');
    },
    chooseResult() {
      this.showDynastic = false;
      this.showStatics = false;
    },
    getData() {
      // if (this.$store.state.modelDatasetId !== '') {
      //   this.dataSetId = this.$store.state.modelDatasetId;
      // } else {
      //   this.dataSetId = this.$store.state.dataSelected;
      // }
      this.dataSetId = this.$store.state.reportData.dataSetId;
      this.$axios
        .get(`form/graph?model_type=${this.type}&dataset_id=${this.dataSetId}`)
        .then((res) => {
          if (this.type === 2) {
            this.lineData.battery = res.battery;
          } else {
            this.lineData.battery = res.battery_speed;
          }
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
            this.dynasticDataTwo.data_list.shift();
            this.dynasticDataTwo.predict_data_list.shift();
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
  height: 450px;
  margin-bottom: 20px;

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
  height: 235px;
  background: rgba(255, 255, 255, 1);
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
  margin-bottom: 40px;

  .el-col:nth-child(1) {
    text-align: left;
  }

  .el-col:nth-child(2) {
    text-align: right;
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
  margin-bottom: 30px;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;

    .el-tabs__item {
      font-size: 24px;
    }
  }
}

.progress {
  display: flex;
  flex-direction: row;
  margin-top: 60px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}

.progress-img {
  margin-bottom: 30px;

  .el-image {
    height: 500px;
    width: 50%;
  }
}
</style>
