<template>
  <el-container>
    <el-row class="logo">
      <svg-icon icon-class="中车" />
      <svg-icon icon-class="浙江大学" />
    </el-row>
    <el-menu router
             @select="handleSelect">
      <template v-for="(menu, index) in routerList">
        <template v-if="index < 4">
          <el-menu-item :index="menu.path"
                        :key="menu.name"
                        @click="showMy">
            <svg-icon :icon-class="selectItem === menu.path ? menu.selectIcon : menu.name" />
          </el-menu-item>
        </template>
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
  mounted() {
    this.selectItem = this.$router.options.routes[0].children[0].path;
  },
  methods: {
    handleSelect(e) {
      this.selectItem = e;
      this.$router.replace(e);
    },
    showMy() {
      this.$store.commit('setShow');
    },
  },
  watch: {
    '$route.path': {
      handler() {
        this.selectItem = this.$route.matched[1].path;
      },
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
    @include set-size(30px);

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
