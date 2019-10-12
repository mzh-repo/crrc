<template>
  <el-row class="train-container">
    <svg-icon icon-class="火车" />
    <div class="trace-line"></div>
    <el-row class="trace-point">
      <span v-for="(item,index) in pointList"
            :key="index"
            :style="{'left': item.left}">
        <div class="point"
             :style="{'background-color': item.color}">
        </div>
        {{item.name}}
      </span>
    </el-row>
  </el-row>
</template>

<script>
const primaryColor = ' #FF2020 ';
const otherColor = '#00C4C0';

export default {
  data() {
    return {
      pointList: [
        {
          name: 'A',
          color: primaryColor,
          left: '20%',
        },
        {
          name: 'B',
          color: primaryColor,
          left: '60%',
        },
        {
          name: 'C',
          color: otherColor,
          left: '70%',
        },
        {
          name: 'D',
          color: otherColor,
          left: '80%',
        },
        {
          name: 'E',
          color: otherColor,
          left: '99%',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.train-container {
  position: relative;
  height: 110px;
  width: 100%;
  margin-bottom: 30px;

  .svg-icon {
    width: 20%;
    height: 88px;
    position: absolute;
    animation: mymove 5s infinite;
    // animation-iteration-count: 1;
    // -webkit-animation-iteration-count: 1; /* Safari 和 Chrome */

    @keyframes mymove {
      from {
        left: 0%;
      }
      to {
        left: 80%;
      }
    }

    @-moz-keyframes mymove /* Firefox */ {
      from {
        left: 0%;
      }
      to {
        left: 80%;
      }
    }

    @-webkit-keyframes mymove /* Safari 和 Chrome */ {
      from {
        left: 0%;
      }
      to {
        left: 80%;
      }
    }

    @-o-keyframes mymove /* Opera */ {
      from {
        left: 0%;
      }
      to {
        left: 80%;
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
  top: 88px;
}

.trace-point {
  position: absolute;
  @include flex-row;
  width: 100%;
  top: 107px;

  span {
    position: absolute;
    @include flex-column;
    text-align: center;
    color: #333;

    .point {
      @include set-size(16px);
      border-radius: 50%;
    }
  }
}
</style>
