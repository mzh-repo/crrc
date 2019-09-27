<template>
  <el-container class="traning-container">
    <el-row>
      <bread-crumb />
    </el-row>
    <div class="scroll">
      <el-row class="step">
        <step-bar :active="active"
                  :stepList="stepList" />
      </el-row>
      <router-view />
    </div>

    <footer-bar :pre="showPre"
                :type="footerType"
                @handle-pre="handlePre"
                @handle-finish="handleFinish"
                @next="next"
                @commit="commit"
                @complete="complete" />

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
      active: 1,
      stepList: ['数据选择', '参数配置', '训练模型'],
      showPre: false,
      footerType: 'next',
    };
  },
  methods: {
    next() {
      if (this.active === 1) {
        this.$router.push('/config');
        this.footerType = 'commit';
      }
      this.active += 1;
    },
    commit() {
      this.$router.push('/model');
      this.footerType = 'return';
      this.active += 1;
    },
    handlePre() {
      this.$router.push('/chooseData');
      this.footerType = 'next';
      this.active = 1;
    },
    // TODO: 回到模型训练中心
    handleFinish() {
      this.$router.push('/chooseModel');
    },
    complete() {},
  },
};
</script>

<style lang="scss" scoped>
.traning-container {
  @include flex-column;
  position: relative;
}

.step {
  margin: auto;
  width: 90%;
}

.scroll {
  overflow-y: auto;
  box-sizing: border-box;
  width: 100%;
}
</style>
