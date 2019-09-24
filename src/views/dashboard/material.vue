<template>
  <el-container>
    <el-aside width="63px">
      <aside-bar />
    </el-aside>
    <el-container class="main-continer">
      <el-main>
        <bread-crumb />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from '../../components/asideBar.vue';
import BreadCrumb from '../../components/breadCrumb.vue';

export default {
  components: { AsideBar, BreadCrumb },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  overflow-x: hidden;
}
.main-continer {
  background-color: rgb(242, 242, 242);
}
</style>
