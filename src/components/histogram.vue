<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts';

require('echarts/theme/macarons');

export default {
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '555px',
    },
    height: {
      type: String,
      default: '300px',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      chart: null,
      xData: [],
      yData: [],
    };
  },
  mounted() {
    this.drawChart();
  },
  beforeDestroy() {
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

      this.chart.setOption({
        title: {
          text: this.title,
        },
        tooltip: {
          // trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
          splitLine: { show: false },
          axisLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            splitLine: { show: false },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '50%',
            data: [0.2, 0.35, 0.5, 0.65, 0.8, 0.5, 0.6, 0.25, 0.18, 0.2],
          },
        ],
      });
    },
  },
};
</script>
