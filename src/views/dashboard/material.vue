<template>
  <el-container>
    <el-aside width="63px">
      <aside-bar />
    </el-aside>
    <el-container class="main-continer">
      <el-main v-if="update">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from '../../components/asideBar.vue';

export default {
  components: { AsideBar },
  data() {
    return {
      update: true,
    };
  },
  watch: {
    '$store.state.show': {
      handler() {
        this.update = false;
        this.$nextTick(() => {
          this.update = true;
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  overflow-x: hidden;
}

.el-main {
  padding: 0;
}

.main-continer {
  background-color: rgb(242, 242, 242);
}
</style>
