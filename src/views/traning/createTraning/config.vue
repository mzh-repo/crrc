<template>
  <el-container class="container">
    <el-row class="choice">请选择数据进行训练</el-row>
    <el-row class="data-choice">
      <div v-for="(data,index) in dataList"
           :key="index"
           :class="{active:index==(isActive-1) }"
           @click="check(index)">
        <div>{{data.name}}</div>
      </div>
      <div class="total-num">共{{totalNum}}条</div>
    </el-row>
    <ul v-for="(item, index) in  resource"
        :key="index">
      <li>CPU cores：{{item.needCores}}M/{{item.surplusCores}}M（所需/剩余）</li>
      <li>CPU Memory：{{item.needCpuMemory}}M/{{item.surplusCpuMemory}}M（所需/剩余）</li>
      <li>GPU Memory：{{item.needGpuMemory}}M/{{item.surplusGpuMemory}}M（所需/剩余）</li>
    </ul>
    <div class="model-case">
      <div v-for="(item,index) in modelDataList"
           :key="index"
           class="model-data"
           :class="item.selected? 'select-data':'control-data'">
        <control-model :modelList="item"
                       @set-choice="(index) => choose(index, item)" />
        <div v-if="item.id===choiced"
             class="model-data">
          <configuration class="configuration"
                         :sliderList="sliderList" />
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import ControlModel from '../../../components/controlModel.vue';
import Configuration from '../../../components/configuration.vue';

export default {
  components: { ControlModel, Configuration },

  data() {
    return {
      dataList: [],
      model: true,
      isActive: 1,
      totalNum: 129,
      resource: [
        {
          needCores: 56,
          surplusCores: 178,
          needCpuMemory: 56,
          surplusCpuMemory: 178,
          needGpuMemory: 56,
          surplusGpuMemory: 178,
        },
      ],
      sliderList: [],
      tabId: 0,
      modelDataList: [],
      choiced: 0,
      record: {},
    };
  },

  mounted() {
    if (this.$store.state.dataSelected) {
      this.dataList.forEach((item, num) => {
        if (this.$store.state.dataSelected === item.id) {
          this.dataList[num].choiced = true;
        }
      });
    }
    this.getDataList();
    this.getModelDataList();
  },
  methods: {
    choose(index, item) {
      this.sliderList = [
        {
          title: '轮次',
          value: item.model_configuration.rounds,
          maxValue: 100,
        },
        { title: '内存', value: item.model_configuration.ram, maxValue: 200 },
        { title: 'CPU', value: item.model_configuration.cpu, maxValue: 300 },
        { title: 'GPU', value: item.model_configuration.gpu, maxValue: 400 },
      ];
      if (this.$store.state.trainSelected !== index) {
        this.$store.commit('setRecord', {
          model_id: item.id,
          model_configuration: item.model_configuration,
        });
        this.$store.commit('setTrain', index);
        this.choiced = index;
      } else {
        this.$store.commit('setTrain', 0);
        this.choiced = 0;
      }
    },
    check(index) {
      this.isActive = index + 1;
      this.tabId = index;
      this.getModelDataList();
    },
    getDataList() {
      this.$axios.get('/database/list').then((res) => {
        this.dataList = res;
      });
    },
    getModelDataList() {
      this.$axios.get(`/model/list?database_id=${this.isActive}`).then((res) => {
        this.modelDataList = res;
        if (this.modelDataList.length !== 0) {
          this.$store.commit('setRecord', {
            model_id: this.modelDataList[0].id,
            model_configuration: this.modelDataList[0].model_configuration,
          });
        }
        // [this.modelData] = this.modelDataList;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @include flex-column;
  height: auto;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 33px 103px 0 70px;
  font-size: 22px;
  line-height: 30px;
  box-sizing: border-box;
}
.choice {
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 33px;
  color: #666;
}
.data-choice {
  @include box-center;
  font-size: 22px;
  line-height: 30px;
  cursor: pointer;
  div {
    padding-right: 16px;
  }
}
.active {
  font-size: 28px;
  line-height: 40px;
}
.total-num {
  color: #999;
  font-size: 18px;
  line-height: 25px;
}
ul {
  width: 98%;
  display: flex;
  justify-content: space-between;
  margin: 25px 0 24px 0;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  padding-top: 13px;
  padding-bottom: 13px;
  font-size: 13px;
  line-height: 25px;
}
.model-case {
  width: 100%;
  margin-bottom: 107px;
  .model-data {
    float: left;
    word-wrap: break-word;
    word-break: normal;
    position: relative;
    opacity: 1;
  }
}
.configuration {
  position: absolute;
  z-index: 9999999;
  padding: 27px 20px 20px 20px;
  border-top: 1px solid #f2f2f2;
  border-radius: 0 0 8px 8px;
}
.control-data {
  opacity: 0.8;
}
.select-data {
  opacity: 1;
}
</style>
