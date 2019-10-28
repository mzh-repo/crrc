<template>
  <el-container class="container">
    <!-- <div class="title-first">
      <div class="title-right">
        <span>选择数据集</span>
      </div>
    </div> -->
    <div class="title">
      <!-- <div class="title-left">
        <span :class="tab===1?'active':''"
              @click.stop="tab=1">{{datebase[0].name||'间歇式供电列车'}}</span>
        <span :class="tab===1?'':'active'"
              @click.stop="tab=2">{{datebase[1].name||'非接触式供电列车'}}</span>
      </div> -->
      <el-tabs v-model="databaseName"
               @tab-click="chooseDatabase">
        <template v-for="(item,index) in dataBaseList">
          <el-tab-pane :key="index"
                       :label="item.name"
                       :name="item.name">
            <el-button type="primary"
                       @click="toAddData">
              新建数据集
            </el-button>
            <span class="info"><i class="el-icon-info" />
              请选择数据集
            </span>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <div class="model-area">
      <template v-for="(item,index) in modelList">
        <mzh-trainingData :key="index"
                          :span="6"
                          :dataList="item"
                          :active="$store.state.dataSelected===item.id"
                          @set-choice="choose" />
      </template>
    </div>
    <!-- <div class="title-second">
      <div class="title-right">
        <span>新建</span>
        <div @click="toAddData"><img src="@/assets/images/add.png" />新建数据集</div>
      </div>
    </div> -->
  </el-container>
</template>

<script>
import MzhtrainingData from '../../components/trainingData.vue';

export default {
  components: { 'mzh-trainingData': MzhtrainingData },
  data() {
    return {
      modelList: [],
      dataBaseList: [],
      allList: [],
      dialogVisible: false,
      tab: 1,
      databaseId: '',
      databaseName: '',
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/importData') {
      localStorage.setItem('upload', true);
    }
    next();
  },
  mounted() {
    // if (this.$store.state.dataSelected) {
    //   this.modelList.forEach((item, num) => {
    //     if (this.$store.state.dataSelected === item.id) {
    //       this.modelList[num].choiced = true;
    //     } else {
    //       this.modelList[num].choiced = false;
    //     }
    //   });
    // }
    if (localStorage.getItem('upload')) {
      const data = {
        header_mappings: this.$store.state.importData.options,
        name: this.$store.state.importData.sqlName,
        database_id: this.$store.state.importData.sql,
        id: this.$store.state.importData.id,
      };
      this.$axios.put('/dataset', data).then(() => {
        this.getDatebase();
      });
    } else {
      this.getDatebase();
    }
  },
  methods: {
    getDatebase() {
      this.$axios.get('database/list').then((res) => {
        this.dataBaseList = res;
        this.databaseId = res[0].id;
        this.databaseName = res[0].name;
        this.getData();
      });
    },
    getData() {
      this.$axios
        .get(`dataset/list?database_id=${this.databaseId}`)
        .then((res) => {
          this.modelList = res.data_list;
        });
    },
    choose(val) {
      // this.modelList.forEach((item) => {
      //   if (val.id === item.id) {
      //     this.$store.commit('selectData', val.id);
      //   }
      // });
      if (this.$store.state.dataSelected === val.id) {
        this.$store.commit('selectData', '');
      } else {
        this.$store.commit('selectData', val.id);
      }
    },
    chooseDatabase() {
      this.dataBaseList.forEach((item) => {
        if (item.name === this.databaseName) {
          this.databaseId = item.id;
        }
      });
      this.$store.commit('dataSetName', this.databaseName);
      this.getData();
    },
    toAddData() {
      this.$router.push({ path: '/importData?id=1' });
    },
  },
  // watch: {
  //   tab() {
  //     if (this.tab === 1) {
  //       this.getdata(1);
  //     } else if (this.tab === 2) {
  //       this.getdata(2);
  //     }
  //   },
  // },
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
}

.title,
.title-first,
.title-second {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.title {
  margin: 20px 0 0;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .el-tab-pane {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .el-tabs__item {
      font-size: 24px;
    }

    .el-button {
      margin-right: 30px;
    }

    .info {
      margin-right: 40px;
      color: #666;
      font-size: 20px;
    }
  }
}

.title-first,
.title-second {
  color: rgba(102, 102, 102, 1);
}

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

.title-second {
  margin: 20px 0;
}

.title-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  div {
    width: 235px;
    height: 66px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    cursor: pointer;
    margin: 20px 0 0;
  }

  span {
    font-size: 24px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 33px;
  }

  img {
    width: 24px;
    height: 24px;
    margin: 0 5px 0 0;
  }
}

/deep/.el-col-6 {
  margin: 16px 0 0 0;
}

.model-area {
  width: 100%;
  div {
    float: left;
  }
  .test {
    background: #fff;
    margin: 16px 16px 0 0;
    padding: 15px 20px;
    border-radius: 8px;
    width: 364px;
    height: 390px;
  }
}
</style>
