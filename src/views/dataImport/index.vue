<template>
  <el-container class="import-container">
    <el-row>
      <bread-crumb />
    </el-row>
    <el-row class="step">
      <step-bar :active="active"
                :stepList="stepList" />
    </el-row>
    <router-view ref="route" />
    <el-row>
      <footer-bar :pre="showPre"
                  :type="footerType"
                  @handle-pre="handlePre"
                  @handle-finish="handleFinish"
                  @next="next"
                  @commit="commit"
                  @come-back="comeBack"
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
    return {
      active: 1,
      stepList: ['表格上传', '分析报告', '模型推荐'],
      showPre: false,
      footerType: 'next',
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/createModel/step1') {
      localStorage.setItem('return', 1);
    } else if (from.path === '/modelPublish') {
      localStorage.setItem('return', 2);
    } else {
      localStorage.setItem('return', 0);
    }
    next();
  },
  created() {
    // this.$router.push('/importData');
  },
  mounted() {
    // 新建数据集跳转 && 导航栏跳转区分
    this.fromRouteId = this.$route.query.id;
  },
  beforeDestroy() {},
  methods: {
    next() {
      if (this.active === 1) {
        if (this.$refs.route.value !== '' && this.$refs.route.DBName !== '') {
          if (localStorage.getItem('return') === '1') {
            this.$router.push('/createModel/step1');
          } else if (
            localStorage.getItem('return') === '2'
            && this.fromRouteId
          ) {
            this.$router.push({ path: '/modelPublish' });
          } else {
            this.$router.push('/analyze');
            this.showPre = true;
            this.footerType = 'next';
          }
        } else {
          this.$message({
            message: '请先完成本页内容',
            type: 'warning',
          });
          return;
        }
      } else if (this.active === 2) {
        this.$router.push('/recommend');
        this.footerType = 'complete';
      }
      this.active += 1;
    },
    handlePre() {
      if (this.active === 2) {
        this.$router.push('/importData');
        this.showPre = false;
        this.active = 1;
      } else if (this.active === 3) {
        this.$router.push('/analyze');
        this.footerType = 'next';
        this.active = 2;
      }
    },
    commit() {},
    handleFinish() {},
    complete() {
      if (this.$store.state.importData.model !== -1) {
        this.$store.dispatch('importComplete');
        this.$message({
          message: '数据导入完成',
          type: 'success',
        });
        this.$router.push('/dashboard');
      } else {
        this.$message({
          message: '请先选择模型',
          type: 'warning',
        });
      }
    },
    comeBack() {},
  },
};
</script>

<style lang="scss" scoped>
.import-container {
  @include flex-column;
}

.step {
  width: 90%;
  margin: auto;
}
</style>
