<template>
  <div class="training-data"
       :class="active === true? 'active': ''"
       @click="setChoice(dataList)">
    <!-- {{data}} -->
    <el-row class="title">{{dataList.name || "demo"}}</el-row>
    <el-row>
      <el-col :span="12"
              class="training-continue">
        <div>数据总量</div>
        <div>
          <span>{{dataList.line}}</span>条
        </div>
      </el-col>
      <el-col :span="12"
              class="training-continue">
        <div>物理大小</div>
        <div>
          <span>{{unitConvert(dataList.size)}}</span>MB
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
              class="features">
        <el-row class="header-mappings">
          <!-- <span>特征值: </span> -->
          <!-- <span v-for="(item,index) in dataList.header_mappings"
                  :key="index"> {{
                    `${item}${index+1===dataList.header_mappings.length?'':','}`
                    }}</span> -->
          <span>上传时间： {{dataList.create_time}}</span>
        </el-row>
        <img v-if="active === true"
             src="@/assets/images/choiced.png">
        <div v-else
             class="choice"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: false,
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

<style lang="scss" scoped>
.training-data {
  background: #fff;
  margin: 16px 16px 0 0;
  padding: 15px 20px;
  border-radius: 8px;
  width: 364px;
  height: 170px;
  cursor: pointer;
  // opacity: 0.6;

  &:hover,
  &.active {
    opacity: 1;
    box-shadow: 0 8px 6px 0 rgba(27, 22, 22, 0.356);
  }

  & .training-continue:first-child {
    border-right: 1px solid #eee;
  }
}

.title {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 18px;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.training-continue {
  // text-align: left;
  span {
    font-size: 32px;
    line-height: 45px;
    margin-right: 6px;
  }
  div:first-child {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  div:nth-child(2) {
    font-size: 18px;
    line-height: 25px;
    // margin-bottom: 15px;
  }
}
.choice {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(227, 227, 227, 1);
  border-radius: 50%;
  box-sizing: border-box;
}
.features {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-top: 15px;
}
img {
  width: 32px;
  height: 32px;
}

.header-mappings {
  max-width: 320px;
  span {
    float: left;
  }
}
</style>
