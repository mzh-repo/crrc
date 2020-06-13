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
        // name: '电量',
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
      let colorList = [
        [0.5, '#FF5B59'],
        [0.75, '#FFCB33'],
        [1, '#97E9D5'],
      ];

      if (this.dataSet.value < 50) {
        colorList = [
          [0.5, '#97E9D5'],
          [0.75, '#FFCB33'],
          [1, '#FF5B59'],
        ];
      }
      const options = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}',
        },
        series: [
          {
            name: '实时',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            detail: { formatter: (value) => value.toFixed(2) },
            title: {
              show: false,
            },
            data: [{ value: data.value, name: data.name }],
            radius: '90%',
            // min: 60,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                color: colorList,
                width: 10,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                global: true,
              },
            },
            axisTick: {
              lineStyle: {
                color: 'auto',
              },
            },
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
  height: 240px;
}
</style>
