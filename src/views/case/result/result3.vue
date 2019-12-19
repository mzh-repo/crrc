<template>
  <el-container class="forcast-container">
    <el-row class="train-btn">
      <el-button type="primary"
                 @click="$router.push('/upload')">添加训练</el-button>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="18">
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
        </div>
      </el-col>
      <el-col :span="6"
              class="early-situation">
        <span>故障预警</span>
        <span>今日异常概率</span>
        <div class="circle-progress">
          <circle-progress :color="progress.color"
                           :show="Number(number[0])"
                           :total="progress.total"
                           :number="Number(number[0])"
                           :unit="progress.unit" />
        </div>
        <span>本周异常概率</span>
        <div class="circle-progress">
          <circle-progress :color="progress.color"
                           :show="Number(number[1])"
                           :total="progress.total"
                           :number="Number(number[1])"
                           :unit="progress.unit" />
        </div>
        <span>本月异常概率</span>
        <div class="circle-progress">
          <circle-progress :color="progress.color"
                           :show="Number(number[2])"
                           :total="progress.total"
                           :number="Number(number[2])"
                           :unit="progress.unit" />
        </div>
      </el-col>
    </el-row>
    <div class="explain-container">
      <el-row> 解释判据: {{ type === 1 ? explain1 : explain2 }}。 </el-row>
      <el-row>
        其构建的iTree的平均路径长度 c(n)为:
        <markdown-it-vue :content="model1" />
      </el-row>
      <el-row>
        定义样本x 的异常系数为:
        <markdown-it-vue :content="model2" />
      </el-row>
    </div>
    <el-row style="padding-top: 40px">
      <el-button @click="goCase">查看实例报告</el-button>
    </el-row>
  </el-container>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue';
// import bar from '@/components/bar.vue';
import circleProgress from '@/components/circleProgress.vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';

export default {
  components: {
    // 'Mzh-bar': bar,
    'circle-progress': circleProgress,
    MarkdownItVue,
  },
  data() {
    return {
      title: '根据历史行车数据模拟预警今日行车路线上可能的故障时刻',
      legendOne: ['储能系统健康值'],
      legendTwo: ['储能系统健康值', '非接触供电系统健康值', '总供电系统健康值'],
      backgroundColor: '',
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
      progress: {
        color: '#8FD867',
        number: 98,
        show: 98,
        total: 100,
        unit: '%',
      },
      number: [],
      type: 0, // 模型类型: 0 间歇式, 1 非接触式
      time: null, // 定时器
      // errorTime: '', // 异常时刻
      explain1: '利用孤立森林模型求解供电系统状态监测及故障预警模型',
      explain2:
        '利用孤立森林模型求解基于服役状态检测的车载储能装置检修策略模型',
      model1: '```AsciiMath\nc(n) = 2H(n-1) - (2(n-1))/n \n```',
      model2: '```AsciiMath\ns(x, n) = 2^(-(E(h(x)))/(c(n))) \n```',
    };
  },
  mounted() {
    if (this.time) {
      clearTimeout(this.time);
    }
    const { dataBase } = this.$store.state;
    if (Number(dataBase) === 1) {
      this.type = 0;
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
    // getData() {
    //   this.$axios.get(`form/graph?model_type=${this.type}`).then((res) => {
    //     if (res.model_type === 0) {
    //       const data = {
    //         validation_list: [...this.lineDataOne.validation_list, res.overall],
    //       };
    //       if (data.validation_list.length > 20) {
    //         data.validation_list.splice(0, 1);
    //       }
    //       this.lineDataOne = data;
    //     } else {
    //       const dataOther = {
    //         validation_list: [...this.lineDataTwo.validation_list, res.overall],
    //         data_list: [...this.lineDataTwo.data_list, res.storage],
    //         record_list: [...this.lineDataTwo.record_list, res.supply],
    //       };
    //       if (dataOther.validation_list.length > 20) {
    //         dataOther.validation_list.splice(0, 1);
    //         dataOther.data_list.splice(0, 1);
    //         dataOther.record_list.splice(0, 1);
    //       }
    //       this.lineDataTwo = dataOther;
    //     }
    //     this.earlyList = res.status;
    //     this.progress.show = res.overall;
    //     this.progress.number = res.overall;
    //     if (res.abnormal_moment.length > 0) {
    //       res.abnormal_moment.forEach((item) => {
    //         const data = JSON.parse(JSON.stringify(item));
    //         this.newsList.unshift(data);
    //       });
    //       this.newsList = this.newsList.splice(0, 8);
    //     }
    //   });
    // },
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
         ${this.convertNum(date.getHours())}:${this.convertNum(
  date.getMinutes(),
)}:${this.convertNum(date.getSeconds())}`;
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
.forcast-container {
  width: 100%;
  display: flex;
  flex-direction: column;

  /deep/ .katex-display {
    margin-top: -30px;
  }
}

.early-warning {
  text-align: left;
  margin-bottom: 20px;
  padding: 0 40px;
  height: 850px;
  border-radius: 8px;
  background: #fff;
  overflow: auto;
}
// .early-warning,
// .early-model {
//   border-radius: 8px;
//   background: #fff;
//   text-align: left;
// }
// .early-model {
//   padding-left: 20px;
// }
.early-data {
  display: flex;
  overflow: hidden;
  width: 100%;
  flex-wrap: wrap;
  // margin: 20px 0;
}
.early {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px 5px;
  width: 180px;
  // width: 380px;
  height: 160px;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 18px;
  line-height: 33px;
}
.early-situation {
  border-radius: 8px;
  background: #fff;
  text-align: left;
  height: 850px;
  span {
    padding-left: 30px;
  }

  span:not(:first-child) {
    font-size: 18px;
    padding: 30px;
    font-weight: 500;
    color: #2c3e50;
    border-top: 2px dotted #ccc;
  }
}
span {
  display: block;
  padding: 30px 0 30px 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
}
.circle-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
}
.news {
  display: flex;
  justify-content: space-between;
  padding: 14px 30px;
  font-size: 18px;
  line-height: 25px;
  border-bottom: 1px solid #d8d8d8;

  div:last-child {
    font-size: 14px;
    color: #999;
  }
}

.dangerous {
  background-color: #ff5b59;
}
.abnormal {
  background-color: #ffcb33;
}
.normal {
  background-color: #97e9d5;
}

.explain-container {
  text-align: left;
  font-size: 20px;

  .el-row:first-child {
    margin-bottom: 20px;
  }
}

.train-btn {
  text-align: right;
  margin: -60px 0 30px;
}
</style>
