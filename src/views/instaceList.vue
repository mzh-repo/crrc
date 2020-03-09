<template>
  <div class="container">
    <h2>系统运行实例</h2>
    <div class="instance">
      <h1>{{statusTitle}}</h1>
      <div class="line"></div>
      <el-row>
        <el-table :data="instanceData"
                  :header-row-style="{ color: '#333' }"
                  height="576px"
                  style="width: 100%">
          <el-table-column type="index"
                           width="50"
                           label="序号"> </el-table-column>
          <template v-for="item in instanceTagList">
            <el-table-column :prop="item.prop"
                             :label="item.label"
                             :key="item.prop">
              <template slot-scope="scope">
                <div v-if="item.prop === 'status'">
                  <span v-if="scope.row.status === 1"
                        class="train-text">训练中...</span>
                  <span v-else>已完成</span>
                </div>
                <div v-else-if="item.prop === 'model_name'"
                     class="limit-column"
                     :title="scope.row[item.prop]">
                  {{ scope.row[item.prop] }}
                </div>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right"
                           label="操作"
                           width="100">
            <template slot-scope="scope">
              <div class="pre-btn"
                   @click="goDetail(scope.row)">
                <svg-icon icon-class="preview" />查看实例
              </div>
            </template>
          </el-table-column>
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
  </div>
</template>

<script>
const instanceTagList = [
  {
    prop: 'model_name',
    label: '模型名称',
  },
  {
    prop: 'scene_name',
    label: '场景',
  },
  {
    prop: 'car_name',
    label: '列车信息',
  },
  {
    prop: 'route_info',
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
    prop: 'algorithm_name',
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
      statusTitle: '已完成',
      instanceData: [],
      instanceTagList,
      page: 1,
      pageSize: 10,
      total: 20,
      status: 1, // 1 训练中 2 已完成
    };
  },
  mounted() {
    this.databaseId = Number(sessionStorage.getItem('dataBaseId'));
    this.status = Number(this.$route.query.status);
    if (this.status === 1) {
      this.statusTitle = '训练中';
    } else {
      this.statusTitle = '已完成';
    }
    this.getInstance();
  },
  methods: {
    handleChange(e) {
      this.page = e;
      this.getInstance();
    },
    goDetail(row) {
      if (row.status === 1) {
        this.$alert('模型正在训练中,请耐心等待', '提示', {
          confirmButtonText: '确定',
          type: 'info',
        });
      } else {
        const data = {
          train: row.car_name,
          route: row.route_info,
          id: row.model_id, // 模型id ,查看实例报告
          scene: row.scene_name,
        };
        sessionStorage.setItem('Result', JSON.stringify(data));
        this.$router.push({
          path: `/result?id=${row.type}`,
        });
      }
    },
    getInstance() {
      const obj = {
        page: this.page - 1,
        page_size: this.pageSize,
        status: this.status,
      };
      this.$axios
        .post(`/model/instance/list?database_id=${this.databaseId}`, obj)
        .then((res) => {
          this.instanceData = res.data_list;
          this.total = res.total_number;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  text-align: left;
  padding: 20px 70px;
}

.instance {
  background: #fff;
  padding: 10px 30px 30px 30px;
  border-radius: 6px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.line {
  background: #666666;
  height: 3px;
}

.train-text {
  color: $primary-color;
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

.task-footer {
  text-align: right;
  font-size: 13px;
  margin-top: 30px;

  .el-button {
    margin-left: 40px;
    margin-right: 10px;
  }
}
</style>
