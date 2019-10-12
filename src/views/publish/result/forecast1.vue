<template>
  <div>
    <el-row class="title">
      <div class="dot"></div>
      <div>综合优化设计</div>
    </el-row>
    <el-row :gutter="19"
            class="limit-container">
      <el-col :span="8">
        <div class="limit-box">
          <el-col :span="12">
            <el-row>约束条件</el-row>
            <el-row v-for="(item,index) in limitList"
                    :key="index"
                    class="limit-item">
              <el-col>{{item}}</el-col>
              <el-col>
                <svg-icon icon-class="满足约束条件" />
              </el-col>
            </el-row>
          </el-col>
        </div>
      </el-col>
      <el-col :span="8">
        <el-row v-for="(item,index) in configList"
                :key="index"
                class="grid-content">
          <el-col>
            <svg-icon :icon-class="item.name" />
          </el-col>
          <el-col>
            <el-row> {{item.name}}</el-row>
            <el-row>{{item.source}}</el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="input-content">
          <el-row>说明</el-row>
          <el-row>{{introduce}}</el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="19"
            class="chart-container chart-1">
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="手扳极位" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="牵引功率" />
        </div>
      </el-col>
    </el-row>
    <move-train />
    <el-row :gutter="19"
            class="chart-container">
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="手扳极位" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <mzh-line title="牵引功率" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Line from '../components/line.vue';
import MovingTrain from '../components/movingTrain.vue';

export default {
  components: { 'mzh-line': Line, 'move-train': MovingTrain },
  data() {
    return {
      limitList: ['约束条件1', '约束条件2', '约束条件3'],
      configList: [
        {
          name: '储能',
          source: '360串*6并',
        },
        {
          name: '供电',
          source: '接收板',
        },
        {
          name: '牵引',
          source: 'n动配置',
        },
      ],
      introduce:
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 49px;
  font-size: 18px;
  font-weight: normal;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  padding: 12px 0;
  margin-bottom: 24px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;

  .dot {
    width: 6px;
    height: 6px;
    background: rgba(51, 51, 51, 1);
    border-radius: 50%;
    margin-right: 9px;
  }
}

.limit-container {
  height: 450px;
  margin-bottom: 20px;

  .el-col {
    height: 100%;
    padding: 0;
  }

  .limit-box {
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 20px 30px;
    text-align: left;

    .el-row:first-child {
      font-size: 24px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 30px;
    }

    .limit-item {
      display: flex;
      flex-direction: row;
      margin-bottom: 24px;
      font-weight: 400;
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
    }
  }

  .grid-content {
    height: 150px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 20px 30px;
    margin-bottom: 20px;
    display: flex;

    .svg-icon {
      @include set-size(90px);
    }

    .el-col:nth-child(1) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .el-col:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .el-row {
        display: flex;
        justify-content: flex-end;
        font-weight: 400;

        &:first-child {
          font-size: 24px;
          margin-bottom: 15px;
        }

        &:nth-child(2) {
          font-size: 30px;
        }
      }
    }
  }
}

.input-content {
  height: 450px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 20px 30px;
  text-align: left;

  .el-row:first-child {
    font-size: 24px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 30px;
  }

  .el-row:nth-child(2) {
    font-size: 18px;
    overflow-wrap: break-word;
  }
}

.chart-container {
  height: 318px;
  margin-top: 60px;

  &.chart-1 {
    margin-bottom: 103px;
  }

  .chart-box {
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 16px 16px 0;
  }
}
</style>
