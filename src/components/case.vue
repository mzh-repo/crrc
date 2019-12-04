<template>
  <div class="case-example"
       :style="{ 'z-index': zIndex }">
    <div class="case-box"
         :class="show ? 'active' : ''"
         @mouseover="showContent"
         @mouseout="closeContent"
         @click="goDetail">
      <div class="title">{{ title }}</div>
      <div class="sulation">
        <svg-icon icon-class="case_train" />
        {{ describe[0] }}
      </div>
      <div class="sulation">
        <svg-icon icon-class="case_line" />
        {{ describe[1] }}
      </div>
      <svg-icon class="algorithm"
                icon-class="instance1" />
    </div>
    <template v-if="show">
      <transition name="intro">
        <div class="show-content">
          <div class="model">模型：{{ model }}</div>
          <div class="intro">简介：{{ intro }}</div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    // 层叠效果
    zIndex: {
      type: Number,
    },
  },
  data() {
    return {
      show: false,
      title: '多目标列车运行控制案例',
      describe: ['定车：车辆配置不变', '定线：线路充电情况不变'],
      model: 'xxxxxx',
      intro: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    };
  },
  methods: {
    showContent() {
      this.show = true;
    },
    closeContent() {
      this.show = false;
    },
    goDetail() {
      this.$router.push({ path: '/report' });
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

  &.active {
    opacity: 1;
    box-shadow: 0px 8px 6px 0px rgba(27, 22, 22, 0.356);
  }
}

.title {
  margin-bottom: 13px;
  font-size: 24px;
  width: 240px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sulation {
  margin-top: 25px;
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
  height: 196px;
  background-color: #fff;
  position: absolute;
  top: 220px;
  width: 330px;
  padding: 20px;
  border-top: 1px dashed #d8d8d8;
}

.model {
  font-size: 20px;
  margin-bottom: 20px;
  width: 240px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.intro {
  font-size: 20px;
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
</style>
