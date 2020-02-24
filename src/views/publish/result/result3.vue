<template>
  <el-container class="forcast-container">
    <!-- <el-row class="train-btn">
      <el-button type="primary"
                 @click="$router.push('/upload')">强化训练</el-button>
    </el-row> -->
    <el-row :gutter="16">
      <el-col :span="24">
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
          <el-row>故障概率</el-row>
          <div class="error-box">{{ type === 0 ? '11.85' : '5.63' }}<span>(%)</span></div>
          <el-row>检修里程</el-row>
          <div class="error-box">{{ type === 0 ? '264.45' : '283.11' }}<span>(km)</span></div>
        </div>
      </el-col>
      <!-- <el-col :span="6"
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
      </el-col> -->
    </el-row>
    <div v-if="type === 0"
         class="strategy-box">
      <span>检修策略</span>
      <el-row v-html="strategy"></el-row>
    </div>
    <!-- <el-row class="progress" v-html="explain"> </el-row>
    <el-row :gutter="30" class="progress-img">
      <el-col :span="12">
        <el-image :src="srcList[0]" :preview-src-list="[srcList[0]]" />
      </el-col>
      <el-col :span="12">
        <el-image :src="srcList[1]" :preview-src-list="[srcList[1]]" />
      </el-col>
    </el-row> -->
    <el-row style="padding-top: 40px">
      <el-button @click="goCase">查看实例报告</el-button>
    </el-row>
  </el-container>
</template>

<script>
/* eslint-disable global-require */
// import MarkdownItVue from 'markdown-it-vue';
// import circleProgress from '@/components/circleProgress.vue';
// import 'markdown-it-vue/dist/markdown-it-vue.css';

export default {
  components: {
    // 'circle-progress': circleProgress,
    // MarkdownItVue,
  },
  data() {
    return {
      strategy: '',
      explain:
        '&nbsp;&nbsp;&nbsp;&nbsp;孤立森林（Isolation Forest）模型通过构建多棵 𝑖𝑇𝑟𝑒𝑒 进行决策投票的方法进行异常检测。直观上来讲，可以观察到对于数据空间中数据分布密度较高的区域，需要对其进行多次切割才会停止，而那些密度很低的区域很容易较早便切割停到叶子结点了。因为异常点一般都是非常稀有的，所以在 𝑖𝑇𝑟𝑒𝑒 中会很快被划分到叶子节点，使用叶子节点到根节点的路径 ℎ(𝑥) 长度计算一条记录 𝑥 是否异常的概率。最后结合异常概率序列的时序信息，将过去及当前时刻的异常概率输入到循环神经网络的变种 GRU （Gate Recurrent Unit）网络中，从而预测未来时刻的异常概率。',
      srcList: [
        require('@/assets/images/error1.png'),
        require('@/assets/images/error2.png'),
      ],
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
    // const { dataBase } = this.$store.state;
    const dataBase = sessionStorage.getItem('dataBaseId');
    if (Number(dataBase) === 1) {
      this.type = 0;
      // this.getStrategy();
      this.strategy =
        '某个电芯温度比其他电芯高20℃，则该电芯内阻过大需要更换电池模组';
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
         ${this.convertNum(date.getHours())}:
         ${this.convertNum(date.getMinutes())}:
         ${this.convertNum(date.getSeconds())}`;
    },
    // 检修策略对应 Map
    // getStrategy() {
    //   this.$axios.get('/maintenance_policy').then((res) => {});
    // },
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
  margin-bottom: 10px;
  padding: 0 30px;
  height: 850px;
  border-radius: 8px;
  background: #fff;
  overflow: auto;
}

.early-data {
  display: flex;
  overflow: hidden;
  width: 100%;
  flex-wrap: wrap;
}

.early {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px 5px;
  // width: 180px;
  width: 170px;
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

.progress {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}

.progress-img {
  margin-bottom: 30px;

  .el-image {
    @include set-size(300px, 200px);
  }
}

.strategy-box {
  background: #fff;
  text-align: left;
  padding: 40px;
  margin-bottom: 30px;
  margin-right: -8px;
  border-radius: 8px;

  span {
    font-weight: bold;
    font-size: 24px;
    padding-top: 0;
  }
}

.error-box {
  margin: 20px 30px;
  font-size: 30px;
  display: flex;
  align-items: baseline;

  span {
    font-size: 16px;
  }
}
</style>
