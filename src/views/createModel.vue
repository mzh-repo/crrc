<template>
  <el-container>
    <h2>新建模型</h2>
    <el-row class="input-container">
      <el-col :span="12">
        <el-row class="input-box">
          <el-col :span="4">
            模型名称
          </el-col>
          <el-col :span="18">
            <el-input v-model="name"
                      clearable
                      placeholder="请输入模型名称"> </el-input>
          </el-col>
        </el-row>
        <el-row class="input-box">
          <el-col :span="4">
            适用场景
          </el-col>
          <el-col :span="18">
            <!-- <el-input v-model="scene"
                      clearable
                      placeholder="请输入适用场景"> </el-input> -->
            <el-select v-model="chooseType">
              <el-option v-for="(item, index) in sceneList"
                         :key="index"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
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
                    placeholder="请输入模型简介"> </el-input>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="select-container">
      <el-col :span="12">
        <el-col :span="4"
                class="text-title">
          选择车型
        </el-col>
        <el-col :span="18">
          <el-select v-model="chooseCar">
            <el-option v-for="(item, index) in typeList"
                       :key="index"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="4"
                class="text-title">
          选择线路
        </el-col>
        <el-col :span="18">
          <el-select v-model="chooseWay">
            <el-option v-for="(item, index) in wayList"
                       :key="index"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="upload-title">
      <!-- <el-tabs v-model="databaseName" @tab-click="chooseDatabase">
        <template v-for="(item, index) in dataBaseList">
          <el-tab-pane :key="index" :label="item.name" :name="item.name">
            <el-button type="primary" @click="upload">
              上传数据集
            </el-button>
          </el-tab-pane>
        </template>
      </el-tabs> -->
      选择数据集 &nbsp;&nbsp;&nbsp;
      <el-button type="primary"
                 @click="upload">
        上传数据集
      </el-button>
    </el-row>
    <div class="model-area">
      <template v-for="(item, index) in modelList">
        <training :dataList="item"
                  :key="index"
                  :span="6"
                  :active="$store.state.basic.datasetId === item.id"
                  @set-choice="choose" />
      </template>
    </div>
    <el-row class="input-title">请选择输入输出</el-row>
    <el-row class="data-set">
      <template v-for="(item, index) in inputList">
        <div class="chose-box"
             :key="index">
          <div class="chose-title">{{ item.title }}</div>
          <el-select v-model="inputData[index].data"
                     multiple
                     placeholder=""
                     @change="selected">
            <el-option v-for="(i, j) in item.options"
                       :value="i"
                       :key="j"></el-option>
          </el-select>
        </div>
      </template>
    </el-row>
    <el-row class="input-title algorithm">请选择算法</el-row>
    <el-row class="alg-row"
            :gutter="20">
      <el-col v-for="(item, index) in algorithmList"
              :key="index"
              :span="6"
              @click.native="setChoice(item)">
        <div class="algorithm-container"
             :class="item.id === algorithmId ? 'active' : ''">
          <div class="algorithm-box">
            <el-row>{{ item.name }}</el-row>
            <el-row>模型: {{ item.model_name }}</el-row>
            <el-row>适用问题: {{ item.applicable_problem }}</el-row>
            <el-row>使用框架: {{ item.frame_name }}</el-row>
            <el-row>使用次数: {{ item.used_counter }}次</el-row>
            <div class="tag">
              <img :src="getUrl(item.id)"
                   alt="" />
            </div>
            <div v-if="item.id === algorithmId"
                 class="choose">
              <img src="@/assets/images/choiced.png" />
            </div>
            <div v-else
                 class="choose"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="input-title">模型配置</el-row>
    <div class="config">
      推荐配置
      <el-row class="recommend">
        <el-col v-for="item in configList"
                align="left"
                :key="item"
                :span="6">
          <el-row>{{ item.name }}</el-row>
          <el-row><span>{{ item.value }}</span> {{ item.unit }}</el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
      <config title="自选配置"
              :sliderList="sliderList" />
    </div>
    <el-row class="input-title">部署地址</el-row>
    <el-row class="input-address">
      <el-input v-model="url"
                clearable
                placeholder="请输入对应url"> </el-input>
    </el-row>
    <el-row class="submit-btn">
      <el-button type="primary"
                 @click="onSubmit">确定</el-button>
    </el-row>
  </el-container>
</template>

<script>
import Training from '@/components/trainingData.vue';
import Config from '@/components/configuration.vue';

const imgUrl = [
  /* eslint-disable */
  require('../assets/images/keras.png'),
  require('../assets/images/tensorflow.png'),
  require('../assets/images/sklearn.png'),
  require('../assets/images/keras.png'),
];

