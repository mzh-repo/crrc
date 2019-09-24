<template>
  <el-container>
    <el-row class="logo">
      <svg-icon icon-class="中车"></svg-icon>
      <svg-icon icon-class="浙江大学"></svg-icon>
    </el-row>
    <el-menu router
             :default-active="activeMenu"
             @select="handleSelect">
      <template v-for="menu in routerList">
        <el-menu-item :index="menu.path"
                      :key="menu.name">
          <svg-icon :icon-class="selectItem === menu.path ? menu.selectIcon: menu.name"></svg-icon>
        </el-menu-item>
      </template>
    </el-menu>

  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectItem: '',
      routerList: this.$router.options.routes[0].children,
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  mounted() {},
  methods: {
    handleSelect(e) {
      this.selectItem = e;
      this.$router.replace(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  background-color: #242424;
  @include flex-column;
  justify-content: center;
  position: relative;
}

.logo {
  @include flex-column;
  position: absolute;
  top: 16px;
  width: 100%;

  svg {
    margin: auto;

    &:first-child {
      margin-bottom: 20px;
    }
  }
}

.el-menu {
  background-color: #242424;
  border-right: 0;

  .el-menu-item {
    padding: 0 !important;

    &:hover,
    &:focus {
      background-color: #242424;
    }
    svg {
      @include set-size(48px);
    }
  }
}

span {
  color: #fff;
}

.el-button {
  background-color: $primary-color;
  width: 80%;
  margin: auto;
  color: #fff;
  margin-bottom: 50px;
}
</style>
