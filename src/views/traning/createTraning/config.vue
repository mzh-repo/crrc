<template>
  <el-container class="container">
    <el-row class="choice">请选择数据进行训练</el-row>
    <el-row class="data-choice">
      <div v-for="(data,index) in dataList"
           :key="index"
           :class="{active:index==isActive }"
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
      <div class="model-data">
        <control-model :modelList="modelData" />
        <configuration class="configuration" />
      </div>
      <div v-for="(item,index) in modelDataList"
           :key="index"
           class="model-data"
           :class="item.selected? 'select-data':'control-data'"
           @click="setSelect(index)">
        <control-model :modelList="item" />
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
      isActive: 0,
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
      tabId: 0,
      modelData: {},
      modelDataList: [
        // {
        //   id: 1,
        //   name: 'test',
        //   data: {
        //     total_data: 100,
        //     physical_size: 100,
        //   },
        //   model_configuration: {
        //     rounds: 8,
        //     ram: 12,
        //     cpu: 3,
        //     gpu: 4,
        //   },
        //   algorithm: {
        //     name: 'test',
        //   },
        // },
      ],
    };
  },
  created() {
    this.getDataList();
    this.getModelDataList();
  },
  methods: {
    check(index) {
      this.isActive = index;
      this.tabId = index;
      this.getModelDataList();
    },
    setSelect(index) {
      this.modelDataList.forEach((item, i) => {
        this.modelDataList[i].selected = false;
        if (index === i) {
          this.modelDataList[i].selected = true;
        }
      });
    },
    getDataList() {
      this.$axios.get('/database/list').then((res) => {
        this.dataList = res;
      });
    },
    getModelDataList() {
      this.$axios.get('/model/list').then((res) => {
        this.modelDataList = res[this.tabId].model_info_list;
        [this.modelData] = this.modelDataList;
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
  }
}
.configuration {
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
