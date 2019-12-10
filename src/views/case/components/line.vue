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
      default: '推荐牵引力 kN',
    },
    yTitle: {
      type: String,
      default: '预测',
    },
    legend: {
      type: Array,
      default: () => ['预测', '实际'],
    },
    lineData: {
      type: Object,
      default: () => ({
        date_list: [],
        data_list: [],
        predict_data_list: [],
      }),
    },
    yArea: {
      type: Array,
      default: () => [],
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
        },
        legend: {
          data: this.legend,
        },
        xAxis: {
          name: '路程(m)',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [20, 0, 0, 0],
          },
          type: 'category',
          // boundaryGap: false,
          data: this.lineData.date_list,
          splitLine: { show: false },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            // rotate: 50,
            formatter: value => Math.floor(value * 10) / 10,
          },
          boundaryGap: ['20%', '20%'],
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
          axisLine: {
            // y轴
            show: false,
          },
        },
        series: [
          {
            name: this.legend[0],
            type: 'line',
            data: this.lineData.predict_data_list,
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
      if (this.lineData.green) {
        Object.assign(option, {
          series: [
            {
              name: this.legend[0],
              type: 'line',
              data: this.lineData.predict_data_list,
              symbol: 'none',
            },
            {
              name: this.legend[1],
              type: 'line',
              data: this.lineData.data_list,
              symbol: 'none',
            },
            {
              name: this.legend[2],
              type: 'line',
              data: this.lineData.green,
              symbol: 'none',
            },
          ],
        });
      }
      if (this.yArea.length > 0) {
        Object.assign(option, {
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
            axisLine: {
              // y轴
              show: false,
            },
            max: this.yArea[0],
            min: this.yArea[1],
          },
        });
      }
      if (this.lineData.ratio) {
        Object.assign(option, {
          title: {
            text: this.title,
            subtext: `预测能耗(实际级位)与实际能耗(实际级位)平均差异：${
              this.lineData.ratio
            }`,
          },
        });
      }

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
