<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts';
// import ecStat from 'echarts-stat';

require('echarts/theme/macarons');

export default {
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '550px',
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
      default: () => ({}),
      // bars: [],
      // data: [],
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
      // const chartData = ecStat.histogram(data);
      // console.log(chartData);
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
        // tooltip: {
        //   // trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow',
        //   },
        // },
        // grid: {
        //   left: '3%',
        //   right: '3%',
        //   bottom: '3%',
        //   containLabel: true,
        // },
        title: {
          text: this.title,
          padding: [17, 27],
          textStyle: {
            fontFamily: 'PingFangSC-Medium,PingFangSC',
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        xAxis: [
          {
            name: '数值范围',
            nameLocation: 'center',
            nameTextStyle: {
              padding: 10,
            },
            type: 'value',
            scale: true,
            data: data.x_list,
            // data: data.bins,
            // axisTick: {
            //   // alignWithLabel: true,
            //   show: false
            // },
            // splitLine: { show: false },
            axisLine: {
              show: false,
            },
            // axisLabel: {
            //   interval: 0,
            //   rotate: 45
            //   // align: 'left',
            // }
            splitLine: {
              show: false,
            },
            axisLabel: {
              formatter: value => Math.floor(value * 10) / 10,
            },
            max: data.max,
            min: data.min,
            interval: data.interval,
            splitNumber: data.split_number,
          },
        ],
        yAxis: [
          {
            //   type: 'value',
            //   splitLine: { show: false },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            // },
            type: 'value',
            axisLabel: {
              formatter: value => value * 100,
            },
            name: '占比(%)',
            // position: 'left',
            nameLocation: 'center',
            nameGap: 30,
          },
        ],
        series: [
          {
            name: '直接访问',
            color: this.colors,
            type: 'bar',
            // type: 'value',
            barWidth: '99.3%',
            // barWidth: '50%',
            // data: data.data,
            data: data.data,
            // barCategoryGap: '0%',
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
