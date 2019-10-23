<template>
  <el-container class="container">
    <el-row class="choice">请选择模型进行训练</el-row>
    <el-row class="data-choice">
      <div class="choice-content">
        <el-tabs v-model="databaseName"
                 @tab-click="chooseDatabase">
          <template v-for="(item,index) in dataBaseList">
            <el-tab-pane :key="index"
                         :label="item.name"
                         :name="item.name">
              <div class="total-num">共{{item.model_number}}个模型</div>
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
      <!-- <div class="total-num">共{{dataList[isActive-1].model_number}}个模型</div> -->
    </el-row>
    <!-- <ul v-for="(item, index) in  resource"
        :key="index">
      <li>CPU cores：{{item.needCores}}M/{{item.surplusCores}}M（所需/剩余）</li>
      <li>CPU Memory：{{item.needCpuMemory}}M/{{item.surplusCpuMemory}}M（所需/剩余）</li>
      <li>GPU Memory：{{item.needGpuMemory}}M/{{item.surplusGpuMemory}}M（所需/剩余）</li>
    </ul> -->
    <div class="model-case">
      <div v-for="(item,index) in modelDataList"
           :key="index"
           :class="(item.id===choiced)&&(index >= modelDataList.length-3)?
            'select-data model-data':'control-data model-data'">
        <control-model :modelList="item"
                       @set-choice="choose" />
        <div v-if="item.id===choiced"
             class="model-data">
          <div class="line"></div>
          <configuration class="configuration"
                         title="自定义配置"
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
      model: true,
      totalNum: 129,
      dataBaseList: [],
      databaseName: '',
      databaseId: '',
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
  },
  methods: {
    choose(item) {
      this.sliderList = [
        {
          title: '轮次',
          value: item.model_configuration.rounds,
          maxValue: 3000,
        },
        { title: '内存', value: item.model_configuration.ram, maxValue: 128 },
        { title: 'CPU', value: item.model_configuration.cpu, maxValue: 32 },
        { title: 'GPU', value: item.model_configuration.gpu, maxValue: 64 },
      ];
      if (this.$store.state.trainSelected !== item.id) {
        this.$store.commit('setRecord', {
          model_id: item.id,
          model_configuration: item.model_configuration,
        });
        this.$store.commit('setTrain', item.id);
        this.choiced = item.id;
      } else {
        this.$store.commit('setTrain', 0);
        this.choiced = 0;
      }
    },
    chooseDatabase() {
      this.dataBaseList.forEach((item) => {
        if (item.name === this.databaseName) {
          this.databaseId = item.id;
          this.getModelDataList();
        }
      });
    },
    getDataList() {
      this.$axios.get('/database/list').then((res) => {
        this.dataBaseList = res;
        this.databaseId = res[0].id;
        this.databaseName = res[0].name;
        this.getModelDataList();
      });
    },
    getModelDataList() {
      this.$axios
        .get(`/model/list?database_id=${this.databaseId}`)
        .then((res) => {
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
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 22px;
  line-height: 30px;

  .choice-content {
    @include box-center;
    justify-content: flex-start;
    width: 626px;
    // div:first-child {
    //   padding-right: 16px;
    // }

    /deep/ .el-tabs {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-tabs__item {
        font-size: 24px;
      }
    }
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
  margin-left: 50px;
}

ul {
  width: 98%;
  display: flex;
  justify-content: space-between;
  // margin: 25px 0 24px 0;
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

    .line {
      height: 1px;
      padding: 0 20px;
      background-color: #f2f2f2;
    }
  }
}
.configuration {
  position: absolute;
  z-index: 9999999;
  padding: 27px 20px 20px 20px;
  // border-top: 1px solid #f2f2f2;
  border-radius: 0 0 8px 8px;
}
.control-data {
  opacity: 0.8;
}
.select-data {
  opacity: 1;
  height: 455px;
}
</style>
