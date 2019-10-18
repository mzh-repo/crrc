<template>
  <el-container class="forcast-container">
    <el-row :gutter="16">
      <el-col :span="18">
        <div class="early-warning">
          <span>故障预警</span>
          <div class="early-data">
            <div v-for="(item, index) in earlyList"
                 :key="index"
                 :class="getColor(item.value)"
                 class="early">
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="early-model">
          <Mzh-bar v-if="type === 0"
                   :lineData="lineDataOne"
                   :legend="legendOne" />
          <Mzh-bar v-else
                   :lineData="lineDataTwo"
                   :legend="legendTwo" />
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
        <template v-if="newsList.length > 0">
          <div v-for="(news, i) in newsList"
               :key="i"
               class="news">
            <div>{{news.content}}</div>
            <div>{{news.time}}</div>
          </div>
        </template>
        <template v-else>
          <div class="news">暂无</div>
        </template>
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
      legendOne: ['储能系统健康值'],
      legendTwo: ['非接触供电系统健康值', '储能系统健康值', '总供电系统健康值'],
      backgroundColor: '',
      newsList: [
        // { content: 'xxxxxx', time: '2019.8.10' },
        // { content: 'xxxxxx', time: '2019.8.11' },
        // { content: 'xxxxxx', time: '2019.8.12' },
      ],
      earlyList: [
        // { title: '储能电源1温度', type: 0 },
        // { title: '储能电源1电压', type: 0 },
        // { title: '储能电源1电流', type: 1 },
        // { title: '储能电源2温度', type: 0 },
        // { title: '储能电源2电压', type: 2 },
        // { title: '储能电源2电流', type: 1 },
        // { title: '储能电源3温度', type: 0 },
        // { title: '储能电源3电压', type: 0 },
        // { title: '储能电源3电流', type: 1 },
      ],
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
        unit: '分',
      },
      type: 0, // 模型类型: 0 间歇式, 1 非接触式
      time: '', // 定时器
    };
  },
  mounted() {
    const { dataBase } = this.$store.state;
    if (dataBase === 1) {
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
    getData() {
      this.$axios.get(`form/graph?model_type=${this.type}`).then((res) => {
        // console.log('res', res.health.overall);
        if (res.model_type === 0) {
          const data = {
            validation_list: res.health.overall,
          };
          this.lineDataOne = data;
        } else {
          const data = {
            validation_list: res.health.overall,
            data_list: res.health.storage,
            record_list: res.health.supply,
          };
          this.lineDataTwo = data;
        }
        this.earlyList = res.status;
        this.progress.show = res.overall;
        this.progress.number = res.overall;
        this.newsList = res.abnormal_moment;
      });
    },
    round() {
      // if (this.time !== '') {
      //   clearTimeout(this.time);
      // } else {
      this.time = setTimeout(() => {
        this.getData();
        this.round();
      }, 1000);
      // }
    },
    beforeDestroy() {
      clearTimeout(this.time);
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
