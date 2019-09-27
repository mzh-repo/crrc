<template>
  <el-container class="container">
    <el-row class="choice">请选择数据进行训练</el-row>
    <el-row class="data-choice">
      <div v-for="(data,index) in dataList"
           :key="index"
           :class="{active:index==isActive }"
           @click="check(index)">
        <div>{{data.name}}</div>
      </div>
      <div class="total-num">共{{totalNum}}条</div>
    </el-row>
    <ul v-for="(item, index) in  resource"
        :key="index">
      <li>CPU cores：{{item.needCores}}M/{{item.surplusCores}}M（所需/剩余）</li>
      <li>CPU Memory：{{item.needCpuMemory}}M/{{item.surplusCpuMemory}}M（所需/剩余）</li>
      <li>GPU Memory：{{item.needGpuMemory}}M/{{item.surplusGpuMemory}}M（所需/剩余）</li>
    </ul>
    <el-row class="examples">
      <bar :lineData="lineData" />
    </el-row>
  </el-container>
</template>

<script>
import Bar from './bar.vue';

export default {
  components: { Bar },
  data() {
    return {
      dataList: [],
      lineData: {},
      isActive: 0,
      totalNum: 129,
      resource: [
        {
          needCores: 56,
          surplusCores: 178,
          needCpuMemory: 56,
          surplusCpuMemory: 178,
          needGpuMemory: 56,
          surplusGpuMemory: 178,
        },
      ],
    };
  },
  mounted() {
    this.getDataList();
    this.getLineData();
  },
  methods: {
    check(index) {
      this.isActive = index;
    },
    getDataList() {
      this.$axios.get('/database/list').then((res) => {
        this.dataList = res;
      });
    },
    getLineData() {
      this.$axios.get('/form/train?id=222').then((res) => {
        this.lineData = res.train;
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
  box-sizing: border-box;
}
.choice {
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 33px;
  color: #666;
}
.data-choice {
  @include box-center;
  font-size: 22px;
  line-height: 30px;
  cursor: pointer;
  div {
    padding-right: 16px;
  }
}
.active {
  font-size: 28px;
  line-height: 40px;
}
.total-num {
  color: #999;
  font-size: 18px;
  line-height: 25px;
}
ul {
  width: 98%;
  display: flex;
  justify-content: space-between;
  margin: 25px 0 24px 0;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  padding-top: 13px;
  padding-bottom: 13px;
  font-size: 13px;
  line-height: 25px;
}
.examples {
  background: #fff;
  border-radius: 8px;
  width: 100%;
}
</style>
