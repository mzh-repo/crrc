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
    <div class="scroll">
      <div class="layout">
        <router-view ref="model" />
      </div>
    </div>
    <footer-bar v-if="newModel"
                :pre="showPre"
                :type="footerType"
                @handle-pre="handlePre"
                @next="next"
                @complete="complete" />
    <footer-bar v-if="modelReport"
                :type="footerType"
                @next="report" />
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
      if (path.indexOf('step2') > -1 || path.indexOf('Report') > -1) {
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
    modelReport() {
      const path = this.$route.fullPath;
      if (path.indexOf('chooseModel') > -1) {
        return true;
      }
      return false;
    },
  },

  mounted() {
    // 初始化选择数据集
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
      const data = this.$refs.model;
      if (this.active === 1) {
        if (data.name === '') {
          this.$message({
            message: '请输入模型名称',
            type: 'warning',
          });
        } else if (data.scene === '') {
          this.$message({
            message: '请输入适用场景',
            type: 'warning',
          });
        } else if (this.$store.state.basic.datasetId === '') {
          this.$message({
            message: '请选择数据集',
            type: 'warning',
          });
        } else if (data.input.length === 0) {
          this.$message({
            message: '请选择输入',
            type: 'warning',
          });
        } else {
          this.$store.commit('setBasic', {
            name: data.name,
            scene: data.scene,
            describe: data.describe,
            // dataChoose: this.$store.state.dataSelected,
            input: data.input,
            output: data.output,
          });
          this.$router.push('/createModel/step2');
        }
      } else if (this.active === 2) {
        if (this.$store.state.algorithm.id === '') {
          this.$message({
            message: '请选择算法',
            type: 'warning',
          });
        } else {
          this.$router.push('/createModel/step3');
        }
      }
    },
    complete() {
      const data = this.$refs.model;
      const modelData = {
        name: this.$store.state.basic.name,
        applicable_scene: this.$store.state.basic.scene,
        introduction: this.$store.state.basic.describe,
        dataset_id: this.$store.state.basic.datasetId,
        algorithm_id: this.$store.state.algorithm.id,
        model_configuration: {
          rounds: data.sliderList[0].value,
          ram: data.sliderList[1].value,
          cpu: data.sliderList[2].value,
          gpu: data.sliderList[3].value,
        },
      };
      this.$axios.post('/model', modelData).then(() => {
        this.$message({
          message: '创建成功',
          type: 'success',
        });
        this.$store.commit('setBasic', {
          name: '',
          scene: '',
          describe: '',
          datasetId: '',
          datasetName: '',
          input: '',
          output: '',
        });
        this.$router.push('/chooseModel');
      });
    },
    report() {
      this.$router.push('/modelReport');
    },
  },
};
</script>

<style lang="scss" scoped>
.model-container {
  @include flex-column;
  position: relative;
}

.step {
  padding: 0 20px;
  width: 50%;
  margin: 0 auto;
}

.create {
  width: 90%;
}

.scroll {
  overflow-y: auto;
  width: 100%;
}

.layout {
  padding: 0px 70px 100px 70px;
}
</style>
