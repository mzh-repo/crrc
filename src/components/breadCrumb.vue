<template>
  <el-container>
    <el-breadcrumb separator=">">
      <template v-for="(item,index) in $route.matched">
        <el-breadcrumb-item :key="index"
                            :to="{path: item.path}">
          <span>{{ item.name }}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.el-container {
  height: 39px;
  margin: 37px auto 45px 40px;
}

.el-breadcrumb {
  font-size: 28px;
}

.el-breadcrumb__item {
  &:first-child {
    visibility: hidden;
  }
}
</style>
