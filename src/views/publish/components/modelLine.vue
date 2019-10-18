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
    yTitle: {
      type: String,
      default: '预测',
    },
    title: {
      type: String,
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
      originData: [],
      predictData: [],
      time: '',
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
      this.getDynastic();
      // this.initChart();
      this.resizeHandler = () => {
        if (this.chart) {
          this.chart.resize();
        }
      };
      window.addEventListener('resize', this.resizeHandler);
    },
    getDynastic() {
      return new Promise((resolve, reject) => {
        if (!this.lineData.date_list) {
          reject();
        } else {
          resolve();
          for (let i = 0; i < this.lineData.data_list.length; i += 1) {
            this.time = setTimeout(() => {
              this.originData = this.originData.concat(
                this.lineData.data_list[i],
              );
              this.predictData = this.predictData.concat(
                this.lineData.predict_data_list[i],
              );
              this.initChart();
            }, 500);
          }
        }
      });
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
          data: [this.yTitle, '实际'],
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
          axisLine: { show: false },
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
            name: this.yTitle,
            type: 'line',
            data: this.predictData,
            symbol: 'none',
          },
          {
            name: '实际',
            type: 'line',
            data: this.originData,
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
