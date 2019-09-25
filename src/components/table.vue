 <template>
  <el-container>
    <el-col class="table-header">
      <span class="header-title">数据展示</span>
      <span class="header-number">Loss <span class="loss">{{loss}}</span></span>
    </el-col>
    <el-col class="table-title">
      <span>监控数据</span>
    </el-col>
    <el-table :data="tableData"
              style="width: 100%"
              :max-height="500">
      <template v-for="item in tableTitle">
        <el-table-column :prop="item.prop"
                         :label="item.laber"
                         :key="item.prop">
        </el-table-column>
      </template>

    </el-table>
  </el-container>
</template>

<script>
export default {
  props: {
    loss: {
      type: Number,
      default: 15.2,
    },
    tableData: {
      type: Array,
      default: () => [
        {
          id: '1',
          date: '2019.08.12',
          time: '19:00:00',
          speed: '12',
          remain_dist: '121',
          remain_time: '343',
          slope: '12',
          alpha: '12',
          force: '65',
        },
        {
          id: '2',
          date: '2019.08.12',
          time: '19:00:00',
          speed: '12',
          remain_dist: '121',
          remain_time: '343',
          slope: '12',
          alpha: '12',
          force: '65',
        },
        {
          id: '3',
          date: '2019.08.12',
          time: '19:00:00',
          speed: '12',
          remain_dist: '121',
          remain_time: '343',
          slope: '12',
          alpha: '12',
          force: '65',
        },
        {
          id: '4',
          date: '2019.08.12',
          time: '19:00:00',
          speed: '12',
          remain_dist: '121',
          remain_time: '343',
          slope: '12',
          alpha: '12',
          force: '65',
        },
        {
          id: '5',
          date: '2019.08.12',
          time: '19:00:00',
          speed: '12',
          remain_dist: '121',
          remain_time: '343',
          slope: '12',
          alpha: '12',
          force: '65',
        },
      ],
    },
    tableTitle: {
      type: Array,
      default: () => [
        {
          laber: '编号',
          prop: 'id',
        },
        {
          laber: 'date',
          prop: 'date',
        },
        {
          laber: 'time',
          prop: 'time',
        },
        {
          laber: 'speed',
          prop: 'speed',
        },
        {
          laber: 'remain_dist',
          prop: 'remain_dist',
        },
        {
          laber: 'remain_time',
          prop: 'remain_time',
        },
        {
          laber: 'slope',
          prop: 'slope',
        },
        {
          laber: 'alpha',
          prop: 'alpha',
        },
        {
          laber: 'force',
          prop: 'force',
        },
      ],
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  // height: auto;
  padding: 42px 60px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid rgba(225, 225, 225, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular, PingFangSC;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 23px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
}

.header-number {
  font-size: 17px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
}

.table-title {
  margin: 18px 0 31px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 17px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 25px;
}

.loss {
  margin-left: 15px;
}

/deep/.el-table {
  height: 500px;
}

/deep/.el-table__header .cell {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
}

/deep/.el-table .is-leaf {
  height: 60px;
  border-top: 3px solid rgba(102, 102, 102, 1);
  border-bottom: 1px solid rgba(102, 102, 102, 1);
}

/deep/.el-table td {
  height: 50px;
  border: 0;
}

/deep/.el-table::before {
  height: 0;
}

/deep/.el-table__body {
  margin: 15px 0 0;
  .cell {
    font-size: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
}

/deep/.cell {
  text-align: center;
}
</style>
