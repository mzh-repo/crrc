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
    <div class="trace-line"></div>
    <el-row class="point-line">
      <div v-for="(item, index) in 26"
           :key="index">
        <template v-if="index % 5 === 0">
          <div class="point station"
               :style="{ left: `${4 * index}%`, background: current / 4 >= index ? 'red' : '' }">
            <div class="station-name">{{ pointList[index / 5].name }}</div>
          </div>
        </template>
        <template v-else>
          <div class="point"
               :style="{ left: `${4 * index}%`, background: current / 4 >= index
               ? 'red' : '' }"></div>
        </template>
      </div>
    </el-row>
  </el-row>
</template>

<script>
import { setInterval, clearInterval } from 'timers';

const primaryColor = '#FF2020';
const otherColor = '#00C4C0';
const line = [
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
    left: '100%',
  },
];

const otherLine = [
  {
    name: '广州塔',
    color: otherColor,
    left: '0%',
  },
  {
    name: '艺苑东路',
    color: otherColor,
    left: '20%',
  },
  {
    name: '猎德大桥',
    color: otherColor,
    left: '40%',
  },
  {
    name: '啤酒博物馆',
    color: otherColor,
    left: '60%',
  },
  {
    name: '华南大桥',
    color: otherColor,
    left: '80%',
  },
  {
    name: '会展西',
    color: otherColor,
    left: '100%',
  },
];

export default {
  props: {
    // current: {
    //   type: Number,
    // },
    // 0 间歇式  1 非接触式
    lineType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pointList: line,
      current: 0,
      timer: null,
    };
  },
  mounted() {
    if (this.current <= 100) {
      this.timer = setInterval(() => {
        this.current += 1;
      }, 1000);
    } else {
      clearInterval(this.timer);
    }
    this.dataBaseId = Number(this.$store.state.reportData.dataBaseId);
    if (this.lineType === 0) {
      this.pointList = otherLine;
    } else {
      this.pointList = line;
    }
  },
  beforeDestory() {
    clearInterval(this.timer);
  },
  methods: {
    getData(val) {
      const query = document.querySelector('.animation-train');
      const data = JSON.parse(JSON.stringify(this.pointList));
      if (val >= 0) {
        data[0].color = primaryColor;
        data[0].energy = '当前电量: 97%';
        if (val < 3) {
          query.style['animation-play-state'] = 'paused';
        } else {
          data[0].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 21) {
        data[1].color = primaryColor;
        data[1].charge = '是否越站充电: 是';
        data[1].energy = '剩余电量: 69.9%';
        if (val <= 24) {
          query.style['animation-play-state'] = 'paused';
          if (val === 24) {
            data[1].charge = '';
            data[1].energy = '当前电量:84.18%';
          }
        } else {
          data[1].charge = '';
          data[1].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 42) {
        data[2].color = primaryColor;
        data[2].charge = '是否越站充电:否';
        data[2].energy = '剩余电量:51.49%';
        if (val <= 45) {
          query.style['animation-play-state'] = 'paused';
          if (val === 45) {
            data[2].charge = '';
            data[2].energy = '当前电量:50.21%';
          }
        } else {
          data[2].charge = '';
          data[2].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 63) {
        data[3].color = primaryColor;
        data[3].charge = '是否越站充电:是';
        data[3].energy = '剩余电量:42.76%';
        if (val <= 66) {
          if (val === 66) {
            data[3].charge = '';
            data[3].energy = '当前电量:59.7%';
          }
          query.style['animation-play-state'] = 'paused';
        } else {
          data[3].charge = '';
          data[3].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 84) {
        data[4].color = primaryColor;
        data[4].charge = '是否越站充电:否';
        data[4].energy = '剩余电量:30.93%';
        if (val <= 87) {
          query.style['animation-play-state'] = 'paused';
          if (val === 87) {
            data[4].charge = '';
            data[4].energy = '当前电量:28.3%';
          }
        } else {
          data[4].charge = '';
          data[4].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 100) {
        data[5].color = primaryColor;
        data[5].charge = '是否越站充电:是';
        data[5].energy = '剩余电量:13.23%';
      }
      this.pointList = data;
    },
    getOther(val) {
      const query = document.querySelector('.animation-train');
      const data = JSON.parse(JSON.stringify(this.pointList));
      if (val >= 0) {
        data[0].color = primaryColor;
        data[0].energy = '当前电量:97%';
        if (val < 3) {
          query.style['animation-play-state'] = 'paused';
        } else {
          data[0].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 21) {
        data[1].color = primaryColor;
        data[1].charge = '是否越站充电:是';
        data[1].energy = '剩余电量:81.12%';
        if (val <= 24) {
          query.style['animation-play-state'] = 'paused';
          if (val === 24) {
            data[1].charge = '';
            data[1].energy = '当前电量:91.68%';
          }
        } else {
          data[1].charge = '';
          data[1].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 42) {
        data[2].color = primaryColor;
        data[2].charge = '是否越站充电:是';
        data[2].energy = '剩余电量:69.32%';
        if (val <= 45) {
          query.style['animation-play-state'] = 'paused';
          if (val === 45) {
            data[2].charge = '';
            data[2].energy = '当前电量:74.86%';
          }
        } else {
          data[2].charge = '';
          data[2].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 63) {
        data[3].color = primaryColor;
        data[3].charge = '是否越站充电:否';
        data[3].energy = '剩余电量:68.85%';
        if (val <= 66) {
          if (val === 66) {
            data[3].charge = '';
            data[3].energy = '当前电量:67.62%';
          }
          query.style['animation-play-state'] = 'paused';
        } else {
          data[3].charge = '';
          data[3].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 84) {
        data[4].color = primaryColor;
        data[4].charge = '是否越站充电:是';
        data[4].energy = '剩余电量:65.83%';
        if (val <= 87) {
          query.style['animation-play-state'] = 'paused';
          if (val === 87) {
            data[4].charge = '';
            data[4].energy = '当前电量:75.62%';
          }
        } else {
          data[4].charge = '';
          data[4].energy = '';
          query.style['animation-play-state'] = 'running';
        }
      }
      if (val >= 100) {
        data[5].color = primaryColor;
        data[5].charge = '是否越站充电:是';
        data[5].energy = '剩余电量:67.24%';
      }
      this.pointList = data;
    },
  },

  watch: {
    // current(val) {
    //   if (this.dataBaseId === 1) {
    //     this.getData(val);
    //   } else {
    //     this.getOther(val);
    //   }
    // },
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
    animation: mymove 100s infinite;
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
  background: rgba(102, 102, 102, 0.6);
  border-radius: 2px;
  top: 44px;
}

.trace-point {
  position: absolute;
  @include flex-row;
  width: 100%;
  // top: 63px;
  top: 40px;

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

    &:first-child .point {
      margin-left: -8px;
    }

    &:last-child .point {
      // margin-right: -6px;
      margin-left: -8px;
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

.point-line {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 40px;

  .point {
    @include set-size(16px);
    background: $primary-color;
    border-radius: 50%;
    position: absolute;
    margin-left: -8px;

    &.station {
      @include set-size(30px);
      margin-top: -7px;
    }

    .station-name {
      transform: rotate(-45deg);
      width: 100px;
      text-align: left;
      margin-top: -60px;
    }
  }
}
</style>
