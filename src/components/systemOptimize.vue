<template>
  <div style="margin-bottom: 20px">
    <el-row>
      <el-row>
        <el-col v-for="(item, index) in 3"
                :span="8"
                :key="index">
          <img :src="require(`../assets/images/system_${index + 1}.jpg`)" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <h1>车辆区间能耗(平均)</h1>
          <el-table :data="tableData"
                    border
                    show-summary
                    style="width: 100%">
            <el-table-column prop="id"
                             sortable
                             label="序号"
                             width="180"> </el-table-column>
            <el-table-column prop="name"
                             label="区间"> </el-table-column>
            <el-table-column prop="distance"
                             label="距离km"> </el-table-column>
            <el-table-column prop="energy"
                             label="区间运行能耗kWh"> </el-table-column>
          </el-table>
          <div style="padding: 12px 0; text-align: right">单公里能耗: <strong>4.93</strong>kwh</div>
        </el-col>
        <el-col :span="12">
          <h1>站点充电能耗(平均)</h1>
          <el-table :data="energyData"
                    border
                    show-summary
                    style="width: 100%">
            <el-table-column prop="name"
                             label="站点名称"> </el-table-column>
            <el-table-column prop="value1"
                             label="上行/kWh"> </el-table-column>
            <el-table-column prop="value2"
                             label="下行/kWh"> </el-table-column>
            <el-table-column prop="value3"
                             label="站点累计/kWh"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 0,
          name: '香山~植物园',
          distance: '1.669',
          energy: '7.12',
        },
        {
          id: 1,
          name: '植物园~万安公墓',
          distance: '1.310',
          energy: '6.65',
        },
        {
          id: 2,
          name: '万安公墓~玉泉郊野公园',
          distance: '1.107',
          energy: '6.03',
        },
        {
          id: 3,
          name: '玉泉郊野公园~颐和园西门',
          distance: '1.320',
          energy: '6.71',
        },
        {
          id: 4,
          name: '颐和园西门~颐和园南门',
          distance: '1.256',
          energy: '6.34',
        },
      ],
      energyData: [
        {
          name: '香山',
          value1: '0',
          value2: '7.12',
          value3: '7.12',
        },
        {
          name: '植物园',
          value1: '7.12',
          value2: '6.65',
          value3: '13.77',
        },

        {
          name: '万安公墓',
          value1: '6.65',
          value2: '6.03',
          value3: '12.68',
        },
        {
          name: '玉泉郊野公园',
          value1: '6.03',
          value2: '6.71',
          value3: '12.74',
        },
        {
          name: '颐和园西门',
          value1: '6.71',
          value2: '6.34',
          value3: '13.05',
        },
        {
          name: '颐和园南门',
          value1: '6.34',
          value2: '0',
          value3: '6.34',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 400;
}
</style>
