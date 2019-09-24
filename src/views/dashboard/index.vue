<template>
  <el-container>
    <el-col :span="4"></el-col>
    <el-col :span="20">
      <el-row :gutter="16">
        <el-col></el-col>
        <el-col></el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col></el-col>
        <el-col></el-col>
      </el-row>
      <el-row :gutter="16">
      </el-row>
    </el-col>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  flex-grow: 1;
}
</style>
