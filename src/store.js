import Vue from 'vue';
import Vuex from 'vuex';
import axios from './libs/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    importData: {
      fileId: '',
      sql: '',
      file: [],
      sqlSettings: [],
      settingsComplete: false,
      sqlName: '',
      model: '',
    },
    modelSelected: '',
    dataSelected: '',
    exampleSelected: '',
    publishActive: '',
  },
  mutations: {
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
  },
  actions: {
    setImportData({ commit, state }, payload) {
      let newData = payload;
      newData = Object.assign(state.importData, payload);
      commit('updateImportData', newData);
    },
    importComplete({ commit }, payload) {
      const data = payload;

      axios.post('/data', data).then(res => res);
      commit('updateImportData', {
        sql: '',
        file: [],
        sqlSettings: [],
        sqlName: '',
        model: '',
        fileId: '',
      });
    },
  },
});
