<template>
  <el-card shadow="hover">
    <el-row type="flex"
            justify="space-between">
      <el-col class="title left">{{title}}</el-col>
      <el-col :class="[settled ? 'settled' : 'unsettled', 'status']">{{status}}</el-col>
    </el-row>
    <el-row type="flex"
            class="loss-row">
      <el-col class="loss">最近实例Loss</el-col>
      <el-col class="loss">平均实例Loss</el-col>
    </el-row>
    <el-row type="flex">
      <el-col class="lately">{{lately}}</el-col>
      <el-col class="average">{{average}}</el-col>
    </el-row>
    <el-row type="flex"
            class="bottom"
            justify="space-between">
      <el-col class="left">训练时长：{{traning}}</el-col>
      <el-col class="right">预计部署时长：{{estimate}}</el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '第一次实例-1908231122',
    },
    settled: {
      type: Boolean,
      default: true,
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
    status() {
      return this.settled ? '已部署' : '待部署';
    },
  },
};
</script>

<style scoped lang="scss">
.el-card {
  height: 148px;
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

.settled {
  background: #70b40f;
}

.unsettled {
  background: #ffc25d;
}

.loss {
  font-size: 14px;
  color: #333;
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
  bottom: 12px;
  font-size: 12px;
  color: #999;
}
</style>
