<template>
  <el-container>
    <el-col :span="4">
      <user-info />
    </el-col>
    <el-col :span="20">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="box"></div>
        </el-col>
        <el-col :span="6">
          <div class="box"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="box"></div>
        </el-col>
        <el-col :span="12">
          <div class="box"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col v-for="item in 3"
                :key="item"
                :span="8">
          <div class="box"></div>
        </el-col>
      </el-row>
    </el-col>
  </el-container>
</template>

<script>
import UserInfo from '../../components/userInfo.vue';

export default {
  components: { UserInfo },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  &:first-child {
    height: 418px;
    margin-bottom: 20px;
  }
  &:nth-child(2) {
    height: 326px;
    margin-bottom: 20px;
  }
  &:nth-child(3) {
    height: 164px;
  }
}

.el-col {
  height: 100%;
}

.box {
  background: #fff;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  height: 100%;
}
</style>
