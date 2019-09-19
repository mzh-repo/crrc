<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <template v-for="(item,index) in $route.matched">
      <el-breadcrumb-item :key="index"
                          :to="{path: item.path}">
        <span>{{ item.name }}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
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
.el-breadcrumb__item:first-child {
  visibility: hidden;
}
</style>
