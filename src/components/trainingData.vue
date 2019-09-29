<template>
  <div class="content">
    <div class="training-data">
      <!-- {{data}} -->
      <el-row class="title">{{dataList.name}}</el-row>
      <el-row>
        <el-col :span="8"
                class="training-continue">
          <div>数据总量</div>
          <div>
            <span>{{dataList.line}}</span>K
          </div>
        </el-col>
        <el-col :span="16"
                class="training-continue">
          <div>物理大小</div>
          <div>
            <span>{{dataList.size}}</span>MB
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
          </el-row>
          <img v-if="this.$store.state.dataSelected===dataList.id"
               src="@/assets/images/choiced.png"
               @click="setChoice(dataList.id)">
          <div v-else
               class="choice"
               @click="setChoice(dataList.id)"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>>

<script>
export default {
  props: {
    dataList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    setChoice(index) {
      this.$emit('set-choice', index);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
}
.training-data {
  background: #fff;
  margin: 16px 16px 0 0;
  padding: 15px 20px;
  border-radius: 8px;
  width: 364px;
  height: 160px;
}
.title {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 18px;
  display: flex;
}
.training-continue {
  text-align: left;
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
    margin-bottom: 15px;
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
