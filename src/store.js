import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    importData: {
      sql: '',
      file: [],
      sqlSettings: [],
      options: [],
      settingsComplete: false,
      sqlName: '',
      model: -1,
      id: '',
      total: '',
      size: '',
    },
    // 选择模型
    modelSelected: '',
    dataSelected: '',
    exampleSelected: '',
    publishActive: '',
    show: true,
    username: '',
    basic: {
      name: '',
      scene: '',
      describe: '',
      datasetId: '',
      datasetName: '',
      input: '',
      output: '',
    },
    algorithm: {
      id: '',
      name: '',
      model_name: '',
      suit: '',
      frame: '',
    },
    config: '',
    reportData: {
      name: '',
      scene: '',
      describe: '',
      dateSetName: '',
      total: '',
      config: {
        rounds: '',
        ram: '',
        cpu: '',
        gpu: '',
      },
      line: '',
      size: '',
      frame: '',
    },
    trainSelected: '',
    chooseData: '',
    record: {},
    dataBase: 1,
    dataSetName: '',
    modelDatabaseName: '',
    modelDatasetId: '',
  },
  mutations: {
    setRecord(state, value) {
      state.record = value;
    },
    updateImportData(state, payload) {
      state.importData = payload;
    },
    selectModel(state, value) {
      state.modelSelected = value;
    },
    selectData(state, value) {
      state.dataSelected = value;
    },
    selectExample(state, value) {
      state.exampleSelected = value;
    },
    setPublishActive(state, value) {
      state.publishActive = value;
    },
    setShow(state) {
      state.show = !state.show;
    },
    setUsername(state, value) {
      state.username = value;
    },
    setBasic(state, value) {
      state.basic = Object.assign(state.basic, value);
    },
    setAlgorithmData(state, value) {
      state.algorithm = Object.assign(state.algorithm, value);
    },
    setReportData(state, value) {
      state.reportData = Object.assign(state.reportData, value);
    },
    setTrain(state, value) {
      state.trainSelected = value;
    },
    setChoose(state, value) {
      state.chooseData = value;
    },
    // 不同数据库中不同模型预测结果
    chooseDataBase(state, value) {
      state.dataBase = value;
    },
    // 数据集名称
    dataSetName(state, value) {
      state.dataSetName = value;
    },
    // 模型中心选择的模型数据表名
    modelDatabase(state, value) {
      state.modelDatabaseName = value;
    },
    // 模型中心不同数据集不同结果集
    setModelDatasetId(state, value) {
      state.modelDatasetId = value;
    },
  },
  actions: {
    setImportData({ commit, state }, payload) {
      let newData = payload;
      newData = Object.assign(state.importData, payload);
      commit('updateImportData', newData);
    },
    importComplete({ commit }) {
      commit('updateImportData', {
        sql: '',
        file: [],
        sqlSettings: [],
        options: [],
        settingsComplete: false,
        sqlName: '',
        model: -1,
        id: '',
        total: '',
        size: '',
      });
    },
  },
});
