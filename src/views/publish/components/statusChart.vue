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
    yTitle: {
      type: String,
      default: '电流（A）',
    },
    lineData: {
      type: Object,
      default: () => ({
        date_list: ['0', '1', '2', '3', '5'],
        data_list: ['6', '-1', '2', '3', '2'],
        predict_data_list: ['2', '2', '2', '2', '2'],
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
          // textAlign: 'auto',
          left: '40%',
          top: '16',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: this.legend,
          top: '20',
          right: '20',
        },
        xAxis: {
          name: '时间',
          type: 'category',
          data: this.lineData.date_list,
          splitLine: { show: false },
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
          name: this.yTitle,
          nameTextStyle: {
            fontWeight: 400,
          },
          // nameGap: 30,
          type: 'value',
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
            data: this.lineData.predict_data_list,
            lineStyle: {
              type: 'dashed',
            },
            symbol: 'none',
          },
          {
            name: this.legend[1],
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
