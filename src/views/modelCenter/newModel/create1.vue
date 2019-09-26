<template>
  <el-container>
    <el-row class="input-container">
      <el-col :span="12">
        <el-row class="input-box">
          <el-col :span="4">
            请输入模型名称
          </el-col>
          <el-col :span="18">
            <el-input v-model="name"
                      clearable>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="input-box">
          <el-col :span="4">
            输入适用场景
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
          输入简介
        </el-col>
        <el-col :span="18">
          <el-input type="textarea"
                    v-model="describe">
          </el-input>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="upload-title">
      <span v-for="(item,index) in dataBaseList"
            :key="index"
            :class="databaseId === item.id ? 'active': ''"
            @click="chooseDatabase(item.id)">
        {{item.name}}
      </span>
      <el-button type="primary"
                 @click="upload">
        上传数据集
      </el-button>
    </el-row>
    <div class="model-area">
      <template v-for="(item,index) in modelList">
        <div :key="index"
             :span="6"
             @click="chooseModel(item.id)">
          <training :dataList="item"
                    @set-choice="choose" />
        </div>
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
      databaseId: '',
      dataActive: true,
      inputList: ['输入', '输出'],
      arrayOptions: ['123', '432'],
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
    chooseDatabase(id) {
      this.databaseId = id;
      this.getData();
    },
    handleSelectChange(e) {
      // eslint-disable-next-line
      console.log(e);
    },
    upload() {
      this.$router.push('/importData');
    },
    getData() {
      this.$axios.get(`model/list?database_id=${this.databaseId}`).then((res) => {
        this.modelList = res[0].data_info_list;
      });
    },
    chooseModel(index) {
      this.modelList.forEach((item) => {
        if (index === item.id) {
          this.$store.commit('selectData', index);
        }
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
  margin-bottom: 57px;
  color: #666;
  font-weight: 400;

  /deep/ .el-textarea__inner {
    height: 196px;
  }
}

.input-box {
  @include flex-row;
  margin-bottom: 60px;
  align-items: center;

  /deep/ .el-input__inner {
    height: 66px;
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

  span {
    margin-right: 40px;
    cursor: pointer;

    // &:hover,
    &.active {
      font-weight: 600;
      transform: scale(1.15);
      transition: all 0.3s;
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
