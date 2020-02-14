<template>
  <el-container class="case-container">
    <el-row class="case-main">
      <el-col :span="4">
        <user-info />
      </el-col>
      <el-col :span="20"
              class="case">
        <div class="title">{{ databaseId === 1 ? '间歇式供电列车系统' : '非接触式供电列车系统' }}</div>
        <div class="search">
          <el-col>
            <el-input v-model="input"
                      placeholder="请输入"
                      prefix-icon="el-icon-search"
                      @change="getData">
            </el-input>
          </el-col>
          <el-col>
            <span>状态:</span>
            <el-select v-model="choose"
                       @change="getData">
              <el-option v-for="(item, index) in statusList"
                         :key="index"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col>
            <el-button type="primary"
                       @click="newModel">新建模型</el-button>
          </el-col>
        </div>
        <el-row class="model-container"
                :gutter="20">
          <el-col v-for="(item, index) in modelList"
                  :key="index"
                  :span="8">
            <case-box :data="item"
                      id="1" />
          </el-col>
        </el-row>
        <el-pagination background
                       small
                       layout="prev, pager, next"
                       :total="total"
                       :page-size="pageSize"
                       @current-change="handleChange">
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
    // this.$axios.get('/case').then((res) => {
    //   this.dataList = res;
    // });
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
    // TODO
    getData() {
      // eslint-disable-next-line operator-linebreak
      let query = `/model/list?database_id=${this.databaseId}&page=${this.page -
        1}&page_size=${this.pageSize}`;
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

<style lang="scss" scoped>
.case-container {
  // padding: 100px 0 30px;
  @include flex-column;
}

.case-main {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .svg-icon {
    @include set-size(70px);
    margin-bottom: 23px;
  }
}

.progress {
  margin-right: 36px;
  text-align: right;
}

.title {
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  text-align: left;
}

.case {
  // height: 760px;
  @include flex-column();
  height: 100%;
  padding: 50px 40px 0 40px;

  .case-1,
  .case-2 {
    height: 100%;
    text-align: left;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    min-width: 770px;
  }
}

.model-container {
  // height: 760px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.train {
  width: 100%;
  text-align: right;
  margin-top: -70px;
  padding-right: 30px;

  .svg-icon {
    @include set-size(331px, 73px);
  }
}

.search {
  @include flex-row();
  margin-bottom: 30px;
  .el-col {
    width: 360px;

    &:last-child {
      text-align: left;
    }
  }

  .el-select {
    margin-left: 10px;
  }
}

.el-pagination {
  text-align: right;
  position: absolute;
  bottom: 40px;
  right: 40px;
}

// .newModel {
//   width: 370px;
//   border-radius: 5px;
//   background: #fff;
//   @include box-center;
//   height: 220px;
//   flex-direction: column;
//   cursor: pointer;
// }
</style>
