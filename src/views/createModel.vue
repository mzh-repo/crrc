<template>
  <div class="main">
    <el-row class="model-container">
      <h2>新建模型</h2>
      <el-row class="input-container">
        <el-col :span="12">
          <el-row class="input-box">
            <el-col :span="4">
              输入模型名称
            </el-col>
            <el-col :span="16">
              <el-input v-model="name" clearable placeholder="请输入模型名称"> </el-input>
            </el-col>
          </el-row>
          <el-row class="input-box">
            <el-col :span="4">
              选择适用场景
            </el-col>
            <el-col :span="16">
              <el-select v-model="chooseType" placeholder="请选择适用场景" @change="validateForm">
                <el-option
                  v-for="(item, index) in sceneList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-col :span="4" class="text-title">
            模型简介
          </el-col>
          <el-col :span="20">
            <el-input v-model="describe" type="textarea" placeholder="请输入模型简介"> </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="select-container">
        <el-col :span="12">
          <el-col :span="4">
            选择列车
          </el-col>
          <el-col :span="16">
            <el-select v-model="chooseCar" placeholder="请选择列车" @change="validateForm">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4">
            选择线路
          </el-col>
          <el-col :span="20">
            <el-select v-model="chooseWay" placeholder="请选择线路" @change="validateForm">
              <el-option
                v-for="(item, index) in wayList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <template v-if="showInput">
        <el-row class="show-input">
          <el-col :span="10">
            <span>输入</span>
            <div class="input-area">
              <el-table
                height="247px"
                :data="
                  inputData.filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))
                "
                style="width: 100%"
              >
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column label="输入项" prop="name"> </el-table-column>
                <el-table-column label="类型" prop="type"> </el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="4" class="arrow-img">
            <img src="@/assets/images/arrow.png" />
          </el-col>
          <el-col :span="10">
            <span>输出</span>
            <div class="input-area">
              <el-table height="247px" :data="outputData" style="width: 100%">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column label="输出项" prop="name"> </el-table-column>
                <el-table-column label="类型" prop="type"> </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-title algorithm">请选择算法</el-row>
        <el-row class="alg-row" :gutter="20">
          <el-col
            v-for="(item, index) in algorithmList"
            :key="index"
            :span="6"
            @click.native="setChoice(item)"
          >
            <div class="algorithm-container" :class="item.id === algorithmId ? 'active' : ''">
              <div class="algorithm-box">
                <el-row>{{ item.name }}</el-row>
                <el-row>模型: {{ item.model_name }}</el-row>
                <!-- <el-row>适用问题: {{ item.applicable_problem }}</el-row> -->
                <el-row>使用框架: {{ item.frame_name }}</el-row>
                <el-row>使用次数: {{ item.used_counter }}次</el-row>
                <div class="tag">
                  <img :src="getUrl(item.id)" alt="" />
                </div>
                <div v-if="item.id === algorithmId" class="choose">
                  <img class="choose-img" src="@/assets/images/choiced.png" />
                </div>
                <div v-else class="choose"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="algorithmId !== ''">算法简介：{{ modelIntro }}</el-row>
      </template>
    </el-row>
    <el-row class="submit-btn">
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-row>
  </div>
</template>

<script>
const imgUrl = [
  /* eslint-disable */
  require('../assets/images/keras.png'),
  require('../assets/images/tensorflow.png'),
  require('../assets/images/sklearn.png'),
  require('../assets/images/keras.png'),
  require('../assets/images/keras.png'),
];

