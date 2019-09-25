<template>
  <el-container class="container">
    <div class="title-first">
      <div class="title-right">
        <span>选择数据集</span>
      </div>
    </div>
    <div class="title">
      <div class="title-left">
        <span>间歇式供电列车数据</span>
      </div>
    </div>
    <el-row :gutter="16">
      <!-- <template v-for="(item,index) in modelList"> -->
      <el-col>
        <div>
          <mzh-trainingData :dataList="modelList"
                            @set-choice="choose" />
        </div>
      </el-col>
      <!-- </template> -->
    </el-row>
    <div class="title">
      <div class="title-left">
        <span>间歇式供电列车数据</span>
      </div>
    </div>
    <el-row :gutter="16">
      <!-- <template v-for="(item,index) in modelList"> -->
      <el-col>
        <div>
          <mzh-trainingData :dataList="modelList" />
        </div>
      </el-col>
      <!-- </template> -->
    </el-row>
  </el-container>
</template>

<script>
import MzhtrainingData from '../../components/trainingData.vue';

export default {
  components: { 'mzh-trainingData': MzhtrainingData },
  data() {
    return {
      modelList: [
        {
          title: '非接触供电系统优化训练数据',
          totalNum: '777',
          size: '2222',
          features: 'xxx,xxx',
          choiced: false,
        },
        {
          title: '非接触供电系统优化训练数据',
          totalNum: '777',
          size: '2222',
          features: 'xxx,xxx',
          choiced: false,
        },
        {
          title: '非接触供电系统优化训练数据',
          totalNum: '777',
          size: '2222',
          features: 'xxx,xxx',
          choiced: false,
        },
        {
          title: '非接触供电系统优化训练数据',
          totalNum: '777',
          size: '2222',
          features: 'xxx,xxx',
          choiced: false,
        },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    choose(index) {
      this.modelList[index].choiced = !this.modelList[index].choiced;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 50px 70px 100px;
  width: 100%;
  height: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'PingFangSC-Regular', 'PingFangSC';
}

.title,
.title-first {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.title {
  margin: 20px 0 0;
}

// .title-left {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
// }

.title-left span:nth-child(1) {
  font-size: 27px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
}

.title-right span:nth-child(1) {
  font-size: 24px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 33px;
}

/deep/.el-col-6 {
  margin: 16px 0 0 0;
}
</style>
