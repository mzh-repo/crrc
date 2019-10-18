<template>
  <el-row class="train-container">
    <svg-icon icon-class="火车" />
    <div class="trace-line"></div>
    <el-row class="trace-point">
      <div v-for="(item,index) in pointList"
           :key="index"
           :style="{'left': item.left}"
           class="point-box">
        <div class="point"
             :style="{'background-color': item.color}">
        </div>
        <div>{{item.name}}</div>
      </div>
    </el-row>
  </el-row>
</template>

<script>
const primaryColor = ' #FF2020 ';
const otherColor = '#00C4C0';

export default {
  props: {
    pointList: {
      type: Array,
      default: () => [
        {
          name: '香山站',
          color: otherColor,
          left: '23%',
        },
        {
          name: '植物园站',
          color: otherColor,
          left: '41%',
        },
        {
          name: '万安公墓站',
          color: otherColor,
          left: '56%',
        },
        {
          name: '玉泉郊野公园',
          color: otherColor,
          left: '74%',
        },
        {
          name: '颐和园西门',
          color: otherColor,
          left: '88%',
        },
        {
          name: '颐和园南门',
          color: otherColor,
          left: '95%',
        },
      ],
    },
  },
  data() {
    return {
      time: '',
      current: 0,
    };
  },
  mounted() {
    // this.getPoint();
  },
  methods: {
    getPoint() {
      this.time = setTimeout(() => {
        this.current += 1;
        this.getPoint();
      }, 1000);
    },
  },

  watch: {
    current(val) {
      if (val > 22) {
        this.pointList[0].color = primaryColor;
      }
      if (val > 41) {
        this.pointList[1].color = primaryColor;
      }
      if (val > 56) {
        this.pointList[2].color = primaryColor;
      }
      if (val > 74) {
        this.pointList[3].color = primaryColor;
      }
      if (val > 88) {
        this.pointList[4].color = primaryColor;
      }
      if (val > 95) {
        this.pointList[5].color = primaryColor;
      }
      if (val > 100) {
        clearTimeout(this.time);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.train-container {
  position: relative;
  height: 66px;
  width: 100%;
  margin-bottom: 30px;

  .svg-icon {
    width: 10%;
    height: 44px;
    position: absolute;
    animation: mymove 160s infinite;
    animation-iteration-count: 1;
    -webkit-animation-iteration-count: 1; /* Safari 和 Chrome */
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;

    @keyframes mymove {
      from {
        left: 0%;
      }
      to {
        left: 90%;
      }
    }

    @-moz-keyframes mymove /* Firefox */ {
      from {
        left: 0%;
      }
      to {
        left: 90%;
      }
    }

    @-webkit-keyframes mymove /* Safari 和 Chrome */ {
      from {
        left: 0%;
      }
      to {
        left: 90%;
      }
    }

    @-o-keyframes mymove /* Opera */ {
      from {
        left: 0%;
      }
      to {
        left: 90%;
      }
    }
  }
}
.trace-line {
  width: 100%;
  height: 10px;
  position: absolute;
  background: rgba(102, 102, 102, 1);
  border-radius: 2px;
  top: 44px;
}

.trace-point {
  position: absolute;
  @include flex-row;
  width: 100%;
  top: 63px;

  .point-box {
    position: absolute;
    @include flex-column;
    text-align: center;
    color: #333;

    .point {
      @include set-size(16px);
      border-radius: 50%;
      margin: auto;
    }
  }
}
</style>
