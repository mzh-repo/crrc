<template>
  <div>
    <!-- <template v-if="showAgain"> -->
    <template v-if="resultType === 2">
      <move-train :current="current" />
    </template>
    <template v-else>
      <move-train />
    </template>
    <!-- </template> -->
    <el-row :gutter="19"
            class="chart-container">
      <el-col :span="24">
        <div class="chart-box">
          <mzh-line title="手柄级位(实时)"
                    :yArea="yArea"
                    :lineData="dynasticDataOne" />
        </div>
      </el-col>
      <el-col :span="24">
        <div class="chart-box">
          <power-line title="能耗(实时) kW·h"
                      :legend="legend"
                      :lineData="dynasticDataTwo" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Line from './line.vue';
import MovingTrain from './movingTrain.vue';
import PowerLine from './powerLine.vue';

export default {
  components: {
    'mzh-line': Line,
    'move-train': MovingTrain,
    PowerLine,
  },
  props: {
    resultType: {
      type: Number,
    },
  },
  data() {
    return {
      dynasticDataOne: {
        date_list: [],
        data_list: [],
        predict_data_list: [],
      },
      dynasticDataTwo: {
        date_list: [],
        data_list: [],
        predict_data_list: [],
        green: [],
      },
      yArea: [],
    };
  },
  mounted() {
    const { dataBase } = this.$store.state;
    if (dataBase === 1) {
      this.type = 2;
      this.yArea = ['100', '-100'];
    } else {
      this.yArea = ['7', '-7'];
      this.type = 3;
    }
    this.getData();
  },
  methods: {
    getData() {
      if (this.$store.state.modelDatasetId !== '') {
        this.dataSetId = this.$store.state.modelDatasetId;
      } else {
        this.dataSetId = this.$store.state.dataSelected;
      }
      this.$axios
        .get(`form/graph?model_type=${this.type}&dataset_id=${this.dataSetId}`)
        .then((res) => {
          this.renderData(res);
        });
    },
    renderData(val) {
      const dataIndex = val.level.data_list.length;
      for (let i = 0; i < dataIndex; i += 1) {
        this.time = setTimeout(() => {
          this.current = Math.ceil(((i + 1) / (dataIndex + 1)) * 100);
          if (i > 200) {
            this.dynasticDataOne.data_list.shift();
            this.dynasticDataOne.predict_data_list.shift();
            // this.dynasticDataOne.date_list.shift();
            this.dynasticDataTwo.data_list.shift();
            this.dynasticDataTwo.predict_data_list.shift();
            this.dynasticDataTwo.green.shift();
            // this.dynasticDataTwo.date_list.shift();
            const data = {
              data_list: [
                ...this.dynasticDataOne.data_list,
                val.level.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataOne.predict_data_list,
                val.level.predict_data_list[i],
              ],
            };
            const powerData = {
              data_list: [
                ...this.dynasticDataTwo.data_list,
                val.energy_consumption.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataTwo.predict_data_list,
                val.energy_consumption.predict_data_list[i],
              ],
              green: [
                ...this.dynasticDataTwo.green,
                val.energy_consumption.green[i],
              ],
            };
            this.dynasticDataOne = data;
            this.dynasticDataTwo = powerData;
          } else {
            const data = {
              data_list: [
                ...this.dynasticDataOne.data_list,
                val.level.data_list[i],
              ],

              predict_data_list: [
                ...this.dynasticDataOne.predict_data_list,
                val.level.predict_data_list[i],
              ],
            };
            const powerData = {
              data_list: [
                ...this.dynasticDataTwo.data_list,
                val.energy_consumption.data_list[i],
              ],
              predict_data_list: [
                ...this.dynasticDataTwo.predict_data_list,
                val.energy_consumption.predict_data_list[i],
              ],
              green: [
                ...this.dynasticDataTwo.green,
                val.energy_consumption.green[i],
              ],
            };
            this.dynasticDataOne = data;
            this.dynasticDataTwo = powerData;
          }
        }, 100 * i);
      }
    },
  },
};
</script>

<style></style>
