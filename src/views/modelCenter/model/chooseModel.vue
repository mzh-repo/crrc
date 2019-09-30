<template>
  <el-container class="choose-model">
    <el-row class="title">
      <el-col>
        <span class="title-header"
              @click="chooseModel">
          选择模型
        </span>
        <!-- <span :class="!modelActive? 'active': ''"
              @click="chooseApp">
          选择应用
        </span> -->
      </el-col>
      <el-col>
        请选择模型查看报告
      </el-col>
    </el-row>
    <el-row class="model-data">
      <el-row class="database-tab">
        <span v-for="(item,index) in dataBaseList"
              :key="index"
              :class="databaseId === item.id ? 'active': ''"
              @click="chooseDatabase(item.id)">
          {{item.name}}
        </span>
      </el-row>
      <div class="model">
        <div style="height: 211px">
          <div class="newModel"
               @click="newModel">
            <svg-icon icon-class="add-model"
                      class="add-img" />
            <div>新建模型</div>
          </div>
        </div>
        <div v-for="(item,index) in modelData"
             :key="index">
          <span @click="modelReport(item)">
            <model :modelList="item"
                   :showChoice="false" />
          </span>
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
      modelActive: true,
      databaseId: '',
      modelData: [],
    };
  },
  mounted() {
    this.$axios.get('/database/list').then((res) => {
      this.dataBaseList = res;
      this.databaseId = res[0].id;
      this.getData();
    });
  },
  methods: {
    chooseModel() {
      this.modelActive = true;
    },
    chooseApp() {
      this.modelActive = false;
    },
    newModel() {
      this.$router.push('/createModel/step1');
    },
    modelReport(item) {
      // eslint-disable-next-line
      this.$store.commit('setReportData', {
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
      this.$router.push('/modelReport');
    },
    chooseDatabase(id) {
      this.databaseId = id;
      this.getData();
    },
    getData() {
      this.$axios
        .get(`/model/list?database_id=${this.databaseId}`)
        .then((res) => {
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
  width: 508px;
  margin: 16px 6px 0 0;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  @include box-center;
  height: 170px;
  flex-direction: column;
  cursor: pointer;
}

.add-img {
  @include set-size(70px);
  margin-bottom: 23px;
}

.database-tab {
  text-align: left;
  color: #333;
  font-size: 24px;

  span {
    margin-right: 40px;
    cursor: pointer;

    // &:hover,
    &.active {
      font-size: 28px;
      font-weight: 600;
      // transform: scale(1.4);
      // transition: all 0.3s;
    }
  }
}

.model {
  @include flex-row;
  flex-wrap: wrap;
}
</style>
