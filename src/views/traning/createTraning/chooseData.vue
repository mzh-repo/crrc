<template>
  <el-container class="container">
    <el-row class="choice">请选择数据进行训练</el-row>
    <el-row class="data-choice">
      <div v-for="(data,index) in dataList"
           :key="index"
           :class="{active:index==(isActive-1) }"
           @click="check(index)">
        <div>{{data.name}}</div>
      </div>
      <div class="totalNum">共{{totalNum}}条</div>
    </el-row>
    <el-row class="collapse">
      <el-collapse v-for="(item,index) in collapseList"
                   v-model="activeName"
                   :key="index"
                   accordion>
        <el-collapse-item :name="index">
          <template slot="title">
            <div>{{item.title}}
            </div>
            <span>共{{item.num}}组</span>
          </template>
          <el-col v-for="(histogramList, index) in lineDataList"
                  :span="8"
                  :key="index"
                  class="echarts">
            <histogram :colors="colors[index]"
                       :lineData="histogramList.lineData" />

          </el-col>
          <img v-if="item.selected"
               src="@/assets/images/choiced.png"
               class="stamp"
               @click="setSelect(index)">
          <div v-else
               class="select"
               @click="setSelect(index)"></div>
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </el-container>
</template>

<script>
import Histogram from '../../../components/histogram.vue';

export default {
  components: { Histogram },
  data() {
    return {
      dataList: [],
      colors: ['#8FD866', '#00C4C0'],
      isActive: 1,
      totalNum: 129,
      activeName: 0,
      collapseList: [
        { title: '储能系统优化训练数据', num: 123, selected: false },
        { title: '非接触供电系统优化训练数据', num: 256, selected: false },
        { title: '非接触供电系统优化训练数据', num: 256, selected: false },
        { title: '非接触供电系统优化训练数据', num: 256, selected: false },
      ],
      lineDataList: [{ lineData: {} }, { lineData: {} }],
    };
  },
  mounted() {
    this.collapseList[0].selected = true;
    this.getDataList();
    this.getlineDataList();
  },
  methods: {
    check(index) {
      this.isActive = index + 1;
      this.getlineDataList();
    },
    setSelect(index) {
      this.collapseList.forEach((item, i) => {
        this.collapseList[i].selected = false;
        if (index === i) {
          this.collapseList[i].selected = true;
        }
      });
    },
    getlineDataList() {
      this.$axios
        .get(`/dataset/graph?database_id=${this.isActive}`)
        .then((res) => {
          const temp = JSON.parse(JSON.stringify(this.lineDataList));
          for (let i = 0; i < res.length; i += 1) {
            temp[i].lineData.data = [...JSON.parse(res[i]).data];
            temp[i].lineData.bins = [...JSON.parse(res[i]).bins];
          }
          this.lineDataList = temp;
        });
    },
    getDataList() {
      this.$axios.get('/database/list').then((res) => {
        this.dataList = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @include flex-column;
  width: 100%;
  height: auto;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 33px 103px 0 70px;
  font-size: 22px;
  line-height: 30px;
}
.choice {
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 33px;
}
.data-choice {
  @include box-center;
  font-size: 22px;
  line-height: 30px;
  div {
    padding-right: 16px;
  }
}
.active {
  font-size: 28px;
  line-height: 40px;
}
.totalNum {
  color: #999;
  font-size: 18px;
  line-height: 25px;
}
.collapse {
  width: 100%;
  margin: 7px 0 107px 0;
  span {
    color: #999;
    font-size: 18px;
    line-height: 25px;
    float: right;
    position: absolute;
    right: 50px;
  }
}
.echarts {
  display: flex;
}
.collapse /deep/ {
  .el-collapse-item__header.is-active {
    border-bottom: 1px solid #ebeef5;
  }
  .el-collapse-item__header {
    font-size: 22px;
    line-height: 30px;
    padding: 40px 0 34px 29px;
    position: relative;
  }
  .el-collapse {
    border-radius: 50px;
  }
  .el-collapse-item {
    position: relative;
  }
}
.select {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: absolute;
  border: 1px solid rgba(227, 227, 227, 1);
  bottom: 30px;
  right: 30px;
  z-index: 3000;
}
img {
  width: 36px;
  height: 36px;
  position: absolute;
  bottom: 30px;
  right: 30px;
}
</style>
