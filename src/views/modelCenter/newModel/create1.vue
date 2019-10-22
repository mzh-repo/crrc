<template>
  <el-container>
    <el-row class="input-container">
      <el-col :span="12">
        <el-row class="input-box">
          <el-col :span="4">
            模型名称
          </el-col>
          <el-col :span="18">
            <el-input v-model="name"
                      clearable>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="input-box">
          <el-col :span="4">
            适用场景
          </el-col>
          <el-col :span="18">
            <el-input v-model="scene"
                      clearable>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-col :span="4"
                class="text-title">
          模型简介
        </el-col>
        <el-col :span="18">
          <el-input type="textarea"
                    v-model="describe">
          </el-input>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="upload-title">
      <el-tabs v-model="databaseName"
               @tab-click="chooseDatabase">
        <template v-for="(item,index) in dataBaseList">
          <el-tab-pane :key="index"
                       :label="item.name"
                       :name="item.name">
            <el-button type="primary"
                       @click="upload">
              上传数据集
            </el-button>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-row>
    <div class="model-area">
      <template v-for="(item,index) in modelList">
        <!-- <div
             @click="chooseModel(item.id)"> -->
        <training :dataList="item"
                  :key="index"
                  :span="6"
                  @set-choice="choose" />
        <!-- </div> -->
      </template>
    </div>
    <el-row class="input-title">请选择输入输出</el-row>
    <el-row class="data-set">
      <compound-input v-for="(item,index) in inputList"
                      multiple
                      :title="item"
                      :key="item"
                      :index="index"
                      :options="arrayOptions"
                      @selected="handleSelectChange" />
    </el-row>
  </el-container>
</template>

<script>
import Training from '@/components/trainingData.vue';
import CompoundInput from '../../../components/compoundInput.vue';

export default {
  components: { Training, CompoundInput },
  data() {
    return {
      dataBaseList: [],
      modelList: [],
      databaseId: '',
      databaseName: '',
      dataActive: true,
      inputList: ['输入', '输出'],
      arrayOptions: [],
      name: this.$store.state.basic.name || '',
      scene: this.$store.state.basic.scene || '',
      describe: this.$store.state.basic.describe || '',
      input: [],
      output: '',
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/importData') {
      localStorage.setItem('getDataSet', true);
    } else {
      localStorage.setItem('getDataSet', false);
    }
    next();
  },
  mounted() {
    // 上传数据集回退更新
    this.initData();
  },
  methods: {
    initData() {
      if (localStorage.getItem('getDataSet') === 'true') {
        const data = {
          header_mappings: this.$store.state.importData.options,
          name: this.$store.state.importData.sqlName,
          database_id: this.$store.state.importData.sql,
          id: this.$store.state.importData.id,
        };
        this.$axios.put('/dataset', data);
      }
      this.$axios.get('/database/list').then((res) => {
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
    handleSelectChange(e) {
      this.input = e.select;
    },
    upload() {
      this.$store.commit('setBasic', {
        name: this.name,
        scene: this.scene,
        describe: this.describe,
      });
      this.$router.push('/importData');
    },
    getData() {
      this.$axios
        .get(`dataset/list?database_id=${this.databaseId}`)
        .then((res) => {
          this.modelList = res.data_list;
        });
    },
    choose(val) {
      this.modelList.forEach((item) => {
        if (val.id === item.id) {
          this.$store.commit('setBasic', {
            datasetId: val.id,
            datasetName: val.name,
          });
        }
      });
      this.chooseModel(val.id);
    },
    chooseModel(id) {
      this.$axios.get(`/dataset/headers?dataset_id=${id}`).then((res) => {
        this.arrayOptions = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  @include flex-column;
}

.input-container {
  height: 198px;
  margin-top: 42px;
  margin-bottom: 30px;
  color: #666;
  font-weight: 400;

  /deep/ .el-textarea__inner {
    height: 152px;
  }
}

.input-box {
  @include flex-row;
  margin-bottom: 60px;
  align-items: center;

  /deep/ .el-input__inner {
    height: 46px;
  }
}

.text-title {
  margin-top: 16px;
}

.upload-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;

    .el-tabs__item {
      font-size: 24px;
    }

    .el-button {
      margin-left: 30px;
    }
  }
}

.input-title {
  display: flex;
  justify-content: flex-start;
  margin-top: 54px;
  margin-bottom: 33px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  font-size: 24px;
}

.data-set {
  display: flex;
  flex-flow: row wrap;
}

.model-area {
  display: flex;
  flex-wrap: wrap;
}
</style>
