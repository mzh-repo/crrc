<template>
  <el-container class="container">
    <div class="title-first">
      <div class="title-right">
        <span>请选择供电系统状态监测及故障预警模型</span>
      </div>
    </div>
    <div class="title">
      <div class="title-left">
        <span>面向非接触供电列车的大数据运用模型</span>
      </div>
    </div>
    <el-row>
      <template v-for="item in modelList">
        <el-col :span="7"
                :key="item.index">
          <div>
            <mzh-optimizationModel :optimziationList="item" />
          </div>
        </el-col>
      </template>
    </el-row>
    <div class="title">
      <div class="title-left">
        <span>面向非接触供电列车的大数据运用模型</span>
      </div>
    </div>
    <el-row>
      <template v-for="item in modelList">
        <el-col :span="7"
                :key="item.index">
          <div>
            <mzh-optimizationModel :optimziationList="item" />
          </div>
        </el-col>
      </template>
    </el-row>
  </el-container>
</template>

<script>
import MzhoptimizationModel from '../../components/optimizationModel.vue';

export default {
  components: { 'mzh-optimizationModel': MzhoptimizationModel },
  data() {
    return {
      modelList: [
        {
          title: '储能系统优化模型',
          describe: '适用数据集：间歇式供电列车行车数据集',
          lately_loss: 0.1,
          average_loss: 0.1,
          exampleNum: '80',
          size: 34.2,
        },
        {
          title: '储能系统优化模型',
          describe: '适用数据集：间歇式供电列车行车数据集',
          lately_loss: 0.1,
          average_loss: 0.1,
          exampleNum: '80',
          size: 34.2,
        },
        {
          title: '储能系统优化模型',
          describe: '适用数据集：间歇式供电列车行车数据集',
          lately_loss: 0.1,
          average_loss: 0.1,
          exampleNum: '80',
          size: 34.2,
        },
        {
          title: '储能系统优化模型',
          describe: '适用数据集：间歇式供电列车行车数据集',
          lately_loss: 0.1,
          average_loss: 0.1,
          exampleNum: '80',
          size: 34.2,
        },
        {
          title: '储能系统优化模型',
          describe: '适用数据集：间歇式供电列车行车数据集',
          lately_loss: 0.1,
          average_loss: 0.1,
          exampleNum: '80',
          size: 34.2,
        },
        {
          title: '储能系统优化模型',
          describe: '适用数据集：间歇式供电列车行车数据集',
          lately_loss: 0.1,
          average_loss: 0.1,
          exampleNum: '80',
          size: 34.2,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  padding: 50px 70px 100px;
  width: 100%;
  height: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'PingFangSC-Regular', 'PingFangSC';
}

.title,
.title-first {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.title {
  margin: 20px 0 0;
}

// .title-left {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
// }

.title-left span:nth-child(1) {
  font-size: 24px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 33px;
}

.title-right span:nth-child(1) {
  font-size: 28px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
}

/deep/.el-col-6 {
  margin: 16px 0 0 0;
}

/deep/.el-row {
  width: 100%;
}
</style>
