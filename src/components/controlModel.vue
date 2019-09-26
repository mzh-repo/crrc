<template>
  <div class="model-contrain">
    <div v-for="(item,index) in modelList"
         :key="index"
         class="continer">
      <el-row class="title">{{item.title}}</el-row>
      <el-tag size="small">推荐配置</el-tag>
      <div v-if="item.newTab"
           class="tab">新</div>
      <el-row>
        <el-col :span="24"
                class="configuration">
          <el-row>
            <div>轮次</div>
            <div>
              <span>{{item.rotation}}</span>次
            </div>
          </el-row>
          <el-row>
            <div>内存</div>
            <div>
              <span>{{item.memory}}</span>M
            </div>
          </el-row>
          <el-row>
            <div>CPU</div>
            <div>
              <span>{{item.CPU}}</span>个
            </div>
          </el-row>
          <el-row>
            <div>GPU</div>
            <div>
              <span>{{item.GPU}}</span>M
            </div>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
                class="content">
          <el-row>
            <div>数据量</div>
            <div>
              <span>{{item.dataVolume}}</span>M
            </div>
          </el-row>
          <el-row>
            <div>大小</div>
            <div>
              <span>{{(item.size).toFixed(1)}}</span>M
            </div>
          </el-row>
          <el-row>
            {{item.founder}}
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
      type: Array,
      default: () => [
        {
          title: '车载储能系统性能劣化条件下的列车运行控制模型',
          rotation: 8,
          memory: 12,
          CPU: 3,
          GPU: 24,
          dataVolume: 123,
          founder: '12',
          size: 2,
        },
      ],
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.model-contrain {
  display: flex;
}
.continer {
  position: relative;
  width: 508px;
  margin: 16px 16px 0 0;
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
