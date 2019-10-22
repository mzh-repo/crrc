<template>
  <el-container class="footer-container">
    <div class="pre">
      <el-button v-if="pre"
                 @click="handlePre"
                 type="primary">
        <!-- <svg-icon icon-class="arrow_left" /> -->
        上一步
      </el-button>
      <el-button v-if="type === 'commit'"
                 type="primary"
                 @click="handlePre">
        <!-- <svg-icon icon-class="arrow_left" /> -->
        上一步
        <!-- 回到选择数据训练模型 -->
      </el-button>
      <span v-if="type === 'return'">
        <el-button @click="handleFinish"
                   type="primary">
          终止训练
        </el-button>
        &nbsp; &nbsp;终止后，该进程将取消并回到模型训练中心
      </span>
    </div>
    <el-button v-if="type === 'next'"
               type="primary"
               @click="next">
      下一步
      <!-- <svg-icon icon-class="arrow_right" /> -->
    </el-button>
    <el-button v-if="type === 'commit'"
               type="primary"
               @click="commit">
      提交训练
    </el-button>
    <el-button v-if="type === 'return'"
               type="primary"
               @click="comeBack">
      回到模型中心
    </el-button>
    <el-button v-if="type === 'complete'"
               type="primary"
               @click="complete">
      完成
    </el-button>
  </el-container>
</template>

<script>
export default {
  props: {
    // 是否展示上一步
    pre: {
      type: Boolean,
      default: false,
    },
    // 展示下一步, 接收4个参数: next,commit,return,complete
    type: {
      type: String,
      default: 'next',
    },
  },
  methods: {
    handlePre() {
      this.$emit('handle-pre');
    },
    handleFinish() {
      this.$emit('handle-finish');
    },
    next() {
      this.$emit('next');
    },
    commit() {
      this.$emit('commit');
    },
    comeBack() {
      this.$emit('come-back');
      this.$router.push('/chooseModel');
    },
    complete() {
      this.$emit('complete');
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-container {
  width: 100%;
  height: 66px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  padding: 0 30px;
  z-index: 2000;
  // font-size: 22px;
}

.pre {
  color: rgba(153, 153, 153, 1);
}

span {
  cursor: pointer;
}
</style>
