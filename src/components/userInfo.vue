<template>
  <el-container>
    <el-row>
      <img :src="avatarUrl" />
    </el-row>
    <el-row class="user">
      {{this.$store.state.username||'admin'}}
    </el-row>
    <el-row class="login-time">
      上次登录: {{loginTime}}
    </el-row>
    <el-row>
      <el-col v-for="(item,index) in staticData"
              :key="index"
              :span="8">
        <el-row class="number">{{item.number}}</el-row>
        <el-row class="title">{{item.title}}</el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-row class="tips">流程步骤说明</el-row>
      <el-row class="step-box">
        <mzh-step />
      </el-row>
    </el-row>
    <el-row>
      <el-row class="tips">历史操作</el-row>
      <el-row class="line"></el-row>
      <el-row v-for="(item,index) in historyList"
              :key="index"
              class="history-box">
        <el-col>{{item.type===2?'添加模型':'添加训练'}}</el-col>
        <el-col>{{item.time}}天前</el-col>
      </el-row>
    </el-row>
  </el-container>
</template>

<script>
import Mzhstep from './step.vue';

export default {
  components: { 'mzh-step': Mzhstep },
  data() {
    return {
      userName: 'Admin',
      loginTime: '2019/12/08 19:00:05',
      avatarUrl:
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      staticData: [
        { title: '训练次数', number: 12 },
        { title: '部署次数', number: 20 },
        { title: '模型总数', number: 8 },
      ],
      historyList: [
        {
          name: '添加模型',
          time: '1天前',
        },
        {
          name: '添加模型',
          time: '2天前',
        },

        {
          name: '添加模型',
          time: '3天前',
        },
        {
          name: '添加模型',
          time: '4天前',
        },
      ],
    };
  },
  mounted() {
    this.getStatistics();
    this.getHistoryList();
  },
  methods: {
    getStatistics() {
      this.$axios.get('statistics').then((res) => {
        this.staticData[0].number = res.training_number;
        this.staticData[1].number = res.deployment_number;
        this.staticData[2].number = res.model_number;
      });
    },
    getHistoryList() {
      this.$axios.get('log/list').then((res) => {
        this.historyList = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  @include set-size(100%);
  display: flex;
  flex-direction: column;
}

img {
  @include set-size(97px);
  border-radius: 50%;
  margin: 31px auto 16px;
}

.user {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 7px;
}

.login-time {
  font-size: 14px;
  font-weight: 400;
  color: #999;
  margin-bottom: 25px;
}

.number {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
}

.title {
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin-bottom: 57px;
}

.tips {
  font-weight: 500;
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  margin-left: 20px;
  text-align: left;
}

.step-box {
  width: 80%;
  height: 320px;
  // background: rgba(216, 216, 216, 1);
  margin-left: 20px;
  margin-bottom: 22px;
}

.line {
  margin-left: 20px;
  width: 80%;
  height: 1px;
  background: rgba(221, 221, 221, 1);
  margin-bottom: 16px;
}

.history-box {
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
  margin-bottom: 11px;

  .el-col:first-child {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
  }
}
</style>
