<template>
  <el-row class="train-container">
    <el-row class="trace-point energy">
      <div v-for="(item, index) in pointList"
           :key="index"
           :style="{ left: item.left }"
           class="point-box">
        <div class="energy-content">{{ item.charge }}</div>
        <div class="energy-content">{{ item.energy }}</div>
      </div>
    </el-row>
    <svg-icon icon-class="火车"
              class="animation-train" />
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
  props: {
    // pointList: {
    //   type: Array,
    //   default: () => [
    //     {
    //       name: '香山站',
    //       color: primaryColor,
    //       left: '0%',
    //     },
    //     {
    //       name: '植物园站',
    //       color: otherColor,
    //       left: '25%',
    //     },
    //     {
    //       name: '万安公墓站',
    //       color: otherColor,
    //       left: '45%',
    //     },
    //     {
    //       name: '玉泉郊野公园',
    //       color: otherColor,
    //       left: '61%',
    //     },
    //     {
    //       name: '颐和园西门',
    //       color: otherColor,
    //       left: '81%',
    //     },
    //     {
    //       name: '颐和园南门',
    //       color: otherColor,
    //       left: '95%',
    //     },
    //   ],
    // },
    current: {
      type: Number,
    },
  },
  data() {
    return {
      // time: null,
      // current: 0,
      pointList: [
        {
          name: '香山站',
          color: otherColor,
          left: '0%',
        },
        {
          name: '植物园站',
          color: otherColor,
          left: '20%',
        },
        {
          name: '万安公墓站',
          color: otherColor,
          left: '40%',
        },
        {
          name: '玉泉郊野公园',
          color: otherColor,
          left: '60%',
        },
        {
          name: '颐和园西门',
          color: otherColor,
          left: '80%',
        },
        {
          name: '颐和园南门',
          color: otherColor,
          left: '95%',
        },
      ],
    };
  },
  mounted() {
    // this.getPoint();
  },
  methods: {
    // getPoint() {
    //   this.time = setTimeout(() => {
    //     this.current += 1;
    //     this.getPoint();
    //   }, 1000);
    // },
  },

  // beforeDestroy() {
  //   if (this.time) {
  //     clearTimeout(this.time);
  //     this.time = null;
  //   }
  // },

  watch: {
    current(val) {
      // eslint-disable-next-line no-console
      console.log('al', val);
      const query = document.querySelector('.animation-train');
      const data = JSON.parse(JSON.stringify(this.pointList));
      if (val >= 0) {
        // const query = document.querySelector('.animation-train');
        // query.style['animation-play-state'] = 'paused';
        data[0].color = primaryColor;
        data[0].charge = '是否充电:是';
        data[0].energy = '剩余电量:97%';
      }
      if (val >= 21) {
        data[1].color = primaryColor;
        data[1].charge = '是否充电:是';
        data[1].energy = '剩余电量:81.12%';
        if (val <= 24) {
          query.style['animation-play-state'] = 'paused';
        } else {
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 42) {
        data[2].color = primaryColor;
        data[2].charge = '是否充电:是';
        data[2].energy = '剩余电量:69.32%';
        if (val <= 45) {
          query.style['animation-play-state'] = 'paused';
        } else {
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 63) {
        data[3].color = primaryColor;
        data[3].charge = '是否充电:是';
        data[3].energy = '剩余电量:68.85%';
        if (val <= 66) {
          query.style['animation-play-state'] = 'paused';
        } else {
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val > 84) {
        data[4].color = primaryColor;
        data[4].charge = '是否充电:是';
        data[4].energy = '剩余电量:65.83%';
        if (val <= 87) {
          query.style['animation-play-state'] = 'paused';
        } else {
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 100) {
        data[5].color = primaryColor;
        data[5].charge = '是否充电:是';
        data[5].energy = '剩余电量:67.24%';
      }
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
    animation: mymove 112s infinite;
    animation-play-state: running;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    -webkit-animation-iteration-count: 1; /* Safari 和 Chrome */
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;

    @keyframes mymove {
      from {
        left: -10%;
      }
      to {
        left: 90%;
      }
    }

    @-moz-keyframes mymove /* Firefox */ {
      from {
        left: -10%;
      }
      to {
        left: 90%;
      }
    }

    @-webkit-keyframes mymove /* Safari 和 Chrome */ {
      from {
        left: -10%;
      }
      to {
        left: 90%;
      }
    }

    @-o-keyframes mymove /* Opera */ {
      from {
        left: -10%;
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

.energy-content {
  font-size: 12px;
}
</style>
