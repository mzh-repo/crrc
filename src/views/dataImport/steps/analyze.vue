<template>
  <el-container class="analyze-container">
    <div class="title-line">
      <div class="title">{{importData.sqlName}}</div>
      <div class="data-line">
        <div class="data-left">总记录数量：{{total}} 条</div>
        <div>物理大小：{{unitConvert(size)}}MB</div>
      </div>
    </div>
    <!-- <el-row class="charts-title">
      <el-col :span="12">{{chartsOptions[0].title}}</el-col>
      <el-col :span="12">{{chartsOptions[1].title}}</el-col>
    </el-row> -->
    <el-row class="charts-box">
      <!-- <el-col :span="12">
        <bar-chart title=""
                   :colors="chartsOptions[0].colors"
                   :dataSet="chartsOptions[0].dataSet"
                   showXAxis="true" />
      </el-col>
      <el-col :span="12">
        <bar-chart title=""
                   :colors="chartsOptions[1].colors"
                   :dataSet="chartsOptions[1].dataSet"
                   showXAxis="true" />
      </el-col> -->
      <el-col v-for="(item, index) in dataSetList"
              :span="12"
              :key="index"
              align="center">
        <histogram :colors="colors[index]"
                   :lineData="item" />
      </el-col>
    </el-row>
    <div class="item-title">样例输出</div>
    <table class="out-table"
           style="border-collapse:collapse">
      <tr v-for="(item,index) in outList"
          :key="index">
        <td v-for="(child,index) in item"
            :key="index">{{child}}</td>
      </tr>
    </table>
  </el-container>
</template>

<script>
// import BarChart from '../../../components/barChart.vue';
import Histogram from '../../../components/histogram.vue';

export default {
  components: { Histogram },
  data() {
    return {
      // chartsOptions: [
      //   {
      //     title: '坡度值分布',
      //     colors: ['#8FD866', '#8FD866'],
      //     dataSet: {
      //       data_list: [],
      //       id_list: [],
      //     },
      //   },
      //   {
      //     title: '速度值分布',
      //     colors: ['#00C4C0', '#00C4C0'],
      //     dataSet: {
      //       data_list: [],
      //       id_list: [],
      //     },
      //   },
      // ],
      outList: [],
      total: '',
      size: '',
      dataSetList: [],
      colors: ['#8FD866', '#00C4C0'],
    };
  },
  mounted() {
    this.initData();
  },
  beforeDestroy() {
    const data = {
      total: this.total,
      size: this.size,
    };
    this.$store.dispatch('setImportData', data);
  },
  computed: {
    importData() {
      return this.$store.state.importData;
    },
  },
  methods: {
    initData() {
      // this.$axios.get('/dataset/graph').then((res) => {
      //   const temp = JSON.parse(JSON.stringify(this.chartsOptions));
      //   for (let i = 0; i < res.length; i += 1) {
      //     temp[i].dataSet.data_list = [...JSON.parse(res[i]).data];
      //     temp[i].dataSet.id_list = [...JSON.parse(res[i]).bins];
      //   }
      //   this.chartsOptions = temp;
      // });

      const data = {
        header_mappings: this.importData.options,
        name: this.importData.sqlName,
        database_id: this.importData.sql,
        id: this.importData.id,
      };
      this.$axios.put('/dataset', data).then((res) => {
        this.dataSetList = res.graph;
        this.total = res.line;
        // this.size = this.formatDataSize(res.size, true);
        this.size = res.size;
        const tempList = res.previews;
        const listBeforeT = [];
        listBeforeT[0] = this.importData.options;
        let col = 1;
        tempList.forEach((item) => {
          const tempArr = item.split(',');
          listBeforeT[col] = tempArr;
          col += 1;
        });
        this.outList = listBeforeT;
      });
    },
    unitConvert(data) {
      return (data / 1024 / 1024).toFixed(1);
    },
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

  tr:first-child td {
    border-bottom: 1px solid #666666;
  }
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
