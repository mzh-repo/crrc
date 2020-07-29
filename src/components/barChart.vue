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
        data_list: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
        predict_data_list: [0.18, 0.17, 0.16, 0.2, 0.18, 0.17, 0.19, 0.24],
        // id_list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        name: [],
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
    },
    xName: {
      type: String,
      default: '训练轮数',
    },
    yName: {
      type: String,
    },
    showTip: {
      type: Boolean,
      default: false,
    },
    tooltipList: {
      type: Array,
      default: () => ['实际Loss', '预测Loss'],
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
        legend: {
          top: 20,
          right: 20,
        },
        title: {
          text: this.title || '',
          textStyle: {
            fontSize: '24',
            fontWeight: 'normal',
          },
          left: 24,
          top: 17,
          subtext: this.showTip ? '移动鼠标至对应柱状图查看详情' : '',
        },
        xAxis: {
          type: 'category',
          show: this.showXAxis,
          data: data.name,
          axisLine: { show: true },
          axisTick: { show: true },
          axisLable: { show: true },
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
            name: this.tooltipList[0],
            type: data.type,
            data: data.data_list,
            color: colors[0],
            barGap: 0,
            barWidth: '20%',
          },
          {
            name: this.tooltipList[1],
            type: data.type,
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
