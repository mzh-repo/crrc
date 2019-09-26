<template>
  <el-container class="model-container">
    <el-row>
      <bread-crumb />
    </el-row>
    <el-row class="step"
            :class="newModel? 'create': ''">
      <step-bar :active="active"
                :stepList="stepList" />
    </el-row>
    <router-view />
    <el-row v-if="newModel">
      <footer-bar :pre="showPre"
                  :type="footerType"
                  @handle-pre="handlePre"
                  @next="next"
                  @complete="complete" />
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
    return {};
  },
  computed: {
    active() {
      const path = this.$route.fullPath;
      if (path.indexOf('step2') > -1) {
        return 2;
      }
      if (path.indexOf('step3') > -1) {
        return 3;
      }
      return 1;
    },
    // 新建模型显示footerBar
    footerType() {
      const path = this.$route.fullPath;
      if (path.indexOf('step3') > -1) {
        return 'complete';
      }
      return 'next';
    },
    stepList() {
      const path = this.$route.fullPath;
      if (path.indexOf('step') > -1) {
        return ['选择数据集', '选择算法', '推荐配置'];
      }
      return ['模型选择', '查看报告'];
    },
    newModel() {
      const path = this.$route.fullPath;
      if (path.indexOf('step') > -1) {
        return true;
      }
      return false;
    },
    // footerBar 显示上一步
    showPre() {
      const path = this.$route.fullPath;
      if (path.indexOf('step2') > -1 || path.indexOf('step3') > -1) {
        return true;
      }
      return false;
    },
  },

  methods: {
    handlePre() {
      if (this.footerType === 'complete') {
        this.$router.push('/createModel/step2');
      } else {
        this.$router.push('/createModel/step1');
      }
    },
    next() {
      if (this.active === 1) {
        this.$router.push('/createModel/step2');
      } else if (this.active === 2) {
        this.$router.push('/createModel/step3');
      }
    },
    complete() {},
  },
};
</script>

<style lang="scss" scoped>
.model-container {
  @include flex-column;
}

.step {
  width: 50%;
  margin: auto;
}

.create {
  width: 90%;
}
</style>
