<template>
  <el-container>
    <img src="@/assets/images/login.png" />
    <el-form ref="loginForm"
             :model="formData"
             :rules="rules">
      <el-form-item>
        <el-row class="title">新型供电列车</el-row>
        <el-row class="title sub">大数据运用支撑系统</el-row>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="formData.type">
          <el-option v-for="(item,index) in typeList"
                     :key="index"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
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
        <el-button type="primary"
                   @click="loginIn('loginForm')">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        type: '',
        name: '',
        password: '',
      },
      rules: {
        type: [{ required: true, message: '请选择系统', trigger: 'change' }],
        name: [{ required: true, message: '请输入账户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      typeList: [
        {
          name: '间歇式供电列车系统',
          id: 1,
        },
        {
          name: '非接触式供电列车系统',
          id: 2,
        },
      ],
    };
  },
  methods: {
    loginIn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sessionStorage.setItem('dataBaseId', this.formData.type);
          this.$store.commit('setUsername', this.formData.name);
          const date = new Date();
          const loginTime = localStorage.getItem('loginTime') || date;
          localStorage.setItem('showTime', loginTime); // 记录上次登录时间
          localStorage.setItem('loginTime', date);
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
  position: relative;
  overflow-x: hidden;

  .bg-img {
    @include set-size(100vh);
    object-fit: scale-down;
  }

  .title {
    color: #fff;
    font-size: 32px;
  }

  .sub {
    font-size: 48px;
    margin-top: 10px;
    margin-bottom: 80px;
  }

  form {
    position: absolute;
  }
}

.el-button {
  width: 100%;
}

.el-select {
  width: 100%;
}
</style>
