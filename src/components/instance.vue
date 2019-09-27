<template>
  <el-card shadow="hover"
           :style="chose?'height:116px;':'height:148px;'">
    <el-row type="flex"
            justify="space-between">
      <el-col class="title left">{{title}}</el-col>
      <el-col :class="['status',statusTag.class]">{{statusTag.text}}

      </el-col>
    </el-row>
    <div v-if="!chose">
      <el-row type="flex"
              class="loss-row">
        <el-col class="loss">
          该实例Loss
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col class="lately">
          {{lately}}
        </el-col>
      </el-row>
    </div>
    <el-row v-else
            type="flex">
      <el-col :span="7"
              class="loss-inline">
        最高Loss：{{lately}}
      </el-col>
      <el-col :span="7"
              class="loss-inline">
        平均Loss：{{average}}
      </el-col>
    </el-row>
    <el-row type="flex"
            class="bottom"
            justify="space-between">
      <el-col class="left traning">
        训练时长：{{traning}}
      </el-col>
      <el-col v-if="!chose"
              class="right">
        预计部署时长：{{estimate}}
      </el-col>
      <el-col v-else>
        <el-row class="button-row"
                type="flex"
                justify="end">
          <el-col v-if="status===1"
                  class="button1"
                  @click="outline">下线</el-col>
          <el-col v-if="status===2"
                  class="button2"
                  @click="settle">部署</el-col>
          <el-col v-if="status===2"
                  class="button3"
                  @click="trainAgain">再次训练</el-col>
          <el-col v-if="status===3"
                  class="button3"
                  @click="settleAgain">重新部署</el-col>
          <el-col v-if="status===4"
                  class="button1"
                  @click="trainStop">终止训练</el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
    title: {
      type: String,
      default: '第一次实例-1908231122',
    },
    chose: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    lately: {
      type: Number,
      default: 0.1,
    },
    average: {
      type: Number,
      default: 0.3,
    },
    traning: {
      type: String,
      default: '1小时05分钟',
    },
    estimate: {
      type: String,
      default: '35分钟',
    },
  },
  computed: {
    statusTag() {
      const tag = { text: '', class: '' };
      if (this.status === 1) {
        tag.text = '已部署';
        tag.class = 'status1';
      } else if (this.status === 2) {
        tag.text = '待部署';
        tag.class = 'status2';
      } else if (this.status === 3) {
        tag.text = '部署失败';
        tag.class = 'status3';
      } else if (this.status === 4) {
        tag.text = '训练中';
        tag.class = 'status4';
      }
      return tag;
    },
  },
  methods: {
    outline() {
      this.$emit('outline', this.id);
    },
    settle() {
      this.$emit('settle', this.id);
    },
    trainAgain() {
      this.$emit('trainAgain', this.id);
    },
    settleAgain() {
      this.$emit('settleAgain', this.id);
    },
    trainStop() {
      this.$emit('trainStop', this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.el-card {
  width: 414px;
  background-color: #fff;
  border-radius: 6px;
  position: relative;
}

/deep/.el-card__body {
  padding: 12px;
}

.loss-row {
  margin-top: 10px;
  margin-bottom: 9px;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.title {
  font-size: 14px;
  font-weight: 400;
  color: #333;
}

.status {
  width: 48px;
  height: 18px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 17px;
  color: #fff;
  text-align: center;
}

.status1 {
  background: #70b40f;
}

.status2 {
  background: #ffc25d;
}

.status3 {
  background: #ff2b2b;
  width: 65px;
}

.status4 {
  background: #54a8f7;
}

.loss {
  font-size: 14px;
  color: #333;
  text-align: left;
}

.loss-inline {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: left;
}

.lately {
  color: #333;
  font-size: 32px;
  text-align: left;
  line-height: 38px;
}

.average {
  color: #333;
  font-size: 32px;
  font-weight: bold;
  line-height: 45px;
  text-align: left;
}

.bottom {
  width: 390px;
  position: absolute;
  bottom: 0;
  font-size: 12px;
  color: #999;
  bottom: 12px;
}

.traning {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.button-row /deep/ .el-col {
  line-height: 24px;
  width: 78px;
  height: 26px;
  border-radius: 6px;
  margin-left: 9px;
}

.button1 {
  color: #979797;
  background: #fff;
  border: solid 1px #979797;
}

.button2 {
  color: #fff;
  background: #00c4c0;
  border: solid 1px #00c4c0;
}

.button3 {
  color: #fff;
  background: #8fd866;
  border: solid 1px #8fd866;
}
</style>
