<template>
  <el-container class="case-container">
    <el-row class="case-main">
      <!-- <el-col :span="2" class="progress">
        <svg-icon icon-class="progress"></svg-icon>
      </el-col> -->
      <el-col :span="4">
        <user-info />
      </el-col>
      <el-col :span="20"
              class="case">
        <el-col :span="6"
                class="case-1">
          <div class="title">间歇式供电列车</div>
          <el-row :gutter="16">
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
              <div class="newModel"
                   @click="newModel">
                <svg-icon icon-class="add-model"
                          class="add-img" />
                <div>新建模型</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6"
                class="case-2">
          <div class="title">非接触式供电列车</div>
          <el-row :gutter="16">
            <!-- <el-col v-for="(item, index) in caseList" :key="index" :span="12">
              <case-box />
            </el-col> -->
            <el-col :span="12">
              <template v-for="(item, index) in dataList.list2.operation_control">
                <case-box :key="index"
                          :zIndex="2019 - index"
                          :data="item"
                          id="2" />
              </template>
            </el-col>
            <el-col :span="12">
              <template v-for="(item, index) in dataList.list2.fault_warning">
                <case-box :key="index"
                          :zIndex="2019 - index"
                          :data="item"
                          id="2" />
              </template>
              <div class="newModel"
                   @click="newModel">
                <svg-icon icon-class="add-model"
                          class="add-img" />
                <div>新建模型</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="train">
      <svg-icon icon-class="火车" />
    </el-row>
  </el-container>
</template>

<script>
import CaseBox from '@/components/case.vue';
import UserInfo from '../../components/userInfo.vue';

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
    };
  },
  mounted() {
    this.$axios.get('/case').then((res) => {
      this.dataList = res;
    });
  },
  methods: {
    newModel() {
      this.$router.push('/createModel/step1');
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
}

.case {
  // height: 822px;
  height: 760px;
  display: flex;

  .case-1,
  .case-2 {
    height: 100%;
    text-align: left;
    // padding: 0 25px;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    // min-width: 828px;
    min-width: 770px;

    &:first-child {
      border-right: 1px solid #d8d8d8;
    }
  }
}

.train {
  width: 100%;
  text-align: right;
  // margin-top: 10px;
  margin-top: -70px;
  padding-right: 30px;

  .svg-icon {
    @include set-size(331px, 73px);
  }
}

.newModel {
  // position: relative;
  width: 370px;
  // margin: 16px 6px 0 0;
  border-radius: 5px;
  background: #fff;
  @include box-center;
  height: 220px;
  flex-direction: column;
  cursor: pointer;
}
</style>
