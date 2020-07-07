<template>
  <div :class="className"
       :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'; // echarts theme

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
    threshold: {
      type: Array,
    },
  },
  data() {
    return {
      chart: '',
      nowValueList: [],
      thresholdList: [],
    };
  },
  mounted() {
    this.drawChart();
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
          left: '30%',
          top: '5',
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            return `
               ${params[0].marker} ${params[0].seriesName}：
               ${Number(params[0].value[1])}<br/>
                ${params[1].marker} ${params[1].seriesName}：
                ${Number(params[1].value[1])}<br/>
               `;
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
          splitLine: { show: false },
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
            data: this.thresholdList,
            lineStyle: {
              type: 'dashed',
            },
            symbol: 'none',
          },
          {
            name: this.legend[1],
            type: 'line',
            data: this.nowValueList,
            symbol: 'none',
          },
        ],
      };
      this.chart.setOption(option, true);
    },
  },
  watch: {
    nowValue(val) {
      this.nowValueList.push(val);
      this.thresholdList.push(this.threshold);
      this.drawChart();
    },
  },
};
</script>
