<template>
  <el-row class="train-container">
    <el-row class="trace-point energy">
      <div v-for="(item, index) in pointList"
           :key="index"
           :style="{ left: item.left }"
           class="point-box">
        <div class="charge">是否充电：{{ item.charge }}</div>
        <div class="energy">剩余电量：{{ item.energy }}</div>
      </div>
    </el-row>
    <svg-icon icon-class="火车" />
    <div class="trace-line"></div>
    <el-row class="trace-point">
      <div v-for="(item, index) in pointList"
           :key="index"
           :style="{ left: item.left }"
           class="point-box">
        <div class="point"
             :style="{ 'background-color': item.color }"></div>
        <div>{{ item.name }}</div>
      </div>
    </el-row>
  </el-row>
</template>

<script>
const primaryColor = '#FF2020';
const otherColor = '#00C4C0';

export default {
  // props: {
  //   pointList: {
  //     type: Array,
  //     default: () => [
  //       {
  //         name: '香山站',
  //         color: primaryColor,
  //         left: '0%',
  //       },
  //       {
  //         name: '植物园站',
  //         color: otherColor,
  //         left: '25%',
  //       },
  //       {
  //         name: '万安公墓站',
  //         color: otherColor,
  //         left: '45%',
  //       },
  //       {
  //         name: '玉泉郊野公园',
  //         color: otherColor,
  //         left: '61%',
  //       },
  //       {
  //         name: '颐和园西门',
  //         color: otherColor,
  //         left: '81%',
  //       },
  //       {
  //         name: '颐和园南门',
  //         color: otherColor,
  //         left: '95%',
  //       },
  //     ],
  //   },
  // },
  data() {
    return {
      time: null,
      current: 0,
      pointList: [
        {
          name: '香山站',
          color: primaryColor,
          left: '0%',
          charge: '是',
          energy: '98%',
        },
        {
          name: '植物园站',
          color: otherColor,
          left: '25%',
          charge: '',
        },
        {
          name: '万安公墓站',
          color: otherColor,
          left: '45%',
          charge: '',
        },
        {
          name: '玉泉郊野公园',
          color: otherColor,
          left: '61%',
          charge: '',
        },
        {
          name: '颐和园西门',
          color: otherColor,
          left: '81%',
          charge: '',
        },
        {
          name: '颐和园南门',
          color: otherColor,
          left: '95%',
          charge: '',
        },
      ],
    };
  },
  mounted() {
    this.getPoint();
  },
  methods: {
    getPoint() {
      this.time = setTimeout(() => {
        this.current += 1;
        this.getPoint();
      }, 1000);
    },
  },

  beforeDestroy() {
    if (this.time) {
      clearTimeout(this.time);
      this.time = null;
    }
  },

  watch: {
    current(val) {
      console.log('al', val);
      const data = JSON.parse(JSON.stringify(this.pointList));
      if (val > 18) {
        data[1].color = primaryColor;
        data[1].charge = '否';
        data[1].energy = '72%';
        // this.pointList[0].color = primaryColor;
      }
      if (val > 30) {
        data[2].color = primaryColor;
        data[2].charge = '否';
        data[2].energy = '54%';
        // this.pointList[1].color = primaryColor;
      }
      if (val > 41) {
        data[3].color = primaryColor;
        data[3].charge = '是';
        data[3].energy = '40%';
        // this.pointList[2].color = primaryColor;
      }
      if (val > 62) {
        data[4].color = primaryColor;
        data[4].charge = '否';
        data[4].energy = '65%';
        // this.pointList[3].color = primaryColor;
      }
      if (val > 93) {
        data[5].color = primaryColor;
        data[5].charge = '是';
        data[5].energy = '43%';
        // this.pointList[4].color = primaryColor;
      }
      if (val >= 100) {
        clearTimeout(this.time);
        this.time = null;
      }
      // console.log(data);
      this.pointList = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.train-container {
  position: relative;
  height: 66px;
  width: 100%;
  margin-bottom: 60px;
  margin-top: 80px;

  .svg-icon {
    width: 10%;
    height: 44px;
    position: absolute;
    animation: mymove 120s infinite;
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

  &.energy {
    top: -50px;

    .point-box {
      text-align: left;
      width: 120px;
    }
  }
}
</style>
