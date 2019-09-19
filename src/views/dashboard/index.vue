<template>
  <el-container>
    <el-aside>
      <aside-bar />
    </el-aside>
    <el-container class="main-continer">
      <el-header>
        <header-bar />
      </el-header>
      <el-main>
        <bread-crumb />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderBar from '../../components/headerBar.vue';
import AsideBar from '../../components/asideBar.vue';
import BreadCrumb from '../../components/breadCrumb.vue';

export default {
  components: { HeaderBar, AsideBar, BreadCrumb },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.main-continer {
  background-color: rgb(242, 242, 242);
}
</style>
