<template>
  <el-container>
    <div>
      <div v-if="pre">
        上一步
      </div>
    </div>
    <div>
      下一步 >
    </div>
  </el-container>
</template>

<script>
export default {
  props: {
    pre: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 66px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
