<template>
  <el-container class="container">
    <!-- <div class="title-first">
      <div class="title-right">
        <span>请选择模型</span>
      </div>
    </div> -->
    <div class="title">
      <!-- <div v-if="datebase[0]"
           class="title-left">
        <span :class="tab===1?'active':''"
              @click.stop="tab=1">{{datebase[0]||'间歇式供电列车数据模型'}}</span>
        <span :class="tab===1?'':'active'"
              @click.stop="tab=2">{{datebase[1]||'非接触式间歇式供电列车数据模型'}}</span>
      </div> -->
      <el-tabs v-model="databaseName"
               @tab-click="chooseDatabase">
        <template v-for="(item,index) in dataBaseList">
          <el-tab-pane :key="index"
                       :label="item.name"
                       :name="item.name">
            <span class="info"><i class="el-icon-info" />
              请选择模型
            </span>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <div class="model-area">
      <template v-for="(item) in modelList">
        <div :key="item.id.index"
             :class="'model-box'"
             @click="next(item.id,item.name)">
          <div :class="item.id===choosed?'active':'noactive'">
            <mzh-optimizationModel showChoice
                                   :optimziationList="item"
                                   :describe="datebase[0]" />
          </div>

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
      dataBaseList: [],
      databaseId: '',
      databaseName: '',
    };
  },
  mounted() {
    if (this.$store.state.modelSelected.index) {
      this.choosed = this.$store.state.modelSelected.index;
    }
    // this.getdata();
    this.getDatebase();
  },
  methods: {
    // getdata() {
    //   this.$axios.get('model/detail/list').then((res) => {
    //     this.datebase.push(res[0].name, res[1].name);
    //     this.allList.push(res[0].model_info_list, res[1].model_info_list);
    //     [this.modelList] = this.allList;
    //   });
    // },
    getDatebase() {
      this.$axios.get('database/list').then((res) => {
        this.dataBaseList = res;
        this.databaseId = res[0].id;
        this.databaseName = res[0].name;
        this.getData();
      });
    },
    chooseDatabase() {
      this.dataBaseList.forEach((item) => {
        if (item.name === this.databaseName) {
          this.databaseId = item.id;
        }
      });
      this.getData();
    },
    getData() {
      this.$axios
        .get(`/model/list?database_id=${this.databaseId}`)
        .then((res) => {
          this.modelList = res;
        });
    },
    next(index, name) {
      this.choosed = index;
      if (this.$store.state.modelSelected.index === index) {
        this.$store.commit('selectModel', { index: 0, name });
      } else {
        this.$store.commit('selectModel', { index, name });
      }
    },
  },
  watch: {
    tab() {
      // this.$store.commit('chooseDataBase', this.tab);
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
  padding: 0px 70px 100px;
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

  /deep/ .el-tabs__item {
    font-size: 24px;
  }

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  span {
    color: #666;
    font-size: 20px;
  }
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

.title-right span {
  font-size: 24px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 33px;
}

/deep/.el-col-6 {
  margin: 16px 0 0 0;
}

/deep/.el-row {
  width: 100%;
}

.model-area {
  width: 100%;

  .model-box {
    margin: 16px 16px 0 0;
    float: left;
    cursor: pointer;
  }
  .noactive {
    opacity: 0.6;
  }
  .active {
    opacity: 1;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
  }
}
</style>
