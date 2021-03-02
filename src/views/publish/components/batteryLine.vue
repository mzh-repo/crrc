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
      type: Object,
      default: () => ({
        date_list: [],
        data_list: [],
        predict_data_list: [],
      }),
    },
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
               ${params[0].marker} ${params[0].seriesName}：${params[0].value * 100}%
               `;
          },
        },
        xAxis: {
          name: '行驶路程(%)',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [20, 0, 0, 0],
          },
          type: 'category',
          boundaryGap: false,
          data: this.lineData.date_list,
          splitLine: { show: false },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            showMinLabel: true,
            showMaxLabel: true,
            formatter: (value) => (value * 100).toFixed(1),
          },
          axisLine: {
            symbol: ['none', 'arrow'],
          },
        },
        yAxis: {
          type: 'value',
          name: '百分比(%)',
          axisLabel: {
            formatter: (value) => value * 100,
          },
          splitLine: { show: false },
          min: 0,
        },
        series: [
          {
            name: this.title,
            type: 'line',
            data: this.lineData.data_list,
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
