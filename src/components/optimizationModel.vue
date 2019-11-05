<template>
  <!-- <div class="optimziation-continue"> -->
  <div class="optimization-continue">
    <div class="tag">
      <img :src="getUrl(optimziationList.algorithm.id)"
           alt="">
      <!-- <img :src="getUrl(optimziationList.algorithm.id)"
             alt=""> -->
      <!-- <img src="@/assets/images/choiced.png" /> -->
    </div>
    <el-row class="title">
      <el-col>{{optimziationList.name}}</el-col>
      <el-col>id: {{optimziationList.id}}</el-col>
    </el-row>
    <!-- <el-row class="title">{{optimziationList.name}}</el-row> -->
    <el-row v-if="optimziationList.dataset"
            class="describe">适用数据集：{{optimziationList.dataset.name}}</el-row>
    <el-row>
      <el-col :span="8"
              class="example">
        <div>最近训练Loss</div>
        <div>{{(Math.floor(optimziationList.latest_loss*100)/100)}}</div>
      </el-col>
      <el-col :span="16"
              class="example">
        <div>平均训练Loss</div>
        <div>{{(Math.floor(optimziationList.average_loss*100)/100)}}</div>
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
        <el-row v-if="showChoice">
          <img v-if="this.$store.state.modelSelected.index === optimziationList.id"
               src="@/assets/images/choiced.png" />
          <div v-else
               class="choice"></div>
        </el-row>
      </el-col>
    </el-row>
  </div>
  <!-- </div> -->
</template>

<script>
const img = new Map();
const imgUrl = [
  /* eslint-disable */
  // require('../assets/images/sklearn.png'),
  require('../assets/images/keras.png'),
  require('../assets/images/tensorflow.png'),
  require('../assets/images/sklearn.png'),
  require('../assets/images/keras.png')
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
    showChoice: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    getUrl(type) {
      return img.get(type - 1);
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

// .tag {
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   z-index: 9;

//   // img {
//   //   max-width: 96px;
//   //   max-height: 40px;
//   // }
// }

.tag {
  position: absolute;
  top: 10px;
  right: 15px;
  width: 96px;
  height: 40px;
  img {
    max-width: 96px;
    max-height: 40px;
  }
}

.choice {
  width: 34px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(227, 227, 227, 1);
}

.title {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 20px;

  .el-col {
    text-align: left;

    &:first-child {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.describe {
  color: #666;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
    margin-bottom: 9px;
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
    // margin-left: 30px;
    // justify-content: flex-end;
  }

  .el-row:nth-child(3) {
    display: flex;
    margin-bottom: 4px;
    justify-content: flex-end;

    img {
      width: 34px;
      height: 34px;
      margin-right: 22px;
    }
  }

  .el-row div:first-child {
    margin-right: 22px;
  }
}
</style>
