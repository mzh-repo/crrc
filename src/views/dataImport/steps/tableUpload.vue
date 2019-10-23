<template>
  <el-container class="wrap">
    <el-row class="select"
            type="flex"
            justify="start"
            align="middle">
      <label>选择数据库</label>
      <el-select v-model="value"
                 placeholder="">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-row>
    <label class="file-label">选择文件</label>
    <el-row v-if="fileStatus === 0"
            type="flex"
            class="file-box center"
            align="middle">
      <svg-icon icon-class="绿色加号" />
      <div class="upload">上传文件</div>
      <input type="file"
             class="input-file"
             accept=".csv"
             @change="fileChange" />
    </el-row>
    <el-row v-if="fileStatus===1"
            type="flex"
            class="start show"
            align="middle">
      <svg-icon icon-class="数据导入-文件"
                class="import-file" />
      <div class="delete">{{file[0].name}}</div>
      <div @click="deleteFile()"
           class="import-delete">
        <svg-icon icon-class="数据导入-取消" />
      </div>
    </el-row>
    <label v-if="fileStatus===1"
           class="file-label">数据集配置</label>
    <div v-if="fileStatus===1"
         class="data-set">
      <compound-input v-for="(item,index) in array"
                      :title="item"
                      :key="item"
                      :index="index"
                      :select="sqlSettings[index]"
                      :options="compoundInput"
                      @selected="handleSelectChange" />
    </div>
    <el-row v-if="fileStatus===1"
            class="db-name"
            type="flex"
            justify="start"
            align="middle">
      <label>数据集名称</label>
      <el-input v-model="DBName"
                placeholder=""></el-input>
    </el-row>
  </el-container>
</template>

<script>
import CompoundInput from '../../../components/compoundInput.vue';

export default {
  components: { CompoundInput },
  data() {
    return {
      // array: ['ID', '时间', '坡度', '曲线', '速度', '位置', '客流预测'],
      array: [],
      arrayOptions: ['String', 'Int', 'Float', 'Date'],
      fileStatus: 0,
      file: [],
      options: [],
      sqlSettings: [],
      // settingsComplete: false,
      value: '',
      DBName: '',
    };
  },
  mounted() {
    this.initData();
  },
  beforeDestroy() {
    this.saveData();
  },
  computed: {
    importData() {
      return this.$store.state.importData;
    },
  },
  methods: {
    initData() {
      this.$axios.get('/database/list').then((res) => {
        this.options = res;
      });
      // this.settingsComplete = this.importData.settingsComplete;
      this.value = this.importData.sql;
      this.file = this.importData.file;
      this.sqlSettings = this.importData.sqlSettings;
      this.DBName = this.importData.sqlName;
      this.array = this.importData.options;
      this.id = this.importData.id;
      if (this.file.length !== 0) {
        this.fileStatus = 1;
      }
      // if (this.sqlSettings.length === 0) {
      //   this.sqlSettings = new Array(7).fill('');
      // }
    },
    saveData() {
      const data = {
        sql: this.value,
        file: this.file,
        sqlSettings: this.sqlSettings,
        sqlName: this.DBName,
        // settingsComplete: this.settingsComplete,
        options: this.array,
        id: this.id,
      };
      this.$store.dispatch('setImportData', data);
    },
    handleSelectChange(payload) {
      this.sqlSettings[payload.index] = payload.select;
      this.sqlSettings.forEach((item) => {
        if (item !== '') this.settingsComplete = true;
      });
    },
    fileChange(e) {
      const data = new FormData();
      data.append('file', e.target.files[0]);
      this.$axios.post('/dataset', data).then((res) => {
        this.array = res.file_header;
        this.array.forEach(() => {
          this.sqlSettings.push('String');
        });
        this.file.push(e.target.files[0]);
        this.fileStatus = 1;
        this.id = res.id;
      });
    },
    deleteFile() {
      this.$confirm('确定要删除文件?删除后需重新上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.file.pop();
          this.fileStatus = 0;
          // this.sqlSettings = new Array(7);
          this.sqlSettings = [];
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  align-items: flex-start;
}

label {
  font-size: 24px;
  margin-right: 38px;
  color: #666;
  white-space: nowrap;
}

.file-label {
  margin-top: 41px;
  margin-bottom: 33px;
}

.show {
  height: 66px;
  background-color: #fff;
  border-radius: 6px;
}

.select {
  height: 66px;
  margin-top: 42px;
}

.select /deep/ .el-input__inner {
  border: none;
  height: 66px;
  width: 606px;
  border-radius: 6px;
  font-size: 24px;
  color: #333;
}

.db-name {
  height: 66px;
  margin-top: 42px;
  margin-bottom: 200px;
}

.db-name /deep/ .el-input__inner {
  border: none;
  height: 66px;
  width: 606px;
  border-radius: 6px;
  font-size: 24px;
  color: #333;
}

.file-box {
  height: 66px;
  width: 235px;
  background-color: #fff;
  border-radius: 6px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
}

.center {
  justify-content: center;
}

.start {
  justify-content: flex-start;
}

.upload {
  margin-left: 11px;
  font-size: 20px;
  color: #666;
}

.delete {
  font-size: 22px;
  color: #666;
}

.input-file {
  position: absolute;
  top: 0;
  left: 0;
  height: 66px;
  width: 235px;
  opacity: 0;
}

.data-set {
  display: flex;
  flex-flow: row wrap;
}

.import-file {
  margin-left: 19px;
  margin-right: 11px;
}

.import-delete {
  height: 24px;
  width: 24px;
  margin-right: 35px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
