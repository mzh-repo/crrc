<template>
  <div :class="className"
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
    lineData: {
      type: Object,
      default: () => ({
        date_list: [],
        data_list: [],
        predict_data_list: [],
      }),
    },
    legend: {
      type: Array,
      default: () => ['预测', '实际'],
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
    // initChart() {
    //   this.chart = echarts.init(this.$el);
    //   this.chart.setOption(
    //     {
    //       title: {
    //         text: this.title,
    //       },
    //       tooltip: {
    //         trigger: 'axis',
    //       },
    //       legend: {
    //         data: [this.yTitle, '实际'],
    //       },
    //       xAxis: {
    //         type: 'category',
    //         boundaryGap: false,
    //         data: this.lineData.date_list,
    //         splitLine: { show: false },
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           show: false,
    //         },
    //       },
    //       yAxis: {
    //         type: 'value',
    //         axisLabel: {
    //           formatter: '{value}',
    //         },
    //         splitLine: { show: false },
    //         axisTick: {
    //           // y轴刻度线
    //           show: false,
    //         },
    //         // axisLine: {
    //         //   // y轴
    //         //   show: false,
    //         // },
    //       },
    //       series: [
    //         {
    //           name: this.yTitle,
    //           type: 'line',
    //           data: this.lineData.predict_data_list,
    //           symbol: 'none',
    //         },
    //         {
    //           name: '实际',
    //           type: 'line',
    //           data: this.lineData.data_list,
    //           symbol: 'none',
    //         },
    //       ],
    //     },
    //     true,
    //   );
    // },
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
          name: '时间(s)',
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
            // rotate: 50,
            formatter: value => Math.floor(value * 10) / 10,
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
          axisLine: {
            // y轴
            show: false,
          },
          max: 40,
          min: 0,
        },
        series: [
          {
            name: this.yTitle,
            type: 'line',
            data: this.lineData.predict_data_list,
            symbol: 'none',
          },
          {
            name: '实际',
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
