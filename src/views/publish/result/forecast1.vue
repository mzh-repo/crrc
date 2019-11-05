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
      <div>综合优化设计</div>
    </el-row>
    <el-row :gutter="19"
            class="limit-container">
      <el-col :span="8">
        <div class="limit-box">
          <el-col :span="24">
            <el-row>约束条件</el-row>
            <el-row v-for="(item,index) in limitList"
                    :key="index"
                    class="limit-item">
              <el-col :span="20">{{item}}</el-col>
              <el-col :span="4">
                <svg-icon icon-class="满足约束条件" />
              </el-col>
            </el-row>
          </el-col>
        </div>
      </el-col>
      <el-col v-if="type !==2"
              :span="8">
        <el-row v-for="(item,index) in configList"
                :key="index"
                class="grid-content">
          <el-col :span="8">
            <svg-icon :icon-class="item.name" />
          </el-col>
          <el-col :span="16">
            <el-row> {{item.name}}</el-row>
            <el-row>{{item.source}}</el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-else
              :span="8">
        <el-row v-for="(item, index) in configList"
                :key="index"
                class="grid-other">
          <el-row class="grid-tag">
            <el-col>
              <el-tag>{{item.tag}}</el-tag>
            </el-col>
            <el-col>
              {{item.name}}
            </el-col>
          </el-row>
          <el-row class="grid-source">
            {{item.source}}
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="input-content">
          <el-row>说明</el-row>
          <el-row>已满足所有约束条件，在当前配置下的列车运行控制结果如下。</el-row>
          <template v-if="type === 2">
            <el-row>最优配置下的运行能耗为：{{best}} kW·h</el-row>
            <el-row>次优配置下的运行能耗为：{{second}} kW·h</el-row>
          </template>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="19"
            class="chart-container chart-1">
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="手柄级位"
                    :legend="legendone"
                    :yArea="yArea"
                    :lineData="lineData.force" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <model-line title="能耗 kW·h"
                      :legend="legend"
                      :lineData="lineData.power" />
        </div>
      </el-col>
    </el-row>
    <move-train />
    <el-row :gutter="19"
            class="chart-container">
      <el-col :span="24">
        <div class="chart-box">
          <mzh-line title="手柄级位(实时)"
                    :legend="legendone"
                    :yArea="yArea"
                    :lineData="dynasticDataOne" />
        </div>
      </el-col>
      <el-col :span="24">
        <div class="chart-box">
          <model-line title="能耗(实时) kW·h"
                      :legend="legend"
                      :lineData="dynasticDataTwo" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Line from '../components/line.vue';
import MovingTrain from '../components/movingTrain.vue';
import ModelLine from '../components/modelLine.vue';
// import PowerLine from '../components/powerLine.vue';

export default {
  components: {
    'mzh-line': Line,
    'move-train': MovingTrain,
    'model-line': ModelLine,
    // 'power-line': PowerLine,
  },
  data() {
    return {
      limitList: ['约束条件1', '约束条件2', '约束条件3'],
      lineData: {
        force: {},
        power: {},
      },
      // dynasticData: {
      //   force: {
      //     data_list: [],
      //     predict_data_list: [],
      //   },
      //   power: {
      //     data_list: [],
      //     predict_data_list: [],
      //   },
      // },
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
      configList: [
        {
          name: '储能',
          source: '360串*6并',
        },
        {
          name: '供电',
          source: '接收板',
        },
        {
          name: '牵引',
          source: 'n动配置',
        },
      ],
      // introduce: '已满足所有约束条件，在当前配置下的列车运行控制结果如下',
      best: '25.6',
      second: '31',
      type: 3, // 2 间歇式, 3 非接触式
      time: '',
      legend: [
        '预测能耗(预测级位)',
        '实际能耗(实际级位)',
        '预测能耗(实际级位)',
      ],
      legendone: ['预测', '实际'],
      yArea: [],
      dataSetId: '',
    };
  },
  mounted() {
    // this.getLineData();
    // this.getDynastic();
    const { dataBase } = this.$store.state;
    if (dataBase === 1) {
      this.type = 2;
      this.yArea = ['100', '-100'];
    } else {
      this.yArea = ['8', '-8'];
      this.type = 3;
    }
    this.getData();
    if (this.type === 3) {
      this.limitList = [
        'AW2下最高运行速度（km/h）：70',
        'AW2下平均初始加速度（m/s2）：1',
        'AW2下平均加速度（m/s2）：0.6',
        'AW3下常用制动平均减速度（m/s2）：1.1',
        '车辆最低电压（V）：500',
        '车辆最高电压（V）：900',
      ];
      this.configList = [
        {
          name: '储能',
          source: '358串*6并',
        },
        {
          name: '供电',
          source: '6组接收板',
        },
        {
          name: '牵引',
          source: '两动配置',
        },
      ];
    } else {
      this.limitList = [
        '车辆最高运行速度（km/h）：70',
        '平均最小启动加速度（m/s2）：1',
        '平均最小加速度（m/s2）：0.6',
        '常用制动平均减速度（m/s2）：1.1',
        '车辆最低电压（V）：500',
        '车辆最高电压（V）：900',
      ];
      this.configList = [
        {
          tag: '最优选择',
          name: '储能',
          source: '2组9500F超级电容+1组钛酸锂电池',
        },
        {
          tag: '次优选择',
          name: '储能',
          source: '3组7500F超级电容储能电源',
        },
      ];
      this.legend = ['最优能耗最低', '次优能耗最低'];
      this.legendone = ['最优', '次优'];
    }
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
      for (let i = 0; i < val.level.data_list.length; i += 1) {
        this.time = setTimeout(() => {
          if (i > 200) {
            this.dynasticDataOne.data_list.shift();
            this.dynasticDataOne.predict_data_list.shift();
            // this.dynasticDataOne.date_list.shift();
            this.dynasticDataTwo.data_list.shift();
            this.dynasticDataTwo.predict_data_list.shift();
            // this.dynasticDataTwo.green.shift();
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
              // date_list: [
              //   ...this.dynasticDataOne.date_list,
              //   val.level.date_list[i],
              // ],
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
              // green: [
              //   ...this.dynasticDataTwo.green,
              //   val.energy_consumption.green[i],
              // ],
              // date_list: [
              //   ...this.dynasticDataTwo.date_list,
              //   val.level.date_list[i],
              // ],
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
              // date_list: [
              //   ...this.dynasticDataOne.date_list,
              //   val.level.date_list[i],
              // ],
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
              // green: [
              //   ...this.dynasticDataTwo.green,
              //   val.energy_consumption.green[i],
              // ],
              // date_list: [
              //   ...this.dynasticDataTwo.date_list,
              //   val.level.date_list[i],
              // ],
            };
            this.dynasticDataOne = data;
            this.dynasticDataTwo = powerData;
          }
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
  font-size: 28px;
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
  height: 318px;
  margin-top: 60px;

  &.chart-1 {
    margin-bottom: 103px;
  }

  .chart-box {
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 16px 16px 0;
  }
}
</style>
