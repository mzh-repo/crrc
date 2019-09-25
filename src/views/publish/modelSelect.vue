<template>
  <el-container class="container">
    <div class="title">
      <div class="title-left">
        <span>请选择供电系统状态监测及故障预警模型实例</span>
      </div>
      <div class="title-right">
      </div>
    </div>
    <el-row :gutter="16">
      <template v-for="(item,index) in modelList">
        <el-col :span="6"
                :key="item.title">
          <div @click="showDialog(index)">
            <mzh-instance :chose="false"
                          :status="item.status" />
          </div>
        </el-col>
      </template>
    </el-row>
    <mzh-dialog ref="dialog"
                @publish-success="publishSuccess" />
  </el-container>
</template>

<script>
import Mzhinstance from '../../components/instance.vue';
import Mzhdialog from '../../components/dialog.vue';

export default {
  components: { 'mzh-instance': Mzhinstance, 'mzh-dialog': Mzhdialog },
  data() {
    return {
      modelList: [
        {
          title: '12312',
          status: 2,
        },
        {
          title: '121',
          status: 2,
        },
        {
          title: '324',
          status: 2,
        },
        {
          title: '345',
          status: 2,
        },
        {
          title: '567',
          status: 2,
        },
        {
          title: '678',
          status: 2,
        },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    showDialog(val) {
      this.$refs.dialog.showDialog(val);
    },
    publishSuccess(val) {
      this.modelList[val.index].status = val.status;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 58px 70px 100px;
  width: 100%;
  height: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'PingFangSC-Regular', 'PingFangSC';
}

.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-left,
.title-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.title-left span:nth-child(1) {
  font-size: 28px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
}

/deep/.el-col-6 {
  margin: 16px 0 0 0;
}
</style>
