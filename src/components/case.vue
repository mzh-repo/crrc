<template>
  <div class="case-example"
       :style="{ 'z-index': zIndex }">
    <div class="case-box"
         :class="show ? 'active' : ''"
         @click="goDetail">
      <div class="title">{{ data.name }}</div>
      <div class="sub-title">{{ data.case.title }}</div>
      <div class="sulation">
        <svg-icon icon-class="case_train" />
        {{ data.car_type }}
      </div>
      <div class="sulation">
        <svg-icon icon-class="case_line" />
        {{ data.route }}
      </div>
      <div class="sulation">
        <svg-icon icon-class="case_date" />
        训练日期: {{ data.case.dataset_train_date }}
      </div>
      <svg-icon class="algorithm"
                :icon-class="getIcon(data.case.type)" />
    </div>
    <!-- <template v-if="show">
      <transition name="intro">
        <div class="show-content">
          <div class="model">数据集：{{ data.model.dataset_name }}</div>
          <div class="model">模型：{{ data.model.name }}</div>
          <div class="intro">简介：{{ data.summary }}</div>
        </div>
      </transition>
    </template> -->
  </div>
</template>

<script>
export default {
  props: {
    // 层叠效果
    zIndex: {
      type: Number,
    },
    data: {
      type: Object,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    // showContent() {
    //   this.show = true;
    // },
    // closeContent() {
    //   this.show = false;
    // },
    goDetail() {
      this.$store.commit('setReportData', {
        // name: this.data.model.name,
        // scene: this.data.model.applicable_scene,
        // describe: this.data.model.introduction,
        // total: this.data.model.deploy_number,
        // id: this.data.model.id,
        dataSetId: this.data.dataset.id,
        route: this.data.route,
        // dateSetName: this.data.model.dataset_name,
        // dataBaseId: this.id,
      });
      // this.$store.commit('chooseDataBase', Number(this.id));
      this.$router.push({
        path: `/result?id=${this.data.case.id}`,
      });
    },
    getIcon(type) {
      return `instance${type}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.case-example {
  position: relative;
}

.case-box {
  height: 180px;
  min-width: 330px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 20px;
  cursor: pointer;
  opacity: 0.8;
  font-size: 14px;

  &.active {
    opacity: 1;
    box-shadow: 0 8px 6px 0 rgba(27, 22, 22, 0.356);
  }
}

.title {
  margin-bottom: 10px;
  font-size: 24px;
  width: 240px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}

.sulation {
  margin-top: 10px;
  display: flex;
  align-items: center;

  .svg-icon {
    @include set-size(32px);
    margin-right: 12px;
  }
}

.algorithm {
  position: absolute;
  top: 12px;
  right: 12px;
  @include set-size(80px, 54px);
}

.show-content {
  height: 176px;
  background-color: #fff;
  position: absolute;
  top: 220px;
  width: 330px;
  padding: 30px 20px;
  border-top: 1px dashed #d8d8d8;
}

.model {
  font-size: 16px;
  margin-bottom: 10px;
  width: 300px;
  // word-break: break-all;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.intro {
  font-size: 14px;
  word-break: break-all;
}

.intro-enter-active,
.intro-leave-active {
  transition: opacity 0.5s;
}

.intro-enter,
.intro-leave-active {
  opacity: 0;
}

.intro-move {
  transition: transform 0.3s;
}

.sub-title {
  text-align: left;
  font-size: 16px;
  width: 240px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
