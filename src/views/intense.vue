<template>
  <div class="train-continer">
    <div class="main">
      <h1>强化训练</h1>
      <el-row class="title">
        请选择实例
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
          <el-table :data="taskData"
                    :header-row-style="{ color: '#333' }"
                    height="576px"
                    style="width: 100%"
                    highlight-current-row>
            <el-table-column type="index"
                             width="50"
                             label="序号"> </el-table-column>
            <template v-for="item in modelTagList">
              <el-table-column :prop="item.prop"
                               :label="item.label"
                               :key="item.prop"
                               :width="limitWidth(item.prop)">
                <template slot-scope="scope">
                  <div v-if="item.prop === 'name' || item.prop === 'introduction'"
                       class="limit-column"
                       :title="scope.row[item.prop]">
                    {{ scope.row[item.prop] }}
                  </div>
                  <div v-else-if="item.prop === 'time'">
                    <el-date-picker v-model="scope.row[item.prop]"
                                    align="right"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    value-format="timestamp">
                    </el-date-picker>
                  </div>
                  <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
              </el-table-column>
            </template>
            <el-table-column fixed="right"
                             label="操作"
                             width="120">
              <template slot-scope="scope">
                <el-button @click.native.prevent="handleTrain(scope.row)"
                           type="text"
                           size="small">
                  强化训练
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <!-- <el-row class="task-footer">
          <el-pagination background
                         layout="total, prev, pager, next"
                         :current-page.sync="page"
                         :page-size="pageSize"
                         :total="total"
                         @current-change="handleChange">
          </el-pagination>
        </el-row> -->
      </div>
    </div>
  </div>
</template>

<script>
const modelTagList = [
  {
    prop: 'model_name',
    label: '模型名称',
  },
  {
    prop: 'application_scene_name',
    label: '场景',
  },
  {
    prop: 'train_name',
    label: '列车信息',
  },
  {
    prop: 'route_name',
    label: '路线信息',
  },
  // {
  //   prop: 'create_time',
  //   label: '创建时间',
  // },
  // {
  //   prop: 'algorithm_name',
  //   label: '使用算法',
  // },
  // {
  //   prop: 'update_number',
  //   label: '新增数据条数',
  // },
  {
    prop: 'time',
    label: '数据集时间范围',
  },
];
export default {
  data() {
    return {
      filterForm: [
        {
          label: '应用场景',
          prop: 'application_scene',
          value: '',
          arr: [],
        },
        {
          label: '列车信息',
          prop: 'train_tag',
          value: '',
          arr: [],
        },
        {
          label: '列车线路',
          prop: 'route_tag',
          value: '',
          arr: [],
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      taskData: [],
      modelTagList,
      page: 1,
      pageSize: 10,
      total: 20,
      chooseId: 0,
      databaseId: 1,
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
    limitWidth(prop) {
      if (prop === 'time') {
        return '500px';
      }
      return 'auto';
    },
    handleTrain(row) {
      if (!row.time) {
        this.$message.error('请先选择数据集时间范围');
      } else {
        this.$confirm('是否对该模型进行强化训练?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        })
          .then(() => {
            this.$axios
              .post('/task/enhance', [row.id])
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '模型强化训练中',
                });
                this.getModel();
              })
              .catch(() => {
                this.$message({
                  message: '训练失败,请稍后重试',
                  type: 'error',
                });
              });
          })
          .catch(() => {
            this.$message({
              message: '操作取消',
            });
          });
        // TODO 选择时间
        // eslint-disable-next-line no-console
        console.log(row.time);
      }
    },
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
    getModel() {
      let query = `/task?page=0&database_id=${this.databaseId}`;
      this.filterForm.forEach((item) => {
        if (item.value !== '') {
          query += `&${item.prop}=${item.value}`;
        }
      });
      this.$axios.get(query).then((res) => {
        this.taskData = res;
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
