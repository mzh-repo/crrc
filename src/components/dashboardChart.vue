<template>
  <div ref="chart"
       class="chart"></div>
</template>

<script>
export default {
  props: {
    dataSet: {
      type: Object,
      default: () => ({
        value: '50',
        name: '电量',
      }),
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.drawBar();
  },
  methods: {
    drawBar() {
      const myChart = this.$echart.init(this.$el);
      this.initChart(myChart, this.dataSet);
      // 容器高宽自适应
      window.onresize = () => {
        myChart.resize();
      };
    },
    initChart(myChart, data) {
      const options = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}',
        },
        series: [
          {
            name: '实时',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: data.value, name: data.name }],
          },
        ],
      };
      myChart.setOption(options, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 300px;
}
</style>
