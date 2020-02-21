<!--
<template>
  <el-container class="case-container">
    <el-row class="case-main">
      <el-col :span="4">
        <user-info />
      </el-col>
      <el-col :span="20" class="case">
        <div class="title">
          {{ databaseId === 1 ? '间歇式供电列车系统' : '非接触式供电列车系统' }}
        </div>
        <div class="search">
          <el-col>
            <el-input
              v-model="input"
              placeholder="请输入"
              prefix-icon="el-icon-search"
              @change="getData"
            >
            </el-input>
          </el-col>
          <el-col>
            <span>状态:</span>
            <el-select v-model="choose" @change="getData">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col>
            <el-button type="primary" @click="newModel">新建模型</el-button>
          </el-col>
        </div>
        <el-row class="model-container" :gutter="20">
          <el-col v-for="(item, index) in modelList" :key="index" :span="8">
            <case-box :data="item" id="1" />
          </el-col>
        </el-row>
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="handleChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import CaseBox from '@/components/case.vue';
import UserInfo from '../components/userInfo.vue';

export default {
  components: {
    CaseBox,
    UserInfo,
  },
  data() {
    return {
      dataList: {
        list1: {
          operation_control: [],
          fault_warning: [],
        },
        list2: {
          operation_control: [],
          fault_warning: [],
        },
      },
      caseList: ['', '', ''],
      statusList: [
        {
          id: 5,
          name: '训练中',
        },
        {
          id: 1,
          name: '已完成',
        },
        {
          id: 3,
          name: '已取消',
        },
        {
          id: 4,
          name: '训练失败',
        },
      ],
      input: '',
      choose: '',
      page: 1,
      pageSize: 9,
      total: 1,
      modelList: [],
      databaseId: null,
    };
  },
  mounted() {
    this.databaseId = Number(sessionStorage.getItem('dataBaseId'));
    this.getData();
  },
  methods: {
    newModel() {
      this.$router.push('/createModel/step1');
    },
    handleChange(e) {
      this.page = e;
      this.getData();
    },
    getData() {
      let query = `/model/list?database_id=${this.databaseId}&page=${this.page - 1}&page_size=${
        this.pageSize
      }`;
      if (this.input !== '') {
        query += `&keyword=${this.input}`;
      }
      if (this.choose !== '') {
        query += `&status=${this.choose}`;
      }
      this.$axios.get(query).then((res) => {
        this.modelList = res.data_list;
        this.total = res.total_number;
      });
    },
  },
};
</script>
-->

<template>
  <div class="main">
    <h1>{{ title }}供电列车大数据运用支撑系统</h1>
    <div class="task">
      <h1>我的任务</h1>
      <div class="line"></div>
      <el-row>
        <el-table :data="taskData" :header-row-style="{ color: '#333' }" style="width: 100%">
          <el-table-column type="index" width="50" label="序号"> </el-table-column>
          <template v-for="item in taskTagList">
            <el-table-column :prop="item.prop" :label="item.label" :key="item.prop">
            </el-table-column>
          </template>
          <el-table-column fixed="right" label="强化训练" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleTrain(scope.$index, scope.row)"
                >强化训练</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="task-footer">
        共 {{ taskData.length }} 条
        <el-button size="mini" type="primary" :loading="showAllLoading" @click="handleAll"
          >执行全部</el-button
        >
      </el-row>
    </div>
    <div class="task instance">
      <h1>系统运行实例</h1>
      <el-row class="filter">
        <el-form :inline="true">
          <template v-for="(item, index) in filterForm">
            <el-form-item :key="index" :label="item.label">
              <el-date-picker
                v-if="item.type === 'time'"
                v-model="item.value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <el-select v-else v-model="item.value" :placeholder="'请选择' + item.label">
                <el-option
                  v-for="(i, j) in item.arr"
                  :label="i.name"
                  :key="j"
                  :value="i.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary" @click="submitForm">筛选</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="line"></div>
      <el-row>
        <el-table
          :data="instanceData"
          :header-row-style="{ color: '#333' }"
          height="288px"
          style="width: 100%"
        >
          <el-table-column type="index" width="50" label="序号"> </el-table-column>
          <template v-for="item in instanceTagList">
            <el-table-column :prop="item.prop" :label="item.label" :key="item.prop">
              <template slot-scope="scope">
                <div v-if="item.prop === 'status'">
                  <span v-if="scope.row.status === 1" class="train-text">训练中...</span>
                  <span v-else>已完成</span>
                </div>
                <div
                  v-else-if="item.prop === 'name'"
                  class="limit-column"
                  :title="scope.row[item.prop]"
                >
                  {{ scope.row[item.prop] }}
                </div>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <div class="pre-btn" @click="goDetail(scope.row)">
                <svg-icon icon-class="preview" />查看实例
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="task-footer">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page.sync="page"
          :page-size="pageSize"
          :total="total"
          @current-change="handleChange"
        >
        </el-pagination>
      </el-row>
    </div>
    <el-row class="statistics"
      >{{ statistics.training }}个模型正在训练, {{ statistics.complete }}个模型已完成训练,累计使用{{
        statistics.number
      }}条数据</el-row
    >
  </div>
