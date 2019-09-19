<template>
  <el-container>
    <el-row>
      <img src="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg" />
    </el-row>
    <el-menu router
             :collapse="isCollapse"
             :collapse-transition="false"
             :default-active="activeMenu">
      <template v-for="menu in routerList">
        <template v-if="menu.children">
          <el-submenu :index="menu.path"
                      :key="menu.name">
            <template slot="title">
              <svg-icon :icon-class="menu.icon"></svg-icon>
              <span>{{menu.name}}</span>
            </template>
            <template v-for="submenu in menu.children">
              <el-menu-item :index="menu.path + '/' +submenu.path"
                            :key="submenu.name">
                {{submenu.name}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="menu.path"
                        :key="menu.name">
            <svg-icon :icon-class="menu.icon"></svg-icon>
            <span slot="title">{{menu.name}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <el-button @click="logout">退出登录</el-button>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
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
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
  mounted() {},
  methods: {
    logout() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  background-color: $primary-color;
  display: flex;
  flex-direction: column;

  img {
    width: 30px;
    height: 40px;
    padding: 30px;
  }
}

.el-menu {
  background-color: $primary-color;
  border-right: 0;
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
