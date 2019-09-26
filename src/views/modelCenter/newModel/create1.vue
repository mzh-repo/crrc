<template>
  <el-container>
    <el-row class="input-container">
      <el-col :span="12">
        <el-row class="input-box">
          <el-col :span="4">
            请输入模型名称
          </el-col>
          <el-col :span="18">
            <el-input v-model="name"
                      clearable>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="input-box">
          <el-col :span="4">
            输入适用场景
          </el-col>
          <el-col :span="18">
            <el-input v-model="scene"
                      clearable>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-col :span="4">
          输入简介
        </el-col>
        <el-col :span="18">
          <el-input type="textarea"
                    :rows="5"
                    v-model="describe">
          </el-input>
        </el-col>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-container {
  @include flex-column;
  margin: 0 113px auto 70px;
}

.input-container {
  height: 198px;

  // .el-col {
  //   display: flex;
  //   justify-content: space-between;
  // }
}

.input-box {
  @include flex-row;
  margin-bottom: 60px;
}
</style>