export default {
  data() {
    return {
      databaseId: 1,
      name: '',
      scene: '',
      describe: '',
      input: [],
      output: '',
      chooseType: '',
      chooseCar: '',
      chooseWay: '',
      typeList: [],
      wayList: [],
      algorithmId: '',
      algorithmList: [],
      sceneList: [],
      inputData: [
        {
          name: '日期',
          type: 'Stirng',
        },
        {
          name: '时间',
          type: 'Date',
        },
        {
          name: '日期',
          type: 'Stirng',
        },
      ],
      search: '',
      outputData: [
        {
          name: '时间',
          type: 'Date',
        },
        {
          name: '日期',
          type: 'Stirng',
        },
        {
          name: '时间',
          type: 'Date',
        },
        {
          name: '日期',
          type: 'Stirng',
        },
        {
          name: '时间',
          type: 'Date',
        },
      ],
      modelIntro:
        '对多目标优化问题设计函数映射并使用LSTM（Long Short Term Memory Network）模型求解列车运行过程多目标方程函数：定义为每个时刻 𝑡 的信息状态，每个时刻的信息状态包含该时刻下的驾驶信 息和环境信息，即 = [驾驶信息, 环境信息]，定义一个列车信息序列为，这个列车信息序列包括列车前 𝑙 时刻内的信息状态。LSTM模型解决序列相关的问题，其特别之处是其输入不仅仅考虑了当前时刻的输入，也考 虑了上一时刻的输出，从而捕获到了序列之间的关联信息。它通过增加多一个单元状态解决了普通 RNN 无法捕获长期依赖的问题，而且巧妙地提出了遗忘门办法来对长期单元状态进行控制，将重要特征保留下来，保 证了在长期传播的过程中不会丢失数据中重要的时序信息。',
      showInput: false,
    };
  },
  mounted() {
    this.databaseId = Number(sessionStorage.getItem('dataBaseId'));
    this.getScene();
    this.getTrain();
    this.getRoute();
  },
  methods: {
    validateForm() {
      if (this.chooseType !== '' && this.chooseCar !== '' && this.chooseWay !== '') {
        this.showInput = true;
        this.getAlgList();
        //TODO 输入输出
      } else {
        this.showInput = false;
      }
    },
    getScene() {
      this.$axios.get(`/scene?database_id=${this.databaseId}`).then((res) => {
        this.sceneList = res;
      });
    },
    getTrain() {
      this.$axios.get(`/tag/train?database_id=${this.databaseId}`).then((res) => {
        this.typeList = res;
      });
    },
    getRoute() {
      this.$axios.get(`/tag/route?database_id=${this.databaseId}`).then((res) => {
        this.wayList = res;
      });
    },
    getAlgList() {
      this.$axios.get(`/algorithm/list?scene_id=${this.chooseType}`).then((res) => {
        this.algorithmList = res;
      });
      this.$axios
        .get(`/model/columns?scene_id=${this.chooseType}&database_id=${this.databaseId}`)
        .then((res) => {
          // this.algorithmList = res;
          this.inputData = res.input;
          this.outputData = res.output;
        });
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
    setChoice(item) {
      this.algorithmId = item.id;
    },
    getUrl(type) {
      return imgUrl[type - 1];
    },
    // TODO case
    onSubmit() {
      if (this.name === '') {
        this.$message.error('请先输入模型名称');
        return;
      }
      if (this.chooseType === '') {
        this.$message.error('请先选择适用场景');
        return;
      }
      if (this.chooseCar === '') {
        this.$message.error('请先选择列车');
        return;
      }
      if (this.chooseWay === '') {
        this.$message.error('请先选择线路');
        return;
      }
      if (this.algorithmId === '') {
        this.$message.error('请先选择算法');
        return;
      }
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
        algorithm_id: this.algorithmId,
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
.main {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.model-container {
  @include flex-column;
  padding: 10px 70px;
  text-align: left;
  overflow: auto;
  height: 90%;
}

.input-container {
  height: 162px;
  margin-bottom: 30px;
  color: #666;
  font-weight: 400;

  /deep/ .el-textarea__inner {
    height: 162px;
  }
}

.input-box {
  @include flex-row;
  margin-bottom: 30px;
  align-items: center;

  /deep/ .el-input__inner {
    height: 66px;
  }

  .el-select {
    width: 100%;
  }
}

.text-title {
  margin-top: 15px;
}

.input-title {
  display: flex;
  justify-content: flex-start;
  margin-top: 54px;
  margin-bottom: 30px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);

  &.algorithm {
    margin-top: 60px;
    margin-bottom: 0;
  }
}

.model-area {
  display: flex;
  flex-wrap: wrap;
}

.alg-row {
  @include flex-row;
  flex-wrap: wrap;
}

.algorithm-container {
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  position: relative;
  margin: 16px 0 40px 0;
  padding: 29px 22px;
  @include flex-row;

  &:hover,
  &.active {
    opacity: 1;
    box-shadow: 0 8px 6px 0 rgba(27, 22, 22, 0.356);
  }
}

.algorithm-box {
  @include flex-column;
  text-align: left;
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

  .choose-img {
    @include set-size(100%);
  }
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

.line {
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 10px;
}

.select-container {
  .el-col {
    display: flex;
    align-items: center;
  }

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
    color: #333;
  }
}

.submit-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 66px;
  background: #fff;
  padding: 10px 30px;
  text-align: right;
}

.show-input {
  margin-top: 46px;
  @include flex-row;

  .input-area {
    background: #fff;
    border-radius: 6px;
    margin-top: 16px;
  }
}

.arrow-img {
  @include box-center;
}

.el-table {
  /deep/ td {
    border-bottom: 0;
  }
}
</style>
