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
    <!-- <el-row class="title">
      <div class="dot"></div>
      <div>最大旅行速度</div>
    </el-row> -->
    <el-row class="result-tab">
      <el-tabs v-model="resultName"
               @tab-click="chooseResult">
        <template v-for="(item,index) in resultList">
          <el-tab-pane :key="index"
                       :label="item.name"
                       :name="item.name">
          </el-tab-pane>
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
          <mzh-line title="手扳级位"
                    :lineData="lineData.force" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="能耗"
                    :legend="legend"
                    :lineData="lineData.power" />
        </div>
      </el-col>
    </el-row>
    <el-row class="speed-line">
      <!-- 平均速度： {{speed}}km/s &nbsp;&nbsp;&nbsp; 总能耗: {{energy}}kwh -->
      预测能耗(实际级位)与实际能耗(实际级位)平均差异：{{lineData.power.ratio}}
    </el-row>
    <move-train v-if="showAgain" />
    <el-row :gutter="19"
            class="chart-container">
      <el-col :span="24">
        <div class="chart-box">
          <mzh-line title="手扳级位(实时)"
                    :lineData="dynasticDataOne" />
        </div>
      </el-col>
      <el-col :span="24">
        <div class="chart-box">
          <mzh-line title="能耗(实时)"
                    :legend="legend"
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
        green: [],
      },
      dynasticData: {},
      type: 3, // 2 间歇式, 3 非接触式
      time: '',
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
    };
  },
  mounted() {
    const { dataBase } = this.$store.state;
    if (dataBase === 1) {
      this.type = 2;
    } else {
      this.type = 3;
    }
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get(
          `form/graph?model_type=${this.type}&dataset_id=${
            this.$store.state.dataSelected
          }`,
        )
        .then((res) => {
          this.lineData.force = res.level;
          this.lineData.power = res.energy_consumption;
          this.renderData(res);
        });
    },
    renderData(val) {
      for (let i = 0; i < val.level.data_list.length; i += 1) {
        this.time = setTimeout(() => {
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
        }, 1000);
      }
    },
    // 不同结果集
    chooseResult() {
      this.showAgain = false;
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
      this.$nextTick(() => {
        this.showAgain = true;
        if (this.resultName === '最佳能耗') {
          this.getData();
        } else {
          this.getDataOther();
        }
      });
    },
    getDataOther() {
      this.$axios
        .get(
          `form/graph?model_type=${this.type}&dataset_id=${
            this.$store.state.dataSelected
          }`,
        )
        .then((res) => {
          this.lineData.force = res.level_speed;
          this.lineData.power = res.energy_consumption_speed;
          this.renderDataOther(res);
        });
    },
    renderDataOther(val) {
      for (let i = 0; i < val.level.data_list.length; i += 1) {
        this.time = setTimeout(() => {
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
</style>
