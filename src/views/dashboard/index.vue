<template>
  <el-container class="dashboard">
    <el-col :span="4">
      <user-info />
    </el-col>
    <el-col :span="20">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="box model-prediction">
            <div>实时训练</div>
            <div>车载储能系列性能劣化条件下的列车运动控制模型预测</div>
            <bar :lineData="lineData" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <div class="server-data">服务器数据</div>
            <div class="circle-row">
              <div class="circle-box"
                   v-for="item in circleList"
                   :key="item.title">
                <circle-progress class="circle-progress"
                                 :size="size"
                                 :color="item.color"
                                 :show="item.show"
                                 :total="item.total"
                                 :number="item.number"
                                 :unit="item.unit"></circle-progress>
                <div class="detail">{{item.title}}</div>
              </div>
            </div>
            <div class="detail-column">
              <div class="server-total"
                   v-for="item in circleList"
                   :key="item.title">
                <div>{{item.title}}</div>
                <div class="total-unit">{{item.total}}{{item.unit}}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="box">
            <bar-chart title="近期训练"
                       xName="id"
                       yName="Loss"
                       :height="chartHeight" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box">
            <bar-chart title="近期应用"
                       xName="id"
                       yName="Loss"
                       :colors="colors"
                       :height="chartHeight" />
          </div>
        </el-col>
      </el-row>
      <el-row class="moder-area"
              :gutter="20">
        <el-col :span="24">
          <span class="model-title">模型中心</span>
          <span class="model-more"
                @click.stop="toModel">更多</span>
        </el-col>
        <el-col v-for="(item,index) in modelList"
                :key="index"
                :span="8">
          <div class="box"
               @click="toModelReport">
            <ModelTrain :modelData='item'
                        :number="index+1" />
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-container>
</template>

<script>
import UserInfo from '../../components/userInfo.vue';
import BarChart from '@/components/barChart.vue';
import ModelTrain from '@/components/modelTrain.vue';
import CircleProgress from '@/components/circleProgress.vue';
import Bar from '@/components/bar.vue';

export default {
  components: {
    UserInfo,
    BarChart,
    ModelTrain,
    CircleProgress,
    Bar,
  },
  data() {
    return {
      colors: ['#00C4C0', '#8FD866'],
      circleList: [
        {
          title: 'CPU cores',
          color: '#8FD867',
          show: 12,
          total: 256,
          number: 12,
          unit: 'cores',
        },
        {
          title: 'CPU Memory',
          color: '#54A8F7',
          show: 156,
          total: 1440,
          number: 156,
          unit: 'M',
        },
        {
          title: 'GPU cores',
          color: '#FFB539',
          show: 48,
          total: 1440,
          number: 48,
          unit: 'M',
        },
      ],
      chartHeight: '326px',
      appData: {},
      trainData: {},
      lineData: {},
      screenWidth: document.body.clientWidth,
      modelList: [],
      resettime: false,
    };
  },
  computed: {
    size() {
      return this.screenWidth * 0.0667;
    },
  },
  methods: {
    b() {
      if (!this.resettime) {
        setTimeout(() => {
          this.getLineData();
          this.b();
        }, 30000);
      }
    },
    toModel() {
      this.$router.push({ path: '/chooseModel' });
    },
    toModelReport() {
      this.$router.push({ path: '/modelReport' });
    },
    getLineData() {
      this.$axios.get('/form/train?id=1').then((res) => {
        this.lineData = res.train;
      });
    },
    getModelList() {
      this.$axios.get('model/latest/list').then((res) => {
        this.modelList = res;
      });
    },
  },
  mounted() {
    this.getLineData();
    this.$axios.get('/form/recent?type=train').then((res) => {
      this.appData = res.application;
      this.trainData = res.train;
    });
    window.onresize = () => {
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth;
    };
    this.getModelList();
    this.b();
  },
  beforeDestroy() {
    this.resettime = true;
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
}

.circle-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
}

.circle-box {
  display: flex;
  flex-direction: column;
}

.server-data {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFangSC;
  text-align: left;
  color: #333;
  padding-left: 20px;
  padding-top: 20px;
}

.circle-progress {
  margin: 18px 0;
}

.detail {
  color: #333;
  font-size: 14;
}

.detail-column {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.server-total {
  height: 53px;
  width: 90%;
  color: #333;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #d8d8d8;
  &:nth-child(3) {
    border-bottom: none;
  }
}

.total-unit {
  font-size: 14px;
}

.el-row {
  &:first-child {
    height: 418px;
    margin-bottom: 20px;
  }
  &:nth-child(2) {
    height: 326px;
    margin-bottom: 20px;
  }
  // &:nth-child(3) {
  //   height: 164px;
  // }
}

.el-col {
  height: 100%;
}

.box {
  background: #fff;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  height: 100%;
  cursor: pointer;
}

.model-prediction {
  text-align: left;
  div:nth-child(1) {
    padding: 18px 0 9px 25px;
    font-size: 24px;
    line-height: 33px;
  }
  div:nth-child(2) {
    padding-left: 25px;
    color: #666;
    font-size: 16px;
    line-height: 22px;
  }
}

.moder-area {
  margin: 0 0 20px;

  .el-col:nth-child(1) {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 20px;
  }
}

.model-title {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFangSC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
}

.model-more {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  cursor: pointer;
}
</style>
