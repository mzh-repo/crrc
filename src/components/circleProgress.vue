<template>
  <div class="box-wrap">
    <el-container class="detail-wrap">
      <el-row type="flex"
              align="bottom">
        <el-col class="detail-number">{{number}}</el-col>
        <el-col class="detail-unit">{{unit}}</el-col>
      </el-row>
    </el-container>
    <svg width="130"
         height="130"
         viewbox-wrap="0 0 130 130">
      <circle cx="65.5"
              cy="65.5"
              r="60.5"
              stroke-width="5"
              stroke="#F3F3F3"
              fill="none">
      </circle>
      <circle cx="65.5"
              cy="65.5"
              r="60.5"
              stroke-width="5"
              :stroke="color"
              fill="none"
              transform="matrix(0,-1,1,0,0,130)"
              :stroke-dasharray="stroke">
      </circle>
    </svg>
  </div>

</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#54A8F7',
    },
    show: {
      type: Number,
      default: 500,
    },
    total: {
      type: Number,
      default: 1000,
    },
    number: {
      type: Number,
      default: 12,
    },
    unit: {
      type: String,
      default: 'M',
    },
  },
  data() {
    return {
      stroke: '0 1000',
    };
  },
  mounted() {
    const percent = this.show / this.total;
    const perimeter = Math.PI * 2 * 60.5;
    this.stroke = `${perimeter * percent} ${perimeter * (1 - percent)}`;
  },
};
</script>

<style lang="scss" scoped>
.box-wrap {
  background-color: #fff;
  height: 130px;
  width: 130px;
  position: relative;
}

.detail-wrap {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
  width: 130px;
}

.detail-number {
  color: #333;
  font-size: 36px;
  font-weight: bold;
}

.detail-unit {
  color: #333;
  font-size: 14px;
  margin-bottom: 6px;
  margin-left: 7px;
}

svg {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}

circle {
  transition: stroke-dasharray 1.5s;
  -webkit-transition: stroke-dasharray 1.5s;
}
</style>
