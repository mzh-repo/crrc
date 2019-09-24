<template>
  <el-continer>
    <bread-crumb />
    <el-row class="step">
      <step-bar :active="active"
                :stepList="stepList" />
    </el-row>
    <router-view />
    <el-row>
      <footer-bar />
    </el-row>
  </el-continer>

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
.step {
  width: 90%;
  margin: auto;
}
</style>
