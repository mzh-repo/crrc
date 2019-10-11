<template>
  <el-container class="forcast-container">
    <el-row :gutter="16">
      <el-col :span="18">
        <div class="early-warning">
          <span>故障预警</span>
          <div class="early-data">
            <div v-for="(item, index) in earlyList"
                 :key="index"
                 :class="getColor(item.type)"
                 class="early">
              {{item.title}}
            </div>
          </div>
        </div>
        <div class="early-model">
          <Mzh-bar :lineData="lineData"
                   :legend="legend" />
        </div>
      </el-col>
      <el-col :span="6"
              class="early-situation">
        <span>健康值</span>
        <div class="circle-progress">
          <circle-progress :color="progress.color"
                           :show="progress.show"
                           :total="progress.total"
                           :number="progress.number"
                           :unit="progress.unit" />
        </div>
        <span>异常时刻</span>
        <div v-for="(news, i) in newsList"
             :key="i"
             class="news">
          <div>{{news.content}}</div>
          <div>{{news.time}}</div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import bar from '@/components/bar.vue';
import circleProgress from '@/components/circleProgress.vue';

export default {
  components: {
    'Mzh-bar': bar,
    'circle-progress': circleProgress,
  },
  data() {
    return {
      legend: ['xxx', 'xxxx', 'xxxxx'],
      backgroundColor: '',
      newsList: [
        { content: 'xxxxxx', time: '2019.8.10' },
        { content: 'xxxxxx', time: '2019.8.11' },
        { content: 'xxxxxx', time: '2019.8.12' },
      ],
      earlyList: [
        { title: '储能电源1温度', type: 0 },
        { title: '储能电源1电压', type: 0 },
        { title: '储能电源1电流', type: 1 },
        { title: '储能电源2温度', type: 0 },
        { title: '储能电源2电压', type: 2 },
        { title: '储能电源2电流', type: 1 },
        { title: '储能电源3温度', type: 0 },
        { title: '储能电源3电压', type: 0 },
        { title: '储能电源3电流', type: 1 },
      ],
      lineData: {
        data_list: [20, 30, 40, 45, 60],
        validation_list: [20, 10, 45, 45, 80],
        record_list: [20, 80, 15, 95, 10],
      },
      progress: {
        color: '#8FD867',
        number: 98,
        show: 98,
        total: 100,
        unit: '分',
      },
    };
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
  },
};
</script>

<style lang="scss" scoped>
.el-row,
.forcast-container {
  width: 100%;
}
.early-warning {
  text-align: left;
  margin-bottom: 20px;
  padding-left: 40px;
}
.early-warning,
.early-model {
  border-radius: 8px;
  background: #fff;
  text-align: left;
}
.early-model {
  padding-left: 20px;
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
  margin: 0 20px 20px 0;
  width: 220px;
  height: 160px;
  color: #fff;
  border-radius: 2px;
  font-size: 24px;
  line-height: 33px;
}
.early-situation {
  border-radius: 8px;
  background: #fff;
  text-align: left;
  height: 100%;
  span {
    padding-left: 30px;
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
}
.news {
  display: flex;
  justify-content: space-between;
  padding: 14px 30px;
  font-size: 18px;
  line-height: 25px;
  border-bottom: 1px solid #d8d8d8;
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
</style>
