<template>
  <el-container class="analyze-container">
    <div class="title-line">
      <div class="title">数据集名称</div>
      <div class="data-line">
        <div class="data-left">总记录数量：100 M </div>
        <div>物理大小：20 M</div>
      </div>
    </div>
    <el-row class="charts-title">
      <el-col :span="12">{{chartsOptions[0].title}}</el-col>
      <el-col :span="12">{{chartsOptions[1].title}}</el-col>
    </el-row>
    <el-row class="charts-box">
      <el-col :span="12">
        <bar-chart title=""
                   :colors="chartsOptions[0].colors"
                   :dataSet="chartsOptions[0].dataSet" />
      </el-col>
      <el-col :span="12">
        <bar-chart title=""
                   :colors="chartsOptions[1].colors"
                   :dataSet="chartsOptions[1].dataSet" />
      </el-col>
    </el-row>
    <div class="item-title">样例输出</div>
    <table class="out-table">
      <tr v-for="(item,index) in outList"
          :key="index">
        <td v-for="(child,index) in item"
            :key="index">{{child}}</td>
      </tr>
    </table>
  </el-container>
</template>

<script>
import BarChart from '../../../components/barChart.vue';

export default {
  components: { BarChart },
  data() {
    return {
      chartsOptions: [
        {
          title: '坡度值分布',
          colors: ['#8FD866', '#8FD866'],
          dataSet: {
            column1: [0.1, 0.3, 0.6, 0.2, 0.5, 0.7, 1.0, 0.2, 0.4],
            column3: [10, 20, 30, 40, 50, 60, 70, 80, 90],
          },
        },
        {
          title: '速度值分布',
          colors: ['#00C4C0', '#00C4C0'],
          dataSet: {
            column1: [0.1, 0.3, 0.6, 0.2, 0.5, 0.7, 1.0, 0.2, 0.4],
            column3: [10, 20, 30, 40, 50, 60, 70, 80, 90],
          },
        },
      ],
      protoList: [
        '列名,日期,时间,DCU_5 车电机定子电流有效值(变量 1),DCU_2 车牵引变流器内部空气温度(变量 2),是否异常,异常概率',
        '09898,2019.6.12,19:00:00,数值[连续浮点型],数值[连续浮点型],数值[离散],0',
      ],
      outList: [],
    };
  },
  mounted() {
    // TODO
    // this.$axios.get().then(res => res);
    const tempList = this.protoList;
    const listBeforeT = [];
    let col = 0;
    tempList.forEach((item) => {
      const tempArr = item.split(',');
      listBeforeT[col] = tempArr;
      col += 1;
    });
    this.outList = listBeforeT;
  },
};
</script>

<style lang="scss" scoped>
.analyze-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  align-items: flex-start;
}

.out-table {
  padding: 10px 0;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  width: 100%;
  background-color: #fff;
  margin-bottom: 150px;
  margin-top: 26px;
}

.out-table tr {
  height: 40px;
}

.charts-box {
  height: 296px;
  width: 100%;
  margin: 0 -30px;
}

.charts-title {
  margin-bottom: -20px;
  font-size: 22px;
  color: #333;
  font-weight: bold;
  width: 100%;
  text-align: start;
}

.title-line {
  margin-top: 58px;
  margin-bottom: 32px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.data-line {
  display: flex;
  flex-direction: row;
  color: #333;
  font-size: 18px;
}

.title {
  color: #666;
  font-size: 24px;
}

.data-left {
  margin-right: 40px;
}

.item-title {
  font-size: 22px;
  color: #333;
}
</style>
