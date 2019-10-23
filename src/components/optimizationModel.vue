<template>
  <div class="optimziation-continue">
    <div class="optimization-continue">
      <div v-if="optimziationList.algorithm"
           class="tag">
        <img :src="getUrl(optimziationList.algorithm.id)"
             alt="">
      </div>
      <el-row class="title">{{optimziationList.name}}</el-row>
      <el-row v-if="optimziationList.dataset"
              class="describe">适用数据集：{{optimziationList.dataset.name}}</el-row>
      <el-row>
        <el-col :span="8"
                class="example">
          <div>最近训练Loss</div>
          <div>{{(optimziationList.latest_loss)}}</div>
        </el-col>
        <el-col :span="16"
                class="example">
          <div>平均训练Loss</div>
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
          <el-row v-if="optimziationList.dataset">
            <div>大小</div>
            <div>{{unitConvert(optimziationList.dataset.size)}}MB</div>
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
  require('../assets/images/mklearn.png'),
  require('../assets/images/keras.png'),
  require('../assets/images/tensorflow.png')

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
    unitConvert(data) {
      return (data / 1024 / 1024).toFixed(1);
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
  padding: 15px 10px;
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
  margin-bottom: 20px;
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
  justify-content: flex-start;
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
    margin-left: 30px;
    justify-content: flex-end;
  }
  .el-row div:first-child {
    margin-right: 22px;
  }
}
</style>
