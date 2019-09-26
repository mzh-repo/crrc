<template>
  <el-container class="choose-model">
    <el-row class="title">
      <el-col>
        <span :class="modelActive? 'active': ''"
              @click="chooseModel">
          选择模型
        </span>
        <span :class="!modelActive? 'active': ''"
              @click="chooseApp">
          选择应用
        </span>
      </el-col>
      <el-col>
        请选择模型查看报告
      </el-col>
    </el-row>
    <el-row class="model-data">
      <el-row class="title">间歇式供电列车数据</el-row>
      <el-button @click="newModel">新建模型</el-button>
      <el-row :gutter="16">
        <el-col :span="8">
          <model />
        </el-col>
        <el-col :span="8">
          <model />
        </el-col>
        <el-col :span="8">
          <model />
        </el-col>
        <el-col :span="8">
          <model />
        </el-col>
        <el-col :span="8">
          <model />
        </el-col>
        <el-col :span="8">
          <model />
        </el-col>

      </el-row>

    </el-row>

  </el-container>
</template>

<script>
import Model from '@/components/controlModel.vue';

export default {
  components: { Model },
  data() {
    return {
      modelActive: true,
    };
  },
  methods: {
    chooseModel() {
      this.modelActive = true;
    },
    chooseApp() {
      this.modelActive = false;
    },
    newModel() {
      this.$router.push('/createModel/step1');
    },
  },
};
</script>

<style lang="scss" scoped>
.choose-model {
  @include flex-column;
  margin: 0 113px auto 70px;
}

.title {
  display: flex;
  justify-content: space-between;
}

.title {
  .el-col {
    display: flex;
    color: #333;

    span {
      margin-right: 40px;
      cursor: pointer;

      &:hover,
      &.active {
        font-weight: 600;
        transform: scale(1.15);
        transition: all 0.3s;
      }
    }

    &:nth-child(2) {
      justify-content: flex-end;
      color: #666;
    }
  }
}

.model-data {
  margin-top: 34px;
  @include flex-column;

  .title {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
