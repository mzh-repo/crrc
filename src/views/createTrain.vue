<template>
  <el-container class="container">
    <h2>创建训练</h2>
    <el-row>请选择模型</el-row>
    <div class="model-case">
      <div v-for="(item,index) in modelList"
           :key="index"
           class="model-data"
           :class="item.id===selectModelId?
            'select-data':'control-data'">
        <control-model :modelList="item"
                       :current="selectModelId"
                       @set-choice="choose" />
      </div>
    </div>
    <el-row class="foot">
      <el-pagination background
                     small
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="pageSize"
                     @current-change="handleChange">
      </el-pagination>
    </el-row>
    <el-row>请选择数据进行训练</el-row>
    <el-row class="collapse">
      <el-collapse v-for="(item, index) in collapseList"
                   v-model="activeName"
                   :key="index"
                   accordion>
        <el-collapse-item :name="index">
          <template slot="title">
            <div>{{ item.name }}</div>
            <span>共{{ item.line }}条</span>
          </template>
          <el-row @click.native="setSelect(item.id)">
            <el-col v-for="(histogramList, i) in item.graph"
                    :span="8"
                    :key="i"
                    class="echarts">
              <histogram :colors="colors[i]"
                         :title="titleList[i]"
                         :lineData="histogramList" />
            </el-col>
            <img v-if="item.id === selected"
                 src="@/assets/images/choiced.png"
                 class="stamp" />
            <div v-else
                 class="select"></div>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-row class="submit-btn">
      <el-button type="primary"
                 @click="submit">提交训练</el-button>
    </el-row>
  </el-container>

</template>

<script>
import Histogram from '../components/histogram.vue';
import ControlModel from '../components/controlModel.vue';

export default {
  components: { Histogram, ControlModel },
  data() {
    return {
      dataBaseList: [],
      databaseName: '',
      databaseId: '',
      colors: ['#8FD866', '#00C4C0'],
      totalNum: 129,
      activeName: 0,
      collapseList: [],
      selected: 0,
      lineDataList: [{ lineData: {} }, { lineData: {} }],
      dataList: [],
      titleList: ['关键指标<速度>分布', '关键指标<坡度>分布'],
      modelList: [],
      page: 1,
      pageSize: 3,
      total: 1,
      selectModelId: 0, // 选中模型id
      selectDatasetId: 0, // 选中数据集id
    };
  },
  mounted() {
    this.databaseId = Number(sessionStorage.getItem('dataBaseId'));
    this.getModel();
    if (this.$store.state.chooseData) {
      this.dataList.forEach((item, num) => {
        if (this.$store.state.chooseData === item.id) {
          this.dataList[num].selected = true;
        }
      });
    }
    // this.getDataList();
    this.getData();
    this.getlineDataList();
  },
  methods: {
    chooseDatabase() {
      this.dataBaseList.forEach((item) => {
        if (item.name === this.databaseName) {
          this.databaseId = item.id;
        }
      });
      this.getData();
      this.getlineDataList();
    },
    setSelect(index) {
      this.selectDatasetId = index;
      if (this.$store.state.chooseData !== index) {
        this.$store.commit('setChoose', index);
        this.selected = index;
      } else {
        this.$store.commit('setChoose', 0);
        this.selected = 0;
      }
    },
    getlineDataList() {
      this.$axios
        .get(`/dataset/graph?database_id=${this.databaseId}`)
        .then((res) => {
          const temp = JSON.parse(JSON.stringify(this.lineDataList));
          for (let i = 0; i < res.length; i += 1) {
            temp[i].lineData.data = [...JSON.parse(res[i]).data];
            temp[i].lineData.bins = [...JSON.parse(res[i]).bins];
          }
          this.lineDataList = temp;
        });
    },
    getDataList() {
      this.$axios.get('/database/list').then((res) => {
        this.dataBaseList = res;
        this.databaseId = res[0].id;
        this.databaseName = res[0].name;
        this.getData();
        this.getlineDataList();
      });
    },
    getData() {
      this.$axios
        .get(`/dataset/list?database_id=${this.databaseId}`)
        .then((res) => {
          this.collapseList = res.data_list;
        });
    },
    handleChange(e) {
      this.page = e;
      this.getModel();
    },
    getModel() {
      this.$axios
        .get(
          // eslint-disable-next-line operator-linebreak
          `/model/list?database_id=${this.databaseId}&page=${this.page -
            1}&page_size=${this.pageSize}`,
        )
        .then((res) => {
          this.modelList = res.data_list;
          this.total = res.total_number;
        });
    },
    choose(item) {
      if (this.selectModelId === item.id) {
        this.selectModelId = '';
      } else {
        this.selectModelId = item.id;
      }
    },

    submit() {
      if (this.selectModelId === 0) {
        this.$message({
          message: '请先选择模型',
          type: 'error',
        });
        return;
      }
      if (this.selectDatasetId === 0) {
        this.$message({
          message: '请先选择数据集',
          type: 'error',
        });
        return;
      }
      const obj = {
        model_id: this.selectModelId,
        dataset_id: this.selectDatasetId,
      };
      this.$axios.post('/form/train', obj).then(() => {
        this.$message({
          message: '创建成功',
          type: 'success',
        });
        this.$router.push('./dashboard');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @include flex-column;
  width: 100%;
  height: auto;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 33px 103px 0 70px;
  font-size: 22px;
  line-height: 30px;
}
.choice {
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 33px;
}
.data-choice {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 22px;
  line-height: 30px;
  position: relative;

  /deep/ .el-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .el-tab-pane {
      display: flex;
      align-items: center;
    }

    span {
      color: #666;
      font-size: 20px;
    }

    .el-tabs__item {
      font-size: 24px;
    }
    // }
  }
}
.active {
  font-size: 28px;
  font-weight: bold;
  line-height: 40px;
}
.totalNum {
  color: #999;
  font-size: 18px;
  line-height: 25px;
  margin-right: 50px;
}
.collapse {
  width: 100%;
  margin-top: 10px;
  span {
    color: #999;
    font-size: 18px;
    line-height: 25px;
    float: right;
    position: absolute;
    right: 50px;
  }
}
.echarts {
  display: flex;
}
.collapse /deep/ {
  .el-collapse-item__header.is-active {
    border-bottom: 1px solid #ebeef5;
  }
  .el-collapse-item__header {
    font-size: 22px;
    line-height: 30px;
    padding: 40px 0 34px 29px;
    position: relative;
  }
  .el-collapse {
    border-radius: 50px;
  }
  .el-collapse-item {
    position: relative;
  }
}
.select {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: absolute;
  border: 1px solid rgba(227, 227, 227, 1);
  bottom: 30px;
  right: 30px;
  z-index: 2000;
}
img {
  width: 36px;
  height: 36px;
  position: absolute;
  bottom: 30px;
  right: 30px;
}

.model-case {
  height: 300px;
  .model-data {
    float: left;
    word-wrap: break-word;
    word-break: normal;
    position: relative;
    opacity: 1;
  }
}

// .control-data {
//   opacity: 0.8;
// }

.select-data {
  opacity: 1;
  height: 455px;
}

.foot {
  text-align: right;
  margin-bottom: 30px;
  width: 100%;
}

.submit-btn {
  margin: 50px 0;
  text-align: right;
  width: 100%;

  .el-button {
    width: 200px;
    height: 60px;
    font-size: 24px;
  }
}
</style>
