<template>
  <div class="train-continer">
    <div class="main">
      <h1>创建训练</h1>
      <el-row class="title">
        请选择模型
        <!-- <el-button size="mini" type="primary" @click="newModel">新建模型</el-button> -->
      </el-row>
      <el-row class="filter">
        <el-form :inline="true">
          <template v-for="(item, index) in filterForm">
            <el-form-item :key="index"
                          :label="item.label">
              <el-select v-model="item.value"
                         :placeholder="'请选择' + item.label">
                <el-option v-for="(i, j) in item.arr"
                           :label="i.name"
                           :key="j"
                           :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm">筛选</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="model">
        <div class="line"></div>
        <el-row>
          <el-table :data="modelData"
                    :header-row-style="{ color: '#333' }"
                    height="576px"
                    style="width: 100%"
                    highlight-current-row
                    @current-change="handleCurrentChange">
            <el-table-column width="50"
                             label="选择">
              <template slot-scope="scope">
                <svg-icon :icon-class="scope.row.id === chooseId ? 'choose' : 'unchoose'" />
              </template>
            </el-table-column>
            <el-table-column type="index"
                             width="50"
                             label="序号"> </el-table-column>
            <template v-for="item in modelTagList">
              <el-table-column :prop="item.prop"
                               :label="item.label"
                               :key="item.prop">
                <template slot-scope="scope">
                  <div v-if="item.prop === 'name' || item.prop === 'introduction'"
                       class="limit-column"
                       :title="scope.row[item.prop]">
                    {{ scope.row[item.prop] }}
                  </div>
                  <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </el-row>
        <el-row class="task-footer">
          <el-pagination background
                         layout="total, prev, pager, next"
                         :current-page.sync="page"
                         :page-size="pageSize"
                         :total="total"
                         @current-change="handleChange">
          </el-pagination>
        </el-row>
      </div>
      <!-- <template v-if="chooseId !== 0">
        <el-row class="title">
          请选择数据进行训练
        </el-row>
        <el-form :inline="true" class="static-form">
          <template v-for="(item, index) in staticForm">
            <el-form-item :key="index" :label="item.label">
              <el-date-picker
                v-if="item.type === 'time'"
                v-model="item.value"
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                :placeholder="'请选择' + item.label"
              ></el-date-picker>
              <el-input v-else v-model="item.value" disabled> </el-input>
            </el-form-item>
          </template>
        </el-form>
        <el-row v-if="staticForm[2].value !== '' && staticForm[3].value !== ''" class="static"
          >共{{ staticNumber }}条数据</el-row
        >
      </template> -->
    </div>
    <el-row class="train-btn">
      <el-button type="primary"
                 @click="onSubmit">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
const modelTagList = [
  {
    prop: 'name',
    label: '模型名称',
  },
  {
    prop: 'applicable_scene',
    label: '场景',
  },
  {
    prop: 'car_type',
    label: '列车信息',
  },
  {
    prop: 'route',
    label: '路线信息',
  },
  {
    prop: 'introduction',
    label: '简介',
  },
];
export default {
  data() {
    return {
      filterForm: [
        {
          label: '应用场景',
          prop: 'scene_id',
          value: '',
          arr: [],
        },
        {
          label: '列车信息',
          prop: 'train_id',
          value: '',
          arr: [],
        },
        {
          label: '列车线路',
          prop: 'route_id',
          value: '',
          arr: [],
        },
      ],
      modelData: [],
      modelTagList,
      page: 1,
      pageSize: 10,
      total: 20,
      chooseId: 0,
      databaseId: 1,
      chooseModel: {},
    };
  },
  mounted() {
    this.databaseId = Number(sessionStorage.getItem('dataBaseId'));
    this.getModel();
    this.getScene();
    this.getTrain();
    this.getRoute();
  },
  methods: {
    getScene() {
      this.$axios.get(`/scene?database_id=${this.databaseId}`).then((res) => {
        this.filterForm[0].arr = res;
      });
    },
    getTrain() {
      this.$axios
        .get(`/tag/train?database_id=${this.databaseId}`)
        .then((res) => {
          this.filterForm[1].arr = res;
        });
    },
    getRoute() {
      this.$axios
        .get(`/tag/route?database_id=${this.databaseId}`)
        .then((res) => {
          this.filterForm[2].arr = res;
        });
    },
    // newModel() {
    //   this.$router.push('./newModel');
    // },
    submitForm() {
      this.getModel();
    },
    resetForm() {
      this.filterForm.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.value = '';
      });
      this.getModel();
    },
    handleChange(e) {
      this.page = e;
      this.getModel();
    },
    handleCurrentChange(val) {
      this.chooseModel = val;
      this.chooseId = val.id;
    },
    onSubmit() {
      if (this.chooseId === 0) {
        this.$message.error('请先选择模型');
        return;
      }
      const data = {
        id: this.chooseModel.id,
        train: this.chooseModel.car_type,
        route: this.chooseModel.route,
        start: this.chooseModel.data_date_lower_bound,
        end: this.chooseModel.data_date_upper_bound,
      };
      sessionStorage.setItem('Model', JSON.stringify(data));
      this.$router.push('./trainConfig');
    },
    getModel() {
      let query = `/model/list?database_id=${this.databaseId}&page=${this.page
        - 1}&page_size=${this.pageSize}`;
      this.filterForm.forEach((item) => {
        if (item.value !== '') {
          query += `&${item.prop}= ${item.value}`;
        }
      });
      this.$axios.get(query).then((res) => {
        this.modelData = res.data_list;
        this.total = res.total_number;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.train-continer {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.main {
  padding: 20px 70px;
  text-align: left;
  min-height: 960px;
  overflow: auto;
}

.model {
  background: #fff;
  padding: 20px 30px 30px 30px;
  border-radius: 6px;
  margin-bottom: 60px;
}

.line {
  background: #666666;
  height: 3px;
}

.task-footer {
  text-align: right;
  font-size: 13px;
  margin-top: 30px;
}

.train-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 66px;
  background: #fff;
  padding: 10px 30px;
  text-align: right;
}

.filter {
  background: #ebeef7;
  margin-top: 20px;
  @include flex-row;
  flex-wrap: wrap;
  padding: 15px 30px 0 30px;

  /deep/ .el-form-item {
    margin-right: 50px;
  }
}

.title {
  color: #666;
  margin-bottom: 20px;

  .el-button {
    margin-left: 10px;
  }
}

.source {
  @include flex-row;
  margin-bottom: 40px;
}

.static {
  color: #999;
  font-size: 14px;
}

.static-form {
  /deep/ .el-form-item {
    margin-right: 50px;
  }
}

.limit-column {
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
