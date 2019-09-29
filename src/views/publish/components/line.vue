<template>
  <div v-if="lineData.date_list"
       :class="className"
       :style="{height:height,width:width}" />
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
      default: '555px',
    },
    height: {
      type: String,
      default: '300px',
    },
    title: {
      type: String,
      default: '推荐牵引力 kN',
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
      chart: null,
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
          trigger: 'axis',
        },
        legend: {
          data: ['推荐', '实例'],
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.lineData.date_list,
          splitLine: { show: false },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: { show: false },
          axisTick: {
            // y轴刻度线
            show: false,
          },
          // axisLine: {
          //   // y轴
          //   show: false,
          // },
        },
        series: [
          {
            name: '推荐',
            type: 'line',
            data: this.lineData.data_list,
            symbol: 'none',
          },
          {
            name: '实例',
            type: 'line',
            data: this.lineData.predict_data_list,
            symbol: 'none',
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
