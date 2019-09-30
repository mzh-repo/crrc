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