</template>

<script>
const taskTagList = [
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
  {
    prop: 'create_time',
    label: '创建时间',
  },
  {
    prop: 'algorithm_name',
    label: '使用算法',
  },
  {
    prop: 'update_number',
    label: '新增数据条数',
  },
];
const instanceTagList = [
  {
    prop: 'name',
    label: '模型名称',
  },
  {
    prop: 'scene',
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
    prop: 'create_time',
    label: '创建时间',
  },
  {
    prop: 'update_time',
    label: '更新时间',
  },
  {
    prop: 'algo',
    label: '使用算法',
  },
  {
    prop: 'status',
    label: '状态',
  },
];
export default {
  data() {
    return {
      title: '间歇式',
      taskData: [
        {
          name: '多目标',
          scene: '多目标优化列车运行控制',
          id: '1号车',
          route: '香山',
          create_time: '2019-12-10 12:20',
          algo: 'keras',
          number: '2283条',
        },
      ],
      taskTagList,
      instanceData: [
        {
          name: '多目标',
          scene: '多目标优化列车运行控制',
          id: '1号车',
          route: '香山',
          create_time: '2019-12-10 12:20',
          update_time: '2019-12-10 12:20',
          algo: 'keras',
          status: '已完成',
        },
        {
          name: '多目标',
          scene: '多目标优化列车运行控制',
          id: '1号车',
          route: '香山',
          create_time: '2019-12-10 12:20',
          update_time: '2019-12-10 12:20',
          algo: 'keras',
          status: '已完成',
        },
        {
          name: '多目标',
          scene: '多目标优化列车运行控制',
          id: '1号车',
          route: '香山',
          create_time: '2019-12-10 12:20',
          update_time: '2019-12-10 12:20',
          algo: 'keras',
          status: '已完成',
        },
        {
          name: '多目标',
          scene: '多目标优化列车运行控制',
          id: '1号车',
          route: '香山',
          create_time: '2019-12-10 12:20',
          update_time: '2019-12-10 12:20',
          algo: 'keras',
          status: '已完成',
        },
        {
          name: '多目标',
          scene: '多目标优化列车运行控制',
          id: '1号车',
          route: '香山',
          create_time: '2019-12-10 12:20',
          update_time: '2019-12-10 12:20',
          algo: 'keras',
          status: '已完成',
        },
      ],
      instanceTagList,
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
          arr: [
            {
              name: '香山——颐和园南门',
              id: 1,
            },
            {
              name: '广州塔——会展西',
              id: 2,
            },
          ],
        },
        {
          label: '状态',
          prop: 'status',
          value: '',
          arr: [
            {
              name: '训练中',
              id: 1,
            },
            {
              name: '训练完成',
              id: 2,
            },
          ],
        },
        {
          label: '创建时间',
          value: '',
          prop1: 'create_time_from',
          prop2: 'create_time_to',
          type: 'time',
        },
        {
          label: '更新时间',
          value: '',
          prop1: 'update_time_from',
          prop2: 'update_time_to',
          type: 'time',
        },
      ],
      page: 1,
      pageSize: 5,
      total: 20,
      statistics: {
        training: 23,
        complete: 45,
        number: 123,
      },
      databaseId: 1,
      showAllLoading: false,
    };
  },
  mounted() {
    this.databaseId = Number(sessionStorage.getItem('dataBaseId'));
    if (this.databaseId === 1) {
      this.title = '间歇式';
    } else {
      this.title = '非接触式';
    }
    this.getTask();
    this.getInstance();
    this.getScene();
    this.getTrain();
    this.getRoute();
  },
  methods: {
    handleTrain() {
      setTimeout(() => {
        this.$router.push('./training');
      }, 500);
    },
    handleAll() {
      this.showAllLoading = true;
    },
    getScene() {
      this.$axios.get(`/scene?database_id=${this.databaseId}`).then((res) => {
        this.filterForm[0].arr = res;
      });
    },
    getTrain() {
      this.$axios.get(`/tag/train?database_id=${this.databaseId}`).then((res) => {
        this.filterForm[1].arr = res;
      });
    },
    getRoute() {
      this.$axios.get(`/tag/route?database_id=${this.databaseId}`).then((res) => {
        this.filterForm[2].arr = res;
      });
    },
    goDetail(row) {
      if (row.status === 1) {
        this.$router.push('./training');
      } else {
        // TODO 训练结果
        this.$router.push({
          path: `/result?id=${this.instanceType}`,
        });
      }
    },
    submitForm() {
      this.getInstance();
    },
    resetForm() {
      this.filterForm.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.value = '';
      });
      this.getInstance();
    },
    handleChange(e) {
      this.page = e;
      this.getInstance();
    },
    getTask() {
      this.$axios.get('/task').then((res) => {
        this.taskData = res;
      });
    },
    getInstance() {
      const obj = {
        page: this.page - 1,
        page_size: this.pageSize,
      };
      this.filterForm.forEach((item, index) => {
        if (item.value !== '' && index <= 3) {
          Object.assign(obj, {
            [`${item.prop}`]: item.value,
          });
        } else {
          Object.assign(obj, {
            [`${item.prop1}`]: item.value[0],
            [`${item.prop2}`]: item.value[1],
          });
        }
      });
      this.$axios.post(`/model/instance/list?database_id=${this.databaseId}`, obj).then((res) => {
        this.instanceData = res.data_list;
        this.total = res.total_number;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 20px 70px;
  text-align: left;
}

.task {
  background: #fff;
  padding: 10px 30px 30px 30px;
  border-radius: 6px;

  &.instance {
    margin-top: 50px;
    margin-bottom: 30px;
  }
}

.line {
  background: #666666;
  height: 3px;
}

.task-footer {
  text-align: right;
  font-size: 13px;
  margin-top: 30px;

  .el-button {
    margin-left: 40px;
    margin-right: 10px;
  }
}

.filter {
  background: #ebeef7;
  margin-bottom: 30px;
  @include flex-row;
  flex-wrap: wrap;
  padding: 15px 30px 0 30px;

  /deep/ .el-form-item {
    margin-right: 50px;
  }
}

.pre-btn {
  color: $primary-color;
  text-decoration: underline;
  display: flex;
  align-items: center;
  cursor: pointer;

  .svg-icon {
    margin-right: 3px;
  }
}

.statistics {
  font-size: 14px;
  color: #999999;
}

.train-text {
  color: $primary-color;
}

.limit-column {
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
