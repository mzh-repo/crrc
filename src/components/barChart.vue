<template>
  <div ref="chart"
       class="chart">
  </div>
</template>

<script>
export default {
  props: {
    dataSet: {
      type: Object,
      default: () => ({
        data_list: [0.1, 0.3, 0.6, 0.2, 0.5, 0.7, 1.0, 0.2, 0.4],
        predict_data_list: [0.2, 0.5, 0.7, 0.6, 0.2, 1.0, 0.1, 0.3, 0.6],
        id_list: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      }),
    },
    // 柱形配色
    colors: {
      type: Array,
      default: () => ['#00C4C0', '#FFB539'],
    },
    // 容器高度
    height: {
      type: String,
      default: '296px',
    },
    // 是否展示 x 轴坐标,对应 id_list的值
    showXAxis: {
      type: Boolean,
      default: false,
    },
    // 标题内容
    title: {
      type: String,
      // default: '近期训练',
    },
  },
  data() {
    return {
      chartId: new Date().valueOf(),
    };
  },
  mounted() {
    this.$refs.chart.style.height = this.height;
    this.drawBar();
  },
  methods: {
    drawBar() {
      const myChart = this.$echart.init(this.$refs.chart);
      this.initChart(myChart, this.dataSet, this.colors);
      // 容器高宽自适应
      window.onresize = () => {
        myChart.resize();
      };
    },
    initChart(myChart, data, colors) {
      myChart.setOption({
        legend: {},
        tooltip: {},
        title: {
          text: this.title || '',
          textStyle: {
            fontSize: 24,
            fontWeight: 'bolder',
          },
          left: 24,
          top: 17,
        },
        xAxis: {
          type: 'category',
          show: this.showXAxis,
          data: data.id_list,
          axisLine: { show: false },
          axisTick: { show: false },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
        },
        series: [
          {
            type: 'bar',
            data: data.data_list,
            color: colors[0],
            barGap: 0,
            barWidth: '20%',
          },
          {
            type: 'bar',
            data: data.predict_data_list,
            color: colors[1],
            barWidth: '20%',
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
}
</style>
