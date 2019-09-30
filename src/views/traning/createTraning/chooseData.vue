<template>
  <el-container class="container">
    <el-row class="choice">请选择数据进行训练</el-row>
    <el-row class="data-choice">
      <div class="choice-content">
        <div v-for="(data,index) in dataList"
             :key="index"
             :class="{active:index==(isActive-1) }"
             @click="check(index)">
          <div>{{data.name}}</div>
        </div>
      </div>
      <div class="totalNum">共{{dataList[isActive-1].model_number}}条</div>
    </el-row>
    <el-row class="collapse">
      <el-collapse v-for="(item,index) in collapseList"
                   v-model="activeName"
                   :key="index"
                   accordion>
        <el-collapse-item :name="index">
          <template slot="title">
            <div>{{item.name}}
            </div>
            <span>共{{item.line}}条</span>
          </template>
          <el-col v-for="(histogramList, i) in lineDataList"
                  :span="8"
                  :key="i"
                  class="echarts">
            <histogram :colors="colors[i]"
                       :title="titles[i]"
                       :lineData="histogramList.lineData" />
          </el-col>
          <img v-if="index===selected"
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
      dataList: [{ model_number: '' }],
      colors: ['#8FD866', '#00C4C0'],
      isActive: 1,
      totalNum: 129,
      activeName: 0,
      collapseList: [],
      selected: 0,
      lineDataList: [{ lineData: {} }, { lineData: {} }],
      titles: ['速度值分布', '坡度值分布'],
    };
  },
  mounted() {
    if (this.$store.state.chooseData) {
      this.dataList.forEach((item, num) => {
        if (this.$store.state.chooseData === item.id) {
          this.dataList[num].selected = true;
        }
      });
    }
    this.getDataList();
    this.getlineDataList();
    this.getList();
  },
  methods: {
    check(index) {
      this.isActive = index + 1;
      this.getlineDataList();
      this.getList();
    },
    setSelect(index) {
      // this.collapseList.forEach((item, i) => {
      //   this.collapseList[i].selected = false;
      //   if (index === i) {
      //     this.selected = i;
      //   }
      // });
      if (this.$store.state.chooseData !== index) {
        this.$store.commit('setChoose', index);
        this.selected = index;
      } else {
        this.$store.commit('setChoose', 0);
        this.selected = 0;
      }
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
    getList() {
      this.$axios
        .get(`/dataset/list?database_id=${this.isActive}`)
        .then((res) => {
          this.collapseList = res.data_list;
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
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 22px;
  line-height: 30px;
  cursor: pointer;
  .choice-content {
    @include box-center;
    justify-content: flex-start;
    width: 626px;
    div:first-child {
      padding-right: 16px;
    }
  }
}
.active {
  font-size: 28px;
  font-weight: bold;
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
  z-index: 2000;
}
img {
  width: 36px;
  height: 36px;
  position: absolute;
  bottom: 30px;
  right: 30px;
}
</style>
