<template>
  <div :style="{height:'318px',width:'100%'}" />
</template>

<script>
import echarts from 'echarts';

require('echarts/theme/macarons');

export default {
  props: {
    lineData: {
      type: Object,
      default: () => ({
        x_list: [],
        data_list: [],
        validation_list: [],
        record_list: [],
      }),
    },
    colors: {
      type: Array,
      default: () => ['#ff0000', '#00C4C0', '#54A8F7'],
    },
    legend: {
      type: Array,
      default: () => [],
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
        tooltip: {
          showContent: false,
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: this.legend,
        },
        grid: {
          left: '50px',
          right: '50px',
        },
        dataset: {
          source: [],
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: { show: false },
          axisTick: {
            show: false,
          },
          data: this.lineData.x_list || [],
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          gridIndex: 0,
          max: 1,
          min: 0,
          splitLine: { show: false },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            formatter: '{value}',
          },
        },
        series: [
          {
            type: 'line',
            // color: this.colors[0],
            name: this.legend[0],
            data: this.lineData.data_list || [],
            smooth: true,
            seriesLayoutBy: 'row',
            lineStyle: {
              normal: {
                width: 3,
                shadowColor: '#ff0000',
                shadowBlur: 30,
                shadowOffsetY: 20,
              },
            },
          },
          {
            type: 'line',
            // color: this.colors[1],
            name: this.legend[1],
            smooth: true,
            data: this.lineData.validation_list || [],
            seriesLayoutBy: 'row',
            lineStyle: {
              normal: {
                width: 3,
                shadowColor: '#00C4C0',
                shadowBlur: 30,
                shadowOffsetY: 20,
              },
            },
          },
          {
            type: 'line',
            // color: this.colors[2],
            name: this.legend[2],
            smooth: true,
            data: this.lineData.record_list || [],
            seriesLayoutBy: 'row',
            lineStyle: {
              normal: {
                width: 3,
                shadowColor: '#54A8F7',
                shadowBlur: 30,
                shadowOffsetY: 20,
              },
            },
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
