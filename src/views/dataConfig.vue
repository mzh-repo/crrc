<template>
  <div class="train-continer">
    <div class="main">
      <h1>创建训练</h1>
      <el-row class="title">
        请选择数据集配置
      </el-row>
      <el-form :inline="true" class="static-form">
        <template v-for="(item, index) in staticForm">
          <el-form-item :key="index" :label="item.label">
            <!-- <el-date-picker
              v-if="item.type === 'time'"
              v-model="item.value"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm:ss"
              :placeholder="'请选择' + item.label"
            ></el-date-picker> -->
            <el-date-picker
              v-if="item.type === 'time'"
              v-model="item.value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-input v-else v-model="item.value" disabled> </el-input>
          </el-form-item>
        </template>
      </el-form>
      <el-row class="static">共{{ staticNumber }}条数据</el-row>
      <el-row class="title resource">
        请选择训练资源配置
      </el-row>
      <el-form :inline="true" class="static-form">
        <el-form-item v-for="(item, index) in configList" :key="index" :label="item.title">
          <el-select v-model="item.value">
            <el-option v-for="(i, j) in item.arr" :value="i" :key="j"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="train-btn">
      <el-button type="primary" @click="onSubmit">提交训练</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chooseId: 0,
      staticForm: [
        {
          label: '数据源',
          value: '',
        },
        {
          label: '线路',
          value: '',
        },
        {
          label: '数据时间范围',
          value: '',
          type: 'time',
        },
        // {
        //   label: '结束时间',
        //   value: '',
        //   type: 'time',
        // },
      ],
      staticNumber: 203,
      databaseId: 1,
      configList: [
        {
          title: 'GPU型号',
          value: 'RTX2080',
          arr: [],
        },
        {
          title: 'GPU数量',
          value: '2',
          arr: [],
        },

        {
          title: '最大内存',
          value: '32GB',
          arr: [],
        },
        {
          title: '并发线程',
          value: '24',
          arr: [],
        },
        {
          title: '训练轮次',
          value: '1000',
          arr: [],
        },
        {
          title: '最长训练时间',
          value: '24小时',
          arr: [],
        },
      ],
    };
  },
  mounted() {
    this.databaseId = Number(sessionStorage.getItem('dataBaseId'));
    // this.getModel();
    // this.getScene();
    // this.getTrain();
    // this.getRoute();
    const data = JSON.parse(sessionStorage.getItem('Model'));
    this.chooseId = data.id;
    this.staticForm[0].value = data.train;
    this.staticForm[1].value = data.route;
  },
  methods: {
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
    // newModel() {
    //   this.$router.push('./newModel');
    // },
    handleCurrentChange(val) {
      this.chooseId = val.id;
      this.staticForm[0].value = val.car_type;
      this.staticForm[1].value = val.route;
    },
    onSubmit() {
      // if (this.chooseId === 0) {
      //   this.$message.error('请先选择模型');
      //   return;
      // }
      // if (this.staticForm[2].value === '') {
      //   this.$message.error('请选择开始时间');
      //   return;
      // }
      // if (this.staticForm[3].value === '') {
      //   this.$message.error('请选择截止日期');
      //   return;
      // }
      // if (this.staticForm[2].value > this.staticForm[3].value) {
      //   this.$message.error('开始时间要晚于截止时间');
      //   return;
      // }
      // TODO： 数据起止时间
      // TODO
      const obj = {
        model_id: this.chooseId,
      };
      this.$axios.post('/form/train', obj).then(() => {
        this.$message({
          message: '创建训练成功',
          type: 'success',
        });
        this.$router.push('./training');
      });
      this.$alert('模型正在训练中, 预估需要2h,请耐心等待?', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.$router.push('./dashboard');
        },
      });
    },
    getModel() {
      const query = `/model/list?database_id=${this.databaseId}&page=${this.page - 1}&page_size=${
        this.pageSize
      }`;
      // if (this.input !== '') {
      //   query += `&keyword=${this.input}`;
      // }
      // if (this.choose !== '') {
      //   query += `&status=${this.choose}`;
      // }
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

  &.resource {
    margin-top: 66px;
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
