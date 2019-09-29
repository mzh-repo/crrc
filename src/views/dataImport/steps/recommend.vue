<template>
  <el-container class="recommend-container">
    <div class="title-line">
      <div class="title-left">推荐模型</div>
      <div class="title-right">请选择最合适的一个或多个模型</div>
    </div>
    <div class="card-wrap">
      <el-card v-for="(item,index) in cardList"
               :key="index"
               :class="index===chooseIndex?'active':'disable'"
               @click.native="handleClickCard(index)">
        <div class="item-title">{{item.title}}</div>
        <div class="item-scenarios">适用场景：{{item.scenarios}}</div>
        <div class="item-scenarios">部署实例总次数：{{item.times}}次</div>
        <div class="item-scenarios">使用框架：{{item.frame}}</div>
        <configuration title="请选择推荐配置"
                       style="margin-top:23px;"
                       :sliderList="item.itemList" />
      </el-card>
    </div>
  </el-container>
</template>


<script>
import Configuration from '../../../components/configuration.vue';

export default {
  components: { Configuration },
  data() {
    return {
      chooseIndex: -1,
      cardList: [
        {
          title: '车载储能系统性能劣化条件下的列车运行控制模型A',
          scenarios: '列车运行控制',
          times: 188,
          frame: 'TensorFlow',
          itemList: [
            { title: '轮次\n(次)', value: 24, maxValue: 200 },
            { title: '内存\n(M)', value: 2048, maxValue: 30720 },
            { title: 'CPU\n(core)', value: 4, maxValue: 64 },
            { title: 'GPU\n(M)', value: 1024, maxValue: 12288 },
          ],
        },
        {
          title: '车载储能系统性能劣化条件下的列车运行控制模型B',
          scenarios: '列车运行控制',
          times: 156,
          frame: 'Keras',
          itemList: [
            { title: '轮次\n(次)', value: 24, maxValue: 200 },
            { title: '内存\n(M)', value: 2048, maxValue: 30720 },
            { title: 'CPU\n(core)', value: 4, maxValue: 64 },
            { title: 'GPU\n(M)', value: 1024, maxValue: 12288 },
          ],
        },
        {
          title: '车载储能系统性能劣化条件下的列车运行控制模型C',
          scenarios: '列车运行控制',
          times: 133,
          frame: 'mklearn',
          itemList: [
            { title: '轮次\n(次)', value: 24, maxValue: 200 },
            { title: '内存\n(M)', value: 2048, maxValue: 30720 },
            { title: 'CPU\n(core)', value: 4, maxValue: 64 },
            { title: 'GPU\n(M)', value: 1024, maxValue: 12288 },
          ],
        },
      ],
      model: '',
    };
  },
  mounted() {
    // TODO dataInit
    this.$axios.get().then(res => res);
  },
  methods: {
    handleClickCard(index) {
      if (this.chooseIndex === index) {
        this.chooseIndex = -1;
      } else {
        this.chooseIndex = index;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item-title {
  color: #333;
  font-size: 20px;
  margin-bottom: 14px;
}

.item-scenarios {
  color: #666;
  font-size: 16px;
  margin-bottom: 10px;
}

.recommend-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  align-items: flex-start;
}

.title-line {
  margin-top: 58px;
  margin-bottom: 32px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.title-left {
  color: #666;
  font-size: 24px;
}

.title-right {
  color: #333;
  font-size: 18px;
}

.card-wrap {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  margin-bottom: 100px;
}

.el-card {
  margin: 6px;
  width: 536px;
  height: 390px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: start;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.active {
  opacity: 1;
}

.disable {
  opacity: 0.5;
}
</style>
