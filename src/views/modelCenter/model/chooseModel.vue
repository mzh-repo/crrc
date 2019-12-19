<template>
  <el-container class="choose-model">
    <!-- <el-row class="main-title">请选择模型查看报告</el-row> -->
    <!-- <el-row class="title">
      <el-col>
        <span class="title-header"
              @click="chooseModel">
          选择模型
        </span>
        <span :class="!modelActive? 'active': ''"
              @click="chooseApp">
          选择应用
        </span>
      </el-col>
    </el-row> -->
    <el-row class="model-data">
      <el-row class="database-tab">
        <el-tabs v-model="databaseName" @tab-click="chooseDatabase">
          <template v-for="(item, index) in dataBaseList">
            <el-tab-pane :key="index" :label="item.name" :name="item.name">
              <span
                ><i class="el-icon-info" />
                请选择模型查看报告
              </span>
            </el-tab-pane>
          </template>
        </el-tabs>
      </el-row>
      <div class="model">
        <div style="height: 211px">
          <div class="newModel" @click="newModel">
            <svg-icon icon-class="add-model" class="add-img" />
            <div>新建模型</div>
          </div>
        </div>
        <div v-for="(item, index) in modelData" :key="index">
          <!-- <span @click="modelReport(item)"> -->
          <model :modelList="item" :showChoice="true" @set-choice="modelReport(item)" />
          <!-- </span> -->
        </div>
      </div>
    </el-row>
  </el-container>
</template>

<script>
import Model from '@/components/controlModel.vue';

export default {
  components: { Model },
  data() {
    return {
      dataBaseList: [],
      // modelActive: true,
      databaseName: '',
      databaseId: '',
      modelData: [],
      datasetId: '',
    };
  },
  mounted() {
    this.$axios.get('/database/list').then((res) => {
      this.dataBaseList = res;
      this.databaseName = res[0].name;
      this.databaseId = res[0].id;
      this.getData();
    });
  },
  methods: {
    // chooseModel() {
    //   this.modelActive = true;
    // },
    // chooseApp() {
    //   this.modelActive = false;
    // },
    newModel() {
      this.$router.push('/createModel/step1');
    },
    modelReport(item) {
      if (this.$store.state.trainSelected === item.id) {
        this.$store.commit('setTrain', '');
      } else {
        this.$store.commit('setTrain', item.id);
      }
      this.$store.commit('chooseDataBase', this.databaseId);
      this.$store.commit('selectModel', { name: item.name, id: item.id });
      this.$store.commit('modelDatabase', this.databaseName);
      // eslint-disable-next-line
      this.$store.commit("setReportData", {
        name: item.name,
        scene: item.applicable_scene,
        describe: item.introduction,
        total: item.deploy_number,
        dateSetName: item.dataset.name,
        config: item.model_configuration,
        line: item.dataset.line,
        size: item.dataset.size,
        frame: item.algorithm.frame_name,
      });
      // this.$router.push('/modelReport');
      // this.$store.commit('setTrain', item.id);
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
      this.$axios.get(`/model/list?database_id=${this.databaseId}`).then((res) => {
        this.modelData = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.choose-model {
  @include flex-column;
}

.main-title {
  text-align: left;
  font-size: 24px;
}

.title {
  display: flex;
  justify-content: space-between;
}

.title {
  .el-col {
    display: flex;
    color: #666;

    span {
      margin-right: 40px;
      // cursor: pointer;
      font-size: 22px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 33px;
      margin: 0 20px 0 0;

      // &:hover,
      // &.active {
      //   font-weight: 600;
      //   transform: scale(1.15);
      //   transition: all 0.3s;
      // }
    }

    &:nth-child(2) {
      justify-content: flex-end;
      // color: #666;
    }
  }
}

.model-data {
  margin-top: 34px;
  @include flex-column;

  .title {
    display: flex;
    justify-content: flex-start;
  }
}

.newModel {
  position: relative;
  width: 550px;
  margin: 16px 6px 0 0;
  border-radius: 5px;
  background: #fff;
  @include box-center;
  height: 211px;
  flex-direction: column;
  cursor: pointer;
}

.add-img {
  @include set-size(70px);
  margin-bottom: 23px;
}

.database-tab {
  text-align: left;
  height: 50px;
  font-size: 24px;
  position: relative;

  span {
    margin-right: 60px;
    // cursor: pointer;
    color: #666;
    font-size: 20px;
  }

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;

    .el-tabs__item {
      font-size: 24px;
    }
  }
}

.model {
  @include flex-row;
  flex-wrap: wrap;
}
</style>
