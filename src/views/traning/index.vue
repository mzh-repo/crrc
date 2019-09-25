<template>
  <el-container class="traning-container">
    <el-row>
      <bread-crumb />
    </el-row>
    <el-row class="step">
      <step-bar :active="active"
                :stepList="stepList" />
    </el-row>
    <router-view />
    <el-row>
      <footer-bar />
    </el-row>
  </el-container>

</template>

<script>
import BreadCrumb from '../../components/breadCrumb.vue';
import StepBar from '../../components/stepBar.vue';
import FooterBar from '../../components/footerBar.vue';

export default {
  components: { BreadCrumb, StepBar, FooterBar },
  data() {
    return {
      active: '1',
      stepList: ['数据选择', '参数配置', '训练模型'],
    };
  },
};
</script>

<style lang="scss" scoped>
.traning-container {
  // margin: -20px;
  display: flex;
  flex-direction: column;
}
.step {
  width: 90%;
  margin: auto;
}
</style>
