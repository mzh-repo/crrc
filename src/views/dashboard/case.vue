<template>
  <el-container class="case-container">
    <el-row class="case-main">
      <el-col :span="4">
        <user-info />
      </el-col>
      <el-col :span="20" class="case">
        <!-- <el-col :span="24" class="case-1"> -->
        <div class="title">间歇式供电列车</div>
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
        <!-- <el-row :gutter="16">
          <el-col :span="12">
            <template v-for="(item, index) in dataList.list1.operation_control">
              <case-box :key="index"
                        :zIndex="2019 - index"
                        :data="item"
                        id="1" />
            </template>
          </el-col>
          <el-col :span="12">
            <template v-for="(item, index) in dataList.list1.fault_warning">
              <case-box :key="index"
                        :zIndex="2019 - index"
                        :data="item"
                        id="1" />
            </template>
            <div class="newModel" @click="newModel">
                <svg-icon icon-class="add-model" class="add-img" />
                <div>新建模型</div>
            </div>
          </el-col>
        </el-row> -->
        <el-row class="model-container"></el-row>
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :total="50"
          @current-change="handleChange"
        >
        </el-pagination>
      </el-col>
      <!-- </el-col> -->
    </el-row>
  </el-container>
</template>

<script>
// import CaseBox from '@/components/case.vue';
import UserInfo from '../../components/userInfo.vue';

export default {
  components: {
    // CaseBox,
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
          id: 1,
          name: '训练中',
        },
        {
          id: 2,
          name: '已取消',
        },
      ],
      input: '',
      choose: '',
      page: 1,
    };
  },
  mounted() {
    // eslint-disable-next-line arrow-parens
    this.$axios.get('/case').then(res => {
      this.dataList = res;
    });
  },
  methods: {
    newModel() {
      this.$router.push('/createModel/step1');
    },
    handleChange(e) {
      this.page = e;
    },
    // TODO
    getData() {},
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

  // .svg-icon {
  //   @include set-size(66px, 684px);
  // }
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
  padding: 60px 40px 0 40px;

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
  min-height: 760px;
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
