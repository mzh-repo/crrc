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
        data_list: [0.1, 0.3, 0.6, 0.2, 0.5, 0.7, 0.38, 0.2, 0.4],
        predict_data_list: [0.2, 0.5, 0.7, 0.6, 0.2, 0.46, 0.1, 0.3, 0.6],
        id_list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
      default: true,
    },
    // 标题内容
    title: {
      type: String,
      // default: '近期训练',
    },
    xName: {
      type: String,
    },
    yName: {
      type: String,
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
      const myChart = this.$echart.init(this.$el);
      this.initChart(myChart, this.dataSet, this.colors);
      // 容器高宽自适应
      window.onresize = () => {
        myChart.resize();
      };
    },
    initChart(myChart, data, colors) {
      const options = {
        legend: {},

        title: {
          text: this.title || '',
          textStyle: {
            fontSize: '24',
            fontWeight: 'normal',
          },
          left: 24,
          top: 17,
        },
        xAxis: {
          type: 'category',
          show: this.showXAxis,
          data: data.id_list,
          // axisLine: { show: false },
          axisTick: { show: false },
          name: this.xName,
        },
        yAxis: {
          splitLine: { show: false },
          // axisLine: { show: false },
          axisTick: { show: false },
          name: this.yName,
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
      };
      // 首页存在纵坐标, 加边框值，及tooltip
      if (this.yName) {
        Object.assign(options, {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: 'id: {b} <br/>  预测: {c0} <br/> 实际: {c1}',
          },
          grid: {
            x: 70, // 坐标轴左边与边框的距离
            y: 100, // 坐标轴顶端与边框的距离
            x2: 70, // 坐标轴右边与边框的距离
            y2: 50, // 坐标轴底端与边框的距离
          },
        });
      }
      myChart.setOption(options);
    },
  },
  watch: {
    dataSet() {
      this.drawBar();
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
}
</style>
