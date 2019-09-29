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
  mounted() {
    if (this.$route.path === '/chooseData') {
      this.active = 1;
    } else if (this.$route.path === '/config') {
      this.active = 2;
    } else if (this.$route.path === '/model') {
      this.active = 3;
    }
  },
  methods: {
    next() {
      if (this.active === 1) {
        this.$router.push('/config');
        this.footerType = 'commit';
      }
      this.active += 1;
      this.$store.commit('setPublishActive', this.active);
    },
    commit() {
      this.footerType = 'return';
      this.active += 1;
      const data = this.$store.state.record;
      this.$axios.post('/form/train', data).then(() => {
        this.$router.push('./model');
      });
      this.$store.commit('setPublishActive', this.active);
    },
    handlePre() {
      this.$router.push('/chooseData');
      this.footerType = 'next';
      this.active = 1;
      this.$store.commit('setPublishActive', this.active);
    },
    // TODO: 回到模型训练中心
    handleFinish() {
      this.$router.push('/chooseModel');
    },
    complete() {},
  },
  watch: {
    active() {
      if (this.active === 1) {
        this.$router.push({ path: '/chooseData' });
        this.footerType = 'next';
      } else if (this.active === 2) {
        this.$router.push({ path: '/config' });
        this.footerType = 'commit';
      } else if (this.active === 3) {
        this.$router.push({ path: '/model' });
        this.footerType = 'return';
      }
    },
    '$store.state.publishActive': {
      handler() {
        this.active = this.$store.state.publishActive;
      },
    },
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
