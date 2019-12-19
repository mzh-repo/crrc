<template>
  <div :class="className"
       :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'; // echarts theme

require('echarts/theme/macarons');

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
    title: {
      type: String,
      default: '电量',
    },
    yTitle: {
      type: String,
      default: '预测',
    },
    lineData: {
      type: Array,
      default: () => [],
    },
    // legend: {
    //   type: Array,
    //   default: () => ['预测', '实际'],
    // },
  },
  data() {
    return {
      chart: '',
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
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            return `
               ${params[0].marker} ${params[0].seriesName}：${params[0].value}

               `;
          },
        },
        // legend: {
        //   data: this.legend,
        // },
        xAxis: {
          name: '路程(m)',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [20, 0, 0, 0],
          },
          type: 'category',
          boundaryGap: false,
          data: this.lineData,
          splitLine: { show: false },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            // rotate: 50,
            formatter: value => Math.floor(value * 10) / 10,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          name: '百分比(%)',
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: { show: false },
          axisTick: {
            // y轴刻度线
            show: false,
          },
          axisLine: {
            // y轴
            show: false,
          },
          // max: 40,
          // min: 0,
        },
        series: [
          {
            // name: this.legend[0],
            name: this.title,
            type: 'line',
            data: this.lineData,
            symbol: 'none',
          },
        ],
      };
      this.chart.setOption(option, true);
    },
  },
  watch: {
    lineData() {
      this.drawChart();
    },
  },
};
</script>