export default {
  components: { Training, Config },
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
      chooseType: '',
      chooseCar: '',
      chooseWay: '',
      typeList: ['车辆配置不变', '车辆配置可变'],
      wayList: ['香山——颐和园南门', '广州塔——会展西'],
      algorithmId: '',
      algorithmList: [],
      configList: [
        {
          name: '轮次',
          value: 2000,
          unit: '次',
        },
        {
          name: '内存',
          value: 64,
          unit: 'G',
        },
        {
          name: 'CPU',
          value: 8,
          unit: '个',
        },
        {
          name: 'GPU',
          value: 16,
          unit: 'G',
        },
      ],
      sliderList: [
        { title: '轮次', value: 2000, maxValue: 3000 },
        { title: '内存', value: 64, maxValue: 128 },
        { title: 'CPU', value: 8, maxValue: 32 },
        { title: 'GPU', value: 16, maxValue: 64 },
      ],
      url: '',
      sceneList: [
        {
          id: 1,
          name: '多目标优化列车运行控制',
        },
        {
          id: 2,
          name: '车载储能系统性能劣化条件下的列车运行控制',
        },
        {
          id: 3,
          name: '系统优化设计',
        },
        {
          id: 4,
          name: '供电系统状态监测及故障预警',
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
    this.databaseId = Number(sessionStorage.getItem('dataBaseId'));
    this.initData();
    this.$axios.get('/algorithm/list').then((res) => {
      this.algorithmList = res;
    });
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
          // this.getBase();
          this.getData();
        });
      } else {
        // this.getBase();
        this.getData();
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
        // const reg = /^[\u4e00-\u9fa5a-z]+$/gi;
        // const data = res.filter(item => item !== '' && reg.test(...item));
        const reg = /^[\uFEFF]+$/gi;
        const data = res.filter((item) => item !== '' && !reg.test(...item));
        this.inputList[0].options = data;
        this.inputData[0].data = data;
        this.inputList[1].options = [
          '系统优化',
          '运行控制',
          '故障预警',
          ...data,
        ];
      });
    },
    setChoice(item) {
      this.algorithmId = item.id;
    },
    getUrl(type) {
      return imgUrl[type - 1];
    },
    // TODO case
    onSubmit() {
      const modelData = {
        name: this.name,
        // applicable_scene: this.chooseType,
        // case id 1-8 分别代表不同结果集
        case: {
          id: this.databaseId === 1 ? this.chooseType : 4 + this.chooseType,
        },
        car_type: this.chooseCar,
        route: this.chooseWay,
        introduction: this.describe,
        dataset_id: this.$store.state.basic.datasetId,
        algorithm_id: this.algorithmId,
        model_configuration: {
          rounds: this.sliderList[0].value,
          ram: this.sliderList[1].value,
          cpu: this.sliderList[2].value,
          gpu: this.sliderList[3].value,
        },
      };
      this.$axios
        .post('/model', modelData)
        .then(() => {
          this.$message({
            message: '创建成功',
            type: 'success',
          });
          this.$router.push('./dashboard');
        })
        .catch(() => {
          this.$message({
            message: '创建失败，请输入模型完整信息',
            type: 'error',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  @include flex-column;
  padding: 10px 70px;
  text-align: left;
}

.input-container {
  height: 198px;
  margin-bottom: 60px;
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

  .el-select {
    width: 100%;
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
  margin-top: 30px;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;

    .el-tabs__item {
      font-size: 24px;
    }

    .el-button {
      margin-left: 30px;
      width: 80px;
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

  &.algorithm {
    margin-top: 14px;
  }
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

.chose-box {
  margin-right: 20px;
  margin-bottom: 40px;
  width: 100%;
  height: 66px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;

  /deep/ .el-select {
    width: 100%;
    max-height: 66px;
    overflow: auto;

    .el-select__tags {
      max-height: 66px;
      overflow: auto;
    }
  }
  /deep/ .el-input {
    width: 100%;
    max-height: 66px;
    overflow: hidden;
  }
  /deep/.el-input__inner {
    width: 100%;
    height: 66px;
    border: none;
    font-size: 24px;
    color: #333;
  }
}

.chose-title {
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
}

.alg-row {
  @include flex-row;
  flex-wrap: wrap;
}

.algorithm-container {
  // height: 320px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  position: relative;
  margin: 16px 0;
  padding: 29px 22px;
  @include flex-row;
  // opacity: 0.6;

  &:hover,
  &.active {
    opacity: 1;
    box-shadow: 0 8px 6px 0 rgba(27, 22, 22, 0.356);
  }
}

.algorithm-box {
  @include flex-column;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);

  .el-row {
    margin-bottom: 20px;

    &:first-child {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 38px;
    }
  }
}

.choose {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(227, 227, 227, 1);
  border-radius: 50%;
  box-sizing: border-box;
  position: absolute;
  bottom: 22px;
  right: 22px;
}

.tag {
  position: absolute;
  top: 30px;
  right: 15px;
  width: 96px;
  height: 40px;
  img {
    max-width: 96px;
    max-height: 40px;
  }
}

.config {
  text-align: left;
  font-size: 20px;
  color: rgba(51, 51, 51, 1);
  line-height: 28px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 20px 24px 20px 20px;
  margin-right: 26px;
  height: 360px;
  width: 50%;
}

.recommend {
  @include flex-row;
  margin-top: 30px;
  margin-bottom: 36px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);

  span {
    font-size: 24px;
  }
}

.line {
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 10px;
}

.select-container {
  /deep/ .el-select {
    width: 100%;
    max-height: 66px;
    overflow: auto;

    .el-select__tags {
      max-height: 66px;
      overflow: auto;
    }
  }
  /deep/ .el-input {
    width: 100%;
    max-height: 66px;
    overflow: hidden;
  }
  /deep/.el-input__inner {
    width: 100%;
    height: 66px;
    // border: none;
    font-size: 24px;
    color: #333;
  }
}

.input-address {
  /deep/ .el-input__inner {
    height: 66px;
    font-size: 24px;

    &::placeholder {
      font-size: 20px;
    }
  }
}

.submit-btn {
  margin: 50px 0;
  text-align: right;

  .el-button {
    width: 200px;
    height: 60px;
    font-size: 24px;
  }
}
</style>
