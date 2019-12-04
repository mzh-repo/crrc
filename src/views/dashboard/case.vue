<template>
  <el-container class="case-container">
    <el-row class="case-main">
      <el-col :span="2"
              class="progress">
        <svg-icon icon-class="progress"></svg-icon>
      </el-col>
      <el-col :span="22"
              class="case">
        <el-col :span="12"
                class="case-1">
          <div class="title">间歇式供电列车</div>
          <el-row :gutter="16">
            <el-col :span="12">
              <template v-for="(item, index) in caseList">
                <case-box :key="index"
                          :zIndex="2019 - index" />
              </template>
            </el-col>
            <el-col :span="12">
              <template v-for="(item, index) in caseList">
                <case-box :key="index"
                          :zIndex="2019 - index" />
              </template>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12"
                class="case-2">
          <div class="title">非接触式供电列车</div>
          <el-row :gutter="16">
            <!-- <el-col v-for="(item, index) in caseList" :key="index" :span="12">
              <case-box />
            </el-col> -->
            <el-col :span="12">
              <template v-for="(item, index) in caseList">
                <case-box :key="index"
                          :zIndex="2019 - index" />
              </template>
            </el-col>
            <el-col :span="12">
              <template v-for="(item, index) in caseList">
                <case-box :key="index"
                          :zIndex="2019 - index" />
              </template>
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

export default {
  components: {
    CaseBox,
  },
  data() {
    return {
      caseList: ['', '', ''],
    };
  },
};
</script>

<style lang="scss" scoped>
.case-container {
  padding: 100px 0 30px;
  @include flex-column;
}

.case-main {
  width: 100%;
  display: flex;
  align-items: center;

  .svg-icon {
    @include set-size(66px, 684px);
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
  height: 822px;

  .case-1,
  .case-2 {
    height: 100%;
    text-align: left;
    padding: 0 25px;
    display: flex;
    flex-wrap: wrap;
    min-width: 828px;

    &:first-child {
      border-right: 1px solid #d8d8d8;
    }
  }
}

.train {
  width: 100%;
  text-align: right;
  margin-top: 10px;
  padding-right: 30px;

  .svg-icon {
    @include set-size(331px, 73px);
  }
}
</style>
