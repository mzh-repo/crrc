<template>
  <el-container>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in imgList"
                        :key="item.title">
        <span class="title">{{item.title}}</span>
        <img :src="item.url"
             alt="3333">
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
          url: require('../assets/images/新建模型.png'),
          title: '新建模型操作步骤'
        },
        {
          url: require('../assets/images/创建训练.png'),
          title: '创建训练操作步骤'
        },
        {
          url: require('../assets/images/模型选择.png'),
          title: '模型选择操作步骤'
        },
        {
          url: require('../assets/images/数据导入.png'),
          title: '数据导入操作步骤'
        }
        /* eslint-enable */
      ],
    };
  },
  mounted() {},
  methods: {},
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
  height: 278px;
}
/deep/.el-carousel__indicators .is-active {
  .el-carousel__button {
    background-color: rgb(62, 191, 241);
  }
}

/deep/.el-carousel__arrow {
  display: none;
}

img {
  width: 242px;
  height: 242px;
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
