<template>
  <el-header>
    <el-col :span="12">
      <el-row>{{userName}}</el-row>
      <el-row>上次登录: {{loginTime}}</el-row>
    </el-col>
    <el-col :span="12"
            class="avatar">
      <img :src="avatarUrl" />
    </el-col>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      userName: 'Admin',
      loginTime: '2019/12/08 19:00:05',
      avatarUrl:
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
    };
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  margin-top: 20px;
}

.el-row {
  display: flex;
  justify-content: flex-start;
}

.avatar {
  display: flex;
  justify-content: flex-end;
}

img {
  @include set-size(40px);
  border-radius: 50%;
}
</style>
