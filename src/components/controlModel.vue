<template>
  <div class="model-contrain">
    <div class="continer">
      <el-row class="title">{{modelList.name}}</el-row>
      <el-tag size="small">推荐配置</el-tag>
      <div v-if="modelList.newTab"
           class="tab">新</div>
      <el-row>
        <el-col v-if="modelList.model_configuration"
                :span="24"
                class="configuration">
          <el-row>
            <div>轮次</div>
            <div>
              <span>{{modelList.model_configuration.rounds}}</span>次
            </div>
          </el-row>
          <el-row>
            <div>内存</div>
            <div>
              <span>{{modelList.model_configuration.ram}}</span>M
            </div>
          </el-row>
          <el-row>
            <div>CPU</div>
            <div>
              <span>{{modelList.model_configuration.cpu}}</span>个
            </div>
          </el-row>
          <el-row>
            <div>GPU</div>
            <div>
              <span>{{modelList.model_configuration.gpu}}</span>M
            </div>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="modelList.data"
                :span="24"
                class="content">
          <el-row>
            <div>数据量</div>
            <div>
              <span>{{modelList.data.total_data}}</span>M
            </div>
          </el-row>
          <el-row>
            <div>大小</div>
            <div>
              <span>{{(modelList.data.physical_size).toFixed(1)}}</span>M
            </div>
          </el-row>
          <el-row>
            {{modelList.algorithm.name}}
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.continer {
  position: relative;
  width: 508px;
  margin: 16px 6px 0 0;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
}
.el-tag {
  float: left;
  margin: 10px 0;
}
.title {
  display: flex;
  font-size: 20px;
  line-height: 28px;
}
.configuration {
  display: flex;
  justify-content: space-between;
  div {
    font-size: 12px;
    line-height: 17px;
  }
  span {
    padding-right: 4px;
    font-size: 24px;
    line-height: 28px;
  }
}
.tab {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #f86b6b;
  font-size: 13px;
  color: #fff;
  line-height: 24px;
}
.content {
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  font-size: 14px;
  span {
    padding-right: 4px;
  }
  .el-row {
    display: flex;
    align-items: center;
    div:first-child {
      margin-right: 16px;
    }
  }
}
</style>
