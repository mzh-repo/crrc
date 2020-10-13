<template>
  <div :class="className"
       :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'; // echarts theme

const initData = () => {
  const arr = [];
  for (let i = 0; i < 60; i += 1) {
    arr.unshift([new Date().valueOf() - 1000 * i, null]);
  }
  return arr;
};

export default {
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '300px',
    },
    legend: {
      type: Array,
      default: () => ['阈值', '实际'],
    },
    title: {
      type: String,
      default: '当前电流: -7A',
    },
    nowValue: {
      type: Array,
    },
    nowValue2: {
      type: Array,
    },
    nowValue3: {
      type: Array,
    },
    nowValue4: {
      type: Array,
    },
    threshold: {
      type: Array,
    },
    warning: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: '',
      nowValueList: initData(),
      thresholdList: initData(),
    };
  },
  mounted() {
    this.drawChart();
    if (this.nowValue2) {
      this.nowValueList2 = initData();
      this.nowValueList3 = initData();
      this.nowValueList4 = initData();
    }
  },
  beforeDestroy() {
    this.chart.clear();
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    drawChart() {
      this.initChart();
      this.resizeHandler = () => {
        if (this.chart) {
          this.chart.resize();
        }
      };
      window.addEventListener('resize', this.resizeHandler);
    },
    initChart() {
      this.chart = echarts.init(this.$el);
      const option = {
        title: {
          text: this.title,
          // left: '30%',
          top: '5',
          textStyle: {
            color: this.warning ? '#ca2418' : '#333',
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            if (params[2]) {
              return `
               ${params[0].marker} ${params[0].seriesName}：
               ${Number(params[0].value[1])}<br/>
                ${params[1].marker} ${params[1].seriesName}：
                ${Number(params[1].value[1])}<br/>
                ${params[2].marker} ${params[2].seriesName}：
                ${Number(params[2].value[1])}<br/>
                ${params[3].marker} ${params[3].seriesName}：
                ${Number(params[3].value[1])}<br/>
               `;
            }
            return `
               ${params[0].marker} ${params[0].seriesName}：
               ${Number(params[0].value[1])}<br/>
                ${params[1].marker} ${params[1].seriesName}：
                ${Number(params[1].value[1])}<br/>`;
          },
        },
        legend: {
          data: this.legend,
          top: '30',
          right: '5',
        },
        xAxis: {
          name: '实时',
          type: 'time',
          splitLine: { show: true },
          minorSplitLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
            onZero: false,
          },
        },
        yAxis: {
          nameTextStyle: {
            fontWeight: 400,
          },
          splitLine: { show: true },
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value}',
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: this.legend[0],
            type: 'line',
            data: this.nowValue2 ? this.nowValueList : this.thresholdList,
            lineStyle: {
              type: 'dashed',
            },
            symbol: 'none',
          },
          {
            name: this.legend[1],
            type: 'line',
            data: this.nowValue2 ? this.nowValueList2 : this.nowValueList,
            symbol: 'none',
          },
          {
            name: this.legend[2],
            type: 'line',
            data: this.nowValue2 ? this.nowValueList3 : this.nowValueList2,
            symbol: 'none',
          },
          {
            name: this.legend[3],
            type: 'line',
            data: this.nowValue2 ? this.nowValueList4 : this.nowValueList3,
            symbol: 'none',
          },
          {
            name: this.legend[4],
            type: 'line',
            data: this.nowValueList4,
            symbol: 'none',
          },
        ],
      };
      this.chart.setOption(option, true);
    },
  },
  watch: {
    nowValue(val) {
      if (this.nowValueList.length === 60) {
        this.nowValueList.shift();
        if (this.nowValue2) {
          this.nowValueList2.shift();
          this.nowValueList3.shift();
          this.nowValueList4.shift();
        } else {
          this.thresholdList.shift();
        }
      }
      this.nowValueList.push(val);
      if (this.nowValue2) {
        this.nowValueList2.push(this.nowValue2);
        this.nowValueList3.push(this.nowValue3);
        this.nowValueList4.push(this.nowValue4);
      } else {
        this.thresholdList.push(this.threshold);
      }
      this.drawChart();
    },
  },
};
</script>
