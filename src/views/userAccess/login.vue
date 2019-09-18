<template>
  <el-container>
    <el-form ref="loginForm"
             :model="formData"
             :rules="rules">
      <el-form-item prop="name">
        <el-input v-model="formData.name"
                  placeholder="账户">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password"
                  placeholder="密码"
                  show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginIn('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        password: '',
      },
      rules: {
        name: [{ required: true, message: '请输入账户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    loginIn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push('/dashboard');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  @include set-size(100%);
  @include box-center;
}

.el-button {
  width: 100%;
}
</style>
