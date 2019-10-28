<template>
  <el-container>
    <el-row class="input-title">请输入模型基本信息</el-row>
    <el-row class="input-container">
      <el-col :span="12">
        <el-row class="input-box">
          <el-col :span="4">
            模型名称
          </el-col>
          <el-col :span="18">
            <el-input v-model="name"
                      clearable
                      placeholder="请输入模型名称">
            </el-input>
          </el-col>
        </el-row>
        <el-row class="input-box">
          <el-col :span="4">
            适用场景
          </el-col>
          <el-col :span="18">
            <el-input v-model="scene"
                      clearable
                      placeholder="请输入适用场景">
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
          <el-input v-model="describe"
                    type="textarea"
                    placeholder="请输入模型简介">
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
                  :active="$store.state.basic.datasetId===item.id"
                  @set-choice="choose" />
        <!-- </div> -->
      </template>
    </div>
    <el-row class="input-title">请选择输入输出</el-row>
    <el-row class="data-set">
      <!-- <compound-input v-for="(item,index) in inputList"
                      multiple
                      :title="item.title"
                      :key="index"
                      :index="index"
                      select="['12','33']"
                      :options="item.options"
                      @selected="handleSelectChange" /> -->
      <template v-for="(item,index) in inputList">
        <div class="box"
             :key="index">
          <div class="title">{{item.title}}</div>
          <el-select v-model="inputData[index].data"
                     multiple
                     placeholder=""
                     @change="selected">
            <el-option v-for="(i,j) in item.options"
                       :value="i"
                       :key="j"></el-option>
          </el-select>
        </div>
      </template>
    </el-row>
  </el-container>
</template>

<script>
import Training from '@/components/trainingData.vue';

export default {
  components: { Training },
  data() {
    return {
      dataBaseList: [],
      modelList: [],
      databaseId: '',
      databaseName: '',
      dataActive: true,
      inputList: [
        { title: '输入', options: [], select: [] },
        { title: '输出', options: [], select: [] },
      ],
      arrayOptions: [],
      name: this.$store.state.basic.name || '',
      scene: this.$store.state.basic.scene || '',
      describe: this.$store.state.basic.describe || '',
      input: [],
      output: '',
      inputData: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
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
        this.$axios.put('/dataset', data).then(() => {
          this.getBase();
        });
      } else {
        this.getBase();
      }
    },
    getBase() {
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
      // this.modelList.forEach((item) => {
      //   if (val.id === item.id) {
      //     this.$store.commit('setBasic', {
      //       datasetId: val.id,
      //       datasetName: val.name,
      //     });
      //   }
      // });
      if (this.$store.state.basic.datasetId === val.id) {
        this.$store.commit('setBasic', {
          datasetId: '',
          datasetName: '',
        });
      } else {
        this.$store.commit('setBasic', {
          datasetId: val.id,
          datasetName: val.name,
        });
      }
      this.chooseModel(val.id);
    },
    chooseModel(id) {
      this.$axios.get(`/dataset/headers?dataset_id=${id}`).then((res) => {
        // this.arrayOptions = res;
        this.inputList[0].options = res;
        this.inputData[0].data = res;
        this.inputList[1].options = [
          '系统优化',
          '运行控制',
          '故障预警',
          ...res,
        ];
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
  // margin-top: 42px;
  margin-bottom: 30px;
  color: #666;
  font-weight: 400;

  /deep/ .el-textarea__inner {
    height: 192px;
    font-size: 20px;
    font-family: PingFangSC, sans-serif, 'Microsoft YaHei', 微软雅黑,
      'MicrosoftJhengHei', 华文细黑;
  }
}

.input-box {
  @include flex-row;
  margin-bottom: 60px;
  align-items: center;
  font-size: 24px;

  /deep/ .el-input__inner {
    height: 66px;
    font-size: 24px;

    &::placeholder {
      font-size: 20px;
    }
  }
}

.text-title {
  margin-top: 16px;
  font-size: 24px;
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
  flex-direction: column;

  /deep/ .el-tag {
    font-size: 16px;
    height: 30px;
  }
}

.model-area {
  display: flex;
  flex-wrap: wrap;
}

.box {
  margin-right: 20px;
  margin-bottom: 40px;
  width: 100%;
  height: 66px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title {
  font-size: 20px;
  color: #666;
  margin-left: 15px;
  white-space: nowrap;
  height: 21px;
  line-height: 21px;
  padding-right: 13px;
  border-right: solid 1px #979797;
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/deep/ .el-select {
  width: 100%;
  max-height: 120px;
  overflow: auto;

  .el-select__tags {
    max-height: 120px;
    overflow: auto;
  }
}
/deep/ .el-input {
  width: 100%;
  max-height: 120px;
  overflow: hidden;
}
/deep/.el-input__inner {
  width: 100%;
  height: 66px;
  border: none;
  font-size: 24px;
  color: #333;
}
</style>
