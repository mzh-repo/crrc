<template>
  <el-container class="traning-container">
    <el-row>
      <bread-crumb />
    </el-row>
    <el-row class="step">
      <step-bar :active="active"
                :stepList="stepList" />
    </el-row>
    <div class="scroll">
      <router-view />
    </div>
    <footer-bar v-if="active!==4"
                :type="type"
                :pre="pre"
                @next="next"
                @handle-pre="prev" />
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
      stepList: ['选择数据集', '模型选择', '实例选择', '部署与预测'],
      type: 'next',
      pre: false,
    };
  },
  mounted() {
    if (this.$route.path === '/modelPublish') {
      this.$store.commit('selectData', '');
      this.$store.commit('selectModel', '');
      this.$store.commit('selectExample', '');
      this.active = 1;
    } else if (this.$route.path === '/modelPublish/exampleSelect') {
      this.active = 3;
    } else if (this.$route.path === '/modelPublish/selectModel') {
      this.active = 2;
    } else if (this.$route.path === '/modelPublish/modelPublishForecast') {
      this.active = 4;
    }
  },
  methods: {
    next() {
      if (
        (this.$route.path === '/modelPublish'
          && this.$store.state.dataSelected)
        || (this.$route.path === '/modelPublish/exampleSelect'
          && this.$store.state.exampleSelected.index)
        || (this.$route.path === '/modelPublish/selectModel'
          && this.$store.state.modelSelected.index)
      ) {
        this.active += 1;
        this.$store.commit('setPublishActive', this.active);
      }
    },
    prev() {
      this.active -= 1;
      this.$store.commit('setPublishActive', this.active);
    },
  },
  watch: {
    active() {
      if (this.active === 1) {
        this.$router.push({ path: '/modelPublish' });
        this.pre = false;
        this.type = 'next';
      } else if (this.active === 2) {
        this.$router.push({ path: '/modelPublish/selectModel' });
        this.pre = true;
        this.type = 'next';
      } else if (this.active === 3) {
        this.$router.push({ path: '/modelPublish/exampleSelect' });
        this.pre = true;
        this.type = 'next';
      } else if (this.active === 4) {
        this.$router.push({ path: '/modelPublish/modelPublishForecast' });
        this.pre = true;
        this.type = 'complate';
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
  display: flex;
  flex-direction: column;
  position: relative;
}
.step {
  width: 90%;
  margin: 0 auto;
}

.scroll {
  overflow-y: scroll;
  width: 100%;
}
</style>
