<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             :show-close="false"
             @closed="closeDialog">
    <span class="no">实例{{no}}</span>
    <div class="progress-area">
      <el-progress :text-inside="true"
                   :show-text="false"
                   :stroke-width="16"
                   :percentage="percentage"></el-progress>
      <span class="tips">{{tips}}</span>
    </div>

    <span slot="footer">
      <div class="reselect-btn"
           @click="reSelect">重新选择实例</div>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '车载储能系统性能劣化条件下的列车运行控制模型预测',
    },
    no: {
      type: String,
      default: '1908231434',
    },
  },
  data() {
    return {
      percentage: 0,
      tips: '模型部署中...',
      dialogVisible: false,
      reseitime: false,
      index: '',
      id: '',
    };
  },
  mounted() {
    // this.b();
  },
  methods: {
    b() {
      if (!this.reseitime) {
        setTimeout(() => {
          this.percentage += 1;
          if (this.percentage < 100) {
            this.b();
          } else {
            setTimeout(() => {
              if (this.random(1, 100) < 40) {
                this.tips = '部署失败';
                this.$emit('publish-success', {
                  index: this.index,
                  status: 3,
                  id: this.id,
                });
              } else {
                this.tips = '部署成功';
                this.$emit('publish-success', {
                  index: this.index,
                  status: 1,
                  id: this.id,
                });
              }
            }, 500);
          }
        }, 100);
      }
    },
    closeDialog() {
      this.reseitime = true;
      this.percentage = 0;
    },
    reSelect() {
      this.dialogVisible = false;
      this.closeDialog();
    },
    showDialog(val) {
      this.reseitime = false;
      this.dialogVisible = true;
      this.index = val.index;
      this.id = val.id;
      this.tips = '模型部署中...';
      this.b();
    },

    random(lower, upper) {
      return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.el-dialog {
  width: 1220px;
  padding: 34px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
}

/deep/.el-dialog__header {
  // width: 100%;
  // float: left;
  padding: 0;
}

/deep/.el-dialog__body {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
}

/deep/.el-dialog__title {
  font-size: 24px;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
}

.no {
  padding: 8px 0 0;
  font-size: 18px;
  color: rgba(153, 153, 153, 1);
  line-height: 25px;
}

.progress-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-progress {
  width: 850px;
  margin: 80px 0 24px;
}

.tips {
  font-size: 24px;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
  font-weight: 500;
}

/deep/.el-dialog__footer {
  margin: 87px 0 0;
  padding: 0;
}

.reselect-btn {
  width: 210px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid rgba(151, 151, 151, 1);
  font-size: 22px;
  color: rgba(154, 154, 154, 1);
  line-height: 30px;
  cursor: pointer;
}
</style>
