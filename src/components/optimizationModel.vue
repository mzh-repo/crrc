<template>
  <div class="optimziation-continue">
    <div class="optimization-continue">
      <div class="tag">
        <img :src="getUrl(optimziationList.algorithm.id)"
             alt="">
      </div>
      <el-row class="title">{{optimziationList.data.name}}</el-row>
      <el-row class="describe">适用数据集：{{describe}}</el-row>
      <el-row>
        <el-col :span="8"
                class="example">
          <div>最近实例Loss</div>
          <div>{{(optimziationList.latest_loss)}}</div>
        </el-col>
        <el-col :span="16"
                class="example">
          <div>平均实例Loss</div>
          <div>{{(optimziationList.average_loss)}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
                class="content">
          <el-row>
            <div>实例个数</div>
            <div>{{optimziationList.instance_number}}个</div>
          </el-row>
          <el-row>
            <div>大小</div>
            <div>{{(optimziationList.data.physical_size)}}MB</div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const img = new Map();
const imgUrl = [
  /* eslint-disable */
  require('../assets/images/tensorflow.png'),
  require('../assets/images/keras.png'),
  require('../assets/images/mklearn.png')
  /* eslint-enable */
];

imgUrl.forEach((item, index) => {
  img.set(index, item);
});
export default {
  props: {
    optimziationList: {
      type: Object,
      default: () => {},
    },
    describe: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    getUrl(type) {
      return img.get(type);
    },
  },
};
</script>

<style scoped lang="scss">
.optimziation-continue {
  display: flex;
}
.optimization-continue {
  position: relative;
  background: #fff;
  border-radius: 8px;
  margin: 16px 16px 0 0;
  padding: 15px 20px;
  width: 428px;
}

.tag {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 96px;
  height: 40px;
  img {
    max-width: 96px;
    max-height: 40px;
  }
}

.title {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 4px;
}

.describe {
  color: #666;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 18px;
}

.title,
.describe {
  display: flex;
}

.example {
  text-align: left;
  div:first-child {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  div:nth-child(2) {
    font-size: 32px;
    line-height: 38px;
    margin-bottom: 19px;
  }
}

.content {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  .el-row {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  .el-row:nth-child(2) {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    justify-content: flex-end;
  }
  .el-row div:first-child {
    margin-right: 22px;
  }
}
</style>
