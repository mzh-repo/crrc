<template>
  <div class="box">
    <div class="title">{{title}}</div>
    <el-row type="flex"
            align="middle"
            v-for="(item,index) in sliderList"
            :key="index">
      <el-col :span="2"
              class="label">
        <span class="demonstration">{{item.title}}</span>
      </el-col>
      <el-col :span="20">
        <el-slider v-model="item.value"
                   :max="item.maxValue"
                   show-input>
        </el-slider>
      </el-col>
      <el-col :span="2">
        <span>{{unitList[index]}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '配置',
    },
    sliderList: {
      type: Array,
      default: () => [
        {
          title: '轮次',
          value: 0,
          maxValue: 100,
        },
        {
          title: '内存',
          value: 0,
          maxValue: 200,
        },
        {
          title: 'CPU',
          value: 0,
          maxValue: 300,
        },
        {
          title: 'GPU',
          value: 0,
          maxValue: 400,
        },
      ],
    },
  },
  data() {
    return {
      // value1: 0,
      // value2: 0,
      // value3: 0,
      // value4: 0,
      unitList: ['次', 'G', 'core', 'G'],
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.box {
  width: 510px;
  height: 190px;
  background-color: #fff;
}

.title {
  text-align: start;
  font-size: 16px;
  font-family: '微软雅黑', 'PingFangSC-Regular', 'PingFangSC';
  font-weight: 400;
  color: #333;
  margin-bottom: 5px;
}

.label {
  margin-right: 20px;
  min-width: 40px;
}

.demonstration {
  font-size: 14px;
  color: #333;
  font-family: '微软雅黑', 'PingFangSC-Regular', 'PingFangSC';
  font-weight: 400;
}

.el-row {
  margin-bottom: 8px;

  .el-col:last-child {
    margin-left: 10px;
    font-size: 12px;
  }
}

/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  border: none;
  background: #fff;
  width: 20px;
}

/deep/.el-input-number__increase {
  border-radius: 0 6px 6px 0;
}

/deep/.el-input-number__decrease {
  border-radius: 6px 0 0 6px;
}

/deep/.el-input__inner {
  height: 24px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
  color: #333;
  border-radius: 6px;
  border: solid 1px #d5d5d5;
}

/deep/.el-slider__input {
  width: 80px;
  margin-top: 5px;
}

/deep/.el-slider__runway.show-input {
  margin-right: 100px;
}

/deep/.el-slider__button {
  width: 10px;
  height: 10px;
  border: 6px solid #fff;
  background-color: #00c4c0;
  box-shadow: 0px 4px 7px 0px rgba(0, 196, 192, 0.22);
}

/deep/.el-input-number--small {
  line-height: 22px;
}

/deep/.el-slider__bar {
  height: 4px;
  background-color: #00c4c0;
}

/deep/.el-slider__runway {
  height: 4px;
  background-color: #f2f2f2;
}

/deep/.el-icon-minus,
/deep/.el-icon-plus {
  font-size: 10px;
  color: #d5d5d5;
}
</style>
