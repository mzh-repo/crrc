<template>
  <el-container class="container">
    <div class="title-first">
      <div class="title-right">
        <span>请选择供电系统状态监测及故障预警模型</span>
      </div>
    </div>
    <div class="title">
      <div v-if="datebase[0]"
           class="title-left">
        <span :class="tab===1?'active':''"
              @click.stop="tab=1">{{datebase[0].name||'间歇式供电列车数据'}}</span>
        <span :class="tab===1?'':'active'"
              @click.stop="tab=2">{{datebase[1].name||'非接触式间歇式供电列车数据'}}</span>
      </div>
    </div>
    <div class="model-area">
      <template v-for="(item) in modelList">
        <div :span="7"
             :key="item.id.index"
             :class="item.id===choosed?'model-box active':'model-box'"
             @click="next(item.id)">
          <mzh-optimizationModel :optimziationList="item"
                                 :describe="datebase[0]" />
        </div>
      </template>
    </div>
  </el-container>
</template>

<script>
import MzhoptimizationModel from '../../components/optimizationModel.vue';

export default {
  components: { 'mzh-optimizationModel': MzhoptimizationModel },
  data() {
    return {
      modelList: [],
      datebase: [],
      allList: [],
      choosed: 0,
      tab: 1,
    };
  },
  mounted() {
    if (this.$store.state.modelSelected) {
      this.choosed = this.$store.state.modelSelected;
    }
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios.get('model/detail/list').then((res) => {
        this.datebase.push(res[0].name, res[1].name);

        this.allList.push(res[0].model_info_list, res[1].model_info_list);
        [this.modelList] = this.allList;
      });
    },
    next(index) {
      this.choosed = index;
      this.$store.commit('selectModel', index);
    },
  },
  watch: {
    tab() {
      if (this.tab === 1) {
        [this.modelList] = this.allList;
      } else if (this.tab === 2) {
        [, this.modelList] = this.allList;
      }
    },
  },
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

.title-left span {
  font-size: 22px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
  margin: 0 20px 0 0;
  cursor: pointer;
}
.title-left .active {
  font-size: 28px;
  font-weight: 600;
  line-height: 40px;
}
// .title-left span:nth-child(1) {
//   font-size: 24px;
//   font-weight: 400;
//   color: rgba(102, 102, 102, 1);
//   line-height: 33px;
// }

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

.model-area {
  .model-box {
    float: left;
    cursor: pointer;
    opacity: 0.6;
  }
  .active {
    opacity: 1;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
  }
}
</style>
