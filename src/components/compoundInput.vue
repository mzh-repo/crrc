<template>
  <div class="box">
    <div class="title"
         :title="title">{{title}}</div>
    <el-select v-model="value"
               placeholder=""
               :multiple="multiple"
               @change="selected">
      <el-option v-for="item in options"
                 :value="item"
                 :key="item"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    select: { type: String, default: '' },
    index: { type: Number, default: null },
    title: {
      type: String,
      default: '时间',
    },
    options: {
      type: Array,
      default: () => ['String', 'Int', 'Float', 'Date'],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { value: '' };
  },
  created() {
    this.value = this.select;
  },
  methods: {
    selected() {
      this.$emit('selected', {
        index: this.index,
        select: this.value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-right: 20px;
  margin-bottom: 20px;
  width: 360px;
  height: 66px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title {
  font-size: 20px;
  color: #666;
  margin-left: 15px;
  white-space: nowrap;
  height: 21px;
  line-height: 21px;
  padding-right: 13px;
  border-right: solid 1px #979797;
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/deep/ .el-select {
  width: 100%;
}
/deep/ .el-input {
  width: 100%;
}
/deep/.el-input__inner {
  width: 100%;
  height: 66px;
  border: none;
  font-size: 24px;
  color: #333;
}
</style>
