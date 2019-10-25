<template>
  <el-row class="card-container"
          :class="this.$store.state.trainSelected===modelList.id? 'active': ''"
          @click.native="setChoice(modelList)">
    <el-row class="title">{{modelList.name}}</el-row>
    <el-tag v-if="modelList"
            size="small">推荐配置</el-tag>
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
            <span>{{modelList.model_configuration.ram}}</span>G
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
            <span>{{modelList.model_configuration.gpu}}</span>G
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-if="modelList.dataset"
              :span="24"
              class="content">
        <el-row>
          <div>数据量</div>
          <div>
            <span>{{modelList.dataset.line}}</span>条
          </div>
        </el-row>
        <el-row>
          <div>大小</div>
          <div>
            <span>{{unitConvert(modelList.dataset.size)}}</span>M
          </div>
        </el-row>
        <el-row>
          {{modelList.algorithm.frame_name}}
        </el-row>
      </el-col>

    </el-row>
    <el-row class="features">
      <img v-if="this.$store.state.trainSelected===modelList.id"
           src="@/assets/images/choiced.png">
      <!-- @click="setChoice(modelList.id)"> -->
      <div v-else
           :class="showChoice?'choice':''">
        <!-- @click="setChoice(modelList.id)"> -->
      </div>
    </el-row>
  </el-row>
</template>

<script>
export default {
  props: {
    modelList: {
      type: Object,
      default: () => {},
    },
    showChoice: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    setChoice(obj) {
      this.$emit('set-choice', obj);
    },
    unitConvert(data) {
      return (data / 1024 / 1024).toFixed(1);
    },
  },
};
</script>

<style scoped lang="scss">
.card-container {
  position: relative;
  width: 550px;
  margin: 16px 6px 0 0;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.6;
  z-index: 1;

  &:hover,
  &.active {
    opacity: 1;
    box-shadow: 0px 8px 6px 0px rgba(27, 22, 22, 0.2);
    border-bottom-left-radius: 0%;
    border-bottom-right-radius: 0%;
  }
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
  height: 30px;
  margin-top: 24px;
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
.choice {
  width: 32px;
  height: 30px;
  border: 1px solid rgba(227, 227, 227, 1);
  border-radius: 50%;
  box-sizing: border-box;
}
img {
  width: 32px;
  height: 32px;
}
.features {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9;
}
</style>
