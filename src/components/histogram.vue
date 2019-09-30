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
    lineData: {
      type: Object,
      default: () => ({
        bars: [],
        data: [],
      }),
    },
    colors: {
      type: String,
      default: '#8FD866',
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
      this.initChart(this.lineData);
      this.resizeHandler = () => {
        if (this.chart) {
          this.chart.resize();
        }
      };
      window.addEventListener('resize', this.resizeHandler);
    },
    initChart(data) {
      this.chart = echarts.init(this.$el);

      this.chart.setOption({
        // title: {
        //   text: this.title,
        //   padding: [17, 27],
        //   textStyle: {
        //     fontFamily: 'PingFangSC-Medium,PingFangSC',
        //     fontSize: 24,
        //     fontWeight: 'bold',
        //   },
        // },
        tooltip: {
          // trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: data.bins,
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
            color: this.colors,
            type: 'bar',
            barWidth: '50%',
            data: data.data,
          },
        ],
      });
    },
  },
  watch: {
    lineData() {
      this.drawChart();
    },
  },
};
</script>
