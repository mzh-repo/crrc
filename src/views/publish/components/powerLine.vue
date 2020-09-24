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
    // 除多目标外只有预测一条线
    chartType: {
      type: String,
      default: '',
    },
    // 1,2 map [静态, 动态]  UPDATE:2020/06/06
    moveType: {
      type: Number,
      default: 1,
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
               ${params[0].marker} ${params[0].seriesName}：
               ${Number(params[0].value).toFixed(2)}<br/>
                ${params[1].marker} ${params[1].seriesName}：
                ${Number(params[1].value).toFixed(2)}<br/>
               `;
          },
        },
        legend: {
          data: this.legend,
        },
        xAxis: {
          name: '行驶路程(%)',
          // show: false,
          nameLocation: 'center',
          nameTextStyle: {
            padding: [20, 0, 0, 0],
          },
          type: 'category',
          boundaryGap: false,
          data: this.lineData.date_list,
          splitLine: { show: false },
          // min: 100,
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            // formatter: (value) => Math.floor(value * 10) / 10,
            // formatter: (value, index) =>
            //   Math.floor(((index + 1) / this.lineData.date_list.length) * 100),
            showMinLabel: true,
            showMaxLabel: true,
            formatter: (value) => (value * 100).toFixed(1),
            // showMaxLabel: true,
          },
          axisLine: {
            // show: false,
            symbol: ['none', 'arrow'],
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: { show: false },
          min: 0,
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
      if (this.moveType === 2) {
        Object.assign(option, {
          animation: true,
          animationEasing: 'elasticIn',
          animationThreshold: 100000,
          animationDuration: 100000,
        });
      }
      // if (this.lineData.green) {
      //   Object.assign(option, {
      //     series: [
      //       {
      //         name: this.legend[0],
      //         type: 'line',
      //         data: this.lineData.predict_data_list,
      //         symbol: 'none',
      //       },
      //       {
      //         name: this.legend[1],
      //         type: 'line',
      //         data: this.lineData.data_list,
      //         symbol: 'none',
      //       },
      //       {
      //         name: this.legend[2],
      //         type: 'line',
      //         data: this.lineData.green,
      //         symbol: 'none',
      //       },
      //     ],
      //   });
      //   if (this.lineData.ratio) {
      //     Object.assign(option, {
      //       title: {
      //         text: this.title,
      //         subtext: `预测能耗(实际级位)与实际能耗(实际级位)平均差异：${
      //           this.lineData.ratio
      //         }`,
      //       },
      //     });
      //   }
      // }
      if (this.chartType === 'precit') {
        Object.assign(option, {
          tooltip: {
            trigger: 'axis',
            formatter(params) {
              return `
               ${params[0].marker} ${params[0].seriesName}：${params[0].value}`;
            },
          },
          series: [
            {
              name: this.legend[0],
              type: 'line',
              data: this.lineData.predict_data_list,
              symbol: 'none',
            },
          ],
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
