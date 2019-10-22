<template>
  <el-container>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in imgList"
                        :key="item.title">
        <span class="title">{{item.title}}</span>
        <!-- <img :src="item.url"
             alt="3333"> -->
        <svg-icon :icon-class="item.url"
                  class="img" />
      </el-carousel-item>
    </el-carousel>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        /* eslint-disable */
        {
          url: 'step1'
          // title: '新建模型操作步骤'
        },
        {
          url: 'step2'
          // title: '创建训练操作步骤'
        },
        {
          url: 'step4'
          // title: '模型选择操作步骤'
        },
        {
          url: 'step3'
          // title: '数据导入操作步骤'
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-container {
  @include set-size(100%);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/deep/.el-carousel__container {
  height: 283px;
}
/deep/.el-carousel__indicators .is-active {
  .el-carousel__button {
    background-color: rgb(62, 191, 241);
  }
}

/deep/.el-carousel__arrow {
  display: none;
}
/deep/.el-carousel__button {
  width: 9px;
  height: 9px;
  background: rgba(195, 195, 195, 1);
  border-radius: 50%;
}
.img {
  width: 100%;
  // height: 242px;
  height: 320px;
}

.title {
  float: left;
  margin: 0 0 10px;
  font-size: 15px;
  font-family: 'PingFangSC-Regular', 'PingFangSC';
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>
