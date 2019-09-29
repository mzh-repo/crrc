<template>
  <el-container>
    <el-col v-for="(item,index) in stepList"
            :key="index"
            class="step">
      <div class="line"
           :class="active > index+1 ? 'active' : ''"></div>
      <div v-if="
           active>= index+1"
           class="line-active">
      </div>
      <div class="step-container">
        <div class="number"
             :class="active >= index+1 ? 'active' : ''">
          {{index + 1}}
        </div>
        <div class="step-main"
             :class="active >= index+1 ? 'active' : ''">
          {{item}}
        </div>
      </div>
    </el-col>
  </el-container>
</template>

<script>
export default {
  props: {
    stepList: {
      type: Array,
      default: () => ['选择数据集', '表格上传', '分析报告', '模型推荐'],
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.step {
  position: relative;

  &:last-child {
    width: auto;
    flex-shrink: 0;

    & .line {
      display: none;
    }
  }
}

.number {
  @include set-size(48px);
  background-color: #e3e3e3;
  border-radius: 50%;
  @include box-center;
  color: #666;
  position: relative;
  z-index: 1;
}

.number.active {
  background-color: $primary-color;
  color: #fff;
}

.line {
  width: 100%;
  height: 6px;
  background-color: #e3e3e3;
  position: absolute;
  top: 21px;
}

.line.active {
  background-color: $primary-color;
}

.line-active {
  width: 50%;
  background-color: $primary-color;
  height: 6px;
  position: absolute;
  top: 21px;
}

.step-container {
  margin: 0 0 0 -32px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.step-main {
  text-align: left;
  font-size: 18px;
  margin-top: 20px;
  color: #666;
}

.step-main.active {
  color: #333;
}
</style>
