<template>
  <div class="main">
    <el-row class="title">
      请选择算法
    </el-row>
    <el-row v-for="(item,index) in algorithmList"
            :key="index"
            class="algorithm-container">
      <el-col :span="9"
              class="box">
        <el-row>{{item.name}}</el-row>
        <el-row>模型: {{item.model}}</el-row>
        <el-row>适用问题: {{item.suit}}</el-row>
        <el-row>使用框架: {{item.frame}}</el-row>
      </el-col>
      <el-col :span="12"
              class="model">
        <el-row>
          相关模型
        </el-row>
        <el-row :gutter="16">
          <el-col v-for="obj in item.modelList"
                  :key="obj"
                  :span="12">
            <optimize :optimziationList="obj"
                      class="model-example" />
          </el-col>
        </el-row>
      </el-col>
      <el-col class="choose"
              @click.native="setChoice(index)">
        <img v-if="item.choiced"
             src="@/assets/images/choiced.png">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Optimize from '@/components/optimizationModel.vue';

export default {
  components: { Optimize },
  data() {
    return {
      algorithmList: [
        {
          choiced: false,
          name: '深度全链接神经网络',
          model: 'Fully Connected Neural Network',
          suit: '系统优化',
          frame: 'keras/ttn',
          modelList: [
            {
              title: '储能系统优化模型',
              describe: '适用数据集：间歇式供电列车行车数据集',
              lately_loss: '0.1',
              average_loss: '0.3',
              exampleNum: 80,
              size: 34.2,
            },
            {
              title: '储能系统优化模型',
              describe: '适用数据集：间歇式供电列车行车数据集',
              lately_loss: '0.1',
              average_loss: '0.3',
              exampleNum: 80,
              size: 34.2,
            },
          ],
        },
        {
          choiced: false,
          name: '深度全链接神经网络',
          model: 'Fully Connected Neural Network',
          suit: '系统优化',
          frame: 'keras/ttn',
          modelList: [
            {
              title: '储能系统优化模型',
              describe: '适用数据集：间歇式供电列车行车数据集',
              lately_loss: '0.1',
              average_loss: '0.3',
              exampleNum: 80,
              size: 34.2,
            },
            {
              title: '储能系统优化模型',
              describe: '适用数据集：间歇式供电列车行车数据集',
              lately_loss: '0.1',
              average_loss: '0.3',
              exampleNum: 80,
              size: 34.2,
            },
          ],
        },
      ],
    };
  },
  methods: {
    setChoice(index) {
      this.algorithmList[`${index}`].choiced = !this.algorithmList[`${index}`]
        .choiced;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include flex-column;
}

.title {
  text-align: left;
  font-size: 24px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.algorithm-container {
  height: 320px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  position: relative;
  margin: 16px 0;
  padding: 29px 22px;
  @include flex-row;

  .box {
    @include flex-column;
    text-align: left;
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);

    .el-row {
      margin-bottom: 20px;

      &:first-child {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 38px;
      }
    }
  }
}

.model {
  .el-row:first-child {
    text-align: left;
    font-size: 22px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 16px;
  }
}

.model-example {
  border-radius: 8px;
  border: 1px solid rgba(216, 216, 216, 1);
}

.choose {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(227, 227, 227, 1);
  border-radius: 50%;
  box-sizing: border-box;
  position: absolute;
  bottom: 22px;
  right: 22px;
}

img {
  @include set-size(100%);
}
</style>
