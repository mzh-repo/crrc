<template>
  <el-container class="container">
    <div class="title">
      <div class="title-left">
        <span>请选择实例</span>
      </div>
      <div class="title-right">
      </div>
    </div>
    <div class="model-area">
      <template v-for="(item,index) in modelList">
        <div :key="item.title"
             @click="showDialog(index,item.id,item.name)"
             class="model-box">
          <mzh-instance :chose="false"
                        :status="item.status"
                        :title="item.name"
                        :lately="item.loss"
                        :traning="item.training_time"
                        :datasetName="item.dataset_name"
                        :estimate="item.estimated_deployment_time" />

        </div>
      </template>
    </div>
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
      modelList: [],
      dialogVisible: false,
    };
  },
  mounted() {
    if (this.$store.state.exampleSelected.index) {
      this.modelList[this.$store.state.exampleSelected.index].status = 1;
    }
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios
        .get(
          `model/instance/list?model_id=${this.$store.state.modelSelected
            .index || 1}`,
        )
        .then((res) => {
          this.modelList = res;
        });
    },
    showDialog(val, id, name) {
      this.$store.commit('selectExample', { index: val, id, name });
      if (this.modelList[val].status === 1) {
        this.$store.commit('setPublishActive', 4);
      } else {
        this.$refs.dialog.showDialog({ index: val, id, name });
      }
    },
    publishSuccess(val) {
      this.modelList[val.index].status = val.status;
      if (val.status === 1) {
        this.$axios
          .put(`model/instance/${val.id}/status`, { status: 1 })
          .then(() => {
            this.$store.commit('setPublishActive', 4);
            this.$store.commit('selectExample', {
              index: val.index,
              name: val.name,
            });
          });
      }
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
  font-size: 24px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 33px;
}

/deep/.el-col-6 {
  margin: 16px 0 0 0;
}
.model-box {
  box-sizing: border-box;
  margin: 20px 10px 0 0;
  float: left;
}
.model-area {
  width: 100%;
}
</style>
