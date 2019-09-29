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
      }),
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
        grid: {
          left: '50px',
          right: '50px',
        },
        dataset: {
          source: [
            // ['product', '0', '20', '40', '60', '80', '100', '120'],
            // ['train', 0.6, 0.4, 0.6, 0.5, 0.48, 0.3, 0.2],
            // ['valldation', 1.0, 0.8, 0.4, 0.35, 0.32, 0.22, 0.2],
            // {
            //   name: 'data',
            //   data: this.lineData.data_list,
            //   symbol: 'none',
            // },
            // {
            //   name: 'validation',
            //   type: 'line',
            //   data: this.lineData.validation_list,
            //   symbol: 'none',
            // },
          ],
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: { show: false },
          axisTick: {
            show: false,
          },
          data: this.lineData.x_list,
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          min: 0.2,
          gridIndex: 0,
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
            name: 'data',
            data: this.lineData.data_list,
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
            name: 'validation',
            smooth: true,
            data: this.lineData.validation_list,
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
